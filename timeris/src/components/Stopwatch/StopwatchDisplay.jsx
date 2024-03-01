/* eslint-disable react/prop-types */
// &nbsp; - a non-breaking space is a space that will not break into a new line.

export default function StopwatchDisplay(props) {
  const h = () => {
    if (props.time.h === 0) return "";
    else
      return (
        <span>
          {props.time.h >= 10 ? props.time.h : "0" + props.time.h + "h"}
        </span>
      );
  };
  return (
    <div className="m-3">
      {h()}&nbsp;:&nbsp;
      <span>
        {props.time.m >= 10 ? props.time.m : "0" + props.time.m + "m"}
      </span>
      &nbsp;:&nbsp;
      <span>
        {props.time.s >= 10 ? props.time.s : "0" + props.time.s + "s"}
      </span>
      &nbsp;:&nbsp;
      <span>
        {props.time.ms >= 10 ? props.time.ms : "0" + props.time.ms + "ms"}
      </span>
      &nbsp;:&nbsp;
    </div>
  );
}
