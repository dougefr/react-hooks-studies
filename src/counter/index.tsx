import React, { useContext } from "react";
import { decrement, increment } from "./store/action";
import { store } from "./store";

const Counter = () => {
  const { state, dispatch } = useContext(store);

  return (
    <>
      Counter: {state.counter}
      <br />
      <input
        type="button"
        value="decrement"
        onClick={() => dispatch(decrement())}
      />
      <input
        type="button"
        value="increment"
        onClick={() => dispatch(increment())}
      />
    </>
  );
};

export default Counter;
