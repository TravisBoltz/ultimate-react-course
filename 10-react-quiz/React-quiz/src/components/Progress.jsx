import React from "react";

export default function Progress({
  index,
  numQuestions,
  points,
  answer,
  maxPoints,
}) {
  return (
    <div>
      <progress max={numQuestions} value={index + Number(answer !== null)} />;
      <header className="progress">
        <p>
          Question <strong> {index + 1}</strong>/{" "}
          <strong> {numQuestions}</strong>
        </p>
        <p>
          <strong>{points}</strong>/ <strong>{maxPoints}</strong> points
        </p>
      </header>
    </div>
  );
}
