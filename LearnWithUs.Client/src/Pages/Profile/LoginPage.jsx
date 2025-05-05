import React, {useState} from 'react';
import "./ProfilePage.css";
import {loginUser} from "../../api/RegisterUser";

export default function LoginPage() {
    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setLoginData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        await loginUser(loginData);
    };

    return (
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="input-group">
                    <input
                        type="username"
                        name="username"
                        value={loginData.username}
                        onChange={handleInputChange}
                        required
                    />
                    <label>Email Address</label>
                </div>
                <div className="input-group">
                    <input
                        type="password"
                        name="password"
                        value={loginData.password}
                        onChange={handleInputChange}
                        required
                    />
                    <label>Password</label>
                </div>
                <button type="submit">Sign In</button>
            </form>
    );
}