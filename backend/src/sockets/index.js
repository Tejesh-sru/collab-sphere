const { verifyAccessToken } = require('../utils/tokens');
const logger = require('../utils/logger');

/**
 * Real-time layer for chat (1:1 + group), typing indicators, online
 * presence, and read receipts. Notifications also flow through here.
 *
 * Auth: the client connects with `io(url, { auth: { token } })` using
 * the same access token from the REST API — we never accept an
 * unauthenticated socket connection.
 */
function registerSocketHandlers(io) {
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) return next(new Error('Authentication required'));
      const payload = verifyAccessToken(token);
      socket.userId = payload.sub;
      next();
    } catch {
      next(new Error('Invalid or expired token'));
    }
  });

  io.on('connection', (socket) => {
    logger.info(`Socket connected: user=${socket.userId} socket=${socket.id}`);

    // Each user joins a personal room so we can push notifications /
    // DMs to them by userId without tracking socket IDs elsewhere.
    socket.join(`user:${socket.userId}`);
    io.emit('presence:online', { userId: socket.userId });

    socket.on('room:join', (roomId) => socket.join(`room:${roomId}`));
    socket.on('room:leave', (roomId) => socket.leave(`room:${roomId}`));

    socket.on('message:send', ({ roomId, message }) => {
      // Persisting the message is done via the REST endpoint or a
      // message service call here; kept minimal in this skeleton.
      io.to(`room:${roomId}`).emit('message:new', message);
    });

    socket.on('typing:start', ({ roomId }) => {
      socket.to(`room:${roomId}`).emit('typing:update', { userId: socket.userId, typing: true });
    });
    socket.on('typing:stop', ({ roomId }) => {
      socket.to(`room:${roomId}`).emit('typing:update', { userId: socket.userId, typing: false });
    });

    socket.on('disconnect', () => {
      io.emit('presence:offline', { userId: socket.userId });
      logger.info(`Socket disconnected: user=${socket.userId}`);
    });
  });
}

module.exports = registerSocketHandlers;
