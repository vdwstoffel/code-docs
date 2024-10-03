import React, { useState, useMemo } from "react";
import BrowserWindow from "../BrowserWindow/BrowserWindow";

export default function UseMEmoExmaple() {
  const [times, setTimes] = useState(0);
  const [force, setForce] = useState(false);

  const date = useMemo(() => {
    new Date().toLocaleTimeString();
  }, [force]);

  return (
    <BrowserWindow>
      <p>Times Clicked: {times}</p>
      <button onClick={() => setTimes((t) => t + 1)}>Increase</button>
      <p>Without Memo update: {new Date().toLocaleTimeString()}</p>
      <p>With Memo Update: {date}</p>
      <button onClick={() => setForce((f) => !f)}>Force Rerender</button>
    </BrowserWindow>
  );
}
