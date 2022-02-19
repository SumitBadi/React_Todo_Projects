import React, { useEffect, useReducer, useState } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import './index.css'

const reducer = (state, action) =>{
if (action.type === 'Incr'){
  state +=  1;
}
if (state > 0 && action.type === 'Dncr'){
  state = state - 1;
}
return state;
}

const App = () => {
    const [num, setNum] = useState(0);

   useEffect(() => {
      document.title = `My number is ${num}`
   });
  
   const [state, dispatch] = useReducer(reducer, 0);

  return (
    <>
        <div className='container-fluid'>
            <div className='col-sm-10 mx-auto text-center p-5'>

         <h6>useEffect and useState</h6>  
        <h1> {num}</h1>
        <button className='btn btn-primary px-5' onClick={() => {setNum(num+1)}}>➕</button>
        <button className='btn btn-danger px-5' onClick={() => { num > 0 ? setNum(num-1) : setNum(0)  } }>➖</button>
        <p>Check Tab bar </p>
        <hr />
        <br />
        <h6>useReducer</h6>
        <h1> {state}</h1>
        <button className='btn btn-primary px-5' onClick={() => dispatch({type: 'Incr'}) } >➕</button>
        <button className='btn btn-danger px-5' onClick={() =>  dispatch({type: 'Dncr'}) }>➖</button>
        </div>
        </div>
    </>
  )
}

export default App