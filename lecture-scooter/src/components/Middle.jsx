import { useEffect, useState } from "react";
// import { FaPencilAlt } from "react-icons/fa";
// import { FaTrashCan } from "react-icons/fa6";

function Status({ status }) {
  return (
    <div
      className="w-[20px] h-[20px] rounded-full inline-block"
      style={{ background: status ? "lime" : "red" }}
    ></div>
  );
}

function Scooter({ scooter }) {
  return (
    <div
      key={scooter.id}
      className="bg-white rounded p-4 flex flex-wrap gap-x-14 gap-y-8"
    >
      <div>
        <h3 className="font-bold">{scooter.title}</h3>
        <div className="">Rida: {scooter.ride}km</div>
      </div>
      <div>
        <h3 className="font-bold">Valstybinis NR: </h3>
        <div>{scooter.registrationCode}</div>
      </div>
      <div>
        <h3 className="font-bold">Kaina/val:</h3>
        <div>{scooter.hourlyPrice}€ </div>
      </div>
      <div>
        <h3 className="font-bold">Paskutinio naudojimo data:</h3>
        <div>{new Date(scooter.lastUseTime).toLocaleDateString("lt")}</div>
      </div>
      <div>
        <h3 className="font-bold">Statusas</h3>
        <div>
          <Status status={scooter.isBusy} />{" "}
          {scooter.isBusy ? "(Laisvas)" : "(Užimtas)"}
        </div>
        <div className="flex gap-4 text-xl w-full justify-center items-baseline">
          {/* <FaPencilAlt className="text-blue-700 hover:text-blue-900 cursor-pointer" />
          <FaTrashCan className="text-red-700 hover:text-red-900 cursor-pointer" /> */}
        </div>
      </div>
    </div>
  );
}

export default function Middle() {
  const [scooter, setScooter] = useState([]);
  useEffect(() => {
    fetch("/paspirtukai.json")
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setScooter(data);
      });
  }, []);
  return (
    <div className="container mx-auto bg-blue-100 min-h-[400px] flex flex-col gap-4 p-4">
      {scooter.map((s) => (
        <Scooter key={s.id} scooter={s} />
      ))}
    </div>
  );
}
