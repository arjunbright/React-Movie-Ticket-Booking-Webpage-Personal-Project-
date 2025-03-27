import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import SeatSelection from "./SeatSelection";
import "../styles/booking.css";

const Booking = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [showtime, setShowtime] = useState("");
    const [date, setDate] = useState("");
    const seatPrice = { normal: 10, deluxe: 15, ultra: 20 };

    const { state } = useLocation();

    useEffect(() => {
        if (state?.movie) {
            setMovie(state.movie);
        } else {
            // fallback in case user visits Booking directly
            axios
                .get(`https://api.themoviedb.org/3/movie/${id}?api_key=feec295a7d623037a27dc6e600040c5b`)
                .then((res) => setMovie(res.data))
                .catch((err) => console.error("Error fetching movie details:", err));
        }
    }, [id, state]);

    const handleSeatSelection = (seat) => {
        setSelectedSeats((prevSeats) => (prevSeats.includes(seat) ? prevSeats.filter((s) => s !== seat) : [...prevSeats, seat]));
    };

    const handleBooking = () => {
        // Check if user is logged in
        const userSession = JSON.parse(sessionStorage.getItem("user"));
        const now = new Date().getTime();

        if (!userSession || now - userSession.loginTime > 30 * 60 * 1000) {
            alert("You need to log in to finish your order.");
            navigate("/login");
            return;
        }

        if (!date || !showtime || selectedSeats.length === 0) {
            alert("Please select date, time, and at least one seat!");
            return;
        }

        // Create booking data
        const bookingData = {
            movie,
            movieId: id,
            seats: selectedSeats,
            date,
            time: showtime,
            price: selectedSeats.length * seatPrice.normal,
            userEmail: userSession.email,
        };

        // Save to sessionStorage (simulate DB)
        const existingBookings = JSON.parse(sessionStorage.getItem("bookings")) || [];
        sessionStorage.setItem("bookings", JSON.stringify([...existingBookings, bookingData]));

        // Navigate to cart page with state
        alert("Booking Successful!");
        sessionStorage.setItem(
            "recentBooking",
            JSON.stringify({
                movie,
                selectedSeats,
                price: selectedSeats.length * seatPrice.normal,
                date,
                time: showtime,
            })
        );
        navigate("/cart", {
            state: {
                movie,
                selectedSeats,
                price: selectedSeats.length * seatPrice.normal,
                date,
                time: showtime,
            },
        });

        navigate("/cart", { state: bookingData });
    };

    if (!movie) return <h2>Loading...</h2>;

    return (
        <div className="booking-container">
            <div className="booking-content">
                {/* Left: Poster and Info */}
                <div className="left-panel">
                    <img className="poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                    <h1 className="movie-title">{movie.title}</h1>
                    <div className="selected-seat-list">
                        {selectedSeats.map((seat, index) => (
                            <div key={seat} className="seat-line">
                                <span>{seat}</span>
                                <span>${seatPrice.normal}</span>
                            </div>
                        ))}
                    </div>
                    <div className="total-price">Total: ${selectedSeats.length * seatPrice.normal}</div>
                </div>

                {/* Right: Seat Selection */}
                <div className="right-panel">
                    <div className="booking-options">
                        <div className="date-picker">
                            <h3>Date</h3>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="calendar-input"
                                min={new Date().toISOString().split("T")[0]}
                                max={new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
                            />
                        </div>

                        <div className="time-picker">
                            <h3>Time</h3>
                            <button onClick={() => setShowtime("9:30 AM")}>9:30 AM</button>
                            <button onClick={() => setShowtime("1:30 PM")}>1:30 PM</button>
                            <button onClick={() => setShowtime("5:30 PM")}>5:30 PM</button>
                        </div>

                        <div className="selection-summary">
                            <h4>🎬 Selected Show</h4>
                            <p>
                                <strong>Date:</strong> {date || "Not selected"}
                            </p>
                            <p>
                                <strong>Time:</strong> {showtime || "Not selected"}
                            </p>
                            <p>
                                <strong>Type:</strong> 3D
                            </p>
                        </div>
                    </div>

                    <SeatSelection selectedSeats={selectedSeats} handleSeatSelection={handleSeatSelection} />

                    <div className="booking-footer">
                        <button className="cancel-btn">Cancel</button>
                        <button className="purchase-btn" onClick={handleBooking}>
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Booking;
