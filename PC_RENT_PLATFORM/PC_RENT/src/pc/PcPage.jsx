import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getById } from "/utils/api/pcService";

export default function PcPage() {
  const [isPcFound, setIsPcFound] = useState(false);
  const [pcDetails, setPcDetails] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getById(id, (resp) => {
      setIsPcFound(resp.status);
      setPcDetails(resp.pc);

      // {
      // 	"ownerId": "17",
      // 	"cpu": "Intel Core i5",
      // 	"gpu": "Intel Iris Xe Graphics",
      // 	"ramType": "DDR4",
      // 	"ramSpeed": "2000",
      // 	"ramAmount": "8",
      // 	"pc_type": "Laptop",
      //	"pc_name": "Acer"
      // }
    });
  }, []);

  if (!isPcFound) return <div>PC was not found</div>;

  return (
    <main className="container mx-auto relative min-h-[100vh]">
      <div className="absolute translate-x-1/2 translate-y-1/2 right-1/2 bottom-1/2 bg-blue-100 min-w-[400px] w-[60%] rounded-xl overflow-hidden">
        <div className="pc-image bg-blue-50">
          <img src="w-full" alt="pc-image" className="min-h-[200px]" />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold text-center mb-4">
            {pcDetails.pc_name}
          </h3>
          <p className="font-bold">
            Lessor: <span className="italic font-normal">Petras</span>
          </p>
          <div className="grid grid-cols-4">
            <div className="font-bold">Processor (CPU)</div>
            <div className="col-span-3">{pcDetails.cpu}</div>
            <div className="font-bold">Grafikos (GPU)</div>
            <div className="col-span-3">{pcDetails.cpu}</div>
            <div className="font-bold">RAM type</div>
            <div className="col-span-3">{pcDetails.ramType}</div>
            <div className="font-bold">RAM speed (MHz)</div>
            <div className="col-span-3">{pcDetails.ramSpeed}</div>
            <div className="font-bold">RAM amount (GB)</div>
            <div className="col-span-3">{pcDetails.ramAmount}</div>
            <div className="font-bold">Processor (CPU)</div>
            <div className="col-span-3">I7-13700kf</div>
          </div>
        </div>
      </div>
    </main>
  );
}
