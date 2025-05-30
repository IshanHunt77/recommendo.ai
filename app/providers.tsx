"use client";

import { SessionProvider } from "next-auth/react";
import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  ReactNode,
} from "react";
import { io, Socket } from "socket.io-client";

interface SocketType {
  socket: Socket | null;
}

const SocketContext = createContext<SocketType | undefined>(undefined);

interface ProviderProps {
  children: ReactNode;
}

export const Provider: React.FC<ProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = io("http://localhost:3005"); // WebSocket server
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SessionProvider>
      <SocketContext.Provider value={{ socket }}>
        {children}
      </SocketContext.Provider>
    </SessionProvider>
  );
};

// Optional helper hook
export const useSocket = (): Socket | null => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a Provider");
  }
  return context.socket;
};
