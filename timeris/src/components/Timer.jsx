import TimerDisplay from "./Timer/TimerDisplay";
import TimerBtn from "./Timer/TimerBtn";
import { useState, useEffect } from "react";

export default function Timer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [miliSec, setMiliSec] = useState(0);
  const [isRunning, setIsRunning] = useState(null);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        if (miliSec > 0) {
          setMiliSec((miliSec) => {
            miliSec - 1;
          });
        } else if (seconds > 0) {
          setSeconds((seconds) => seconds - 1);
          setMiliSec(99);
        } else if (minutes > 0) {
          setMinutes((minutes) => minutes - 1);
          setSeconds(59);
          setMiliSec(99);
        } else if (hours > 0) {
          setHours((hours) => hours - 1);
          setMinutes(59);
          setSeconds(59);
          setMiliSec(99);
        }
      }, 10);
    }
    return () => clearInterval(interval);
  }, [miliSec, seconds, minutes, hours, isRunning]);

  const changeHours = (e) => {
    setHours(e.target.value);
  };

  const changeMinutes = (e) => {
    setMinutes(e.target.value);
  };

  const changeSeconds = (e) => {
    setSeconds(e.target.value);
  };

  return (
    <div className="flex flex-col min-w-[300px] items-center m-3">
      <TimerDisplay
        miliSec={miliSec}
        seconds={seconds}
        minutes={minutes}
        hours={hours}
        changeHours={changeHours}
        changeMinutes={changeMinutes}
        changeSeconds={changeSeconds}
      />
      <TimerBtn isRunning={isRunning} />
    </div>
  );
}
