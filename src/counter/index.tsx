import React, { useContext } from "react";
import { decrement, increment, set } from "./store/action";
import { store } from "./store";
import { IAction } from "./store/reducer";

const fetchRandom = async(dispatch: React.Dispatch<IAction>) => {
  const value = await new Promise<number>((resolve) => {
    setTimeout(() => resolve(Math.floor(Math.random() * 10)), 1000);
  })
  dispatch(set(value));
}

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
      <input
        type="button" 
        value="fetch random"
        onClick={() => dispatch(fetchRandom)}
      />
    </>
  );
};

export default Counter;
