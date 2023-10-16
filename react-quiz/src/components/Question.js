/* eslint react/prop-types: 0 */

import React from "react";
import Options from "./Options";

function Question({ question, answer, dispatch }) {
  return (
    <div>
      <h4>{question.question}</h4>{" "}
      <Options answer={answer} dispatch={dispatch} question={question} />
    </div>
  );
}

export default Question;
