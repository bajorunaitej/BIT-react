import { useEffect } from "react";
import { checkSession } from "/utils/api/sessions";
import { useNavigate } from "react-router-dom";

export default function MyComputers() {
  const navigate = useNavigate();
  useEffect(() => {
    checkSession((resp) => {
      if (!resp.isLoggedIn) navigate("/login");
    });
  }, [navigate]);
  return (
    <div className="">
      <div className="">
        <button>Rikiuoti A-Z</button>
        <button>Rikiuoti Z-A</button>
        <button>Filtruoti pagal procesorių</button>
        <button>Filtruoti pagal vaizdo plokštę</button>
      </div>
    </div>
  );
}
