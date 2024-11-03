import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { Socket } from 'socket.io-client';
import { getSocket } from '../services/socket';

interface SocketContextType {
  clientId: string | null;
  userId: string | null;
  countdown: number | null;
  setUserId: (userId: string) => void;
  socket: Socket | null;
  disconnect: () => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [clientId, setClientId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(
    localStorage.getItem('userId')
  );
  const [socket, setSocket] = useState<Socket | null>(null);
  const [countdown, setCountdown] = useState<number>(0);

  useEffect(() => {
    const socket = getSocket();
    setSocket(socket)
    socket.on('updateCountdown', (time: number) => {
      setCountdown(time);
    });

    return () => {
      socket.off('updateCountdown');
    };
  }, []);

  const submitUserId = (newUserId: string) => {
    setUserId(newUserId);
    localStorage.setItem('userId', newUserId);
    socket?.emit('setUserId', { userId: newUserId, clientId });
  };

  return (
    <SocketContext.Provider
      value={{
        clientId,
        userId,
        setUserId: submitUserId,
        countdown,
        socket,
        disconnect: socket?.disconnect.bind(socket) || (() => {}),
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
