import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/axiosConfig';
import AdminSidebar from '../components/AdminSidebar';

const BookingListPageAdmin = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchBookings = useCallback(async () => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/');
            return;
        }
        
        try {
            const config = {
                headers: { Authorization: `Bearer ${userInfo.token}` },
            };
            const { data } = await api.get('/bookings', config);
            setBookings(data);
            setLoading(false);
        } catch (err) {
            setError('Failed to load bookings.');
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        fetchBookings();
    }, [fetchBookings]);

    if (loading) return <div className="loading-container">Loading Bookings...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="admin-layout">
            <AdminSidebar />
            
            <main className="admin-main-content">
                <header className="admin-header-flex">
                    <h1 className="dashboard-title">System-wide Bookings</h1>
                </header>

                <div className="admin-table-container">
                    <table className="movie-table">
                        <thead>
                            <tr>
                                <th>Booking ID</th>
                                <th>Movie</th>
                                <th>User</th>
                                <th>Status</th>
                                <th>Total Price</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking) => (
                                <tr key={booking._id}>
                                    <td style={{fontWeight: '600'}}>#{booking._id.slice(-6).toUpperCase()}</td>
                                    <td>{booking.movieId?.title || 'Deleted Movie'}</td>
                                    <td>{booking.userId?.name || 'Guest User'}</td>
                                    <td>
                                        <span className={`status-pill ${booking.status?.toLowerCase() || 'pending'}`}>
                                            {booking.status || 'Pending'}
                                        </span>
                                    </td>
                                    <td>₹{booking.totalPrice}</td>
                                    <td>{new Date(booking.createdAt).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default BookingListPageAdmin;
