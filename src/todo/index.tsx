import React, { useContext, useRef } from "react";
import { add, remove, completed } from "./store/action";
import { store } from "./store";

const Todo = () => {
  const { state, dispatch } = useContext(store);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnClickAddButton = () => {
    if (inputRef.current) {
      dispatch(add(inputRef.current.value));
      inputRef.current.value = "";
    }
  };

  const handleOnClickCompletedCheckbox = (id: string) => {
    dispatch(completed(id));
  };

  const handleOnClickRemoveButton = (id: string) => {
    dispatch(remove(id));
  };

  return (
    <>
      <input ref={inputRef} />
      <input type="button" value="add" onClick={handleOnClickAddButton} />
      <ol>
        {state.todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              defaultChecked={todo.completed}
              disabled={todo.completed}
              onClick={() => handleOnClickCompletedCheckbox(todo.id)}
            />
            {todo.text}
            <input
              type="button"
              value="remove"
              onClick={() => handleOnClickRemoveButton(todo.id)}
            />
          </li>
        ))}
      </ol>
    </>
  );
};

export default Todo;
