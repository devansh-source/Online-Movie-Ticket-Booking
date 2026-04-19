const socketIo = require('socket.io');

// Initialize Socket.IO with the server
let io;

const initSocket = (server) => {
    const allowedOrigins = [
        'http://localhost:3000',
        'https://online-movie-ticket-booking-frontend-pj7x2q9y2.vercel.app',
        'https://online-movie-ticket-booking-frontend-46lsu9qbo.vercel.app',
    ];
    io = socketIo(server, {
        cors: {
            origin: allowedOrigins,
            methods: ['GET', 'POST'],
        },
    });

    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        // Join a room based on showtime ID for real-time seat updates
        socket.on('join-showtime', (showtimeId) => {
            socket.join(showtimeId);
            console.log(`User ${socket.id} joined showtime room: ${showtimeId}`);
        });

        // Leave room on disconnect
        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });

    return io;
};

// Function to emit seat updates to a specific showtime room
const emitSeatUpdate = (showtimeId, updatedSeats) => {
    if (io) {
        io.to(showtimeId).emit('seat-update', updatedSeats);
    }
};

module.exports = { initSocket, emitSeatUpdate };
