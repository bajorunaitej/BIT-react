import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkSession, logout } from "/utils/api/sessions";
import { getAllPcs } from "../../utils/api/pcService";
import stationaryImage from "/src/assets/pc-images/stationary.jpg";
import macbookImage from "/src/assets/pc-images/macbook.jpg";
import laptopImage from "/src/assets/pc-images/laptop.jpg";

function AuthButtons() {
  return (
    <div>
      <Link
        to="/registration"
        className="px-4 py-1 border-2 border-gray-700 bg-indigo-400 hover:bg-indigo-800 text-white rounded mx-2"
      >
        Register now
      </Link>
      <Link
        to="/login"
        className="px-4 py-1 border-2 border-gray-700 bg-indigo-400 hover:bg-indigo-800 text-white rounded mx-2"
      >
        Log in
      </Link>
    </div>
  );
}

function PcPost({ pc }) {
  function choosePcImage(pcType) {
    // if(pcType === "Stationary") {
    //   return stationaryImage;
    // }
    switch (pcType) {
      case "Stationary":
        return stationaryImage;
      case "Laptop":
        return laptopImage;
      case "Macbook":
        return macbookImage;
      default:
        return "https://placehold.co/400x300";
    }
  }

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white min-h-[300px] min-w-[100px] max-[250px]">
        <div className="img">
          <img src={choosePcImage(pc.pc_type)} className="w-full" />
        </div>
        <div className="details p-4 w-fit mx-auto">
          <a href={`/pc/${pc.id}`}>
            <h3 className="title text-xl mb-2 border-b-4 border-indigo-800 w-fit pr-4">
              {pc.pc_name}
            </h3>
          </a>
          <div className="text-xs">
            <div className=" flex flex-wrap gap-x-4 mb-1 items-center">
              <span className="inline-block w-1/2 font-bold">Procesorius:</span>
              <span>{pc.cpu}</span>
            </div>
          </div>
          <div className="text-xs">
            <div className=" flex flex-wrap gap-x-4 mb-1 items-center">
              <span className="inline-block w-1/2 font-bold">
                Vaizdo plokštė:
              </span>
              <span>{pc.gpu}</span>
            </div>
          </div>
          <div className="text-xs">
            <div className=" flex flex-wrap gap-x-4 mb-1 items-center">
              <span className="inline-block w-1/2 font-bold">
                Operatyvioji atmintis:
              </span>
              <span>{pc.ramAmount} MB</span>
            </div>
          </div>
          <div className="text-xs">
            <div className=" flex flex-wrap gap-x-4 mb-1 items-center">
              <span className="inline-block w-1/2 font-bold">
                Operatyvios atminties tipas:
              </span>
              <span>{pc.ramType}</span>
            </div>
          </div>
          <div className="text-xs">
            <div className=" flex flex-wrap gap-x-4 mb-1 items-center">
              <span className="inline-block w-1/2 font-bold">
                Operatyvios atminties greitis:
              </span>
              <span>{pc.ramSpeed}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Main() {
  // const isLoggedIn = true;
  const [pcList, setPcList] = useState([]);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkSession((data) => {
      setIsLoggedIn(data.isLoggedIn);
    });
    getAllPcs((allPcs) => {
      setPcList(allPcs);
      console.log(allPcs);
    });
  }, [navigate]);

  function logOut() {
    logout((response) => {
      if (response.status) {
        setIsLoggedIn(false);
      }
    });
  }

  return (
    <div className="flex justify-center items-center">
      <div className="container w-[80%] bg-gray-500 min-h-[90vh] rounded-lg p-6">
        {!isLoggedIn && <AuthButtons />}
        {isLoggedIn && (
          <div className="flex justify-between">
            <Link
              to="/add-new-pc"
              className="px-4 py-1 bg-violet-500 hover:bg-violet-700 text-white rounded mx-2"
            >
              Add rent
            </Link>
            <button
              className="px-4 py-1 bg-blue-500 hover:bg-blue-700 text-white rounded mx-2"
              onClick={logOut}
            >
              Logout
            </button>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {pcList.map((pc) => (
            <PcPost pc={pc} key={pc.id} />
          ))}
          {/* <PcPost />
          <PcPost />
          <PcPost />
          <PcPost />
          <PcPost />
          <PcPost />
          <PcPost />
          <PcPost />
          <PcPost />
          <PcPost />
          <PcPost />
          <PcPost />
          <PcPost />
          <PcPost />
          <PcPost />
          <PcPost /> */}
        </div>
      </div>
    </div>
  );
}
