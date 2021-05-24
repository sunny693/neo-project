import React, { useState,useContext } from 'react'
// import Test from './components/test';
import './App.css'

const initStoreObj = {
  vals: { A: 0 },
  setVal: function (newVals) {
    console.log(newVals);
    this.vals = newVals;
  }
};

const StoreContext = React.createContext();

function Grandpa() {
  const [storeObj,setStoreObj] = useState(initStoreObj);
  
  return (
    <StoreContext.Provider value={storeObj}>
      <StoreContext.Consumer>
        {context => <>
          <div className="App">
            <Father1 />
            <Father2 />
          </div>
        </>}
      </StoreContext.Consumer>
    </StoreContext.Provider>
  )
}

export default Grandpa;

function Father1(props) {
  let store = useContext(StoreContext);
  store.setVal({ A: 2 });
  return <div onClick={() => {
    console.log('click');
    store.setVal({ A: 3 })
  }}>
    111
    <Child1 />
  </div>;
}

function Father2(props) {
  let store = useContext(StoreContext);

  return <div>
    {store.vals.A}
    <Child2 />
  </div>;
}

function Child1(props) {
  let store = useContext(StoreContext);
  console.log(store);
  return <div>
    {store.vals.A}
  </div>
}

function Child2(props) {
  let { vals } = useContext(StoreContext);

  return <div>
    {vals.A}
  </div>
}
