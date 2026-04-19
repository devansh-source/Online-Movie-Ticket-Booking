import React from 'react';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
    const navigate = useNavigate();

    // Self-healing logic: Check multiple possible fields for the image URL
    const posterUrl = movie.posterUrl || movie.image || movie.poster || '/placeholder.jpg';

    const handleImageError = (e) => {
        // Fallback to a plain dark cinematic background if even YouTube fails
        e.target.src = 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop'; 
    };

    return (
        <div className="movie-card" onClick={() => navigate(`/movie/${movie._id}`)}>
            <img src={posterUrl} alt={movie.title} className="movie-poster" onError={handleImageError} />
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>Genre: {movie.genre || 'N/A'}</p>
                <button className="book-btn">View Showtimes</button>
            </div>
        </div>
    );
};

export default MovieCard;