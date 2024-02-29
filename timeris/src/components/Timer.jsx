import TimerDisplay from "./Timer/TimerDisplay";
import TimerBtn from "./Timer/TimerBtn";

export default function Timer() {
  return (
    <div className="m-3">
      <TimerDisplay />
      <TimerBtn />
    </div>
  );
}
