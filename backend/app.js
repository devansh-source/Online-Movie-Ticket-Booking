// --------------------- Imports ---------------------
const express = require("express");
const cors = require("cors");
const path = require("path");

// --- Import Route Files ---
const authRoutes = require("./routes/authRoutes");
const movieRoutes = require("./routes/movieRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const adminRoutes = require("./routes/adminRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

// --------------------- App Setup ---------------------
const app = express();

// --------------------- Middleware Setup ---------------------
const allowedOrigins = [
  "http://localhost:3000",
  "https://online-movie-ticket-booking-frontend.onrender.com",
  "https://online-movie-ticket-booking-frontend-pj7x2q9y2.vercel.app",
  "https://online-movie-ticket-booking-frontend-46lsu9qbo.vercel.app",
  // Dynamically add FRONTEND_URL from environment (for any new deployment)
  ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : [])
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman or CURL)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = "❌ The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }

      return callback(null, true);
    },
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    credentials: true
  })
);

app.use(express.json());

// --------------------- API Routes ---------------------
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/upload", uploadRoutes);

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// --------------------- Production Deployment ---------------------
if (process.env.NODE_ENV !== "production") {
  // Serve static files from frontend/public in development
  app.use(express.static(path.join(__dirname, "../frontend/public")));

  app.get("/", (req, res) => {
    res.send("🎬 Movie Booking API is running in development mode...");
  });
}

// --------------------- Error Handling ---------------------
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack
  });
});

module.exports = app;
