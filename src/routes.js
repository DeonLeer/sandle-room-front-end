import { Navigate, useRoutes } from "react-router-dom";
import useToken from "./components/App/useToken";
import Home from "./pages/Home";
import Login from "./components/Login/Login";
import Preferences from "./components/Preferences";
import { Children } from "react";
import Overview from "./pages/Overview";
import Appointments from "./pages/Appointments";
import RequestAppointment from "./pages/RequestAppointment";
import DashboardLayout from "./layouts/Dashboard";

export default function Router(props) {
    const routes = props.token
        ? [
              {
                  path: "/dashboard",
                  element: <DashboardLayout logout={props.deleteToken} />,
                  children: [
                      { path: "", element: <Overview /> },
                      { path: "appointments", element: <Appointments /> },
                      {
                          path: "requestappointment",
                          element: <RequestAppointment />,
                      },
                      {
                          path: "preferences",
                          element: <Preferences />,
                      },
                  ],
              },

              {
                  path: "*",
                  element: <Navigate to="/dashboard" />,
              },
          ]
        : [
              {
                  path: "/",
                  element: <Home />,
              },
              {
                  path: "/login",
                  element: <Login setToken={props.setToken} />,
              },
              {
                  path: "*",
                  element: <Navigate to="/" />,
              },
          ];

    return useRoutes(routes);
}
