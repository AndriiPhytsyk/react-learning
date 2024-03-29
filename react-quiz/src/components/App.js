import Header from "./Header";
import Main from "./Main";
import { useEffect, useReducer } from "react";
import Loader from "./Loader";
import Error from "./Error";
import StarterScreen from "./StarterScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";

const SECS_PER_QUESTION = 30;
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready"
      };
    case "dataFailed":
      return {
        ...state,
        status: "error"
      };

    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION
      };
    case "setAnswer":
      // eslint-disable-next-line no-case-declarations
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption ? state.points + question.points : state.points
      };
    case "nextQuestion":
      return { ...state, answer: null, index: state.index + 1 };
    case "finish":
      return {
        ...state,
        status: "finish",
        highscore: state.points > state.highscore ? state.points : state.highscore
      };
    case "restartQuiz":
      return { ...initialState, questions: state.questions, status: "ready" };
    case "tick": {
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finish" : state.status
      };
    }
    default:
      throw new Error("Action unknown");
  }
}

export default function App() {
  const [{ questions, status, index, answer, points, highscore, secondsRemaining }, dispatch] =
    useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((acc, question) => acc + question.points, 0);
  useEffect(function () {
    fetch("http://localhost:8000/questions").then((res) =>
      res
        .json()
        .then((data) =>
          dispatch({
            type: "dataReceived",
            payload: data
          })
        )
        .catch(() => dispatch({ type: "dataFailed" }))
    );
  }, []);
  return (
    <div className="app">
      <Header />
      <main className="main">
        <Main>
          {status === "loading" && <Loader />}
          {status === "error" && <Error />}{" "}
          {status === "ready" && <StarterScreen dispatch={dispatch} numQuestions={numQuestions} />}{" "}
          {status === "active" && (
            <>
              <Progress
                answer={answer}
                index={index}
                numQuestions={numQuestions}
                points={points}
                maxPossiblePoints={maxPossiblePoints}
              />
              <Question answer={answer} dispatch={dispatch} question={questions[index]} />
              <Footer>
                <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
                <NextButton
                  index={index}
                  numQuestions={numQuestions}
                  answer={answer}
                  dispatch={dispatch}
                />
              </Footer>
            </>
          )}
          {status === "finish" && (
            <FinishScreen
              dispatch={dispatch}
              highscore={highscore}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
            />
          )}
        </Main>
      </main>
    </div>
  );
}
