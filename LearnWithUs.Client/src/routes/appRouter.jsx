import React, {useContext} from "react";
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";

import {adminRouter, commonRouter, userRouter} from "./roleRouters";
import Header from "../components/header/Header";
import {AuthContext} from "../api/AuthContext";

function AppLayout() {
    return <>
        <Header/>
        <Outlet/>
    </>
}

const getRouterByRole = (role) => {
    switch (role) {
        case "User":
            return userRouter
        case "Admin":
            return adminRouter
        default:
            return commonRouter
    }
}

const MyAppRouter = () => {
    const {role} = useContext(AuthContext);

    const router = createBrowserRouter([
        {
            path: "/",
            element: (<AppLayout/>),
            children: getRouterByRole(role)
        }

    ])

    return <RouterProvider router={router}/>

}

export default MyAppRouter;