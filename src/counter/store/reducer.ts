import { ActionType } from "./actionType";

export interface IState {
  counter: number;
}

export interface IAction {
  type: ActionType;
  value?: number;
}

const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case ActionType.INCREMENT:
      return { counter: state.counter + 1 };
    case ActionType.DECREMENT:
      return { counter: state.counter - 1 };
    case ActionType.SET:
      return { counter: action.value! };
    default:
      return state;
  }
};

export default reducer;
