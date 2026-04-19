import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/axiosConfig';
import AdminSidebar from '../components/AdminSidebar';

const MovieListPageAdmin = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchMovies = useCallback(async () => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/');
            return;
        }
        
        try {
            const config = {
                headers: { Authorization: `Bearer ${userInfo.token}` },
            };
            const { data } = await api.get('/movies', config);
            setMovies(data);
            setLoading(false);
        } catch (err) {
            setError('Failed to load movies.');
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]);

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this movie?')) {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            try {
                const config = {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                };
                await api.delete(`/movies/${id}`, config);
                alert('Movie Deleted!');
                fetchMovies(); 
            } catch (err) {
                alert('Failed to delete movie.');
            }
        }
    };
    
    if (loading) return <div className="loading-container">Loading Admin Panel...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="admin-layout">
            <AdminSidebar />
            
            <main className="admin-main-content">
                <header className="admin-header-flex" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px'}}>
                    <h1 className="dashboard-title" style={{marginBottom: 0}}>Catalog Management</h1>
                    <button className="btn-primary" onClick={() => navigate('/admin/movie/add')}>
                        + Add New Movie
                    </button>
                </header>

                <div className="admin-movie-list-page">
                    <table className="movie-table">
                        <thead>
                            <tr>
                                <th>Poster</th>
                                <th>Movie Title</th>
                                <th>Active Showtimes</th>
                                <th>Release Date</th>
                                <th style={{textAlign: 'right'}}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {movies.map((movie) => (
                                <tr key={movie._id}>
                                    <td>
                                        <img src={movie.posterUrl} alt={movie.title} style={{width: '40px', height: '60px', borderRadius: '4px', objectFit: 'cover'}} />
                                    </td>
                                    <td style={{fontWeight: '600'}}>{movie.title}</td>
                                    <td>{movie.showtimes.length} Shows</td>
                                    <td>{movie.releaseDate ? new Date(movie.releaseDate).toLocaleDateString() : 'N/A'}</td>
                                    <td style={{textAlign: 'right'}}>
                                        <button 
                                            className="btn-action edit" 
                                            onClick={() => navigate(`/admin/movie/edit/${movie._id}`)}
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            className="btn-action delete" 
                                            onClick={() => deleteHandler(movie._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};
export default MovieListPageAdmin;