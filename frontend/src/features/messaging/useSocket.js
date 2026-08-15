import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useAppSelector } from '../../app/hooks';

/**
 * Establishes ONE Socket.io connection per authenticated session,
 * authenticated with the same short-lived access token used for REST
 * calls (see backend/src/sockets/index.js - the server verifies this
 * token in its `io.use()` handshake middleware).
 *
 * NOTE: because the access token rotates/expires, a long-lived socket
 * connection can outlive the token used to establish it. For a
 * production build, reconnect with a fresh token on 'connect_error'
 * (token expired) rather than assuming the initial handshake token is
 * valid forever.
 */
export function useSocket() {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!accessToken) return undefined;

    const socket = io(import.meta.env.VITE_SOCKET_URL, {
      auth: { token: accessToken },
    });
    socketRef.current = socket;

    return () => socket.disconnect();
  }, [accessToken]);

  return socketRef;
}
