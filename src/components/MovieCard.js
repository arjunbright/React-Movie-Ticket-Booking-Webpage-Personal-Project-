import React from "react";
import { Link } from "react-router-dom";
import "../styles/styles.css";

const MovieCard = ({ movie }) => {
    return (
        <div className="movie-card">
            {/* <img src={movie.imageUrl} alt={movie.title} /> */}
            {/* Temporarily setting the same image */}
            <img src="/images/aagadu.jpg" alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>
                ⭐ {movie.rating} | ⏳ {movie.duration}
            </p>
            <div className="buttons">
                <button className="watch-trailer">Watch Trailer</button>
                <Link to={`/booking/${movie.id}`}>
                    <button className="buy-ticket">Buy Ticket</button>
                </Link>
            </div>
        </div>
    );
};

export default MovieCard;
