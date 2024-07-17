import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>This is a test file</h1>

      <p>Count: {count}</p>
      <button
        onClick={() => {
          setCount((c) => c + 1);
        }}
      >
        Increase
      </button>
    </>
  );
}

export default App;
