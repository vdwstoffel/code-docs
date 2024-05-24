import React, { useRef } from "react";

export default function UpdateDomElements() {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.value = "Hello";
  };

  const reset = () => {
    inputRef.current.value = ""
  }

  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={handleClick}>Update Input</button>
      <button onClick={reset}>Reset</button>
    </>
  );
}
