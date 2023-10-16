/* eslint react/prop-types: 0 */

import React, { useEffect } from "react";

function Timer({ dispatch, secondsRemaining }) {
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  useEffect(function () {
    const timer = setInterval(function () {
      dispatch({ type: "tick" });
    }, 1000);
    return function () {
      clearInterval(timer);
    };
  }, []);
  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;
