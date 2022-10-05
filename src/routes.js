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
import Schedule from "./pages/Schedule";

export default function Router(props) {
    const routes = props.user
        ? [
              {
                  path: "/",
                  element: <Home user={props.user} />,
              },
              {
                  path: "/dashboard",
                  element: <DashboardLayout logout={props.logout} />,
                  children: [
                      { path: "", element: <Overview /> },
                      { path: "schedule", element: <Schedule /> },
                      { path: "appointments", element: <Appointments /> },
                      { path: "requestappointment", element: <RequestAppointment />  },
                      { path: "preferences", element: <Preferences /> },
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
                  element: <Login />,
              },
              {
                  path: "*",
                  element: <Navigate to="/" />,
              },
          ];

    return useRoutes(routes);
}
