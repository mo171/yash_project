import React, { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import ControlsStatus from "./components/ControlsStatus";
import RealTimeData from "./components/RealTimeData";
import IMUAnalysis from "./components/IMUAnalysis";
import DataLogGraphs from "./components/DataLogGraphs";

const Dashboard: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Initial data to show something before streaming starts
    setData({
      rpm: 0,
      thrust: 0,
      voltage: 0,
      current: 0,
      power: 0,
      health: 100,
      anomaly_status: "NORMAL",
      fault_type: "Normal",
      temperature: 0,
      vibration: 0,
      rul: 100,
    });
  }, []);

  const connectWebSocket = () => {
    if (socketRef.current) return;

    const ws = new WebSocket("ws://localhost:8000/ws/motor-data");

    ws.onopen = () => {
      console.log("Connected to WebSocket");
      setIsConnected(true);
      // Start the stream via API
      fetch("http://localhost:8000/start-stream", { method: "POST" }).catch(
        (err) => console.error("Failed to start stream:", err),
      );
    };

    ws.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);
      setData(parsedData);
      setLogs((prev) => [...prev.slice(-49), parsedData]);
    };

    ws.onclose = () => {
      console.log("Disconnected from WebSocket");
      setIsConnected(false);
      socketRef.current = null;
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setIsConnected(false);
    };

    socketRef.current = ws;
  };

  const disconnectWebSocket = () => {
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
      setIsConnected(false);

      // Stop the stream via API
      fetch("http://localhost:8000/stop-stream", { method: "POST" }).catch(
        (err) => console.error("Failed to stop stream:", err),
      );
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#020617] text-white p-4 font-sans select-none flex flex-col gap-4 overflow-hidden">
      <Header
        isConnected={isConnected}
        onConnect={isConnected ? disconnectWebSocket : connectWebSocket}
      />

      <div className="flex-1 grid grid-cols-12 gap-4 h-[calc(100vh-120px)]">
        {/* Left Column: Controls & Status */}
        <div className="col-span-3 h-full overflow-hidden">
          <ControlsStatus data={data} isConnected={isConnected} />
        </div>

        {/* Center Column: Real-time Data */}
        <div className="col-span-6 flex flex-col gap-4 overflow-hidden">
          <div className="flex-1 min-h-0">
            <RealTimeData data={data} />
          </div>
          <div className="h-1/3 min-h-0">
            <DataLogGraphs data={data} logs={logs} />
          </div>
        </div>

        {/* Right Column: IMU & AI Analysis */}
        <div className="col-span-3 h-full overflow-hidden">
          <IMUAnalysis data={data} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
