import React from 'react'
// import Test from './components/test';
import {getGlobalStore,StateWrapper,types,detailCtrl} from './components/ctrlState';
import './App.css'

function Grandpa() {;

  return <StateWrapper>
    <Father1/>
    <Father2/>
  </StateWrapper>
}

export default Grandpa;

function Father1(props) {
  const {state,dispatch} = detailCtrl('SIGN');

  return <div onClick={() => {
    dispatch(111);
  }}>
    {state}
    <Child1 />
    因为有你
  </div>;
}

function Father2(props) {
  const {state,dispatch} = detailCtrl('SIGN2');
  const aa = getGlobalStore();
  console.log(aa);
  return <div onClick={() => {
    dispatch(2222);
  }}>
    {state}
    {aa["SIGN2"]}
    <Child1 />
    因为有你2
  </div>;
}
function Child1(props) {
  const {state} = detailCtrl('SIGN');
  return <div>
    {state }
  </div>
}

function Child2(props) {
  const { storeObj } = useContext(StoreContext);

  return <div>
    {storeObj.A}
  </div>
}
