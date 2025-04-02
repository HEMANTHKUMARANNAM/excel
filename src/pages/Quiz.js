import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { animals, aquatic, birds, fruits, insects, vegetables } from "../utils"; // Import all categories
import MainNavbar from "./MainNavbar";

// List of all categories
const categories = ["animals", "aquatic", "birds", "fruits", "insects", "vegetables"];

// Get random item from the correct theme
const getRandomItem = (theme) => {
  switch (theme) {
    case "aquatic":
      return aquatic[Math.floor(Math.random() * aquatic.length)];
    case "birds":
      return birds[Math.floor(Math.random() * birds.length)];
    case "fruits":
      return fruits[Math.floor(Math.random() * fruits.length)];
    case "insects":
      return insects[Math.floor(Math.random() * insects.length)];
    case "vegetables":
      return vegetables[Math.floor(Math.random() * vegetables.length)];
    default:
      return animals[Math.floor(Math.random() * animals.length)];
  }
};

// Get random category
const getRandomCategory = () => {
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  return randomCategory;
};

// Get options including the correct answer from the chosen theme
const getOptions = (theme, correctItem) => {
  let options = new Set();
  options.add(correctItem);
  while (options.size < 4) {
    const randomItem = getRandomItem(theme);
    options.add(randomItem);
  }
  return Array.from(options).sort(() => Math.random() - 0.5);
};

const Quiz = () => {
  const { theme } = useParams(); // Get theme from URL (e.g., animals, aquatic, complete)
  const [imagePath, setImagePath] = useState("");
  const [options, setOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [feedback, setFeedback] = useState(""); // feedback (correct/wrong)
  const [highlightCorrect, setHighlightCorrect] = useState(false); // for highlighting the correct answer

  const generateQuestion = () => {
    if (questionCount >= 10) {
      setShowScore(true);
      return;
    }

    let category = theme === "complete" ? getRandomCategory() : theme;
    const correctItem = getRandomItem(category);
    const randomNumber = Math.floor(Math.random() * 3) + 1;
    setImagePath(`/assets/${category}/${correctItem}/0${randomNumber}${correctItem}.jpg`);
    setCorrectAnswer(correctItem);
    setOptions(getOptions(category, correctItem));
    setSelectedOption(null);
    setFeedback(""); // Reset feedback when generating new question
    setHighlightCorrect(false); // Reset highlight
  };

  useEffect(() => {
    generateQuestion();
  }, [questionCount, theme]); // Re-run when questionCount or theme changes

  const handleSubmit = () => {
    if (selectedOption === correctAnswer) {
      setScore((prevScore) => prevScore + 1);
      setFeedback("Correct!");
    } else {
      setFeedback("Wrong!");
    }

    setHighlightCorrect(true); // Highlight the correct answer

    setTimeout(() => {
      setHighlightCorrect(false); // Remove highlight after 2 seconds
      setQuestionCount((prevCount) => prevCount + 1); // Go to next question
    }, 2000);
  };

  const handleRestart = () => {
    setScore(0);
    setQuestionCount(0);
    setShowScore(false);
  };

  return (
    <>
    <MainNavbar/>
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
          <h2 className="mb-3">
            Which {theme === "complete" ? "random item" : theme} is this?
          </h2>
          <img
            src={imagePath}
            alt="Item"
            className="img-fluid"
            style={{ maxHeight: "300px", objectFit: "contain" }}
            onError={(e) => (e.target.style.display = "none")} // Hide broken images
          />
          <div className="d-flex flex-column align-items-center gap-3 mt-3">
            {options.map((option, index) => (
              <div
                key={index}
                className={`form-check ${highlightCorrect && option === correctAnswer ? 'bg-success text-white' : ''}`}
              >
                <input
                  className="form-check-input"
                  type="radio"
                  name="item"
                  id={`option-${index}`}
                  value={option}
                  onChange={() => setSelectedOption(option)}
                  checked={selectedOption === option}
                  disabled={feedback !== ""} // Disable options after submitting
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

export default Quiz;
