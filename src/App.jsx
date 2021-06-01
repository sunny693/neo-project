import React, { useContext, useMemo, useState } from 'react'
// import Test from './components/test';
import {StateWrapper,detailCtrl} from './components/multiContext';
import './App.css'

function Grandpa() {;
  const [k,setK] = useState(1);
  return <StateWrapper>
    <Father1/>
    { k !== 1 &&  <Father2/>}
    <Father3 k={k} setK={setK}/>
  </StateWrapper>
}

export default Grandpa;

function Father1(props) {
  const  [state,dispatch]= detailCtrl('SIGN');

  return <div onClick={() => {
    dispatch({
      a: state?.a ? state.a+1 : 1
    });
  }}>
    {state?.a}
    <Child1 />
    因为有你
  </div>;
}

function Father2(props) {
  const [state,dispatch] = detailCtrl('SIGN2');
  
  return <><div onClick={() => {
    dispatch({b:444});
  }}>
    {state?.b}
    {/* <Child1 /> */}
    因为有你2
  </div>
  <div onClick={()=>{}}>
      删除
    </div>
  </>
  ;
}
function Child1(props) {
  const [state] = detailCtrl('SIGN');
  return <div>
    {state?.a }
  </div>
}

function Father3({k,setK}) {
  return <div onClick={()=>setK(`aa${k}`)}>
    dwdwwdwdwdwdwd{k}
  </div>
}
