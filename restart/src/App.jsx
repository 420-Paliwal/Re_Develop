const { useState } = require("react");

export function App() {
  let [count, setCount] = useState(0);

  function increse_count(){
    setCount(count + 1)
  }
  function decrese_count(){
    if (prev > 0){
      setCount(prev => prev - 1)
    }
  }
  return (<>
    <div>
      <button onClick={decrese_count}>-</button>
      <h1>{count}</h1>
      <button onClick={increse_count}>+</button>
    </div>
  </>)
}