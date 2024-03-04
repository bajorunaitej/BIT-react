/* eslint-disable react/prop-types */
export default function TimerBtn({
  isRunning,
  startTimer,
  resetTimer,
  pauseTimer,
}) {
  return (
    <div className="flex gap-4 mb-[10px] mt-[50px] items-start ">
      {!isRunning && (
        <button
          onClick={startTimer}
          className="bg-[#fff] p-2 rounded text-black hover:text-white hover:bg-[#076d07] transition duration-200 ease-in-out"
        >
          Start
        </button>
      )}
      {isRunning && (
        <button
          onClick={pauseTimer}
          className="bg-[#fff] p-2 rounded text-black hover:text-white hover:bg-[#6b3ea7] transition duration-200 ease-in-out"
        >
          Pause
        </button>
      )}
      {""}
      <button
        onClick={resetTimer}
        className="bg-[#fff] p-2 rounded text-black hover:text-white hover:bg-[#7e3131] transition duration-200 ease-in-out"
      >
        Reset
      </button>
    </div>
  );
}

{
  /* <div className="flex gap-4">
<button
    className="bg-[#fff] p-2 rounded hover:text-white hover:bg-[#076d07] transition duration-200 ease-in-out"
    onClick={isRunning}
  >
    Start
  </button>
  <button
    className="bg-[#fff] p-2 rounded hover:text-white hover:bg-[#7e3131] transition duration-200 ease-in-out"
    onClick={isRunning}
  >
    Stop
  </button>
  <button
    className="bg-[#fff] p-2 rounded hover:text-white hover:bg-[#6b3ea7] transition duration-200 ease-in-out"
    onClick={isRunning}
  >
    Reset
  </button>
</div> */
}
