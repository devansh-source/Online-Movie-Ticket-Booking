import axios from 'axios';

// Use the live Render URL for production, otherwise use localhost
const baseURL = process.env.NODE_ENV === 'production'
    ? 'https://online-movie-ticket-booking-backend.onrender.com/api'
    : 'http://localhost:5000/api';

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically attach JWT token from localStorage to every request
api.interceptors.request.use(
  (config) => {
    try {
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
        const parsed = JSON.parse(userInfo);
        if (parsed?.token) {
          config.headers.Authorization = `Bearer ${parsed.token}`;
        }
      }
    } catch (e) {
      // localStorage blocked or invalid data, proceed without token
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;