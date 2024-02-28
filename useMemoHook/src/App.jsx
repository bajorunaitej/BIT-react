import { useState, useMemo } from "react";

export default function App() {
  const [count, setCount] = useState("");
  const [arr, setArr] = useState(() => {
    return new Array(20000000).fill(0).map((val, index) => index + 1);
  });

  const filteredArray = useMemo(
    () =>
      arr.filter((val) => {
        val % 2 === 0;
      }),
    [arr]
  );

  return (
    <div>
      <p>count: {count}</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Pridėti
      </button>
    </div>
  );
}
