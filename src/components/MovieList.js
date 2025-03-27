import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/movieList.css";

const MovieList = () => {
    const [movies, setMovies] = useState({});
    const [category, setCategory] = useState("trending");
    const [filteredMovies, setFilteredMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMovies(category);
    }, [category]);

    const fetchMovies = async (selectedCategory) => {
        if (movies[selectedCategory]) {
            setFilteredMovies(movies[selectedCategory]);
            return;
        }

        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${selectedCategory}?api_key=feec295a7d623037a27dc6e600040c5b&language=en-US&page=1`
            );
            setMovies((prevMovies) => ({ ...prevMovies, [selectedCategory]: response.data.results }));
            setFilteredMovies(response.data.results);
        } catch (error) {
            console.error("Error fetching movies", error);
        }
    };

    return (
        <div className="movie-list-container">
            <h1 className="title">Now Showing</h1>
            <div className="filters">
                <button onClick={() => setCategory("popular")} className={category === "popular" ? "active" : ""}>
                    Popular
                </button>
                <button onClick={() => setCategory("now_playing")} className={category === "now_playing" ? "active" : ""}>
                    Now Playing
                </button>
                <button onClick={() => setCategory("upcoming")} className={category === "upcoming" ? "active" : ""}>
                    Upcoming
                </button>
            </div>
            <div className="wide-grid">
                {filteredMovies.map((movie, index) => (
                    <div
                        key={movie.id}
                        className="rectangle-card"
                        style={{ animationDelay: `${0.2 + index * 0.2}s` }}
                        onClick={() => navigate(`/movie/${movie.id}`)}
                    >
                        <img className="movie-poster-rectangle" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                        <div className="movie-info-rectangle">
                            <h3 className="movie-title-rectangle">{movie.title}</h3>
                            {movie.vote_average && <p className="movie-details">Rating: ⭐ {movie.vote_average}</p>}
                            {movie.overview && <p className="movie-description">{movie.overview.slice(0, 180)}...</p>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieList;
