// BookingManager.js (fixed to use sessionStorage only, no axios)
import React, { useEffect, useState } from "react";
import "./BookingManager.css";

const BookingManager = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const stored = JSON.parse(sessionStorage.getItem("bookings")) || [];
        setBookings(stored);
    }, []);

    return (
        <div className="booking-manager">
            <h3>Booking Records</h3>
            <table className="booking-table">
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Movie</th>
                        <th>Time</th>
                        <th>Seats</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((b, index) => (
                        <tr key={index}>
                            <td>{b.user || "Guest"}</td>
                            <td>{b.movie?.title || "Untitled"}</td>
                            <td>{b.time}</td>
                            <td>{Array.isArray(b.selectedSeats) ? b.selectedSeats.join(", ") : "-"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookingManager;
