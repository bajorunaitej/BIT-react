export default function Button({
  text = "Mygtukas",
  color = "pink",
  textColor = "white",
  hoverColor = "blue",
}) {
  return (
    <button
      className="px-6 py-1 rounded-md bg-opacity-85 hover:bg-opacity-100 break-keep"
      style={{ color: textColor, background: color }}
    >
      {text}
    </button>
  );
}
