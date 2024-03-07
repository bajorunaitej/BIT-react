import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegistrationWindow from "./Registration/Register";
import NotFound from "./not-found/NotFound";
import LoginPage from "./Login/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div className="text-xl">Pagrindinis puslapis</div>,
  },
  {
    path: "/registration",
    element: <RegistrationWindow />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
