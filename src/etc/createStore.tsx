import React, { createContext, useReducer } from "react";

interface IStore<IState, IAction> {
  state: IState;
  dispatch: React.Dispatch<IAction>;
}

const createStore = <IState, IAction>(
  name: string,
  initialState: IState,
  reducer: (state: IState, action: IAction) => IState
) => {
  const store = createContext<IStore<IState, IAction>>({
    state: initialState,
    dispatch: () => {},
  });
  const { Provider } = store;

  const StateProvider = ({
    children,
    id,
  }: {
    children: React.ReactNode;
    id?: string;
  }) => {
    // Recupera o estado do local storage
    const persistedState = window.localStorage.getItem(name + (id || ""));

    const persistedReducer = (state: IState, action: IAction) => {
      const newState = reducer(state, action);
      window.localStorage.setItem(name + (id || ""), JSON.stringify(newState));
      return newState;
    };

    const [state, dispatch] = useReducer(
      persistedReducer,
      persistedState ? JSON.parse(persistedState) : initialState
    );
    return <Provider value={{ state, dispatch }}>{children}</Provider>;
  };

  return { store, StateProvider };
};

export default createStore;