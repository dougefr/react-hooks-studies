import { ActionType } from "./actionType";

export const increment = () => ({
  type: ActionType.INCREMENT,
});

export const decrement = () => ({
  type: ActionType.DECREMENT,
});

export const set = (value: number) => ({
  type: ActionType.SET,
  value
});