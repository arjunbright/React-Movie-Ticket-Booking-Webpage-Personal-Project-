import React from "react";
import "../styles/booking.css";

const SeatSelection = ({ selectedSeats, handleSeatSelection }) => {
    const rows = ["A", "B", "C", "D", "E", "F", "G"];
    const seatsPerRow = 10;

    return (
        <div className="seat-selection">
            <h3>Select Your Seats</h3>
            <div className="screen">SCREEN</div>
            <div className="seats">
                {rows.map((row) =>
                    Array.from({ length: seatsPerRow }).map((_, index) => {
                        const seatNumber = `${row}${index + 1}`;
                        return (
                            <button
                                key={seatNumber}
                                className={`seat ${selectedSeats.includes(seatNumber) ? "selected" : ""}`}
                                onClick={() => handleSeatSelection(seatNumber)}
                            >
                                {seatNumber}
                            </button>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default SeatSelection;
