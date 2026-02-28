"use client";
import { useWebSocket } from "@/context/WebSocketContext";

export default function ControlStatus() {
  const { throttle, setThrottle, connected, aiModel, isStreaming, startStreaming, stopStreaming } = useWebSocket();

  return (
    <div
      style={{
        background: "linear-gradient(145deg, rgba(12, 21, 40, 0.95), rgba(7, 13, 28, 0.98))",
        border: "1px solid rgba(26, 52, 88, 0.6)",
        borderRadius: "16px",
        padding: "20px 16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        boxSizing: "border-box",
        overflow: "hidden",
        backdropFilter: "blur(10px)",
        boxShadow: "0 8px 32px rgba(0, 20, 60, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
      }}
    >
      {/* Section Title */}
      <h2
        style={{
          fontSize: "0.75rem",
          letterSpacing: "0.15em",
          color: "var(--text-secondary)",
          fontWeight: 700,
          marginBottom: "24px",
          textTransform: "uppercase",
        }}
      >
        FLIGHT CONTROLS
      </h2>

      {/* Main control area - centered */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
          width: "100%",
        }}
      >
        {/* Vertical Throttle Slider */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          {/* Custom styled vertical slider */}
          <div
            style={{
              position: "relative",
              width: "32px",
              height: "220px",
              background: "linear-gradient(180deg, #0f1829, #050a16)",
              borderRadius: "16px",
              border: "2px solid rgba(26, 52, 88, 0.4)",
              overflow: "hidden",
              boxShadow: "inset 0 4px 12px rgba(0, 0, 0, 0.6)",
            }}
          >
            {/* Fill gradient */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: `${throttle}%`,
                background: "linear-gradient(0deg, var(--accent-cyan), rgba(0, 200, 255, 0.8))",
                borderRadius: "14px",
                transition: "height 0.2s ease-out",
                boxShadow: "0 0 16px rgba(0, 200, 255, 0.4)",
              }}
            />
            
            {/* Invisible input for interaction */}
            <input
              type="range"
              min="0"
              max="100"
              value={throttle}
              onChange={(e) => setThrottle(Number(e.target.value))}
              style={{
                position: "absolute",
                width: "220px",
                height: "32px",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%) rotate(-90deg)",
                opacity: 0,
                cursor: "pointer",
                zIndex: 10,
              }}
            />
            
            {/* Thumb indicator */}
            <div
              style={{
                position: "absolute",
                bottom: `calc(${throttle}% - 8px)`,
                left: "50%",
                transform: "translateX(-50%)",
                width: "40px",
                height: "16px",
                background: "linear-gradient(90deg, #ffffff, #e0e7ff)",
                borderRadius: "8px",
                border: "2px solid var(--accent-cyan)",
                boxShadow: "0 0 12px rgba(0, 200, 255, 0.6), 0 2px 8px rgba(0, 0, 0, 0.4)",
                transition: "bottom 0.2s ease-out",
                zIndex: 5,
              }}
            />
          </div>

          {/* Throttle percentage */}
          <div
            style={{
              background: "rgba(14, 30, 56, 0.8)",
              border: "1px solid rgba(26, 52, 88, 0.6)",
              borderRadius: "8px",
              padding: "6px 16px",
              fontSize: "1.1rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "0.05em",
              minWidth: "60px",
              textAlign: "center",
              boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.3)",
            }}
          >
            {throttle}%
          </div>
        </div>

        {/* Start/Stop Simulation Button */}
        <button
          onClick={isStreaming ? stopStreaming : startStreaming}
          style={{
            width: "100%",
            padding: "12px 0",
            background: isStreaming 
              ? "linear-gradient(145deg, var(--accent-red), #cc1f1f)"
              : "linear-gradient(145deg, var(--accent-green), #22c55e)",
            border: "none",
            borderRadius: "10px",
            color: "#fff",
            fontWeight: 800,
            fontSize: "0.75rem",
            letterSpacing: "0.12em",
            cursor: "pointer",
            textTransform: "uppercase",
            boxShadow: isStreaming
              ? "0 0 20px rgba(244, 67, 54, 0.4), 0 4px 12px rgba(0, 0, 0, 0.3)"
              : "0 0 20px rgba(34, 197, 94, 0.4), 0 4px 12px rgba(0, 0, 0, 0.3)",
            transition: "all 0.3s ease",
          }}
        >
          {isStreaming ? "🛑 STOP SIMULATION" : "▶️ START SIMULATION"}
        </button>
      </div>

      {/* Status Indicators at bottom */}
      <div 
        style={{ 
          width: "100%", 
          display: "flex", 
          flexDirection: "column", 
          gap: "8px", 
          marginTop: "20px",
        }}
      >
        <StatusRow
          icon="🔗"
          label="Arduino Connected"
          value={connected ? "ONLINE" : "OFFLINE"}
          valueColor={connected ? "var(--accent-green)" : "#666"}
          iconColor={connected ? "var(--accent-green)" : "#666"}
        />
        <StatusRow
          icon="📊"
          label="Sensors OK"
          value="ACTIVE"
          valueColor="var(--accent-cyan)"
          iconColor="var(--accent-cyan)"
        />
        <StatusRow
          icon="🤖"
          label="AI Model Active"
          value={aiModel ? "RUNNING" : "STOPPED"}
          valueColor={aiModel ? "var(--accent-blue)" : "#666"}
          iconColor={aiModel ? "var(--accent-blue)" : "#666"}
        />
      </div>
    </div>
  );
}

function StatusRow({ icon, label, value, valueColor, iconColor }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "6px 8px",
        background: "rgba(15, 24, 41, 0.6)",
        border: "1px solid rgba(26, 52, 88, 0.3)",
        borderRadius: "6px",
        fontSize: "0.7rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <span style={{ color: iconColor, fontSize: "0.85rem" }}>{icon}</span>
        <span style={{ color: "var(--text-secondary)" }}>{label}</span>
      </div>
      <span style={{ color: valueColor, fontWeight: 700, fontSize: "0.65rem" }}>{value}</span>
    </div>
  );
}