import {adminRouter, commonRouter, userRouter} from "./roleRouters";
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import WelcomePage from "../pages/common/welcome/WelcomePage";
import React from "react";
import Header from "../components/header/Header";

function AppLayout() {
    return <>
        <Header/>
        <Outlet/>
    </>
}

const getRouterByRole = (role = "guest") => {
    switch (role) {
        case "guest":
            return commonRouter
        case "user":
            return [...commonRouter, ...userRouter]
        case "admin":
            return [...commonRouter, ...adminRouter]
    }
}

const MyAppRouter = () => {

    const router = createBrowserRouter([
        {
            path: "/",
            element: (<AppLayout/>),
            children: getRouterByRole("user")
        }

    ])

    return <RouterProvider router={router}/>

}

export default MyAppRouter;