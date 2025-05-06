import React, {useState} from 'react';
import "./ProfilePage.css";
import {loginUser, registerUser} from "../../api/RegisterUser";
import {useNavigate} from "react-router-dom";

export default function RegisterPage() {
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

        const response = await registerUser(formData);
        console.log("Response message:", response);

        if (response.success) {
            navigate("/");
        }else{
            setErrorMsg(response.message);
        }
        setLoading(false);
    }


    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h2>Register</h2>
            <div className="input-group">
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                />
                <label>First Name</label>
            </div>
            <div className="input-group">
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                />
                <label>Last Name</label>
            </div>
            <div className="input-group">
                <input
                    type="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                />
                <label>Email Address</label>
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
                {loading ? "Registering…" : "Sign Up"}
            </button>
            {errorMsg && <div className="error-message">{errorMsg}</div>}
        </form>

    );
}