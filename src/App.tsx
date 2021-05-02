import React from "react";
import "./App.css";
import Counter from "./counter";
import Todo from "./todo";
import { StateProvider as CounterStateProvider } from "./counter/store";
import { StateProvider as TodoStateProvider } from "./todo/store";

function App() {
  return (
    <div className="App">
      <CounterStateProvider id="1">
        <Counter />
      </CounterStateProvider>
      <hr />
      <CounterStateProvider id="2">
        <Counter />
      </CounterStateProvider>
      <hr />
      <TodoStateProvider>
        <Todo />
      </TodoStateProvider>
    </div>
  );
}

export default App;
