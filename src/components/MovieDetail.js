import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/MovieDetail.css";

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [similarMovies, setSimilarMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=feec295a7d623037a27dc6e600040c5b&append_to_response=videos,credits`
                );
                setMovie(response.data);

                // Fetch similar movies (limit to 4)
                const similarResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=feec295a7d623037a27dc6e600040c5b`);
                setSimilarMovies(similarResponse.data.results.slice(0, 4));
            } catch (error) {
                console.error("Error fetching movie details:", error);
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (!movie) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="movie-detail-container">
            {/* Movie Trailer */}
            {movie.videos?.results.length > 0 && (
                <div className="trailer-container">
                    <iframe src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`} title="Movie Trailer" allowFullScreen></iframe>
                </div>
            )}

            {/* Movie Info Section */}
            <div className="movie-info-container">
                {/* LEFT: Poster */}
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="movie-poster" />

                {/* RIGHT: All Info stacked vertically */}
                <div className="movie-details-right">
                    <h2>{movie.title}</h2>
                    <p className="rating">⭐ {movie.vote_average.toFixed(1)}</p>
                    <p className="overview">{movie.overview}</p>

                    <div className="genre-container">
                        <strong>🎭 Genres:</strong> {movie.genres.map((genre) => genre.name).join(", ")}
                    </div>

                    <div className="cast-container">
                        <h3>Cast</h3>
                        <div className="cast-list">
                            {movie.credits?.cast.slice(0, 5).map((actor) => (
                                <div key={actor.id} className="cast-card">
                                    {actor.profile_path && <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt={actor.name} />}
                                    <span>{actor.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="book-btn-wrapper">
                        <button className="book-ticket" onClick={() => navigate(`/booking/${movie.id}`, { state: { movie } })}>
                            🎟️ Book Ticket
                        </button>
                    </div>
                </div>
            </div>

            {/* Similar Movies Section */}
            <div className="recommended-movies">
                <h3>Similar Movies</h3>
                <div className="recommended-grid">
                    {similarMovies.map((similar) => (
                        <div key={similar.id} className="recommended-card">
                            <img src={`https://image.tmdb.org/t/p/w200${similar.poster_path}`} alt={similar.title} />
                            <span>{similar.title}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
