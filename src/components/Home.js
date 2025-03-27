import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/home.css";

const Home = () => {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [newMovies, setNewMovies] = useState([]);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const navigate = useNavigate();

    useEffect(() => {
        fetchMovies("trending", setTrendingMovies);
        fetchMovies("now_playing", setNewMovies);
        startCountdown();
    }, []);

    const fetchMovies = async (category, setter) => {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${category}?api_key=feec295a7d623037a27dc6e600040c5b&language=en-US&page=1`
            );
            setter(response.data.results);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    const startCountdown = () => {
        const targetDate = new Date("2025-07-30T00:00:00").getTime();
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                clearInterval(interval);
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds });
        }, 1000);
    };

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-overlay">
                    <h1 className="animate-title">
                        Our Special <span>Movies</span>
                    </h1>
                    <p className="animate-subtitle">Welcome to EasyTicket - Your one stop for all movie experiences.</p>
                    <button className="hero-button">Read More</button>
                </div>
            </section>

            {/* Trending Movies */}
            <section className="category-section">
                <h2 className="section-title">Trending Movies</h2>
                <div className="movie-grid">
                    {trendingMovies.slice(0, 4).map((movie) => (
                        <div key={movie.id} className="movie-card trending" onClick={() => navigate(`/movie/${movie.id}`)}>
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                            <div className="movie-info">
                                <h3>{movie.title}</h3>
                                <p>⭐ {movie.vote_average}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* New Movies */}
            <section className="category-section now-playing-section">
                <h2 className="section-title">Now Playing</h2>
                <div className="movie-grid horizontal-scroll">
                    {newMovies.slice(0, 10).map((movie, index) => (
                        <div
                            key={movie.id}
                            className={`movie-card now-playing zoom-in delay-${index}`}
                            onClick={() => navigate(`/movie/${movie.id}`)}
                        >
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                            <div className="movie-info">
                                <h3>{movie.title}</h3>
                                <p>⭐ {movie.vote_average}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Coming Soon Section */}
            <section
                className="coming-soon animated-bg enhanced-coming-soon"
                style={{
                    backgroundImage: `url('https://image.tmdb.org/t/p/original${trendingMovies[0]?.backdrop_path}')`,
                }}
            >
                <div className="coming-overlay">
                    <div className="countdown-wrapper">
                        <h4>Releases In</h4>
                        <div className="countdown">
                            <span>{String(timeLeft.days).padStart(2, "0")}</span>:<span>{String(timeLeft.hours).padStart(2, "0")}</span>:
                            <span>{String(timeLeft.minutes).padStart(2, "0")}</span>:<span>{String(timeLeft.seconds).padStart(2, "0")}</span>
                        </div>
                    </div>
                    <div className="coming-title glow">
                        AVENGERS: <strong>ENDGAME</strong>
                    </div>
                    <p className="coming-description fade-in">
                        After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the
                        Avengers assemble once more to reverse Thanos’ actions.
                    </p>
                    <button className="book-btn pulse">Book Ticket</button>
                </div>
            </section>
        </div>
    );
};

export default Home;
