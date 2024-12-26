import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
function App() {
  const messages = [
    "Learn React ⚛️",
    "Apply for jobs 💼",
    "Invest your new income 🤑",
  ];
  const [steps, setSteps] = useState(1);
  const [isOpen, setIsOpen] = useState(true);
  // const [name, setName] = useState({ name: "Oubda" });
  const handleNext = () => {
    if (steps < 3) {
      setSteps((next) => next + 1); //callbacr ro update state 
      // if (steps === 1) {
      //   setName({ name: "Fom" });
      // }
    }
  };
  const handlePrev = () => {
    if (steps > 1) setSteps((s) => s - 1);
  };
  return (
    <div className="App">
      <button className="close" onClick={() => setIsOpen(!isOpen)}>
        &times;
      </button>{" "}
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={steps >= 1 ? "active" : ""}>1</div>
            <div className={steps >= 2 ? "active" : ""}>2</div>
            <div className={steps >= 3 ? "active" : ""}>3</div>
          </div>
          <p className="message">
            Step {steps}: {messages[steps - 1]}.{/* The name is {name.name} */}
          </p>
          <div className="buttons">
            <button className="text-white bg-violet-500" onClick={handlePrev}>
              Prev
            </button>
            <button className="text-white bg-violet-500" onClick={handleNext}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
