import { ActionType } from "./actionType";
import { v4 as uuidv4 } from "uuid";

export interface IState {
  todos: {
    id: string;
    text: string;
    completed: boolean;
  }[];
}

export interface IAction {
  type: ActionType;
  id?: string;
  text?: string;
}

const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case ActionType.ADD:
      return {
        todos: [
          ...state.todos,
          { id: uuidv4(), text: action.text!, completed: false },
        ],
      };

    case ActionType.REMOVE:
      return { todos: state.todos.filter((todo) => todo.id !== action.id) };

    case ActionType.COMPLETED:
      return {
        todos: state.todos.map((todo) =>
          todo.id === action.id ? { ...todo, completed: true } : todo
        ),
      };

    default:
      return state;
  }
};

export default reducer;
