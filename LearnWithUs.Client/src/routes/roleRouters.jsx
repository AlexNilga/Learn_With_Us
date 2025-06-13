import  WelcomePage from "../pages/common/welcome/WelcomePage";
import CoursesPage from "../pages/user/categories/CoursesPage";
import LoginPage from "../pages/common/authorization/LoginPage";
import RegisterPage from "../pages/common/authorization/RegisterPage";
import ProfilePage from "../pages/user/profile/ProfilePage";
import React from "react";
import UsersPage from "../pages/admin/UsersPage";

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
        path: "/categories/:parentId?",
        element: (<LoginPage/>),
    },
]

export const userRouter = [
    {
        path: "/",
        element: (<WelcomePage/>),
    },
    {
        path: "/profile",
        element: (<ProfilePage/>),
    },
    {
        path: "/categories/:parentId?",
        element: (<CoursesPage/>),
    },
]

export const adminRouter = [
    {
        path: "/",
        element: (<WelcomePage/>),
    },
    {
        path: "/profile",
        element: (<ProfilePage/>),
    },
    {
        path: "/categories/:parentId?",
        element: (<CoursesPage/>),
    },
    {
        path: "/users",
        element: (<UsersPage/>)
    },
    {
        path: "/categories/:parentId?",
        element: (<CoursesPage/>),
    },
]