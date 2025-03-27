import React, { useState } from "react";
import MovieManager from "./MovieManager";
import TicketManager from "./TicketManager";
import UserManager from "./UserManager";
import BookingManager from "./BookingManager";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="admin-dashboard">
      <nav className="admin-nav">
        <div className="nav-brand">Admin Panel</div>
        <button className="hamburger" onClick={() => setShowMenu(!showMenu)}>
          ☰
        </button>
        <ul className={`nav-links ${showMenu ? "active" : ""}`}>
          <li><a href="#movies">Movies</a></li>
          <li><a href="#tickets">Tickets</a></li>
          <li><a href="#users">Users</a></li>
          <li><a href="#bookings">Bookings</a></li>
        </ul>
      </nav>

      <div className="dashboard-sections">
        <section id="movies"><MovieManager /></section>
        <section id="tickets"><TicketManager /></section>
        <section id="users"><UserManager /></section>
        <section id="bookings"><BookingManager /></section>
      </div>
    </div>
  );
};

export default AdminDashboard;
