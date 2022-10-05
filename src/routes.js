import { useState, useEffect } from "react";
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
import userService from "./services/user.service";

export default function Router() {

    const [admin, setAdmin] = useState(false)
    
    const userContext = useContext(UserContext);

    const userServices = userService();
    
    useEffect(() => {
        async function getIsAdmin() {
            const data = await userServices.getAdminBoard();
            data.data === "Admin Content." && setAdmin(true)
        }
        getIsAdmin()
    }, [])

    const routes = [
        {
            path: "/",
            element: <Home />,
        }
    ];

    if (userContext.user && userContext.user.roles && userContext.user.roles.includes(2)) {
        routes.push({
            path: "/dashboard",
            element: <DashboardLayout />,
            children: [
                { path: "", element: <Overview /> },
                { path: "schedule", element: <Schedule /> },
                { path: "appointments", element: <Appointments /> },
                { path: "requestappointment", element: <RequestAppointment /> },
                { path: "preferences", element: <Preferences /> },
                { path: "*", element: <Navigate to='/'/> }
            ],
        })
    } else if (userContext.user && userContext.user.roles && userContext.user.roles.includes(1)) {
        routes.push({
            path: "/dashboard",
            element: <DashboardLayout />,
            children: [
                { path: "", element: <Overview /> },
                { path: "schedule", element: <Schedule /> },
                { path: "appointments", element: <Appointments /> },
                { path: "requestappointment", element: <RequestAppointment /> },
                { path: "preferences", element: <Preferences /> },
                { path: "*", element: <Navigate to='/'/> }
            ],
        })
    } else {
        routes.push({
            path: "/login",
            element: <Login />
        }, {
            path: "*",
            element: <Navigate to='/'/>
        })
    }


    return useRoutes(routes);
}
