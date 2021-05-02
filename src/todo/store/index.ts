import reducer from "./reducer";
import createStore from "../../etc/createStore";

const initialState = { todos: [] };

export const { StateProvider, store } = createStore(initialState, reducer);
