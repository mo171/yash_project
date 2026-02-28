"use client";
import { createContext, useContext, useEffect, useState, useRef } from "react";
import { WS_CONFIG } from "@/config/websocket.config";

const WebSocketContext = createContext(null);



export function WebSocketProvider({ children }) {
  const [throttle, setThrottle] = useState(35);
  const [sensorData, setSensorData] = useState({
    thrust: 450,
    rpm: 3200,
    voltage: 11.4,
    current: 12.5,
    power: 142.5,
    pitch: 2,
    roll: -1,
    yaw: 0,
  });
  const [logs, setLogs] = useState([]);
  const [history, setHistory] = useState([]);
  const [connected, setConnected] = useState(false);
  const [aiModel, setAiModel] = useState(true);
  const [isStreaming, setIsStreaming] = useState(false);
  const wsRef = useRef(null);

  // API functions for start/stop streaming
  const startStreaming = async () => {
    try {
      const response = await fetch('http://localhost:8000/start-stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        setIsStreaming(true);
        console.log('Started backend streaming');
      }
    } catch (error) {
      console.error('Error starting stream:', error);
    }
  };

  const stopStreaming = async () => {
    try {
      const response = await fetch('http://localhost:8000/stop-stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        setIsStreaming(false);
        console.log('Stopped backend streaming');
      }
    } catch (error) {
      console.error('Error stopping stream:', error);
      setIsStreaming(false);
    }
  };

  // ── REAL WEBSOCKET CONNECTION (BACKEND ONLY) ─────────────────────────────────────
  useEffect(() => {
    const ws = new WebSocket(WS_CONFIG.WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      setConnected(true);
      console.log('WebSocket connected to backend');
    };
    
    ws.onclose = () => {
      setConnected(false);
      console.log('WebSocket disconnected');
    };
    
    ws.onerror = (error) => {
      setConnected(false);
      console.warn('WebSocket connection failed - ensure backend is running on port 8000');
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        // Map backend data to frontend format with thrust multiplied by 1000 for visualization
        const mappedData = {
          thrust: +((data.thrust || 0) * 1000).toFixed(2),
          rpm: Math.round(data.rpm || 0),
          voltage: +(data.voltage || 0).toFixed(2),
          current: +(data.current || 0).toFixed(2),
          power: +((data.power || (data.voltage * data.current))).toFixed(2),
          pitch: +(data.pitch || 0).toFixed(2),
          roll: +(data.roll || 0).toFixed(2),
          yaw: +(data.yaw || 0).toFixed(2),
        };
        
        setSensorData(mappedData);
        
        const timestamp = new Date().toLocaleTimeString("en-US", { hour12: false });
        const logEntry = `${timestamp} — Thrust: ${mappedData.thrust}g | RPM: ${mappedData.rpm} | ${mappedData.voltage}V ${mappedData.current}A`;
        
        setLogs((prev) => [logEntry, ...prev].slice(0, 100));
        setHistory((prev) =>
          [...prev, { time: timestamp, thrust: mappedData.thrust, rpm: mappedData.rpm }].slice(-120)
        );
      } catch (e) {
        console.error("WebSocket parse error:", e);
      }
    };

    return () => {
      ws.close();
      console.log('WebSocket connection closed');
    };
  }, []);

  // Send throttle to backend via WebSocket
  useEffect(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: "throttle", value: throttle }));
    }
  }, [throttle]);

  return (
    <WebSocketContext.Provider
      value={{ 
        sensorData, 
        throttle, 
        setThrottle, 
        logs, 
        history, 
        connected, 
        aiModel,
        isStreaming,
        startStreaming,
        stopStreaming 
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocket() {
  return useContext(WebSocketContext);
}