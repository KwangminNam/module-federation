import React, { useState } from 'react';
import './Button.css';
import useCount from './store';

const Button = () => {
  const [count, setCount] = useCount();
  return <button className="fency-button" onClick={() => setCount((prev) => prev + 1)}>Click me {count}</button>;
};

export default Button;