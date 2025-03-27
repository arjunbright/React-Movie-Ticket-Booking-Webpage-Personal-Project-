// TicketManager.js (fixed to use sessionStorage, no axios)
import React, { useEffect, useState } from "react";
import "./TicketManager.css";

const TicketManager = () => {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const stored = JSON.parse(sessionStorage.getItem("tickets")) || [];
        setTickets(stored);
    }, []);

    return (
        <div className="ticket-manager">
            <h3>Manage Tickets</h3>
            <table className="ticket-table">
                <thead>
                    <tr>
                        <th>Movie</th>
                        <th>Time</th>
                        <th>Seats</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map((ticket, index) => (
                        <tr key={index}>
                            <td>{ticket.movieTitle}</td>
                            <td>{ticket.time}</td>
                            <td>{Array.isArray(ticket.seats) ? ticket.seats.join(", ") : ticket.seats}</td>
                            <td>{ticket.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TicketManager;
