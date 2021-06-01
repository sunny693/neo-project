import React, { createContext, useReducer, useContext } from 'react';
import { isType, variableRelation, } from './util';

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
    let obj = {};

    if (variableRelation(state[type], value) === 'same') throw new Error('the state shouldn\'t appear in dispatch.');
    if (variableRelation(state[type], value) !== 'different') return state;

    obj[type] = isType(state[type]) && isType(value) ?
      { ...state[type], ...value } :
      value;

    return { ...state, ...obj };
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  detailCtrl = type => [
    useContext(store)[type],
    value => dispatch({ type, value }),
  ];

  getGlobalStore = () => useContext(store);

  return <Provider value={state}>{children}</Provider>;
};

export { getGlobalStore, types, StateWrapper, detailCtrl };