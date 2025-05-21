import React from 'react';
import ReactDOM from 'react-dom/client';

import WelcomePage from './Pages/Welcome/WelcomePage';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import CategoriesPage from "./Pages/Categories/CategoriesPage";
import Header from "./components/Header/Header";
import RegisterPage from "./Pages/Profile/RegisterPage"
import LoginPage from "./Pages/Profile/LoginPage";
import ProfilePage from "./Pages/Profile/ProfilePage";
import {AuthProvider} from "./api/AuthContext";

import './index.css';

function AppLayout() {
    return <>
        <Header/>
        <Outlet/>
    </>
}

const router = createBrowserRouter([
    {
        element: (<AppLayout/>),
        children: [
            {
                path: "/",
                element: (<WelcomePage/>),
            },
            {
                path: "/categories",
                element: (<CategoriesPage/>),
            },
            // {
            //     path: "/categories/:subjectId",
            //     element: (<ContentPage/>),
            // },
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
    }

])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
        <RouterProvider router={router}/>
        </AuthProvider>
    </React.StrictMode>
)


reportWebVitals();