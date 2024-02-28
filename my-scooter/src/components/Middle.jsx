import { useEffect, useState, useMemo } from "react";
import { FaPencil } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";

function Status({ status }) {
  return (
    <div
      className="w-[20px] h-[20px] rounded-full inline-block"
      style={{ background: status ? "red" : "lime" }}
    ></div>
  );
}

// eslint-disable-next-line react/prop-types
function Scooter({ scooter, onDelete }) {
  const handleDelete = () => {
    onDelete(scooter.id);
  };
  return (
    <div
      key={scooter.id}
      className="bg-white rounded p-4 flex flex-wrap justify-between gap-x-14 gap-y-8"
    >
      <div>
        <h3 className="font-bold">{scooter.title}</h3>
        <div className="">Rida {scooter.ride}km</div>
      </div>
      <div>
        <h3 className="font-bold">Valst. Nr.</h3>
        <div>{scooter.registrationCode}</div>
      </div>
      <div>
        <h3 className="font-bold">Kaina/val</h3>
        <div>{scooter.hourlyPrice}€</div>
      </div>
      <div>
        <h3 className="font-bold">Paskutinio naudojimo data</h3>
        <div>
          {scooter.localStorage === 1
            ? "niekada nepanaudotas"
            : new Date(scooter.lastUseTime).toLocaleDateString("lt")}
        </div>
      </div>
      <div>
        <h3 className="font-bold">Statusas</h3>
        <div>
          <Status status={scooter.isBusy} />{" "}
          {scooter.isBusy ? "(Užimtas)" : "(Laisvas)"}
        </div>
      </div>

      <div className="flex gap-4 text-xl h-full items-center">
        <FaPencil className="text-darkgray-700 hover:text-darkgray-900 cursor-pointer" />
        <FaTrashAlt
          className="text-red-700 hover:text-red-900 cursor-pointer"
          onClick={handleDelete}
        />
      </div>
      <div></div>
    </div>
  );
}

//Kai pasikeičia scooter'io reikšmė/ atsiranda nauja reikšmė - iškviečiamas useEffect
export default function Middle({ newScooter }) {
  const [scooter, setScooter] = useState(getAllScooters);
  const [showFreeScooters, setShowFreeScooters] = useState(null);

  useEffect(() => {
    console.log("Komponentas užsimontavo arba pasikeitė newScooter reikšmė");
    if (newScooter === null) return;
    if (newScooter) {
      const newId = +localStorage.getItem("currentId");
      if (!newId) {
        localStorage.setItem("currentId", "1");
      }
      const newScooterAddition = {
        ...newScooter,
        id: newId || 1,
        lastUseTime: 1,
        isBusy: false,
      };
      setScooter([...scooter, newScooterAddition]);
      const nextId = newId + 1 === 1 ? 2 : nextId + 1;
      localStorage.setItem("currentId", nextId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newScooter]);

  useEffect(() => {
    localStorage.setItem("scooters", JSON.stringify(scooter));
  }, [scooter]);

  function getAllScooters() {
    const data = JSON.parse(localStorage.getItem("scooters")) || [];
    if (data.length === 0) localStorage.setItem("scooters", "[]");
    return data;
  }

  const filteredScooters = useMemo(
    () =>
      scooter.filter((val) => {
        console.log("Filtruoju");
        if (showFreeScooters === null) {
          return true;
        } else if (showFreeScooters) {
          return !val.isBusy;
        } else {
          return val.isBusy;
        }
      }),
    [showFreeScooters, scooter]
  );

  // laisvi => uzimti => visi =>laisvi...
  // function getColor() {
  // 	return showFreeScooters
  // 		? "red"
  // 		: showFreeScooters === false
  // 		? "blue"
  // 		: "green";
  // }
  // function getButtonText() {
  // 	return showFreeScooters
  // 		? "Rodyti užimtus"
  // 		: showFreeScooters === false
  // 		? "Rodyti visus"
  // 		: "Rodyti laisvus";
  // }

  const handleDeleteScooter = (id) => {
    const updatedScooters = scooter.filter((scooteris) => scooteris.id !== id);
    setScooter(updatedScooters);
    localStorage.setItem("scooters", JSON.stringify(updatedScooters));
  };

  return (
    <div className="container mx-auto bg-violet-100 min-h-[400px] flex flex-col gap-4 p-4">
      <div className="flex justify-center mt-28 gap-4">
        {/* <Button
					text={getButtonText()}
					color={getColor()}
					onClick={() => {
						setShowFreeScooters((prevValue) => {
							return prevValue ? false : prevValue === false ? null : true;
						});
					}}
				/> */}
        <select
          onChange={(e) => {
            if (e.target.value === "null") setShowFreeScooters(null);
            else if (e.target.value === "true") {
              setShowFreeScooters(true);
            } else {
              setShowFreeScooters(false);
            }
          }}
        >
          <option value="null">Rodyti visus</option>
          <option value="true">Rodyti laisvus</option>
          <option value="false">Rodyti užimtus</option>
        </select>
      </div>
      {filteredScooters.map((s) => (
        <Scooter key={s.id} scooter={s} onDelete={handleDeleteScooter} />
      ))}
    </div>
  );
}
