/* eslint react/prop-types: 0 */
import React from "react";

function Options({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          onClick={() => dispatch({ type: "setAnswer", payload: index })}
          disabled={hasAnswered}
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered ? (index === question.correctOption ? "correct" : "wrong") : ""
          }`}
          key={option}>
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
