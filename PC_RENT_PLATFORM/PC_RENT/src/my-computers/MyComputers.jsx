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
  return <div>sdfsdfsdfsdfd</div>;
}
