import reducer from "./reducer";
import createStore from "../../etc/createStore";

const initialState = { counter: 0 };

export const { StateProvider, store } = createStore(
  initialState,
  reducer
);
