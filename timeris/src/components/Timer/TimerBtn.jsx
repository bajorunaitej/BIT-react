export default function TimerBtn({
  isRunning,
  startTimer,
  stopTimer,
  pauseTimer,
}) {
  return (
    <div>
      {!isRunning && (
        <button
          onClick={startTimer}
          className="bg-[#fff] p-2 rounded hover:text-white hover:bg-[#076d07] transition duration-200 ease-in-out"
        >
          Start
        </button>
      )}
      {isRunning && (
        <button
          onClick={stopTimer}
          className="bg-[#fff] p-2 rounded hover:text-white hover:bg-[#7e3131] transition duration-200 ease-in-out"
        >
          Stop
        </button>
      )}
      {""}
      <button
        onClick={pauseTimer}
        className="bg-[#fff] p-2 rounded hover:text-white hover:bg-[#6b3ea7] transition duration-200 ease-in-out"
      >
        Pause
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
