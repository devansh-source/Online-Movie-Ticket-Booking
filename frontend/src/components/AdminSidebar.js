import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminSidebar = () => {
    return (
        <aside className="admin-sidebar">
            <div className="admin-sidebar-header">
                <h2>ShowTime Admin</h2>
            </div>
            <nav className="sidebar-nav">
                <NavLink 
                    to="/admin/dashboard" 
                    className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
                >
                    <span className="sidebar-icon">📊</span> Dashboard
                </NavLink>
                <NavLink 
                    to="/admin/movielist" 
                    className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
                >
                    <span className="sidebar-icon">🎬</span> Manage Movies
                </NavLink>
                <NavLink 
                    to="/admin/bookings" 
                    className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
                >
                    <span className="sidebar-icon">🎫</span> All Bookings
                </NavLink>
                <NavLink 
                    to="/admin/users" 
                    className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
                >
                    <span className="sidebar-icon">👥</span> Manage Users
                </NavLink>
            </nav>
        </aside>
    );
};

export default AdminSidebar;
