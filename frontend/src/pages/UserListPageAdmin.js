import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/axiosConfig';
import AdminSidebar from '../components/AdminSidebar';

const UserListPageAdmin = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchUsers = useCallback(async () => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/');
            return;
        }
        
        try {
            const config = {
                headers: { Authorization: `Bearer ${userInfo.token}` },
            };
            const { data } = await api.get('/users', config);
            setUsers(data);
            setLoading(false);
        } catch (err) {
            setError('Failed to load users.');
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    if (loading) return <div className="loading-container">Loading User Records...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="admin-layout">
            <AdminSidebar />
            
            <main className="admin-main-content">
                <header className="admin-header-flex">
                    <h1 className="dashboard-title">User Management</h1>
                </header>

                <div className="admin-table-container">
                    <table className="movie-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Wallet</th>
                                <th>Tier</th>
                                <th style={{textAlign: 'right'}}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u) => (
                                <tr key={u._id}>
                                    <td style={{fontWeight: '600'}}>{u.name}</td>
                                    <td>{u.email}</td>
                                    <td>
                                        <span className={`status-pill ${u.isAdmin ? 'confirmed' : 'pending'}`} style={{background: u.isAdmin ? 'var(--color-primary)' : '#1e293b'}}>
                                            {u.isAdmin ? 'Admin' : 'User'}
                                        </span>
                                    </td>
                                    <td>₹{u.walletBalance || 0}</td>
                                    <td>{u.membershipTier || 'Basic'}</td>
                                    <td style={{textAlign: 'right'}}>
                                        <button className="btn-action edit" onClick={() => alert(`View Profile: ${u.name}`)}>Profile</button>
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

export default UserListPageAdmin;
