import React from "react";

export default function NextButton({ dispatch, answer, index, numQuestions }) {
  const hasAnswered = answer !== null;

  if (index < numQuestions - 1)
    return (
      <>
        {hasAnswered && (
          <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: "nextQuestion" })}
          >
            Next Question
          </button>
        )}
      </>
    );
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "finished" })}
    >
      Finsih
    </button>
  );
}
