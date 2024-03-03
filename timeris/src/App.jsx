import "./App.css";
import { CgSandClock } from "react-icons/cg";
import { TiStopwatch } from "react-icons/ti";
import Timer from "./components/Timer";
import Stopwatch from "./components/Stopwatch";
import { useState } from "react";

function App({ displayClock }) {
  const [displayStatus, setDisplayStatus] = useState(null);

  const displayClock = () => {};
  return (
    <div className="container mx-auto flex flex-col justify-top items-center bg-[#4f1a586e] min-h-[200px] p-4 min-w-[350px]">
      <div className="flex justify-between items-center w-[60%] gap-5">
        <p
          displayClock={displayClock}
          className="flex justify-evenly items-center p-2 gap-2 cursor-pointer border border-zinc-500 rounded"
        >
          <span>
            <CgSandClock />
          </span>
          TIMER
        </p>
        <p className="flex justify-evenly items-center p-2 gap-2 cursor-pointer border border-zinc-500 rounded">
          <span>
            <TiStopwatch />
          </span>
          STOPWATCH
        </p>
      </div>
      <div>
        <Timer />
        <Stopwatch />
      </div>
    </div>
  );
}

export default App;

{
  /* <>
<div className="container  flex justify-evenly mx-auto bg-yellow-300 min-h-[200px] p-4 mt-4">
  <div className="flex flex-col items-center w-fit">
    <p className="flex items-center justify-center align-top min-w-fit w-[50%] gap-2 cursor-pointer border border-zinc-500 p-2 rounded">
      <span>
        <CgSandClock />
      </span>
      TIMER
    </p>
    <Timer />
  </div>
  <div className="flex flex-col items-center w-fit">
    <p className="flex items-center justify-center align-top min-w-fit w-[50%] gap-2 cursor-pointer border border-zinc-500 p-2 rounded">
      <span>
        <TiStopwatch />
      </span>
      STOPWATCH
    </p>
    <Stopwatch />
  </div>
</div>
</> */
}
