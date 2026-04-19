const asyncHandler = require('express-async-handler');
const Movie = require('../models/MovieModel'); // Ensure this imports the Movie model

// @desc    Fetch all movies
// @route   GET /api/movies
// @access  Public
const getMovies = asyncHandler(async (req, res) => {
    let movies = await Movie.find({});

    // --- TEMPORARY FIX: INSERT DUMMY DATA IF DB IS EMPTY ---
        if (movies.length === 0) {
        console.log("Database is empty. Inserting dummy movies for testing...");

        const dummyMovies = [
            {
                title: "Inception",
                description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project.",
                genre: "Sci-Fi, Thriller",
                duration: 148,
                posterUrl: "https://image.tmdb.org/t/p/w500/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg",
                showtimes: [
                    {
                        time: "14:30",
                        date: new Date(Date.now() + 86400000),
                        screenDetails: { screenName: "Screen 3 - Standard", rows: 8, cols: 10, totalCapacity: 80 },
                        bookedSeats: ["A1", "A2", "B5"]
                    },
                    {
                        time: "19:00",
                        date: new Date(Date.now() + 86400000),
                        screenDetails: { screenName: "Screen 5 - Premium", rows: 10, cols: 15, totalCapacity: 150 },
                        bookedSeats: ["C1", "C2", "C3", "H15"]
                    },
                    {
                        time: "22:30",
                        date: new Date(Date.now() + 172800000),
                        screenDetails: { screenName: "Screen 2 - Standard", rows: 8, cols: 12, totalCapacity: 96 },
                        bookedSeats: []
                    }
                ]
            },
            {
                title: "Dune: Part Two",
                description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. He faces a choice between the love of his life and the fate of the known universe.",
                genre: "Sci-Fi, Adventure",
                duration: 166,
                posterUrl: "https://image.tmdb.org/t/p/w500/czembW0Rk1Ke7lCJGahbOhdCuhV.jpg",
                showtimes: [
                    {
                        time: "16:00",
                        date: new Date(Date.now() + 172800000),
                        screenDetails: { screenName: "Screen 7 - Standard", rows: 12, cols: 12, totalCapacity: 144 },
                        bookedSeats: ["A1", "B1", "C1", "D1", "E1"]
                    },
                    {
                        time: "21:00",
                        date: new Date(Date.now() + 172800000),
                        screenDetails: { screenName: "Screen 1 - 4DX", rows: 6, cols: 10, totalCapacity: 60 },
                        bookedSeats: ["A5", "A6"]
                    },
                ]
            },
            {
                title: "Oppenheimer",
                description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II. A gripping look at ambition, sacrifice and the weight of history.",
                genre: "History, Drama, Thriller",
                duration: 180,
                posterUrl: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
                showtimes: [
                    {
                        time: "13:00",
                        date: new Date(Date.now() + 86400000),
                        screenDetails: { screenName: "Screen 1 - Premium", rows: 10, cols: 14, totalCapacity: 140 },
                        bookedSeats: ["A1", "A2", "A3", "B1", "B2"]
                    },
                    {
                        time: "18:30",
                        date: new Date(Date.now() + 86400000),
                        screenDetails: { screenName: "Screen 4 - Standard", rows: 10, cols: 12, totalCapacity: 120 },
                        bookedSeats: []
                    }
                ]
            },
            {
                title: "Interstellar",
                description: "When Earth becomes uninhabitable, a team of explorers travels through a wormhole in space in an attempt to ensure humanity's survival. A stunning and emotional journey through the cosmos.",
                genre: "Sci-Fi, Drama",
                duration: 169,
                posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
                showtimes: [
                    {
                        time: "15:30",
                        date: new Date(Date.now() + 259200000),
                        screenDetails: { screenName: "Screen 6 - IMAX", rows: 14, cols: 16, totalCapacity: 224 },
                        bookedSeats: ["A1", "A2", "B3"]
                    },
                    {
                        time: "20:00",
                        date: new Date(Date.now() + 259200000),
                        screenDetails: { screenName: "Screen 6 - IMAX", rows: 14, cols: 16, totalCapacity: 224 },
                        bookedSeats: []
                    }
                ]
            },
            {
                title: "The Dark Knight",
                description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
                genre: "Action, Crime, Drama",
                duration: 152,
                posterUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
                showtimes: [
                    {
                        time: "17:00",
                        date: new Date(Date.now() + 86400000),
                        screenDetails: { screenName: "Screen 2 - Standard", rows: 10, cols: 12, totalCapacity: 120 },
                        bookedSeats: ["C5", "C6", "D5", "D6"]
                    },
                    {
                        time: "21:30",
                        date: new Date(Date.now() + 172800000),
                        screenDetails: { screenName: "Screen 3 - Premium", rows: 8, cols: 14, totalCapacity: 112 },
                        bookedSeats: []
                    }
                ]
            },
            {
                title: "Avatar: The Way of Water",
                description: "Jake Sully lives with his newfound family formed on the planet of Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na'vi race to protect their home.",
                genre: "Action, Adventure, Fantasy",
                duration: 192,
                posterUrl: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
                showtimes: [
                    {
                        time: "14:00",
                        date: new Date(Date.now() + 172800000),
                        screenDetails: { screenName: "Screen 1 - 4DX", rows: 10, cols: 14, totalCapacity: 140 },
                        bookedSeats: ["A1", "A2", "B1", "B2"]
                    },
                    {
                        time: "19:30",
                        date: new Date(Date.now() + 259200000),
                        screenDetails: { screenName: "Screen 1 - 4DX", rows: 10, cols: 14, totalCapacity: 140 },
                        bookedSeats: []
                    }
                ]
            }
        ];
        
        await Movie.insertMany(dummyMovies);
        movies = await Movie.find({});
    }
    // --- END TEMPORARY FIX ---
    
    res.json(movies);
});

// @desc    Fetch single movie
// @route   GET /api/movies/:id
// @access  Public
const getMovieById = asyncHandler(async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    if (movie) {
        res.json(movie);
    } else {
        res.status(404);
        throw new Error('Movie not found');
    }
});

// @desc    Create a movie (Admin Only)
// @route   POST /api/movies
// @access  Private/Admin
const createMovie = asyncHandler(async (req, res) => {
    const { title, description, posterUrl, genre, duration, releaseDate, showtimes } = req.body;

    if (!title || !description || !posterUrl) {
        res.status(400);
        throw new Error('Please fill all required movie fields');
    }

    const movie = new Movie({
        user: req.user._id, // The Admin user ID
        title,
        description,
        posterUrl,
        genre,
        duration,
        releaseDate,
        showtimes: showtimes || [],
    });

    const createdMovie = await movie.save();
    res.status(201).json(createdMovie);
});

// @desc    Update a movie (Admin Only)
// @route   PUT /api/movies/:id
// @access  Private/Admin
const updateMovie = asyncHandler(async (req, res) => {
    const { title, description, posterUrl, genre, duration, releaseDate, showtimes } = req.body;

    const movie = await Movie.findById(req.params.id);

    if (movie) {
        // Update fields only if they are provided in the request body
        movie.title = title || movie.title;
        movie.description = description || movie.description;
        movie.posterUrl = posterUrl || movie.posterUrl;
        movie.genre = genre || movie.genre;
        movie.duration = duration || movie.duration;
        movie.releaseDate = releaseDate || movie.releaseDate;
        
        // Replace the entire showtimes array if provided
        if (showtimes) {
            movie.showtimes = showtimes;
        }

        const updatedMovie = await movie.save();
        res.json(updatedMovie);
    } else {
        res.status(404);
        throw new Error('Movie not found');
    }
});

// @desc    Delete a movie (Admin Only)
// @route   DELETE /api/movies/:id
// @access  Private/Admin
const deleteMovie = asyncHandler(async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    if (movie) {
        await movie.deleteOne(); 
        res.json({ message: 'Movie removed successfully' });
    } else {
        res.status(404);
        throw new Error('Movie not found');
    }
});


module.exports = {
    getMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie,
};