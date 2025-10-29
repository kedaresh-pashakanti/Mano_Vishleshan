import React, { useState, useEffect } from "react";
import { data } from "../assets/anxietyData";

const Modal = ({ show, anxietyLevel, onClose }) => {
  if (!show) return null;

  let suggestionMessage = "";
  let suggestionColor = "";
  
  if (anxietyLevel === "High Anxiety") {
    suggestionMessage = "You might benefit from professional counseling or therapy. Consider reaching out to a mental health professional for support.";
    suggestionColor = "from-red-500 to-red-600";
  } else if (anxietyLevel === "Medium Anxiety") {
    suggestionMessage = "Try mindfulness exercises, journaling, or light workouts. Consider talking to a counselor if symptoms persist.";
    suggestionColor = "from-yellow-500 to-yellow-600";
  } else if (anxietyLevel === "Low Anxiety") {
    suggestionMessage = "Great job! You are managing your anxiety well. Keep maintaining healthy habits and continue your positive practices.";
    suggestionColor = "from-green-500 to-green-600";
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="text-2xl font-serif font-bold text-dark-text mb-4">Your Assessment Result</h2>
        <div className={`p-4 rounded-card bg-gradient-to-r ${suggestionColor} text-white mb-6`}>
          <h3 className="text-xl font-serif font-bold mb-2">{anxietyLevel}</h3>
        </div>
        <p className="text-dark-text/70 font-sans leading-relaxed mb-6">{suggestionMessage}</p>
        <button
          className="btn-primary w-full"
          onClick={onClose}
        >
          Got it
        </button>
      </div>
    </div>
  );
};

const AnxietyQuiz = () => {
  const [index, setIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [anxietyLevel, setAnxietyLevel] = useState("");

  const question = data[index];

  const checkAns = (e, ans) => {
    setSelectedAnswer(ans);

    document.querySelectorAll("li").forEach((li) => {
      li.classList.remove("bg-green-100", "border-green-500", "bg-red-100", "border-red-500");
    });

    if (question.ans === ans) {
      e.target.classList.add("bg-green-100", "border-green-500");
      setCorrectAnswers((prev) => prev + 1);
    } else {
      e.target.classList.add("bg-red-100", "border-red-500");
    }

    setIsAnswered(true);
  };

  const nextQuestion = () => {
    if (index < data.length - 1) {
      setIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const calculateAnxietyLevel = () => {
    if (correctAnswers >= 8) return "Low Anxiety";
    else if (correctAnswers >= 5) return "Medium Anxiety";
    else return "High Anxiety";
  };

  useEffect(() => {
    if (showResult) {
      const level = calculateAnxietyLevel();
      setAnxietyLevel(level);
      setShowModal(true);
      localStorage.setItem(
        "anxietyQuizResult",
        JSON.stringify({
          anxietyLevel: level,
          correctAnswers,
        })
      );
    }
  }, [showResult, correctAnswers]);

  return (
    <div className="min-h-screen bg-soft-bg font-sans">
      <div className="container mx-auto py-16">
        {/* Header - Prescripto style */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-dark-text mb-6">
            Anxiety Assessment Test
          </h1>
          <p className="text-xl text-dark-text/70 font-sans leading-relaxed max-w-3xl mx-auto">
            This quick and easy self-assessment helps you identify your current anxiety levels. 
            Whether you're feeling overwhelmed or just curious about your mental state, 
            taking this test can be the first step toward managing your emotional well-being.
          </p>
        </section>

        {/* Why Take This Test - Prescripto style */}
        <section className="card mb-16 bg-accent/5">
          <h2 className="text-2xl font-serif font-semibold text-dark-text mb-6 text-center">
            Why Take This Test?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-accent mr-3 mt-1">•</span>
                <span className="font-sans text-dark-text/70">Quick snapshot of your mental health</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3 mt-1">•</span>
                <span className="font-sans text-dark-text/70">See if you may benefit from extra support</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3 mt-1">•</span>
                <span className="font-sans text-dark-text/70">Learn how stress may be affecting your daily life</span>
              </li>
            </ul>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-accent mr-3 mt-1">•</span>
                <span className="font-sans text-dark-text/70">Get personalized suggestions at the end</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3 mt-1">•</span>
                <span className="font-sans text-dark-text/70">Track your progress over time</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3 mt-1">•</span>
                <span className="font-sans text-dark-text/70">Completely confidential and secure</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Quiz Container - Prescripto style */}
        <div className="card max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-dark-text mb-8 text-center">
            Mental Health Assessment
          </h2>

          {showResult ? (
            <div className="text-center">
              <div className="mb-8">
                <h2 className="text-2xl font-serif font-bold text-dark-text mb-4">
                  Assessment Complete
                </h2>
                <p className="text-lg font-sans text-dark-text/70 mb-2">
                  You answered {correctAnswers} out of {data.length} questions correctly.
                </p>
                <p className="text-dark-text/50 font-sans">Thank you for taking the assessment.</p>
              </div>
            </div>
          ) : (
            <>
              {/* Progress Bar - Prescripto style */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-sans text-dark-text/60">Progress</span>
                  <span className="text-sm font-sans text-dark-text/60">
                    {index + 1} of {data.length}
                  </span>
                </div>
                <div className="bg-border-light rounded-full h-2">
                  <div 
                    className="bg-accent h-2 rounded-full transition-all duration-500"
                    style={{ width: `${((index + 1) / data.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Question - Prescripto style */}
              <div className="mb-8">
                <h3 className="text-xl font-serif font-semibold text-dark-text mb-6">
                  {index + 1}. {question.question}
                </h3>
                <ul className="space-y-4">
                  {[1, 2, 3, 4].map((option) => (
                    <li
                      key={option}
                      className={`p-4 border rounded-card cursor-pointer text-lg font-sans transition-all duration-300 ${
                        selectedAnswer === option && isAnswered
                          ? question.ans === option
                            ? "bg-green-100 border-green-500"
                            : "bg-red-100 border-red-500"
                          : "bg-white border-border-light hover:border-accent hover:bg-soft-bg"
                      }`}
                      onClick={(e) => checkAns(e, option)}
                    >
                      {question[`option${option}`]}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Next Button - Prescripto style */}
              <div className="flex flex-col items-center">
                <button
                  className="btn-primary text-lg px-12 py-4 disabled:bg-dark-text/20 disabled:cursor-not-allowed"
                  onClick={nextQuestion}
                  disabled={!isAnswered}
                >
                  {index === data.length - 1 ? "See Results" : "Next Question"}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Disclaimer - Prescripto style */}
        <section className="mt-16 text-center">
          <div className="card bg-soft-bg">
            <p className="text-sm text-dark-text/60 font-sans leading-relaxed">
              <strong>Important:</strong> This assessment is not a diagnosis. If you're experiencing severe symptoms,
              please consult a licensed mental health professional. This tool is designed to provide general insights
              and should not replace professional medical advice.
            </p>
          </div>
        </section>

        <Modal
          show={showModal}
          anxietyLevel={anxietyLevel}
          onClose={() => setShowModal(false)}
        />
      </div>
    </div>
  );
};

export default AnxietyQuiz;
