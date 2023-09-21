import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import Home from "../pages/Home";
import Kajian from "../pages/Kajian";
import Tahsin from "../pages/Tahsin";
import Layout from "../components/layout/Layout";
import Rekening from "../pages/Rekening";
import Divisi from "../pages/Divisi";
import Login from "../pages/Login";
import Register from "../pages/Register";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      if (localStorage.getItem("authorization")) {
        throw redirect("/");
      }
      return null;
    },
  },
  {
    path: "/register",
    element: <Register />,
    loader: () => {
      if (localStorage.getItem("authorization")) {
        throw redirect("/");
      }
      return null;
    },
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/kajian",
        element: <Kajian />,
      },
      {
        path: "/tahsin",
        element: <Tahsin />,
      },
      {
        path: "/rekening",
        element: <Rekening />,
      },
      {
        path: "/divisi",
        element: <Divisi />,
      },
    ],
  },
]);

export default router;
