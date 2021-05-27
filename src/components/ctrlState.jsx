import React, { createContext, useReducer, useContext } from 'react';
import { isObject, assignDeep } from './util';

const initialState = {};
const store = createContext(initialState);
const { Provider } = store;

let types = new Set();
let detailCtrl;
let getGlobalStore;

const StateWrapper = ({ children }) => {
  const reducer = (state, action) => {
    let { type, value } = action;
    types.add(type);

    const obj = {};

    obj[type] = isObject(state[type]) && isObject(value) ?
      { ...state[type], ...value } :
      value;

    return assignDeep(state, obj);
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const ProviderVal = { state, dispatch };

  detailCtrl = type => {
    return {
      dispatch: value => dispatch({ type, value }),
      state: useContext(store).state[type],
    }
  }

  getGlobalStore = () => useContext(store).state;

  return <Provider value={ProviderVal}>{children}</Provider>;
};

export { getGlobalStore, types, StateWrapper, detailCtrl };