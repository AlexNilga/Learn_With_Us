import  WelcomePage from "../pages/common/welcome/WelcomePage";
import CoursesPage from "../pages/user/categories/CoursesPage";
import LoginPage from "../pages/common/authorization/LoginPage";
import RegisterPage from "../pages/common/authorization/RegisterPage";
import ProfilePage from "../pages/user/profile/ProfilePage";
import React from "react";

export const commonRouter = [
    {
        path: "/",
        element: (<WelcomePage/>),
    },
    {
        path: "/login",
        element: (<LoginPage/>),
    },
    {
        path: "/register",
        element: (<RegisterPage/>),
    },
    {
        path: "/profile",
        element: (<ProfilePage/>),
    },
]

export const userRouter = [
    {
        path: "/categories/:parentId?",
        element: (<CoursesPage/>),
    },
]

export const adminRouter = [
    // {
    //     path: "/categories",
    //     element: (<CoursesPage/>),
    // },
]