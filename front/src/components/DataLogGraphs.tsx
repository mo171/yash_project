import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { ListFilter, Send } from "lucide-react";

interface DataLogGraphsProps {
  data: any;
  logs: any[];
}

const DataLogGraphs: React.FC<DataLogGraphsProps> = ({ data, logs }) => {
  // Format data for Recharts
  const chartData = logs.map((l) => ({
    time: new Date(l.timestamp).toLocaleTimeString([], {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
    thrust: l.thrust,
    rpm: l.rpm,
  }));

  return (
    <div className="h-full glass-panel rounded-2xl p-4 flex gap-4 border border-white/5">
      {/* Chart Section */}
      <div className="flex-[2] flex flex-col h-full overflow-hidden">
        <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 border-b border-white/5 pb-1 flex justify-between">
          <span>Data Log & Graphs</span>
          <div className="flex gap-4">
            <span className="text-accent-blue flex items-center gap-1">
              <span className="w-2 h-0.5 bg-accent-blue"></span> Thrust (g)
            </span>
            <span className="text-accent-green flex items-center gap-1">
              <span className="w-2 h-0.5 bg-accent-green"></span> RPM
            </span>
          </div>
        </h2>
        <div className="flex-1 min-h-0 bg-black/10 rounded-lg p-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.05)"
              />
              <XAxis
                dataKey="time"
                stroke="#64748b"
                fontSize={8}
                tick={{ fill: "#64748b" }}
                interval="preserveStartEnd"
              />
              <YAxis
                yAxisId="left"
                stroke="#38bdf8"
                fontSize={8}
                tick={{ fill: "#38bdf8" }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#22c55e"
                fontSize={8}
                tick={{ fill: "#22c55e" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "1px solid rgba(255,255,255,0.1)",
                  fontSize: "10px",
                }}
                itemStyle={{ padding: "0" }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="thrust"
                stroke="#38bdf8"
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="rpm"
                stroke="#22c55e"
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Logs Section */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-white/5 pb-1 flex-1">
            System Logs
          </h2>
        </div>
        <div className="flex-1 bg-black/40 rounded-lg p-2 font-mono text-[9px] overflow-y-auto flex flex-col-reverse relative">
          <div className="flex flex-col gap-1">
            {logs
              .slice()
              .reverse()
              .map((log, i) => (
                <div
                  key={i}
                  className="flex gap-2 text-slate-400 border-b border-white/5 pb-1"
                >
                  <span className="text-slate-600">
                    [
                    {new Date(log.timestamp).toLocaleTimeString([], {
                      hour12: false,
                    })}
                    ]
                  </span>
                  <span
                    className={
                      log.anomaly_status === "ANOMALY"
                        ? "text-accent-red font-bold"
                        : "text-accent-blue"
                    }
                  >
                    Thrust: {log.thrust}g
                  </span>
                  <span className="text-accent-green">RPM: {log.rpm}</span>
                </div>
              ))}
          </div>
        </div>
        <div className="mt-2 flex gap-2">
          <input
            type="text"
            placeholder="System command..."
            className="flex-1 bg-black/30 border border-white/10 rounded px-2 py-1 text-[10px] focus:outline-none focus:border-accent-blue/50"
          />
          <button className="bg-accent-blue/20 p-1.5 rounded text-accent-blue hover:bg-accent-blue/30">
            <Send className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataLogGraphs;
