import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkSession, logout } from "/utils/api/sessions";

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

function PcPost() {
  return (
    <div className="flex justify-center items-center">
      <div className="bg-white min-h-[300px] min-w-[100px] max-[250px]">
        <div className="img">
          <img src="https://placehold.co/400x300" className="w-full" />
        </div>
        <div className="details p-4 w-fit mx-auto">
          <a href="/pc1">
            <h3 className="title text-xl mb-2 border-b-4 border-indigo-800 w-fit pr-4">
              Lorem ipsum dolor sit amet.
            </h3>
          </a>
          <div className="text-xs">
            <div className=" flex flex-wrap gap-x-4 mb-1">
              <span className="inline-block w-1/3 font-bold">
                Specifikacija:
              </span>
              <span>Specifikacijos reikšmė</span>
            </div>
          </div>
          <div className="text-xs">
            <div className=" flex flex-wrap gap-x-4 mb-1">
              <span className="inline-block w-1/3 font-bold">
                Specifikacija:
              </span>
              <span>Specifikacijos reikšmė</span>
            </div>
          </div>
          <div className="text-xs">
            <div className=" flex flex-wrap gap-x-4 mb-1">
              <span className="inline-block w-1/3 font-bold">
                Specifikacija:
              </span>
              <span>Specifikacijos reikšmė</span>
            </div>
          </div>
          <div className="text-xs">
            <div className=" flex flex-wrap gap-x-4 mb-1">
              <span className="inline-block w-1/3 font-bold">
                Specifikacija:
              </span>
              <span>Specifikacijos reikšmė</span>
            </div>
          </div>
          <div className="text-xs">
            <div className=" flex flex-wrap gap-x-4 mb-1">
              <span className="inline-block w-1/3 font-bold">
                Specifikacija:
              </span>
              <span>Specifikacijos reikšmė</span>
            </div>
          </div>
          <div className="text-xs">
            <div className=" flex flex-wrap gap-x-4 mb-1">
              <span className="inline-block w-1/3 font-bold">
                Specifikacija:
              </span>
              <span>Specifikacijos reikšmė</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Main() {
  // const isLoggedIn = true;

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    checkSession((data) => {
      setIsLoggedIn(data.isLoggedIn);
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
              to="/add-new-post"
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
          <PcPost />
          <PcPost />
        </div>
      </div>
    </div>
  );
}
