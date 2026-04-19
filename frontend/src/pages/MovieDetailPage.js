import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/axiosConfig';
import SeatSelector from '../components/SeatSelector';
import ReviewForm from '../components/ReviewForm';
import ReviewsList from '../components/ReviewsList';

const MovieDetailPage = () => {
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedShowtime, setSelectedShowtime] = useState(null);
    const [reviews, setReviews] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    const fetchMovie = async () => {
        try {
            const { data } = await api.get(`/movies/${id}`);
            setMovie(data);
            setLoading(false);
        } catch (err) {
            setError('Movie not found or server error.');
            setLoading(false);
        }
    };

    const fetchReviews = async () => {
        try {
            const { data } = await api.get(`/reviews/${id}`);
            setReviews(data);
        } catch (err) {
            console.error('Failed to load reviews:', err);
        }
    };

    useEffect(() => {
        fetchMovie();
        fetchReviews();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const handleShowtimeSelect = (showtime) => {
        setSelectedShowtime(showtime);
        window.scrollTo(0, document.body.scrollHeight);
    };

    const handleImageError = (e) => {
        e.target.src = '/placeholder.jpg';
    };

    // Check if user is logged in to decide whether to show ReviewForm
    let isLoggedIn = false;
    try {
        isLoggedIn = !!localStorage.getItem('userInfo');
    } catch (e) {}

    if (loading) return <div className="loading">Loading movie details...</div>;
    if (error) return <div className="error-message">{error}</div>;
    if (!movie) return <div className="not-found">Movie not available.</div>;

    return (
        <div className="movie-detail-page">
            <div className="detail-header">
                <img src={movie.posterUrl} alt={movie.title} className="detail-poster" onError={handleImageError} />
                <div className="detail-info">
                    <h1>{movie.title}</h1>
                    <p className="detail-genre">Genre: {movie.genre || 'N/A'}</p>
                    <p className="detail-duration">Duration: {movie.duration} minutes</p>
                    {movie.averageRating > 0 && (
                        <p className="detail-rating">⭐ Rating: {movie.averageRating.toFixed(1)} / 5</p>
                    )}
                    <p className="detail-description">{movie.description}</p>
                </div>
            </div>

            <div className="showtime-section">
                <h2>Available Showtimes</h2>
                <div className="showtime-list">
                    {movie.showtimes && movie.showtimes.length > 0 ? (
                        movie.showtimes.map((showtime) => (
                            <button
                                key={showtime._id}
                                className={`showtime-btn ${selectedShowtime?._id === showtime._id ? 'selected' : ''}`}
                                onClick={() => handleShowtimeSelect(showtime)}
                            >
                                <span className="showtime-time">{showtime.time}</span>
                                <span className="showtime-date">{new Date(showtime.date).toLocaleDateString()}</span>
                                <span className="showtime-screen">{showtime.screenDetails?.screenName || 'Screen N/A'}</span>
                            </button>
                        ))
                    ) : (
                        <p>No showtimes available for this movie.</p>
                    )}
                </div>
            </div>

            {selectedShowtime && (
                <SeatSelector
                    movie={movie}
                    showtime={selectedShowtime}
                    navigate={navigate}
                />
            )}

            {/* Reviews Section */}
            <div className="reviews-section">
                <ReviewsList reviews={reviews} />
                {isLoggedIn && (
                    <ReviewForm movieId={id} onReviewAdded={fetchReviews} />
                )}
                {!isLoggedIn && (
                    <p className="login-to-review">
                        <span onClick={() => navigate('/login')} style={{ cursor: 'pointer', color: '#e63946', textDecoration: 'underline' }}>
                            Sign in
                        </span> to leave a review.
                    </p>
                )}
            </div>
        </div>
    );
};

export default MovieDetailPage;