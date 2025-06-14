// src/components/WelcomePage.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../api/AuthContext";
import "./WelcomePage.css";

function WelcomePage() {
    const { role } = useContext(AuthContext);

    return (
        <div className="welcome-page container py-5 text-center mt-5">
            <h1 className="display-4 mb-4">Вітаємо у додатку Learn With Us</h1>
            <p className="lead mb-5">
                Раді бачити вас в нашій системі. Зареєструйтеся або увійдіть в систему, щоб розпочати навчання.
            </p>
            <Link to="/login" className="btn btn-primary btn-lg me-3">
                Увійти
            </Link>
            <Link to="/Register" className="btn btn-primary btn-lg">
                Зареєструватися
            </Link>
        </div>
    );
}

export default WelcomePage;
