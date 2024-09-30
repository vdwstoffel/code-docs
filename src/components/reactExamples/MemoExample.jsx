import React, { useState, memo } from "react";
import BrowserWindow from "../BrowserWindow/BrowserWindow";

export default function MemoExample() {
  const [times, setTimes] = useState(0);

  return (
    <BrowserWindow>
      <p>Times Clicked: {times}</p>
      <button onClick={() => setTimes((t) => t + 1)}>Increase</button>
      <p>Without Memo update: {new Date().toLocaleTimeString()}</p>
      <Optimized />
    </BrowserWindow>
  );
}

const Optimized = memo(function Optimized() {
  return <p>With Memo Update: {new Date().toLocaleTimeString()}</p>;
});
