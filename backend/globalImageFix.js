const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Movie = require('./models/MovieModel');

dotenv.config();

const posterMap = {
    'Dune: Part Two': 'https://img.youtube.com/vi/Way9Dexny3w/maxresdefault.jpg',
    'Oppenheimer': 'https://img.youtube.com/vi/uYPbbksJxIg/maxresdefault.jpg',
    'Interstellar': 'https://img.youtube.com/vi/zSWdZVtXT7E/maxresdefault.jpg',
    'The Dark Knight': 'https://img.youtube.com/vi/EXeTwQWrcwY/maxresdefault.jpg',
    'Inception': 'https://img.youtube.com/vi/YoHD9XEInc0/maxresdefault.jpg',
    'Avatar: The Way of Water': 'https://img.youtube.com/vi/d9MyW72ELq0/maxresdefault.jpg',
    'Spider-Man: No Way Home': 'https://img.youtube.com/vi/JfVOs4VSpmA/maxresdefault.jpg'
};

const updateAllPosters = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const allMovies = await Movie.find({});
        console.log(`Found ${allMovies.length} movies in database.`);

        for (const movie of allMovies) {
            const realPoster = posterMap[movie.title];
            if (realPoster) {
                movie.posterUrl = realPoster;
                movie.image = realPoster; // Keep both for safety
                await movie.save();
                console.log(`✅ Fixed: ${movie.title}`);
            } else {
                // If movie not in our map, give it a high-quality movie background fallback
                movie.posterUrl = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop';
                await movie.save();
                console.log(`⚠️ Fallback applied: ${movie.title}`);
            }
        }

        console.log('Global Image Restoration Complete!');
        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

updateAllPosters();
