import React, { createContext, useReducer, useContext } from 'react';
import { isType, variableRelation, compose, } from './util';

const initialState = {};
let detailCtrl;
let types = new Set();
let repos = {};
function StateWrapper({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function reducer(state, action) {
    let { type, value } = action;
    let obj = {};

    types.add(type);

    if (!value) {
      repos[type] = createContext();
      return state;
    }

    if (variableRelation(state[type], value) === 'same') throw new Error('the state shouldn\'t appear in dispatch.');
    if (variableRelation(state[type], value) !== 'different') return state;

    obj[type] = isType(state[type]) && isType(value) ?
      { ...state[type], ...value } :
      value;

    return { ...state, ...obj };
  };

  detailCtrl = type => {
    if (!types.has(type)) dispatch({ type });

    const store = repos[type];
    return [
      useContext(store),
      value => dispatch({ type, value }),
    ];
  }

  function renderTmp([type, store]) {
    const { Provider } = store;

    return children => <Provider value={state[type]}>{children}</Provider>
  }

  if (Object.keys(repos).length > 0) return compose(
    ...Object.entries(repos).map(repo => renderTmp(repo)),
    children);

  return children;
}

export { types, StateWrapper, detailCtrl };