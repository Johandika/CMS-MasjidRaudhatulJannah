import { createBrowserRouter, redirect } from "react-router-dom";
import Home from "../pages/Home";
import Kajian from "../pages/Kajian";
import Tahsin from "../pages/Tahsin";
import Layout from "../components/layout/Layout";
import Rekening from "../pages/Rekening";
import Divisi from "../pages/Divisi";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Layanan from "../pages/Layanan";
import Diklat from "../pages/Diklat";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "../pages/NotFound";

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
        path: "*",
        element: <NotFound />,
      },
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/kajian",
        element: (
          <ProtectedRoute>
            <Kajian />
          </ProtectedRoute>
        ),
      },
      {
        path: "/tahsin",
        element: (
          <ProtectedRoute>
            <Tahsin />
          </ProtectedRoute>
        ),
      },
      {
        path: "/rekening",
        element: (
          <ProtectedRoute>
            <Rekening />
          </ProtectedRoute>
        ),
      },
      {
        path: "/divisi",
        element: (
          <ProtectedRoute>
            <Divisi />
          </ProtectedRoute>
        ),
      },
      {
        path: "/layanan",
        element: (
          <ProtectedRoute>
            <Layanan />
          </ProtectedRoute>
        ),
      },
      {
        path: "/diklat",
        element: (
          <ProtectedRoute>
            <Diklat />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
