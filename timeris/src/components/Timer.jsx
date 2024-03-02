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
          setMiliSec((prevMiliSec) => prevMiliSec - 1);
        } else if (seconds > 0) {
          setSeconds((prevSeconds) => prevSeconds - 1);
          setMiliSec(99);
        } else if (minutes > 0) {
          setMinutes((prevMinutes) => prevMinutes - 1);
          setSeconds(59);
          setMiliSec(99);
        } else if (hours > 0) {
          setHours((prevHours) => prevHours - 1);
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

  // startTimer,
  // resetTimer,
  // pauseTimer,

  //Start
  function startTimer() {
    if (hours !== 0 || minutes !== 0 || seconds !== 0 || miliSec !== 0)
      setIsRunning(true);
    else window.alert("Nustatyk laiką");
  }

  //Pause
  function pauseTimer() {
    setIsRunning(false);
  }

  //Reset
  function resetTimer() {
    setIsRunning(false);
    setMiliSec(0);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  }

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
      <TimerBtn
        isRunning={isRunning}
        startTimer={startTimer}
        pauseTimer={pauseTimer}
        resetTimer={resetTimer}
      />
    </div>
  );
}
