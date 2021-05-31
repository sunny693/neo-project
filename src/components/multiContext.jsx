import React, { createContext, useReducer, useContext } from 'react';
import { isType, variableRelation, } from './util';

function compose(...rest) {
  if (rest.length === 0) return;
  if (rest.length === 1) return rest[0]();

  const params = rest.pop();
  const funcs = rest;

  return funcs.reduce((acc, func) => func(acc), params);
}

const initialState = {};
let detailCtrl;
let types = new Set();
let repos = {};
function StateWrapper({ children }){
  const [state, dispatch] = useReducer(reducer, initialState);

  function reducer(state, action) {
    let { type, value } = action;
    let obj = {};

    types.add(type);
    obj[type] = createContext();

    if(!value) {
      repos[type]=createContext();
      return Object.assign({},state);
    }
    
    if(variableRelation(state[type],value) === 'same') throw new Error('the state shouldn\'t appear in dispatch.');
    if(variableRelation(state[type],value) !== 'different') return state;

    obj[type] = isType(state[type]) && isType(value) ?
      { ...state[type], ...value } :
      value;

    return {...state,...obj};
  };

  detailCtrl = type => {
    if(!types.has(type)) dispatch({type});

    const store = repos[type];
    // console.log(state[type]);
    return [
      state,
      value => dispatch({ type, value }),
    ];
  }

  function renderTmp([type,store]){
    const { Provider } = store;
    
    return children => <Provider value={ state[type] }>{children}</Provider>
  }
  console.log(repos);
  if(repos["SIGN"]) console.log(useContext(repos["SIGN"]));
  
  if(Object.keys(repos).length > 0) return compose(
    ...Object.entries(repos).map(repo => renderTmp(repo)),
    children); 

  return children;
}

export { types, StateWrapper, detailCtrl };



