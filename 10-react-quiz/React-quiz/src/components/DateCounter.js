import { useReducer } from "react";
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return {
        ...state,
        count: state.count + 1 * state.step,
      };
    case "decrement":
      return {
        ...state,
        count: state.count - 1 * state.step,
      };
    case "setCount":
      return { ...state, count: action.payload };
    case "setStep":
      return { ...state, step: action.payload };
    case "reset":
      return initialState;
    default:
      return state;
  }
}
const initialState = { count: 1, step: 1 };
function DateCounter() {
  // const [count, dispatch] = useReducer(reducer, 0);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("February 10 2025");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "decrement" });
    // setCount((count) => count - 1);
    // setCount((count) => count - step);
  };

  const inc = function () {
    dispatch({ type: "increment" });

    // setCount((count) => count + 1);
    // setCount((count) => count + step);
  };

  const defineCount = function (e) {
    dispatch({ type: "reset" });
    dispatch({ type: "setCount", payload: Number(e.target.value) });

    // setCount(Number(e.target.value));
  };

  const defineStep = function (e) {
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  };
  const reset = function () {
    dispatch({ type: "reset" });
    // setCount(0);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;

// import { useState, useReducer } from "react";
// function reducer(state, action) {
//   switch (action.type) {
//     case "increment":
//       return state + action.payload;
//     case "decrement":
//       return state - action.payload;
//     case "reset":
//       return action.payload;
//     default:
//       return state;
//   }
// }
// function DateCounter() {
//   const [step, setStep] = useState(1);
//   const [count, dispatch] = useReducer(reducer, 0);

//   // This mutates the date object.
//   const date = new Date("june 21 2027");
//   date.setDate(date.getDate() + count);

//   const dec = function () {
//     dispatch({ type: "decrement", payload: 1 });
//     // setCount((count) => count - 1);
//     // setCount((count) => count - step);
//   };

//   const inc = function () {
//     dispatch({ type: "increment", payload: 1 });

//     // setCount((count) => count + 1);
//     // setCount((count) => count + step);
//   };

//   const defineCount = function (e) {
//     dispatch({ type: "reset", payload: Number(e.target.value) });

//     // setCount(Number(e.target.value));
//   };

//   const defineStep = function (e) {
//     setStep(Number(e.target.value));
//   };

//   const reset = function () {
//     // setCount(0);
//     setStep(1);
//   };

//   return (
//     <div className="counter">
//       <div>
//         <input
//           type="range"
//           min="0"
//           max="10"
//           value={step}
//           onChange={defineStep}
//         />
//         <span>{step}</span>
//       </div>

//       <div>
//         <button onClick={dec}>-</button>
//         <input value={count} onChange={defineCount} />
//         <button onClick={inc}>+</button>
//       </div>

//       <p>{date.toDateString()}</p>

//       <div>
//         <button onClick={reset}>Reset</button>
//       </div>
//     </div>
//   );
// }
// export default DateCounter;
