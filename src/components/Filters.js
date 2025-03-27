import React from "react";
import "../styles/styles.css";

const Filters = ({ filterMovies }) => {
    return (
        <div className="filters">
            <button onClick={() => filterMovies("all")}>All Movies</button>
            <button onClick={() => filterMovies("date")}>By Date</button>
            <button onClick={() => filterMovies("comingSoon")}>Coming Soon</button>
        </div>
    );
};

export default Filters;
