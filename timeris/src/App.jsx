import "./App.css";
import { CgSandClock } from "react-icons/cg";
import { TiStopwatch } from "react-icons/ti";
import Timer from "./components/Timer";
import Stopwatch from "./components/Stopwatch";

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
