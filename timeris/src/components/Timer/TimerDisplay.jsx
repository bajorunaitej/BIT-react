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
    <div className="flex m-3 gap-2 font-semibold text-[20px]">
      <div className="flex gap-1">
        {" "}
        <label>h: </label>
        <input
          value={hours}
          onChange={changeHours}
          className="w-[40px] py-1 px-2 bg-[#613b686e] rounded hover:bg-[#613b68af] text-center outline-grey-400"
        />
      </div>
      <div className="flex gap-1">
        {" "}
        <label>m: </label>
        <input
          value={minutes}
          onChange={changeMinutes}
          className="w-[40px]  py-1 px-2 bg-[#613b686e] rounded hover:bg-[#613b68af] text-center outline-grey-400"
        />
      </div>
      <div className="flex gap-1">
        {" "}
        <label>s: </label>
        <input
          value={seconds}
          onChange={changeSeconds}
          className="w-[40px]  py-1 px-2 bg-[#613b686e] rounded hover:bg-[#613b68af] text-center outline-grey-400"
        />
      </div>
      <div className="flex gap-1">
        {" "}
        <label>ms: </label>
        <input
          value={miliSec}
          className="w-[40px]  py-1 px-2 bg-[#613b686e] rounded hover:bg-[#613b68af] text-center outline-grey-400"
        />
      </div>
    </div>
  );
}
