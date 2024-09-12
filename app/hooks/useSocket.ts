import { useEffect, useState } from 'react';

const WS_URL = process.env.WS_URL ?? 'ws://localhost:8080';

export const useSocket = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const WS_URL = process.env.WS_URL ?? 'ws://localhost:8080';
    const ws = new WebSocket(WS_URL, 'echo-protocol');
    
    ws.onopen = () => {
      setSocket(ws);
    };

    ws.onclose = () => {
      setSocket(null);
    };

    return () => {
      ws.close();
    };
  }, []);

  return socket;
};