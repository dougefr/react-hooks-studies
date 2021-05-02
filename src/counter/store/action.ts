import { ActionType } from "./actionType";

export const increment = () => ({
  type: ActionType.INCREMENT,
});

export const decrement = () => ({
  type: ActionType.DECREMENT,
});
