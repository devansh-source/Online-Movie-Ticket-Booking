const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Movie = require('./models/MovieModel');

dotenv.config();

const movies = [
    {
        title: 'Dune: Part Two',
        posterUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/czembS0R7vdyU9vLeC9vV3cy6rn.jpg',
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
        posterUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/8Gxv8YSbtUQwbaKJNBq0ZtI9fsQ.jpg',
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
        posterUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/9gk7Fn9sVAsS9Te6B1M1uI0STDe.jpg',
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
        posterUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/gEU2QniE6EwfVDxCzs25vQO2Yq9.jpg',
        description: 'When Earth becomes uninhabitable, a farmer and ex-pilot is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.',
        genre: 'Sci-Fi, Drama',
        duration: 169,
        averageRating: 4.9,
        showtimes: [
            { date: new Date(), time: '04:00 PM', screenDetails: { screenName: 'IMAX 1', rows: 10, cols: 12, totalCapacity: 120 }, bookedSeats: [], pendingSeats: [] }
        ]
    },
    {
        title: 'The Dark Knight',
        posterUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/qJ2tW6WMUDp9QEQvTlvqSfwiofw.jpg',
        description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
        genre: 'Action, Crime, Drama',
        duration: 152,
        averageRating: 4.9,
        showtimes: [
            { date: new Date(), time: '08:00 PM', screenDetails: { screenName: 'Screen 1', rows: 10, cols: 15, totalCapacity: 150 }, bookedSeats: [], pendingSeats: [] }
        ]
    }
];

const seedMovies = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
        
        // Add movies only if they don't exist
        for (const m of movies) {
            const exists = await Movie.findOne({ title: m.title });
            if (exists) {
                // Update existing
                exists.posterUrl = m.posterUrl;
                exists.description = m.description;
                exists.genre = m.genre;
                await exists.save();
                console.log(`Updated: ${m.title}`);
            } else {
                await Movie.create(m);
                console.log(`Added: ${m.title}`);
            }
        }
        
        console.log('Database seeded successfully!');
        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

seedMovies();
