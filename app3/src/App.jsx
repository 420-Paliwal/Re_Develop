import { useState } from "react"

function App(){
  const [count, setcount] = useState(0)
  const decrease = () => {
    if(count >0){
      setcount(prev=> prev - 1)
    } 

  }
  const increase = () => setcount(prev=> prev + 1)
  return (
    <>
    <button onClick={decrease} >-</button>
    <h1>{count}</h1>
    <button onClick={increase} >+</button>
    </>
  )
}

export default App;