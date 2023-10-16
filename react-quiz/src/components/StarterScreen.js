/* eslint react/prop-types: 0 */

import React from "react";

function StarterScreen({ numQuestions, dispatch }) {
  return (
    <div>
      <h2>Welcome to the React Quiz!</h2>
      <h3>{numQuestions} question to test your React Mastery</h3>
      <button onClick={() => dispatch({ type: "start" })} className="btn btn-ui">
        Let`s start
      </button>
    </div>
  );
}

export default StarterScreen;
