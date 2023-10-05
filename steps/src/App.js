/* eslint react/prop-types: 0 */

import React, { useState } from 'react';

const messages = ['Learn React ⚛️', 'Apply for jobs 💼', 'Invest your new income 🤑'];

export default function App() {
  return <Steps />;
}

function Steps() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  function handlePrevious() {
    if (step > 1) setStep((s) => s - 1);
  }

  function handleNext() {
    if (step < 3) setStep((s) => s + 1);
  }

  return (
    <div>
      <button className="close" onClick={() => setIsOpen(!isOpen)}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? 'active' : ' '}>1</div>
            <div className={step >= 2 ? 'active' : ' '}>2</div>
            <div className={step >= 3 ? 'active' : ' '}>3</div>
          </div>
          <p className="message">
            Step {step}: {messages[step - 1]}
          </p>
          <div className="buttons">
            <Button background="#7950f2" color="#fff" text="Previous" onClick={handlePrevious}>
              <span>👈</span> Previous
            </Button>
            <Button background="#7950f2" color="#fff" text="Next" onClick={handleNext}>
              Next <span>👉</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function Button({ background, color, onClick, children }) {
  return (
    <button onClick={onClick} style={{ backgroundColor: background, color: color }}>
      {children}
    </button>
  );
}
