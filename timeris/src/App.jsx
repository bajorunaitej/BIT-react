import "./App.css";
import { CgSandClock } from "react-icons/cg";
import { TiStopwatch } from "react-icons/ti";
import Timer from "./components/Timer";
import Stopwatch from "./components/Stopwatch";
import { useState } from "react";

function App() {
  const [active, setActive] = useState("active1");

  const handleActive = (activeClock) => {
    setActive(activeClock);
  };

  return (
    <div className="container mx-auto flex flex-col justify-top items-center bg-[#4f1a586e] min-h-[200px] p-4 min-w-[350px]">
      <div className="flex justify-between items-center w-[60%] gap-5">
        <button
          onClick={() => handleActive("active1")}
          className={`flex justify-evenly items-center p-2 gap-2 cursor-pointer border border-zinc-500 rounded ${
            active === "active1" ? "bg-slate-500" : ""
          }`}
        >
          <span>
            <CgSandClock />
          </span>
          TIMER
        </button>
        <button
          onClick={() => handleActive("active2")}
          className={`flex justify-evenly items-center p-2 gap-2 cursor-pointer border border-zinc-500 rounded ${
            active === "active2" ? "bg-slate-500" : ""
          }`}
        >
          <span>
            <TiStopwatch />
          </span>
          STOPWATCH
        </button>
      </div>
      <div>
        <div className={`p-2 ${active === "active1" ? "block" : "hidden"}`}>
          <Timer />
        </div>
        <div className={`p-2 ${active === "active2" ? "block" : "hidden"}`}>
          <Stopwatch />
        </div>
      </div>
    </div>
  );
}

export default App;
