import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Roots from "./Roots/Roots";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AboutUs from "./pages/AboutUs";
import MoreComment from "./pages/MoreComment";
import CardDetails from "./pages/CardDetails";
import Authprovider from "./Authprovider/Authprovider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Roots></Roots>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "/about us",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/comment",
        element: <MoreComment></MoreComment>,
      },
      {
        path: "/details/:id",
        element: <CardDetails></CardDetails>,
        loader: () => fetch('/data.json')
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Authprovider>
      <RouterProvider router={router} />
    </Authprovider>
  </React.StrictMode>
);
