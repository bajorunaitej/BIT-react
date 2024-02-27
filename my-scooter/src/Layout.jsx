import { useState } from "react";
import Bottom from "./components/Bottom";
import Middle from "./components/Middle";
import Top from "./components/Top";

export default function Layout() {
  const [newScooter, setNewScooter] = useState(null);
  return (
    <div>
      <Top
        notifyScooterAddition={(scooter) => {
          setNewScooter(scooter);
        }}
      />
      <Middle newScooter={newScooter} />
      <Bottom />
    </div>
  );
}
