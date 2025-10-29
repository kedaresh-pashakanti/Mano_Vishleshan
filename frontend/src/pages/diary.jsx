import React, { useState, useEffect } from "react";
import ScrollAnimation from "../Components/ScrollAnimation";

const Diary = () => {
  const totalDays = 15;
  const [entries, setEntries] = useState(Array(totalDays).fill(""));
  const [completedDays, setCompletedDays] = useState([]);
  const [activeDay, setActiveDay] = useState(1);
  const [result, setResult] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("diaryEntries", JSON.stringify(entries));
    localStorage.setItem("completedDays", JSON.stringify(completedDays));
    localStorage.setItem("mentalHealthResult", result);
  }, [entries, completedDays, result]);

  const loadHistory = () => {
    const savedEntries = JSON.parse(localStorage.getItem("diaryEntries"));
    const savedResult = localStorage.getItem("mentalHealthResult");
    const savedCompleted = JSON.parse(localStorage.getItem("completedDays"));

    if (savedEntries) {
      setEntries(savedEntries);
    }
    if (savedResult) {
      setResult(savedResult);
    }
    if (savedCompleted) {
      setCompletedDays(savedCompleted);
    }
  };

  const handleChange = (value) => {
    const updatedEntries = [...entries];
    updatedEntries[activeDay - 1] = value;
    setEntries(updatedEntries);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!completedDays.includes(activeDay)) {
      setCompletedDays((prev) => [...prev, activeDay]);
    }
    if (activeDay < totalDays) {
      setActiveDay(activeDay + 1);
    }
  };












const handleAnalyzeMood = async () => {
  setIsProcessing(true);
  setResult("");
  try {
    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ symptoms: entries }),
    });
    const data = await response.json();

    if (data.error) {
      setResult(`Error: ${data.error}`);
    } else {
      let resultText = data.final_prediction;

      if (data.label_counts) {
        resultText += "\n\nDetailed Analysis:";
        Object.entries(data.label_counts).forEach(([label, count]) => {
          if (count > 0) {
            resultText += `\n• ${label.charAt(0).toUpperCase() + label.slice(1)}: ${count} entries`;
          }
        });
      }

      // ADD THIS SECTION ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
      if (data.frequent_symptoms_section) {
        resultText += `\n\n${data.frequent_symptoms_section}`;
      }

      setResult(resultText);

      // Save results to backend -> Firestore (user_results)
      try {
        const username = localStorage.getItem("userName") || "unknown_user";
        await fetch("http://localhost:5000/api/diary/save_user_results", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username,
            entries,
            result: resultText,
            timestamp: new Date().toISOString(),
          }),
        });
        setToastMessage("Saved to cloud successfully!");
        setTimeout(() => setToastMessage(""), 3000);
      } catch (saveErr) {
        console.error("Failed to save to Firestore backend:", saveErr);
      }
    }
  } catch (error) {
    console.error("Error:", error);
    setResult("An error occurred. Please try again.");
  }
  setIsProcessing(false);
};












  const handleDownloadDiary = () => {
    let diaryText = "MANOVISHLESHAN - Mental Health Journal Entries:\n\n";
    entries.forEach((entry, index) => {
      diaryText += `Day ${index + 1}:\n${entry || "No entry."}\n\n`;
    });
    diaryText += result ? `\n${result}\n` : "";

    const blob = new Blob([diaryText], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "MANOVISHLESHAN_Diary.txt";
    link.click();

    setToastMessage("Download Successful!");
    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-soft-bg font-sans">
      <div className="container mx-auto py-16">
        {/* Header - Enhanced with animations */}
        <ScrollAnimation animationType="fade-in">
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-accent to-accent-light rounded-full flex items-center justify-center mx-auto animate-pulse-slow">
                <span className="text-white text-3xl">📝</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-dark-text mb-6">
              Mental Health Journal
            </h1>
            <p className="text-xl text-dark-text/70 font-sans leading-relaxed max-w-3xl mx-auto">
              Write about your emotions over the past 15 days. Track your mental health journey and get personalized insights.
            </p>
          </div>
        </ScrollAnimation>

        {/* Navigation Button - Enhanced */}
        <ScrollAnimation animationType="fade-in" delay={200}>
          <div className="flex justify-center mb-8">
            <button
              onClick={() => {
                setShowHistory(!showHistory);
                if (!showHistory) loadHistory();
              }}
              className="btn-primary text-lg px-8 py-3 relative overflow-hidden group"
            >
              <span className="relative z-10">{showHistory ? "Back to Diary" : "View History"}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent-light to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </ScrollAnimation>

        {showHistory ? (
          /* History View - Enhanced with animations */
          <ScrollAnimation animationType="scale-in">
            <div className="card max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mr-4 animate-pulse-slow">
                  <span className="text-white text-xl">📚</span>
                </div>
                <h2 className="text-3xl font-serif font-bold text-dark-text">
                  Your Journal Entries
                </h2>
              </div>
              
              <div className="space-y-6 max-h-[600px] overflow-y-auto">
                {entries.map((entry, index) => (
                  <ScrollAnimation key={index} animationType="fade-in" delay={index * 50}>
                    <div className="card-diary p-6 rounded-card border border-accent/20 group hover:scale-105 transition-transform duration-300">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center mr-3">
                          <span className="text-accent font-bold text-sm">{index + 1}</span>
                        </div>
                        <h3 className="text-xl font-serif font-semibold text-dark-text">
                          Day {index + 1}
                        </h3>
                      </div>
                      <p className="text-dark-text/70 font-sans leading-relaxed whitespace-pre-wrap group-hover:text-dark-text transition-colors duration-300">
                        {entry || "No entry."}
                      </p>
                    </div>
                  </ScrollAnimation>
                ))}
              </div>

              {result && (
                <ScrollAnimation animationType="fade-in" delay={300}>
                  <div className="mt-8 p-6 bg-white border-2 border-accent rounded-card text-center relative overflow-hidden">
                    <div className="relative z-10">
                      <h3 className="text-2xl font-serif font-bold mb-2 text-dark-text">Analysis Result</h3>
                      <div className="text-lg font-sans whitespace-pre-line text-left max-w-2xl mx-auto text-dark-text">
                        {result}
                      </div>
                    </div>
                  </div>
                </ScrollAnimation>
              )}
              
              {!result && (
                <ScrollAnimation animationType="fade-in" delay={300}>
                  <div className="mt-8 text-center text-lg text-dark-text/50 font-sans">
                    Please complete and analyze your mood to view results.
                  </div>
                </ScrollAnimation>
              )}

              <ScrollAnimation animationType="fade-in" delay={400}>
                <div className="flex justify-center mt-8">
                  <button
                    onClick={handleDownloadDiary}
                    className="btn-secondary text-lg px-8 py-3 group"
                  >
                    <span className="flex items-center">
                      <span className="mr-2">📥</span>
                      Download Diary
                    </span>
                  </button>
                </div>
              </ScrollAnimation>
            </div>
          </ScrollAnimation>
        ) : (
          /* Diary Entry View - Enhanced with animations */
          <>
            {/* Current Day Entry - Enhanced */}
            <ScrollAnimation animationType="fade-in">
              <div className="card max-w-4xl mx-auto mb-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-accent/10 to-accent-light/10 rounded-full transform translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-500"></div>
                
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent-light rounded-full flex items-center justify-center mr-4 animate-pulse-slow">
                    <span className="text-white font-bold text-lg">{activeDay}</span>
                  </div>
                  <h3 className="text-2xl font-serif font-semibold text-dark-text">
                    Day {activeDay}
                  </h3>
                </div>
                
                <textarea
                  rows="6"
                  placeholder="Describe your emotions, thoughts, and experiences today..."
                  maxLength="500"
                  value={entries[activeDay - 1]}
                  onChange={(e) => handleChange(e.target.value)}
                  className="input-prescripto resize-none focus:ring-2 focus:ring-accent/20"
                ></textarea>
                
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-dark-text/50 font-sans">
                    {entries[activeDay - 1].length}/500 characters
                  </span>
                  <button
                    type="submit"
                    disabled={!entries[activeDay - 1].trim()}
                    onClick={handleSubmit}
                    className="btn-primary disabled:bg-dark-text/20 disabled:cursor-not-allowed group"
                  >
                    <span className="flex items-center">
                      <span className="mr-2">✨</span>
                      Submit Entry
                    </span>
                  </button>
                </div>
              </div>
            </ScrollAnimation>

            {/* Day Navigation Grid - Enhanced with animations */}
            <ScrollAnimation animationType="fade-in" delay={200}>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-8">
                {Array.from({ length: totalDays }, (_, i) => i + 1)
                  .filter((day) => day !== activeDay)
                  .map((day, index) => (
                    <ScrollAnimation key={day} animationType="scale-in" delay={index * 50}>
                      <div
                        className={`card p-4 cursor-pointer hover:shadow-card-hover transition-all duration-300 transform hover:scale-105 ${
                          completedDays.includes(day) 
                            ? "bg-accent/10 border-accent ring-2 ring-accent/20" 
                            : "hover:border-accent hover:ring-2 hover:ring-accent/10"
                        }`}
                        onClick={() => setActiveDay(day)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className={`text-lg font-serif font-semibold ${
                            completedDays.includes(day) ? "text-accent" : "text-dark-text"
                          }`}>
                            Day {day}
                          </h3>
                          {completedDays.includes(day) && (
                            <div className="text-accent animate-pulse">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <p className="text-dark-text/50 text-sm font-sans truncate">
                          {entries[day - 1] || "Click to write..."}
                        </p>
                      </div>
                    </ScrollAnimation>
                  ))}
              </div>
            </ScrollAnimation>

            {/* Progress Indicator - Enhanced with animations */}
            <ScrollAnimation animationType="fade-in" delay={300}>
              <div className="text-center mb-8">
                <div className="progress-bar max-w-md mx-auto mb-4">
                  <div 
                    className="progress-bar-fill"
                    style={{ width: `${(completedDays.length / totalDays) * 100}%` }}
                  ></div>
                </div>
                <p className="text-dark-text/60 font-sans">
                  {completedDays.length} of {totalDays} days completed
                </p>
              </div>
            </ScrollAnimation>

            {/* Analyze Button - Enhanced */}
            <ScrollAnimation animationType="fade-in" delay={400}>
              <div className="flex justify-center mb-8">
                <button
                  onClick={handleAnalyzeMood}
                  disabled={completedDays.length < totalDays}
                  className="btn-primary text-lg px-10 py-4 disabled:bg-dark-text/20 disabled:cursor-not-allowed group relative overflow-hidden"
                >
                  {isProcessing ? (
                    <span className="flex items-center">
                      <div className="spinner mr-3"></div>
                      Analyzing...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <span className="mr-2">🔍</span>
                      Analyze Mood
                    </span>
                  )}
                </button>
              </div>
            </ScrollAnimation>

            {/* Results - Enhanced with animations */}
            {result && (
              <ScrollAnimation animationType="scale-in">
                <div className="card max-w-4xl mx-auto text-center bg-white border-2 border-accent relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent-light rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-slow">
                      <span className="text-white text-2xl">🎯</span>
                    </div>
                    <h3 className="text-2xl font-serif font-bold mb-4 text-dark-text">Analysis Result</h3>
                    <div className="text-lg font-sans leading-relaxed whitespace-pre-line text-left max-w-2xl mx-auto text-dark-text">
                      {result}
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            )}
          </>
        )}
      </div>

      {/* Enhanced Toast Message */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-accent text-white rounded-button shadow-lg z-50 animate-fade-in-up">
          <div className="flex items-center">
            <span className="mr-2">✅</span>
            {toastMessage}
          </div>
        </div>
      )}
    </div>
  );
};

export default Diary;
