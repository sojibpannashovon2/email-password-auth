import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from "./components/layout/Main";
import Home from "./components/Home";
import Login from "./components/Login";
import Resistor from "./components/Resistor";
import BootstrapResistor from "./components/BootstrapResistor";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/resistor',
        element: <Resistor></Resistor>
      },
      {
        path: '/resistorBT',
        element: <BootstrapResistor></BootstrapResistor>
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
