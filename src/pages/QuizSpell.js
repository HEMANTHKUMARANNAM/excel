import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { animals } from "../utils"; // Only using animals category
import MainNavbar from "./MainNavbar";

// Function to generate misspelled versions of a word
const generateMisspellings = (correctWord) => {
  const misspellings = new Set();
  const letters = "abcdefghijklmnopqrstuvwxyz";

  while (misspellings.size < 3) {
    const index = Math.floor(Math.random() * correctWord.length);
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];
    const misspelled =
      correctWord.substring(0, index) +
      randomLetter +
      correctWord.substring(index + 1);
    if (misspelled !== correctWord) {
      misspellings.add(misspelled);
    }
  }
  return Array.from(misspellings);
};

const QuizSpell = () => {
  const { theme } = useParams();
  const [imagePath, setImagePath] = useState("");
  const [options, setOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [highlightCorrect, setHighlightCorrect] = useState(false);

  const generateQuestion = () => {
    if (questionCount >= 10) {
      setShowScore(true);
      return;
    }

    const correctItem = animals[Math.floor(Math.random() * animals.length)];
    const randomNumber = Math.floor(Math.random() * 3) + 1;
    setImagePath(`/assets/animals/${correctItem}/0${randomNumber}${correctItem}.jpg`);
    setCorrectAnswer(correctItem);

    const misspellings = generateMisspellings(correctItem);
    const allOptions = [...misspellings, correctItem].sort(() => Math.random() - 0.5);
    setOptions(allOptions);
    setSelectedOption(null);
    setFeedback("");
    setHighlightCorrect(false);
  };

  useEffect(() => {
    generateQuestion();
  }, [questionCount]);

  const handleSubmit = () => {
    if (selectedOption === correctAnswer) {
      setScore((prevScore) => prevScore + 1);
      setFeedback("Correct!");
    } else {
      setFeedback("Wrong!");
    }

    setHighlightCorrect(true);

    setTimeout(() => {
      setHighlightCorrect(false);
      setQuestionCount((prevCount) => prevCount + 1);
    }, 2000);
  };

  const handleRestart = () => {
    setScore(0);
    setQuestionCount(0);
    setShowScore(false);
  };

  return (
    <>
      <MainNavbar />
      <div className="container mt-5 text-center">
        {showScore ? (
          <div className="alert alert-success">
            <h2>Your Score: {score} / 10</h2>
            <button className="btn btn-secondary mt-3" onClick={handleRestart}>
              Play Again
            </button>
          </div>
        ) : (
          <div className="card p-4 shadow-lg">
            <h2 className="mb-3">Select the correct spelling:</h2>
            <img
              src={imagePath}
              alt="Item"
              className="img-fluid"
              style={{ maxHeight: "300px", objectFit: "contain" }}
              onError={(e) => (e.target.style.display = "none")}
            />
            <div className="d-flex flex-column align-items-center gap-3 mt-3">
              {options.map((option, index) => (
                <div key={index} className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="item"
                    id={`option-${index}`}
                    value={option}
                    onChange={() => setSelectedOption(option)}
                    checked={selectedOption === option}
                    disabled={feedback !== ""}
                  />
                  <label className="form-check-label" htmlFor={`option-${index}`}>
                    {option}
                  </label>
                </div>
              ))}
            </div>
            {feedback && (
              <div className={`mt-2 ${feedback === "Correct!" ? "text-success" : "text-danger"}`}>
                <strong>{feedback}</strong>
              </div>
            )}
            <button
              className="btn btn-primary mt-3"
              onClick={handleSubmit}
              disabled={!selectedOption || feedback !== ""}
            >
              Submit
            </button>
            <p className="mt-3">Question {questionCount + 1} / 10</p>
          </div>
        )}
      </div>
    </>
  );
};

export default QuizSpell;
