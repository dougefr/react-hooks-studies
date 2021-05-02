import { ActionType } from "./actionType";

export const add = (text: string) => ({
  type: ActionType.ADD,
  text,
});

export const remove = (id: string) => ({
  type: ActionType.REMOVE,
  id,
});

export const completed = (id: string) => ({
  type: ActionType.COMPLETED,
  id,
});
