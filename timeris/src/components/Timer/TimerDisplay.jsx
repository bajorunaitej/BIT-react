/* eslint-disable react/prop-types */
export default function TimerDisplay({
  miliSec,
  seconds,
  minutes,
  hours,
  changeHours,
  changeMinutes,
  changeSeconds,
}) {
  return (
    <div className="flex m-3 gap-2">
      <div className="flex gap-1">
        {" "}
        <label>h: </label>
        <input
          value={hours}
          min={0}
          onChange={changeHours}
          className="w-[25px] bg-yellow-300 rounded hover:bg-yellow-400 text-center outline-orange-400 "
        />
      </div>
      <div className="flex gap-1">
        {" "}
        <label>m: </label>
        <input
          value={minutes}
          min={0}
          max={59}
          onChange={changeMinutes}
          className="w-[25px] bg-yellow-300 rounded hover:bg-yellow-400 text-center outline-orange-400"
        />
      </div>
      <div className="flex gap-1">
        {" "}
        <label>s: </label>
        <input
          value={seconds}
          min={0}
          max={59}
          onChange={changeSeconds}
          className="w-[25px] bg-yellow-300 rounded hover:bg-yellow-400 text-center outline-orange-400"
        />
      </div>
      <div className="flex gap-1">
        {" "}
        <label>ms: </label>
        <input
          value={miliSec}
          className="w-[25px] bg-yellow-300 rounded hover:bg-yellow-400 text-center outline-orange-400"
        />
      </div>
    </div>
  );
}
