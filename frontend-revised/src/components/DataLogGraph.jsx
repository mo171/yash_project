"use client";
import { useWebSocket } from "@/context/WebSocketContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useRef, useEffect } from "react";

export default function DataLogGraph() {
  const { history, logs } = useWebSocket();
  const logRef = useRef(null);

  // Keep log panel scrolled to top (newest entry first)
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = 0;
  }, [logs]);

  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "10px",
        padding: "10px 14px",
        height: "100%",         /* fill whatever flex space parent gives */
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {/* Title */}
      <h2
        style={{
          fontSize: "0.72rem",
          letterSpacing: "0.12em",
          color: "var(--text-secondary)",
          fontWeight: 700,
          textAlign: "center",
          flexShrink: 0,
        }}
      >
        DATA LOG & GRAPHS
      </h2>

      {/* Chart + Log side by side */}
      <div
        style={{
          flex: 1,
          minHeight: 0,          /* allow shrinking */
          display: "flex",
          gap: "10px",
          overflow: "hidden",
        }}
      >
        {/* ── RECHARTS LINE GRAPH ── */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={history}
              margin={{ top: 4, right: 16, left: 0, bottom: 4 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#122030" vertical={false} />
              <XAxis
                dataKey="time"
                tick={{ fill: "#5a8aaa", fontSize: 9 }}
                tickLine={false}
                axisLine={{ stroke: "#1e3a5f" }}
                interval="preserveStartEnd"
              />
              {/* Left Y — Thrust */}
              <YAxis
                yAxisId="thrust"
                domain={[0, 1200]}
                tick={{ fill: "#4caf50", fontSize: 9 }}
                tickLine={false}
                axisLine={false}
                label={{
                  value: "Thrust (g)",
                  angle: -90,
                  position: "insideLeft",
                  fill: "#4caf50",
                  fontSize: 9,
                  dx: 10,
                }}
              />
              {/* Right Y — RPM */}
              <YAxis
                yAxisId="rpm"
                orientation="right"
                domain={[0, 10000]}
                tick={{ fill: "#2196f3", fontSize: 9 }}
                tickLine={false}
                axisLine={false}
                label={{
                  value: "RPM",
                  angle: 90,
                  position: "insideRight",
                  fill: "#2196f3",
                  fontSize: 9,
                  dx: -6,
                }}
              />
              <Tooltip
                contentStyle={{
                  background: "#0a1220",
                  border: "1px solid #1e3a5f",
                  borderRadius: "6px",
                  fontSize: "0.68rem",
                  padding: "6px 10px",
                }}
                labelStyle={{ color: "#7fb3d3", marginBottom: "2px" }}
                itemStyle={{ color: "#ccc" }}
              />
              <Legend
                wrapperStyle={{ fontSize: "0.68rem", paddingTop: "2px" }}
                formatter={(value) => (
                  <span style={{ color: "#7fb3d3" }}>{value}</span>
                )}
              />
              <Line
                yAxisId="thrust"
                type="monotone"
                dataKey="thrust"
                name="Thrust (g)"
                stroke="#4caf50"
                dot={false}
                strokeWidth={1.8}
                isAnimationActive={false}
              />
              <Line
                yAxisId="rpm"
                type="monotone"
                dataKey="rpm"
                name="RPM"
                stroke="#2196f3"
                dot={false}
                strokeWidth={1.8}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* ── SCROLLABLE LOG PANEL ── */}
        <div
          ref={logRef}
          style={{
            width: "420px",
            flexShrink: 0,
            background: "#060d1a",
            border: "1px solid #152540",
            borderRadius: "6px",
            padding: "8px 10px",
            overflowY: "auto",
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: "0.6rem",
            color: "#6aafcc",
            lineHeight: 1.7,
          }}
        >
          {logs.length === 0 && (
            <div style={{ color: "#2a5a7a" }}>Waiting for data...</div>
          )}
          {logs.map((entry, i) => (
            <div
              key={i}
              style={{
                borderBottom: "1px solid #0c1e30",
                paddingBottom: "2px",
                marginBottom: "2px",
                color: i === 0 ? "#a0d4ee" : "#5a9ab8",
              }}
            >
              {entry}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}