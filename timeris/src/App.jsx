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
    <div className="container mx-auto flex flex-col items-center bg-[#202124] h-[300px] w-[500px] mt-20 text-white">
      <div className="flex justify-evenly items-center w-[100%]">
        <button
          onClick={() => handleActive("activeTimer")}
          className={`flex justify-center items-center p-2 cursor-pointer border-b border-zinc-500 rounded w-[100%] ${
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
          className={`flex justify-center items-center p-2 cursor-pointer border-b border-zinc-500 rounded w-[100%] ${
            active === "activeStopwatch" ? "bg-slate-500" : ""
          }`}
        >
          <span>
            <TiStopwatch />
          </span>
          STOPWATCH
        </button>
      </div>

      <div className="my-[30px]">
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
