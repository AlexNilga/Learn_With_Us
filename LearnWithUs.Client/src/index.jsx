import React from 'react';
import ReactDOM from 'react-dom/client';

import WelcomePage from './pages/common/welcome/WelcomePage';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import CategoriesPage from "./pages/user/categories/CategoriesPage";
import Header from "./components/header/Header";
import RegisterPage from "./pages/common/authorization/RegisterPage"
import LoginPage from "./pages/common/authorization/LoginPage";
import ProfilePage from "./pages/user/profile/ProfilePage";
import {AuthProvider} from "./api/AuthContext";

import './index.css';
import {adminRouter, commonRouter, userRouter} from "./routes/roleRouters";
import AppRouter from "./routes/appRouter";



ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <AppRouter/>
        </AuthProvider>
    </React.StrictMode>
)


reportWebVitals();

