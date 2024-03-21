/* eslint-disable react/prop-types */
import { useState } from "react";
import CountContext from "./CountContext";
import { useContext } from "react";

function Component1({ add }) {
  const countCtx = useContext(CountContext);
  return (
    <button
      onClick={() => {
        add(2);
      }}
    >
      Atnaujinti state{countCtx}
    </button>
  );
}

function ComponentCountShow({ skaicius }) {
  return <p>Skaičius yra: {skaicius}</p>;
}

function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>laabas</h1>
      <CountContext.Provider value={count}>
        <Component1 add={(newNumber) => setCount(count + newNumber)} />
        <ComponentCountShow skaicius={count} />
      </CountContext.Provider>
    </div>
  );
}

export default App;
