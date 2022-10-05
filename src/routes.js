import { useContext } from "react";
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
import { UserContext } from "./App";

export default function Router() {

    const userContext = useContext(UserContext);

    const routes = [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "*",
            element: <Navigate to="/" />,
        },
    ];

    if (userContext.user && userContext.user.roles && userContext.user.roles.includes('ROLE_ADMIN')) {
        routes.push({
            path: "/dashboard",
            element: <DashboardLayout />,
            children: [
                { path: "", element: <Overview /> },
                { path: "schedule", element: <Schedule /> },
                { path: "appointments", element: <Appointments /> },
                { path: "requestappointment", element: <RequestAppointment /> },
                { path: "preferences", element: <Preferences /> },
            ],
        })
    } else if (userContext.user && userContext.user.roles && userContext.user.roles.includes('ROLE_USER')) {
        routes.push({
            path: "/dashboard",
            element: <DashboardLayout />,
            children: [
                { path: "", element: <Overview /> },
                { path: "schedule", element: <Schedule /> },
                { path: "appointments", element: <Appointments /> },
                { path: "requestappointment", element: <RequestAppointment /> },
                { path: "preferences", element: <Preferences /> },
            ],
        })
    } else {
        routes.push({
            path: "/login",
            element: <Login />}
        )
    }


    return useRoutes(routes);
}
