require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');

const app = require('./src/app');
const connectDB = require('./src/config/db');
const logger = require('./src/utils/logger');
const registerSocketHandlers = require('./src/sockets/index');

const PORT = process.env.PORT || 5000;

async function start() {
  await connectDB();

  const httpServer = http.createServer(app);

  const io = new Server(httpServer, {
    cors: { origin: process.env.CLIENT_URL, credentials: true },
  });
  registerSocketHandlers(io);
  app.set('io', io); // controllers can emit events via req.app.get('io')

  httpServer.listen(PORT, () => {
    logger.info(`CollabSphere API running on port ${PORT} [${process.env.NODE_ENV}]`);
  });

  // ---------- Graceful shutdown & crash safety ----------
  const shutdown = (signal) => {
    logger.info(`${signal} received - shutting down gracefully`);
    httpServer.close(() => {
      logger.info('HTTP server closed');
      process.exit(0);
    });
  };
  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));

  process.on('unhandledRejection', (reason) => {
    logger.error(`Unhandled Rejection: ${reason}`);
    // Fail fast rather than continuing in a possibly-corrupt state.
    httpServer.close(() => process.exit(1));
  });
  process.on('uncaughtException', (err) => {
    logger.error(`Uncaught Exception: ${err.stack || err.message}`);
    process.exit(1);
  });
}

start();
