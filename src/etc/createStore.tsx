import React, { createContext, useReducer } from "react";

type thunkAction<IAction> = (
  dispatch: React.Dispatch<IAction>
) => Promise<void>;

interface IStore<IState, IAction> {
  state: IState;
  dispatch: React.Dispatch<IAction | thunkAction<IAction>>;
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

    const customReducer = (state: IState, action: IAction): IState => {
      const newState = reducer(state, action);
      window.localStorage.setItem(name + (id || ""), JSON.stringify(newState));
      return newState;
    };

    const [state, dispatch] = useReducer(
      customReducer,
      persistedState ? JSON.parse(persistedState) : initialState
    );

    const customDispatch = (action: IAction | thunkAction<IAction>) => {
      if (typeof action === "function") {
        (action as thunkAction<IAction>)(customDispatch);
      } else {
        dispatch(action);
      }
    };

    return (
      <Provider value={{ state, dispatch: customDispatch }}>
        {children}
      </Provider>
    );
  };

  return { store, StateProvider };
};

export default createStore;
