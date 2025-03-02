import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from './Button';
import useCount from './store';

function App() {
  const [count, setCount] = useCount()

  return (
    <>
      <h1>Remote App</h1>
      <Button />
      <h2>APP LOCAL Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </>
  )
}

export default App
