const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Movie = require('./models/MovieModel');

dotenv.config();

const movies = [
    {
        title: 'Dune: Part Two',
        posterUrl: 'https://image.tmdb.org/t/p/w500/czembS0R7vdyU9vLeC9vV3cy6rn.jpg',
        description: 'Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.',
        genre: 'Sci-Fi, Adventure',
        duration: 166,
        averageRating: 4.8,
        showtimes: [
            { date: new Date(), time: '10:00 AM', screenDetails: { screenName: 'IMAX 1', rows: 10, cols: 12, totalCapacity: 120 }, bookedSeats: [], pendingSeats: [] }
        ]
    },
    {
        title: 'Oppenheimer',
        posterUrl: 'https://image.tmdb.org/t/p/w500/8Gxv8YSbtUQwbaKJNBq0ZtI9fsQ.jpg',
        description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
        genre: 'Drama, History',
        duration: 180,
        averageRating: 4.5,
        showtimes: [
            { date: new Date(), time: '02:00 PM', screenDetails: { screenName: 'Screen 2', rows: 10, cols: 15, totalCapacity: 150 }, bookedSeats: [], pendingSeats: [] }
        ]
    },
    {
        title: 'Inception',
        posterUrl: 'https://image.tmdb.org/t/p/w500/9gk7Fn9sVAsS9Te6B1M1uI0STDe.jpg',
        description: 'A thief who steals corporate secrets through the use of dream-sharing technology.',
        genre: 'Action, Sci-Fi',
        duration: 148,
        averageRating: 4.7,
        showtimes: [
            { date: new Date(), time: '01:00 PM', screenDetails: { screenName: 'Screen 3', rows: 8, cols: 12, totalCapacity: 96 }, bookedSeats: [], pendingSeats: [] }
        ]
    },
    {
        title: 'Interstellar',
        posterUrl: 'https://image.tmdb.org/t/p/w500/gEU2QniE6EwfVDxCzs25vQO2Yq9.jpg',
        description: 'A team of researchers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
        genre: 'Sci-Fi, Drama',
        duration: 169,
        averageRating: 4.9,
        showtimes: [
            { date: new Date(), time: '04:00 PM', screenDetails: { screenName: 'IMAX 1', rows: 10, cols: 12, totalCapacity: 120 }, bookedSeats: [], pendingSeats: [] }
        ]
    },
    {
        title: 'The Dark Knight',
        posterUrl: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDp9QEQvTlvqSfwiofw.jpg',
        description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest tests.',
        genre: 'Action, Crime, Drama',
        duration: 152,
        averageRating: 4.9,
        showtimes: [
            { date: new Date(), time: '08:00 PM', screenDetails: { screenName: 'Screen 1', rows: 10, cols: 15, totalCapacity: 150 }, bookedSeats: [], pendingSeats: [] }
        ]
    }
];

const forceResetMovies = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
        
        for (const m of movies) {
            // Force Delete existing to avoid conflicts
            await Movie.deleteMany({ title: m.title });
            await Movie.create(m);
            console.log(`Re-created: ${m.title}`);
        }
        
        console.log('Database Force-Reset Complete!');
        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

forceResetMovies();
