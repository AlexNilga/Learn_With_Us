import React, {useContext, useState} from 'react';
import "../../user/profile/ProfilePage.css";
import {useNavigate} from "react-router-dom";

import {loginUserAPI} from "../../../api/LoginUserAPI";
import {AuthContext} from "../../../api/AuthContext";

export default function LoginPage() {
    const { loginContext } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setErrorMsg("");
        setLoading(true);

        const response = await loginUserAPI(formData);
        console.log("Response message:", response);

        if (response.success) {
            loginContext(response.token);
            navigate("/");
        }else{
            setErrorMsg(response.message);
        }
        setLoading(false);
    };

    return (
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="input-group">
                    <input
                        type="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                    />
                    <label>Username(email address)</label>
                </div>
                <div className="input-group">
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                    <label>Password</label>
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Registering…" : "Sign In"}
                </button>
                {errorMsg && <div className="error-message">{errorMsg}</div>}
            </form>
    );
}