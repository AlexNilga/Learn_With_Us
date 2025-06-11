import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import {AuthProvider} from "./api/AuthContext";
import AppRouter from "./routes/appRouter";

import '@fortawesome/fontawesome-free/css/all.min.css';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <AppRouter/>
        </AuthProvider>
    </React.StrictMode>
)

reportWebVitals();