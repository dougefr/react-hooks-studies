import React, { createContext, useReducer } from "react";

type thunkAction<IAction> = (
  dispatch: React.Dispatch<IAction>
) => Promise<void>;

type dispatchParam<IAction> = IAction | thunkAction<IAction>;

interface IStore<IState, IAction> {
  state: IState;
  dispatch: React.Dispatch<dispatchParam<IAction>>;
}

interface IStateProviderProps {
  name: string;
  children: React.ReactNode;
}

const createStore = <IState, IAction>(
  initialState: IState,
  reducer: (state: IState, action: IAction) => IState
) => {
  const store = createContext<IStore<IState, IAction>>({
    state: initialState,
    dispatch: () => {},
  });
  const { Provider } = store;

  const StateProvider = ({ name, children }: IStateProviderProps) => {
    // Recupera o estado do local storage
    const persistedState = window.localStorage.getItem(name);

    const customReducer = (state: IState, action: IAction): IState => {
      const newState = reducer(state, action);
      window.localStorage.setItem(name, JSON.stringify(newState));
      return newState;
    };

    const [state, dispatch] = useReducer(
      customReducer,
      persistedState ? JSON.parse(persistedState) : initialState
    );

    const customDispatch = (action: dispatchParam<IAction>) => {
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
