import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Header from "./components/Header";
import Contact from "./components/Contact";
import Booking from "./components/Booking";
import Cart from "./components/Cart";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";
import AdminPage from "./components/AdminPage";
import Footer from "./components/Footer"; // ✅ Import the Footer component

const App = () => {
    const [users, setUsers] = useState([]);

    return (
        <Router>
            <Header />
            <div className="main-content">
                <Routes>
                    <Route path="/" element={<Navigate to="/register" />} />
                    <Route path="/register" element={<Register users={users} setUsers={setUsers} />} />
                    <Route path="/login" element={<Login users={users} />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/movielist" element={<MovieList />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/movie/:id" element={<MovieDetail />} />
                    <Route path="/booking/:id" element={<Booking />} /> {/* ✅ Corrected Route */}
                    <Route path="/admin-dashboard" element={<AdminPage />} />
                </Routes>
            </div>
            <Footer /> {/* ✅ Add Footer here */}
        </Router>
    );
};

export default App;
