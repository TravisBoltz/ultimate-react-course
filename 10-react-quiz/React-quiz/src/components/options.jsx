import React from "react";

export default function Options({ options, answer, dispatch, correctOption }) {
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {options.map((option, index) => (
        <button
          className={`btn btn-option ${answer === index ? "answer " : ""}  ${
            hasAnswered ? (index === correctOption ? "correct" : "wrong") : ""
          }`}
          key={index}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          disabled={hasAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
