import "./App.css";
import { CgSandClock } from "react-icons/cg";
import { TiStopwatch } from "react-icons/ti";
import Timer from "./components/Timer";
import Stopwatch from "./components/Stopwatch";

function App() {
  return (
    <>
      <div className="container mx-auto bg-yellow-300 min-h-[200px] p-4 mt-4 flex justify-evenly">
        <div>
          <p className="flex items-center gap-2 cursor-pointer border border-zinc-500 p-2">
            <span>
              <CgSandClock />
            </span>
            TIMER
          </p>
          <Timer />
        </div>
        <div>
          <p className="flex items-center gap-2 cursor-pointer border border-zinc-500 p-2">
            <span>
              <TiStopwatch />
            </span>
            STOPWATCH
          </p>
          <Stopwatch />
        </div>
      </div>
    </>
  );
}

export default App;
