const mongoose = require('mongoose');
const logger = require('../utils/logger');

/**
 * Establishes a connection to MongoDB Atlas via Mongoose.
 * Fails fast on startup if the DB is unreachable — we never want the
 * server to boot into a false-healthy state with no database.
 */
async function connectDB() {
  try {
    mongoose.set('strictQuery', true);

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: 10, // connection pool - tune based on load
      serverSelectionTimeoutMS: 10000,
    });

    logger.info(`MongoDB connected: ${conn.connection.host}`);

    mongoose.connection.on('error', (err) => {
      logger.error(`MongoDB runtime error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected');
    });
  } catch (err) {
    logger.error(`MongoDB initial connection failed: ${err.message}`);
    process.exit(1); // crash on purpose - let the process manager restart us
  }
}

module.exports = connectDB;
