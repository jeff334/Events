import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./styling/Schedule.css";
import "./Styling/Registration.css";

import Registration from "./components/Registration";
import Home from "./components/Home";
import Schedule from "./components/Schedule";
import { DisplayProvider } from "./Context/HomeContxet.jsx";
import Help from "./components/Help.jsx";
import SighInPage from "./components/SighInPage.jsx";

const router = createBrowserRouter([
  { path: "/", element: <SighInPage /> },
  { path: "/Registration", element: <Registration /> },
  { path: "/Home", element: <Home /> },
  { path: "/Schedule", element: <Schedule /> },
  { path: "/Help", element: <Help /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DisplayProvider>
      <RouterProvider router={router} />
    </DisplayProvider>
  </StrictMode>
);
