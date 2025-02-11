import React from "react";
import Options from "./options";

export default function Question({ questions, answer, dispatch }) {
  return (
    <div>
      <h4>{questions.question}</h4>
      <Options
        options={questions.options}
        correctOption={questions.correctOption}
        dispatch={dispatch}
        answer={answer}
      />
      
    </div>
  );
}
