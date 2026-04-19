import React, { useState, useEffect } from 'react';
import api from '../utils/axiosConfig';
import MovieCard from '../components/MovieCard';

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [genre, setGenre] = useState('All');

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await api.get('/movies');
                setMovies(response.data);
                setFiltered(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load movies. Server error.');
                setLoading(false);
            }
        };
        fetchMovies();
    }, []);

    useEffect(() => {
        let result = movies;
        if (search.trim()) {
            result = result.filter(m =>
                m.title.toLowerCase().includes(search.toLowerCase()) ||
                (m.genre && m.genre.toLowerCase().includes(search.toLowerCase()))
            );
        }
        if (genre !== 'All') {
            result = result.filter(m => m.genre && m.genre.toLowerCase().includes(genre.toLowerCase()));
        }
        setFiltered(result);
    }, [search, genre, movies]);

    const genres = ['All', 'Action', 'Sci-Fi', 'Drama', 'Thriller', 'Adventure', 'Fantasy', 'Crime'];

    if (loading) return (
        <div className="loading-message">
            <div className="loading-spinner"></div>
            <span>Loading Movies...</span>
        </div>
    );
    if (error) return <h2 style={{ color: 'red', textAlign: 'center', padding: '2rem' }}>{error}</h2>;

    return (
        <div>
            {/* Hero Section */}
            <div className="hero-section">
                <div className="hero-content">
                    <div className="hero-badge">🎬 Now Showing</div>
                    <h1 className="hero-title">ShowTime,<br /><span className="hero-title-accent">Your Premium Experience</span></h1>
                    <p className="hero-subtitle">Book tickets for the latest blockbusters. Real-time seat selection, instant confirmation, and e-tickets delivered right to you.</p>
                    <div className="hero-search-bar">
                        <span className="hero-search-icon">🔍</span>
                        <input
                            type="text"
                            placeholder="Search movies, genres..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="hero-search-input"
                        />
                    </div>
                    <div className="hero-stats">
                        <div className="hero-stat"><span className="hero-stat-num">{movies.length}+</span><span>Movies</span></div>
                        <div className="hero-stat-divider"></div>
                        <div className="hero-stat"><span className="hero-stat-num">6</span><span>Screens</span></div>
                        <div className="hero-stat-divider"></div>
                        <div className="hero-stat"><span className="hero-stat-num">4DX</span><span>Available</span></div>
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="hero-film-strip">
                        {movies.slice(0, 3).map((m, i) => (
                            <div key={m._id} className={`hero-poster-float hero-poster-${i + 1}`}>
                                <img src={m.posterUrl} alt={m.title} onError={e => e.target.src='/placeholder.jpg'} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Genre Filter */}
            <div className="homepage-container">
                <div className="genre-filter-bar">
                    {genres.map(g => (
                        <button
                            key={g}
                            className={`genre-chip ${genre === g ? 'active' : ''}`}
                            onClick={() => setGenre(g)}
                        >
                            {g}
                        </button>
                    ))}
                </div>

                <div className="section-header">
                    <h2 className="section-title-main">
                        {genre === 'All' && !search ? '🎥 All Movies' : `🔎 Results (${filtered.length})`}
                    </h2>
                </div>

                <div className="movie-list-grid">
                    {filtered.length > 0 ? (
                        filtered.map((movie) => (
                            <MovieCard key={movie._id} movie={movie} />
                        ))
                    ) : (
                        <div className="no-results">
                            <span>🎭</span>
                            <p>No movies found. Try a different search.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;