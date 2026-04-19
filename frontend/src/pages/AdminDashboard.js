import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/axiosConfig';
import AdminSidebar from '../components/AdminSidebar';

const AdminDashboard = () => {
    const [metrics, setMetrics] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMetrics = async () => {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (!userInfo || !userInfo.isAdmin) {
                navigate('/');
                return;
            }

            try {
                const config = {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                };
                const { data } = await api.get('/admin/metrics', config);
                setMetrics(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch dashboard data.');
                setLoading(false);
            }
        };

        fetchMetrics();
    }, [navigate]);

    if (loading) return <div className="loading-container">Loading Admin Portal...</div>;
    if (error) return <div className="error-message">{error}</div>;

    const { totalUsers, totalMovies, totalBookings, latestBookings } = metrics;

    return (
        <div className="admin-layout">
            <AdminSidebar />
            
            <main className="admin-main-content">
                <header className="admin-header-flex">
                    <h1 className="dashboard-title">Dashboard Overview</h1>
                    <div className="admin-date">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                </header>
                
                {/* Metric Cards */}
                <div className="metrics-grid">
                    <div className="metric-card">
                        <h3>Total Registered Users</h3>
                        <p className="metric-value">{totalUsers}</p>
                    </div>
                    <div className="metric-card">
                        <h3>Movies in Catalog</h3>
                        <p className="metric-value">{totalMovies}</p>
                    </div>
                    <div className="metric-card">
                        <h3>Total Bookings Value</h3>
                        <p className="metric-value">{totalBookings}</p>
                    </div>
                </div>

                {/* Latest Bookings Section */}
                <div className="latest-bookings-panel">
                    <div className="admin-table-header">
                        <h2>Recent Booking Activity</h2>
                        <button className="btn-outline btn-sm" onClick={() => navigate('/admin/bookings')}>View All</button>
                    </div>
                    <table className="bookings-table">
                        <thead>
                            <tr>
                                <th>Booking ID</th>
                                <th>Movie Name</th>
                                <th>Customer</th>
                                <th>Status</th>
                                <th>Total</th>
                                <th>Date & Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {latestBookings && latestBookings.length > 0 ? (
                                latestBookings.map((booking) => (
                                    <tr key={booking._id}>
                                        <td style={{fontWeight: '600'}}>#{booking._id.slice(-6).toUpperCase()}</td>
                                        <td>{booking.movieId ? booking.movieId.title : 'Movie Deleted'}</td>
                                        <td>{booking.userId ? booking.userId.name : 'Guest User'}</td>
                                        <td>
                                            <span className={`status-pill ${booking.status?.toLowerCase() || 'pending'}`}>
                                                {booking.status || 'Pending'}
                                            </span>
                                        </td>
                                        <td>₹{booking.totalPrice || 0}</td>
                                        <td>{booking.createdAt ? new Date(booking.createdAt).toLocaleString() : 'N/A'}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="6" style={{textAlign: 'center', padding: '40px'}}>No recent activity found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};
export default AdminDashboard;