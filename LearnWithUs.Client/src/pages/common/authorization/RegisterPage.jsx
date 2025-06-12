import React, {useContext, useState} from 'react';
import "../../user/profile/ProfilePage.css";
import {registerUserAPI} from "../../../api/RegisterUserAPI";
import {useNavigate} from "react-router-dom";
import {loginUserAPI} from "../../../api/LoginUserAPI";
import {AuthContext} from "../../../api/AuthContext";

export default function RegisterPage() {
    const { loginContext } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        role: 'User',
        firstName: '',
        lastName: ''
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setLoading(true);

        const response = await registerUserAPI(formData);

        if (response.success) {
            const loginResponse = await loginUserAPI(formData)
            if(loginResponse.success){
                loginContext(loginResponse.token);
            }
            navigate("/");
        }else{
            setErrorMsg(response.message);
        }
        setLoading(false);
    }


    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h2>Зареєструватися</h2>
            <div className="input-group">
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                />
                <label>Ім'я</label>
            </div>
            <div className="input-group">
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                />
                <label>Фамілія</label>
            </div>
            <div className="input-group">
                <input
                    type="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                />
                <label>Username(email адреса)</label>
            </div>
            <div className="input-group">
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                />
                <label>Пароль</label>
            </div>
            <button type="submit" disabled={loading}>
                {loading ? "Registering…" : "Sign Up"}
            </button>
            {errorMsg && <div className="error-message">{errorMsg}</div>}
        </form>

    );
}