const express = require('express');
const cors = require('cors');
const { initDB } = require('./config/database');
const { startCrashNotifier } = require('./services/crashNotifier');
require('dotenv').config();

const app = express();

// CORS Configuration - Allow requests from React frontend
const corsOptions = {
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'], 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'], 
};

// Middleware
app.use(cors(corsOptions)); 
app.use(express.json({ extended: false }));

// Handle preflight requests for all routes
app.options('*', cors(corsOptions));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Violations API
app.use('/api/violations', require('./routes/violations'));

const PORT = process.env.PORT || 5001;

const startServer = async () => {
  await initDB();
  startCrashNotifier();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${PORT} is busy, trying port ${PORT + 1}...`);
      app.listen(PORT + 1);
    }
  });
};

startServer().catch((err) => {
  console.error('Failed to start server:', err.message);
  process.exit(1);
});
