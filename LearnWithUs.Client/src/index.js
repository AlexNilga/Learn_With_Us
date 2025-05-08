import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import WelcomePage from './Pages/Welcome/WelcomePage';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import SubjectsPage from "./Pages/Subjects/SubjectsPage";
import MaterialsPage from "./Pages/Materials/MaterialsPage";
import Header from "./componets/Header/Header";
import RegisterPage from "./Pages/Profile/RegisterPage"
import FilesPage from "./Pages/Files/FilesPage";
import LoginPage from "./Pages/Profile/LoginPage";
import ProfilePage from "./Pages/Profile/ProfilePage";
import {AuthProvider} from "./api/AuthContext";

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
                path: "/subjects",
                element: (<SubjectsPage/>),
            },
            {
                path: "/subjects/:subjectId",
                element: (<MaterialsPage/>),
            },
            {
                path: "/subjects/:subjectId/materials",
                element: (<FilesPage/>),
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