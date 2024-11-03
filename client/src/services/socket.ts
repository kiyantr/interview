import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;
const SOCKET_URL = 'http://localhost:3001';

const initializeSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL);
  }
  return socket;
};

export const getSocket = () => {
  if (!socket) {
    return initializeSocket();
  }
  return socket;
};
