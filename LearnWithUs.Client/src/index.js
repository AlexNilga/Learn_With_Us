import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import WelcomePage from './Pages/Welcome/WelcomePage';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import SubjectsPage from "./Pages/Subjects/SubjectsPage";
import MaterialsPage from "./Pages/Materials/MaterialsPage";
import Login from "./componets/Login/Login";
import SignUp from "./componets/Login/SignUp";
import Header from "./componets/Header/Header";
import Profile from "./Pages/Profile/ProfilePage"
import FilesPage from "./Pages/Files/FilesPage";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';

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
                path: "subjects",
                element: (<SubjectsPage/>),
            },
            {
                path: "subjects/:subjectId",
                element: (<MaterialsPage/>),
            },
            {
                path: "subjects/:subjectId/materials",
                element: (<FilesPage/>),
            },
            {
                path: "login",
                element: (<Login/>),
            },
            {
                path: "sign-up",
                element: (<SignUp/>),
            }, {
                path: "profile",
                element: (<Profile/>),
            },
        ]
    }

])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
)


reportWebVitals();
