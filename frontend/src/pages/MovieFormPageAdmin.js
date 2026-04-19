import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../utils/axiosConfig';
import AdminSidebar from '../components/AdminSidebar';

const MovieFormPageAdmin = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        genre: '',
        duration: '',
        posterUrl: '',
        showtimes: [] 
    });

    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formDataPayload = new FormData();
        formDataPayload.append('image', file);
        setUploading(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };
            const { data } = await api.post('/upload', formDataPayload, config);
            // Prefix with backend URL if needed, but here we assume proxy/relative works
            setFormData({ ...formData, posterUrl: data });
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
            alert('Upload failed');
        }
    };

    useEffect(() => {
        if (isEditMode) {
            const fetchMovie = async () => {
                try {
                    const { data } = await api.get(`/movies/${id}`);
                    setFormData({
                        title: data.title,
                        description: data.description,
                        genre: data.genre,
                        duration: data.duration,
                        posterUrl: data.posterUrl,
                        showtimes: data.showtimes || []
                    });
                } catch (err) {
                    alert('Error loading movie data');
                }
            };
            fetchMovie();
        }
    }, [id, isEditMode]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const config = {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        };

        try {
            if (isEditMode) {
                await api.put(`/movies/${id}`, formData, config);
                alert('Movie Updated Successfully!');
            } else {
                await api.post('/movies', formData, config);
                alert('Movie Added Successfully!');
            }
            navigate('/admin/movielist');
        } catch (err) {
            alert('Failed to save movie.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-layout">
            <AdminSidebar />
            <main className="admin-main-content">
                <header className="admin-header-flex">
                    <h1 className="dashboard-title">{isEditMode ? 'Edit Movie' : 'Add New Movie'}</h1>
                </header>

                <div className="admin-form-container" style={{background: '#1e293b', padding: '30px', borderRadius: '16px', maxWidth: '800px'}}>
                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label>Movie Title</label>
                            <input 
                                type="text" 
                                value={formData.title} 
                                onChange={(e) => setFormData({...formData, title: e.target.value})} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label>Poster URL or Upload</label>
                            <input 
                                type="text" 
                                value={formData.posterUrl} 
                                onChange={(e) => setFormData({...formData, posterUrl: e.target.value})} 
                                placeholder="Enter image URL"
                                required 
                            />
                            <div style={{marginTop: '10px'}}>
                                <input 
                                    type="file" 
                                    id="image-file" 
                                    onChange={uploadFileHandler} 
                                    style={{fontSize: '0.8rem', color: '#94a3b8'}}
                                />
                                {uploading && <p style={{color: 'var(--color-primary)', fontSize: '0.8rem'}}>Uploading...</p>}
                            </div>
                        </div>
                        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
                            <div className="form-group">
                                <label>Genre</label>
                                <input 
                                    type="text" 
                                    value={formData.genre} 
                                    onChange={(e) => setFormData({...formData, genre: e.target.value})} 
                                />
                            </div>
                            <div className="form-group">
                                <label>Duration (mins)</label>
                                <input 
                                    type="number" 
                                    value={formData.duration} 
                                    onChange={(e) => setFormData({...formData, duration: e.target.value})} 
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea 
                                style={{width: '100%', background: 'rgba(15,23,42,0.6)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '15px'}}
                                rows="4"
                                value={formData.description} 
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                required
                            ></textarea>
                        </div>
                        
                        <button type="submit" className="btn-auth" disabled={loading}>
                            {loading ? 'Saving...' : (isEditMode ? 'Update Movie' : 'Save Movie')}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default MovieFormPageAdmin;
