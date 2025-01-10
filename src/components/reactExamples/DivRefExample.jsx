import React, { useRef } from "react";

import "./DivRefExample.css"

export default function DivRefExample() {
  const redBox = useRef();

  function handleClick() {
    console.log(redBox);
    redBox.current.className = redBox.current.className + " spin";
    redBox.current.textContent = "Spinning";

    setTimeout(() => {
      redBox.current.textContent = "Stable";
      redBox.current.className = "box red";
    }, 5500);
  }

  return (
    <>
      <div>
        <button onClick={handleClick}>Red</button>
      </div>
      <div>
        <div ref={redBox} className="box red">
          Stable
        </div>
      </div>
    </>
  );
}
