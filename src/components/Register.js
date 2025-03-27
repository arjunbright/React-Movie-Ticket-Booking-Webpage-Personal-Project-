import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/register.css";

const Register = ({ users, setUsers }) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        let newErrors = {};
        if (!formData.firstName.trim()) newErrors.firstName = "First Name is required";
        if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";
        if (!formData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = "Invalid email format";
        if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            setUsers([...users, formData]);
            alert("Registered successfully!");
            navigate("/login");
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <div className="register-image">
                    <img src="./images/wmremove-transformed.jpeg" alt="Sign Up" />
                </div>
                <div className="register-form">
                    <h2>Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
                            <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
                        </div>
                        {errors.firstName && <p className="error">{errors.firstName}</p>}
                        {errors.lastName && <p className="error">{errors.lastName}</p>}
                        <input type="email" name="email" placeholder="Email" className="spaced-input" onChange={handleChange} required />
                        {errors.email && <p className="error">{errors.email}</p>}
                        <input type="password" name="password" placeholder="Password" className="spaced-input" onChange={handleChange} required />
                        {errors.password && <p className="error">{errors.password}</p>}
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Retype Password"
                            className="spaced-input"
                            onChange={handleChange}
                            required
                        />
                        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                        <button type="submit">Sign Up</button>
                    </form>
                    <p>or</p>
                    <button className="google-signin">Sign in with Google</button>
                    <p>
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
