import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const Header = () => {
    const [user, setUser] = useState(null); // Use a user object to store name and admin status
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const userInfo = localStorage.getItem('userInfo');
            if (userInfo) {
                setUser(JSON.parse(userInfo));
            } else {
                setUser(null);
            }
        } catch (e) {
            console.warn('localStorage access blocked or invalid data');
            setUser(null);
        }
    }, [navigate]); // Re-run effect when navigation state changes

    const logoutHandler = () => {
        localStorage.removeItem('userInfo'); // Clear stored user data
        setUser(null);
        navigate('/login');
    };

    const isAdmin = user && user.isAdmin;
    const userName = user ? user.name : '';

    return (
        <header className="main-header">
            <nav className="nav-container">
                <Link to="/" className="logo">ShowTime <span>🎟️</span></Link>
                <div className="nav-links">
                    <NavLink to="/movies" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Movies</NavLink>
                    
                    {isAdmin && (
                        <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? 'nav-item admin-link active' : 'nav-item admin-link'}>Dashboard</NavLink>
                    )}
                    
                    {userName ? (
                        <>
                            <NavLink to="/mybookings" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>My Bookings</NavLink>
                            <span className="welcome-user">Welcome, {userName}</span>
                            <button onClick={logoutHandler} className="btn-logout">Logout</button>
                        </>
                    ) : (
                        <div className="auth-nav-group">
                            <NavLink to="/login" className={({ isActive }) => isActive ? 'nav-item login-link active' : 'nav-item login-link'}>Sign In</NavLink>
                            <Link to="/register" className="btn-primary nav-register-btn">Register</Link>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;