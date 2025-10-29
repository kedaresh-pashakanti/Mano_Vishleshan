import os
import re
import requests
import tempfile
from flask import Flask, request, jsonify, send_file
import torch
import torch.nn as nn
from transformers import AutoTokenizer, AutoModel, logging
from flask_cors import CORS
from datetime import datetime
import matplotlib.pyplot as plt
from fpdf import FPDF

logging.set_verbosity_error()
app = Flask(__name__)
CORS(app)

# ---------------- Paths ----------------
SAVE_FOLDER = "saved_entries"
os.makedirs(SAVE_FOLDER, exist_ok=True)

# 🔗 GitHub raw model URL (Replace with your actual repo link)
MODEL_URL = "https://huggingface.co/pikachutare/manovishleshan-final-model/resolve/main/final_model.pt"
LOCAL_MODEL_PATH = "./final_model.pt"

DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# ---------------- Load Tokenizer ----------------
tokenizer = AutoTokenizer.from_pretrained("ai4bharat/indic-bert")

# ---------------- MultiTask Model Definition ----------------
class MultiTaskModel(nn.Module):
    def __init__(self, model_name, n_anx_levels=4, n_ptsd_levels=5, n_anx_sym=7, n_ptsd_sym=6):
        super().__init__()
        self.encoder = AutoModel.from_pretrained(model_name)
        h = self.encoder.config.hidden_size
        self.disorder_cls = nn.Linear(h, 2)
        self.anx_level = nn.Linear(h, n_anx_levels)
        self.ptsd_level = nn.Linear(h, n_ptsd_levels)
        self.anx_sym = nn.Linear(h, n_anx_sym)
        self.ptsd_sym = nn.Linear(h, n_ptsd_sym)

    def forward(self, ids, mask):
        out = self.encoder(ids, mask)
        x = out.last_hidden_state[:, 0, :]
        return {
            "disorder": self.disorder_cls(x),
            "anx_level": self.anx_level(x),
            "ptsd_level": self.ptsd_level(x),
            "anx_sym": self.anx_sym(x),
            "ptsd_sym": self.ptsd_sym(x),
        }

# ---------------- Model Download + Load ----------------
def load_model_from_github():
    if not os.path.exists(LOCAL_MODEL_PATH):
        print("📥 Downloading model from GitHub...")
        response = requests.get(MODEL_URL)
        if response.status_code != 200:
            raise Exception(f"Failed to download model from GitHub. Status: {response.status_code}")
        with open(LOCAL_MODEL_PATH, "wb") as f:
            f.write(response.content)
        print("✅ Model downloaded successfully.")

    print("🔍 Loading model...")
    model = MultiTaskModel("ai4bharat/indic-bert").to(DEVICE)
    model.load_state_dict(torch.load(LOCAL_MODEL_PATH, map_location=DEVICE))
    model.eval()
    print("✅ Model loaded and ready.")
    return model

model = load_model_from_github()

# ---------------- Labels ----------------
DISORDER_LABELS = ["anxiety", "ptsd"]
ANX_LEVELS = ["Minimal", "Mild", "Moderate", "Severe"]
PTSD_LEVELS = ["Minimal", "Mild", "Moderate", "Severe", "Very Severe"]
ANX_SYM_COLS = [
    "Feeling nervous, anxious, or on edge",
    "Not being able to stop or control worrying",
    "Worrying too much about different things",
    "Trouble relaxing",
    "Being so restless that it is hard to sit still",
    "Becoming easily annoyed or irritable",
    "Feeling afraid, as if something awful might happen"
]
PTSD_SYM_COLS = [
    "upsetting dreams", "powerful images", "avoiding internal reminders",
    "avoiding external reminders", "super-alert", "feeling jumpy"
]

latest_generated_pdf_path = ""

# ---------------- Prediction Logic ----------------
def predict_multi_task(texts):
    disorder_preds, level_preds, symptoms_preds = [], [], []
    daywise_symptoms = []

    with torch.no_grad():
        for idx, text in enumerate(texts):
            enc = tokenizer(text, truncation=True, padding="max_length", max_length=128, return_tensors="pt")
            input_ids = enc["input_ids"].to(DEVICE)
            attention_mask = enc["attention_mask"].to(DEVICE)

            out = model(input_ids, attention_mask)
            d_pred = torch.argmax(out["disorder"], dim=1).cpu().item()
            disorder = DISORDER_LABELS[d_pred]
            disorder_preds.append(disorder)

            if disorder == "anxiety":
                lvl_id = torch.argmax(out["anx_level"], dim=1).cpu().item()
                level_preds.append(ANX_LEVELS[lvl_id])
                sym_logits = out["anx_sym"][0]
                sym_pred = (torch.sigmoid(sym_logits) > 0.65).cpu().numpy()
                symptoms = [ANX_SYM_COLS[i] for i, s in enumerate(sym_pred) if s]
            else:
                lvl_id = torch.argmax(out["ptsd_level"], dim=1).cpu().item()
                level_preds.append(PTSD_LEVELS[lvl_id])
                sym_logits = out["ptsd_sym"][0]
                sym_pred = (torch.sigmoid(sym_logits) > 0.65).cpu().numpy()
                symptoms = [PTSD_SYM_COLS[i] for i, s in enumerate(sym_pred) if s]

            daywise_symptoms.append({"day": idx + 1, "symptoms": symptoms})
            symptoms_preds.extend(symptoms)

    final_disorder = max(set(disorder_preds), key=disorder_preds.count)
    level_counts = [level for d, level in zip(disorder_preds, level_preds) if d == final_disorder]
    final_level = max(set(level_counts), key=level_counts.count)
    symptom_days = {}
    for d in daywise_symptoms:
        for s in d["symptoms"]:
            symptom_days.setdefault(s, []).append(d["day"])
    final_symptoms = [{"symptom": s, "count": len(days), "days": days} for s, days in symptom_days.items()]

    return final_disorder, final_level, final_symptoms, daywise_symptoms

# ---------------- Flask Routes ----------------
@app.route('/predict', methods=['POST'])
def predict():
    global latest_generated_pdf_path
    data = request.get_json(force=True)
    diary_entries = data.get('symptoms', [])
    raw_username = data.get('username', 'Unknown_User')
    username = re.sub(r'[^\w_]', '', raw_username.replace(" ", "_").lower())

    if not isinstance(diary_entries, list) or len(diary_entries) != 15:
        return jsonify({'error': 'Please provide exactly 15 diary entries.'}), 400
    if any(not entry.strip() for entry in diary_entries):
        return jsonify({'error': 'All 15 diary entries must be filled in.'}), 400

    user_folder = os.path.join(SAVE_FOLDER, username)
    os.makedirs(user_folder, exist_ok=True)

    disorder, final_level, frequent_symptoms, daywise_symptoms = predict_multi_task(diary_entries)
    final_prediction_title = f"You may have signs of {disorder.upper()} ({final_level} level)."

    # ---------------- Chart ----------------
    chart_path = os.path.join(user_folder, "summary_chart.png")
    days_with_symptoms = sum(1 for d in daywise_symptoms if d["symptoms"])
    days_without_symptoms = 15 - days_with_symptoms
    plt.figure(figsize=(6, 6))
    sizes = [days_with_symptoms, days_without_symptoms]
    labels = ['Days with Symptoms', 'Days without Symptoms']
    colors = ['#66b3ff', '#cccccc']
    plt.pie(sizes, labels=labels, colors=colors, autopct='%1.1f%%')
    plt.title(f'{disorder.upper()} Symptom Detection (15 Days)')
    plt.savefig(chart_path)
    plt.close()

    # ---------------- PDF ----------------
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    pdf_filename = f"{username}_summary_{timestamp}.pdf"
    pdf_path = os.path.join(user_folder, pdf_filename)
    latest_generated_pdf_path = pdf_path

    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    pdf.cell(200, 10, txt=f"Mental Health Summary for {raw_username}", ln=True, align='C')
    pdf.cell(200, 10, txt=f"Generated on {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}", ln=True, align='C')
    pdf.ln(10)
    pdf.multi_cell(0, 10, f"Final Prediction: {final_prediction_title}")
    pdf.ln(5)

    pdf.cell(200, 10, txt="Symptoms Frequency:", ln=True)
    if frequent_symptoms:
        for item in frequent_symptoms:
            days_str = ", ".join([f"Day {d}" for d in item["days"]])
            pdf.multi_cell(0, 10, f"- {item['symptom']} ({item['count']} times) on {days_str}")
    else:
        pdf.multi_cell(0, 10, "No frequent symptoms detected.")
    pdf.ln(5)

    pdf.cell(200, 10, txt="Day-wise Symptoms:", ln=True)
    for day in daywise_symptoms:
        pdf.multi_cell(0, 10, f"Day {day['day']}: {', '.join(day['symptoms']) if day['symptoms'] else 'No symptoms'}")

    pdf.image(chart_path, x=30, w=150)
    pdf.output(pdf_path)

    # ---------------- API Response ----------------
    symptoms_text = ""
    if frequent_symptoms:
        symptoms_text += "\nDetected Symptoms:\n"
        for item in frequent_symptoms:
            days_str = ", ".join([f"Day {d}" for d in item["days"]])
            symptoms_text += f"- {item['symptom']} ({item['count']} times) on {days_str}\n"
    else:
        symptoms_text += "\nNo frequent symptoms detected."

    final_prediction_full = final_prediction_title + symptoms_text

    return jsonify({
        'final_prediction': final_prediction_full,
        'disorder': disorder,
        'final_level': final_level,
        'pdf_report_link': '/download-pdf'
    })

@app.route('/download-pdf', methods=['GET'])
def download_pdf():
    if not latest_generated_pdf_path or not os.path.exists(latest_generated_pdf_path):
        return jsonify({'error': 'No report found.'}), 404
    return send_file(latest_generated_pdf_path, as_attachment=True)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
