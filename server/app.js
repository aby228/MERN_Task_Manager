// Express application configuration
// Security, logging, database, routes, and error handling
const express = require('express');
const app = express();

const mongoose = require('mongoose');

const dotenv = require('dotenv');

const cookieParser = require('cookie-parser');

const helmet = require('helmet');

const authRoutes = require('./routes/authRoutes');

const taskRoutes = require('./routes/taskRoutes');

const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const morgan = require('morgan');
const logger = require('./config/logger');

dotenv.config();

const rateLimit = require('express-rate-limit');

// Apply a conservative global rate limit to deter abuse
const limiter = rateLimit({

  windowMs: 15 * 60 * 1000, // 15 minutes

  max: 200, // Limit each IP to 200 requests per windowMs

  message: 'Too many requests from this IP, please try again after 15 minutes',

});

const cors = require('cors');

app.use(cors({

  origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',

  credentials: true,

}));




app.use(helmet());

app.use(express.json());

app.use(cookieParser());

// Apply the rate limiter to all incoming requests
app.use(limiter);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}


mongoose.connect(process.env.MONGO_URI)

  .then(() => logger.info('MongoDB connected!'))

  .catch(err => logger.error('MongoDB connection error:', err));


// Feature routes
app.use('/api/auth', authRoutes);

app.use('/api/tasks', taskRoutes);


// Health check for uptime monitoring
app.get('/', (req, res) => {

  res.send('MERN Task Manager API is running!');

});


// Centralized error handling
app.use(notFound);

app.use(errorHandler);


module.exports = app;