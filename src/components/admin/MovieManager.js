// MovieManager.js (fixed to use sessionStorage instead of axios)
import React, { useEffect, useState } from "react";
import "./MovieManager.css";

const MovieManager = () => {
    const [movies, setMovies] = useState([]);
    const [newMovie, setNewMovie] = useState({ title: "", date: "", timings: "" });

    useEffect(() => {
        const stored = JSON.parse(sessionStorage.getItem("adminMovies")) || [];
        setMovies(stored);
    }, []);

    const saveToStorage = (updated) => {
        sessionStorage.setItem("adminMovies", JSON.stringify(updated));
        setMovies(updated);
    };

    const handleAddMovie = () => {
        if (!newMovie.title) return;
        const newEntry = { ...newMovie, id: Date.now() };
        const updated = [...movies, newEntry];
        saveToStorage(updated);
        setNewMovie({ title: "", date: "", timings: "" });
    };

    const handleDelete = (id) => {
        const updated = movies.filter((m) => m.id !== id);
        saveToStorage(updated);
    };

    return (
        <div className="movie-manager">
            <h3>Manage Movies</h3>
            <div className="form-group">
                <input placeholder="Title" value={newMovie.title} onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })} />
                <input placeholder="Date" value={newMovie.date} onChange={(e) => setNewMovie({ ...newMovie, date: e.target.value })} />
                <input
                    placeholder="Timings (e.g. 9.30am, 1.30pm)"
                    value={newMovie.timings}
                    onChange={(e) => setNewMovie({ ...newMovie, timings: e.target.value })}
                />
                <button onClick={handleAddMovie}>Add Movie</button>
            </div>
            <ul className="movie-list">
                {movies.map((movie) => (
                    <li key={movie.id} className="movie-item">
                        <div className="movie-info">
                            <strong>{movie.title}</strong> | {movie.date} | {movie.timings}
                        </div>
                        <button className="delete-btn" onClick={() => handleDelete(movie.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MovieManager;
