import React, { useState } from "react";

function useToggler(value = false) {
  const [isOn, setIsOn] = useState(value);

  const toggle = () => {
    setIsOn(!isOn);
  };

  return [isOn, toggle]; // return the state and the toggle function
}

export default function App() {
  const [btnOne, setBtnOne] = useToggler(false); // value , toggle function
  const [btnTwo, setBtnTwo] = useToggler(false); // value , toggle function

  return (
    <div>
      <h onClick={setBtnOne}>Button 1 is {btnOne ? "On" : "Off"}</h>
      <br />
      <h onClick={setBtnTwo}>Button 2 is {btnTwo ? "On" : "Off"}</h>
    </div>
  );
}
