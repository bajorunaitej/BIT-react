/* eslint-disable react/prop-types */
export default function StopwatchBtn(props) {
  return (
    <div>
      {props.status === 0 ? (
        <div className="flex gap-4 mb-[10px] mt-[50px] items-start">
          {" "}
          <button
            className="bg-[#fff] p-2 rounded text-black hover:text-white hover:bg-[#076d07] transition duration-200 ease-in-out"
            onClick={props.start}
          >
            Start
          </button>
        </div>
      ) : (
        ""
      )}

      {props.status === 1 ? (
        <div className="flex gap-4 mb-[10px] mt-[50px] items-start">
          <button
            className="bg-[#fff] p-2 rounded text-black hover:text-white hover:bg-[#7e3131] transition duration-200 ease-in-out"
            onClick={props.stop}
          >
            Stop
          </button>
          <button
            className="bg-[#fff] p-2 rounded text-black hover:text-white hover:bg-[#6b3ea7] transition duration-200 ease-in-out"
            onClick={props.reset}
          >
            Reset
          </button>
        </div>
      ) : (
        ""
      )}

      {props.status === 2 ? (
        <div className="flex gap-4 mb-[10px] mt-[50px] items-start">
          <button
            className="bg-[#fff] p-2 rounded text-black hover:text-white hover:bg-[#076d07] transition duration-200 ease-in-out"
            onClick={props.resume}
          >
            Resume
          </button>
          <button
            className="bg-[#fff] p-2 rounded text-black hover:text-white hover:bg-[#6b3ea7] transition duration-200 ease-in-out"
            onClick={props.reset}
          >
            Reset
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
