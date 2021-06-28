import React, {  useState } from 'react'
import flowRegime from './components/flowRegime';
import './App.css';
const {StateWrapper,useCtrlState} = flowRegime;
function Grandpa() {;
  const [k,setK] = useState(1);
  return <StateWrapper>
    {
      forEach(1000)
    }
    { k !== 1 &&  <Father2/>}
    <Father3 k={k} setK={setK}/>
  </StateWrapper>
}

export default Grandpa;

function forEach(num){
  let arr = [];

  for(let i = 0;i< num;i++) arr.push("");

  return arr.map((Item,key) => <Father1 val={key} key={key}/>)
};

function Father1({val}) {
  const  [state,dispatch]= useCtrlState(`MULTI-SIGN-${val}`,{a:6});

  return <div onClick={() => {
    dispatch({
      a: state.a+1
    });
  }}>
    {state?.a}
    <Child1 />
    因为有你
  </div>;
}

function Father2(props) {
  const [state,dispatch] = useCtrlState('SIGN2');

  return <><div onClick={() => {
    dispatch({
      b: state?.b ? state.b+1 : 1
    });
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
  const [state] = useCtrlState('MULTI-SIGN-1');
  return <div>
    {state?.a }
  </div>
}

function Father3({k,setK}) {
  return <div onClick={()=>setK(`aa${k}`)}>
    dwdwwdwdwdwdwd{k}
  </div>
}
