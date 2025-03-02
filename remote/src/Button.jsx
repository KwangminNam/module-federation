import React, { useState } from 'react';
import './Button.css';

const Button = () => {
  const [count, setCount] = useState(0);
  return <button className="fency-button" onClick={() => setCount((prev) => prev + 1)}>Click me {count}</button>;
};

export default Button;