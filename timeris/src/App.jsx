import "./App.css";
import { CgSandClock } from "react-icons/cg";
import { TiStopwatch } from "react-icons/ti";
import Timer from "./components/Timer";
import Stopwatch from "./components/Stopwatch";
import { useState } from "react";

function App() {
  const [active, setActive] = useState("activeTimer");

  const handleActive = (activeClock) => {
    setActive(activeClock);
  };

  return (
    <div className="container mx-auto flex flex-col justify-center items-center bg-[#4f1a586e] min-h-[200px] p-4 min-w-[350px]">
      <div className="flex justify-between items-center w-[60%] gap-5">
        <button
          onClick={() => handleActive("activeTimer")}
          className={`flex justify-evenly items-center p-2 gap-2 cursor-pointer border border-zinc-500 rounded ${
            active === "activeTimer" ? "bg-slate-500" : ""
          }`}
        >
          <span>
            <CgSandClock />
          </span>
          TIMER
        </button>
        <button
          onClick={() => handleActive("activeStopwatch")}
          className={`flex justify-evenly items-center p-2 gap-2 cursor-pointer border border-zinc-500 rounded ${
            active === "activeStopwatch" ? "bg-slate-500" : ""
          }`}
        >
          <span>
            <TiStopwatch />
          </span>
          STOPWATCH
        </button>
      </div>
      <div>
        <div className={`${active === "activeTimer" ? "block" : "hidden"} p-1`}>
          <Timer />
        </div>
        <div
          className={`${active === "activeStopwatch" ? "block" : "hidden"} p-1`}
        >
          <Stopwatch />
        </div>
      </div>
    </div>
  );
}

export default App;
