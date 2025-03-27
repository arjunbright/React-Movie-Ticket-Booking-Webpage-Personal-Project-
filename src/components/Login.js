import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";

const Login = ({ users }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        isAdmin: false,
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    };

    const validate = () => {
        let newErrors = {};
        if (!formData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = "Invalid email format";
        if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        if (formData.isAdmin) {
            if (formData.email === "rvvha@gmail.com" && formData.password === "000000") {
                const adminUser = {
                    email: "rvvha",
                    firstName: "Admin",
                    loginTime: new Date().getTime(),
                };
                sessionStorage.setItem("user", JSON.stringify(adminUser));
                navigate("/admin-dashboard");
            } else {
                alert("Invalid Admin Credentials");
            }
            return;
        }

        const user = users.find((u) => u.email === formData.email && u.password === formData.password);
        if (user) {
            alert("Login Successful!");
            sessionStorage.setItem(
                "user",
                JSON.stringify({
                    ...user,
                    loginTime: new Date().getTime(),
                })
            );
            navigate("/home");
        } else {
            alert("Invalid Credentials");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box shadow-red-border">
                <div className="login-image">
                    <img src="./images/DeWatermark.ai_1741230733739.png" alt="Login" />
                </div>
                <div className="login-form">
                    <h2>Log In</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="email" name="email" className="spaced-input" placeholder="Email" onChange={handleChange} required />

                        {errors.email && <p className="error">{errors.email}</p>}
                        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                        {errors.password && <p className="error">{errors.password}</p>}
                        <div className="admin-checkbox">
                            <input type="checkbox" name="isAdmin" onChange={handleChange} />
                            <label>Log in as Admin</label>
                        </div>
                        <button type="submit">Log in</button>
                    </form>
                    <p>or</p>
                    <button className="google-signin">Sign in with Google</button>
                    <p>
                        Don't have an account? <Link to="/register">Register</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
