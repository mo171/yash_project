import React from "react";
import { Activity, Power, Wifi, WifiOff } from "lucide-react";

interface HeaderProps {
  isConnected: boolean;
  onConnect: () => void;
}

const Header: React.FC<HeaderProps> = ({ isConnected, onConnect }) => {
  return (
    <div className="flex justify-between items-center py-2 px-6 glass-panel border-b border-white/5 rounded-xl">
      <div className="flex items-center gap-3">
        <div
          className={`p-2 rounded-full ${isConnected ? "bg-accent-green/20" : "bg-accent-red/20"}`}
        >
          <Activity
            className={`w-5 h-5 ${isConnected ? "text-accent-green" : "text-accent-red"}`}
          />
        </div>
        <h1 className="text-xl font-bold tracking-wider text-slate-100 uppercase">
          AI-Enabled Drone Thrust Measurement System
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-lg border border-white/10">
          <span className="text-xs text-slate-400">System Status:</span>
          <span
            className={`text-xs font-bold ${isConnected ? "text-accent-green" : "text-accent-red"}`}
          >
            {isConnected ? "ONLINE" : "OFFLINE"}
          </span>
        </div>

        <button
          onClick={onConnect}
          className={`px-4 py-1.5 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${
            isConnected
              ? "bg-accent-red/20 text-accent-red border border-accent-red/30 hover:bg-accent-red/30"
              : "bg-accent-blue/20 text-accent-blue border border-accent-blue/30 hover:bg-accent-blue/30"
          }`}
        >
          {isConnected ? (
            <WifiOff className="w-4 h-4" />
          ) : (
            <Wifi className="w-4 h-4" />
          )}
          {isConnected ? "STOP STREAM" : "START STREAM"}
        </button>
      </div>
    </div>
  );
};

export default Header;
