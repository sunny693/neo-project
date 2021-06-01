import React, { createContext, useReducer, useContext } from 'react';
import { isType, variableRelation, } from './util';

let types = new Set();
let detailCtrl;

const StateWrapper = ({ children }) => {
  const store = createContext();
  const { Provider } = store;

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

  const [state, dispatch] = useReducer(reducer, {});

  detailCtrl = type => [
    useContext(store)[type],
    value => dispatch({ type, value }),
  ];

  return <Provider value={state}>{children}</Provider>;
};

export {types, StateWrapper, detailCtrl };