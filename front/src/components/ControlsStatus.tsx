import React, { useState } from "react";
import { Shield, Brain, Cpu, CheckCircle2, AlertCircle } from "lucide-react";

interface ControlsStatusProps {
  data: any;
  isConnected: boolean;
}

const ControlsStatus: React.FC<ControlsStatusProps> = ({
  data,
  isConnected,
}) => {
  const [throttle, setThrottle] = useState(35);

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex-1 glass-panel rounded-2xl p-6 flex flex-col border border-white/5">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8 text-center border-b border-white/5 pb-2">
          Controls & Status
        </h2>

        <div className="flex-1 flex flex-col items-center justify-center gap-6">
          <div className="text-center">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-tighter">
              Throttle Control
            </span>
          </div>

          <div className="h-64 flex items-center justify-center relative my-4">
            <input
              type="range"
              min="0"
              max="100"
              value={throttle}
              onChange={(e) => setThrottle(parseInt(e.target.value))}
              className="appearance-none w-2 h-64 bg-slate-800 rounded-full cursor-pointer orientation-vertical"
              style={
                {
                  writingMode: "bt-lr",
                  WebkitAppearance: "slider-vertical",
                } as any
              }
            />
            <div className="absolute -right-16 bg-accent-blue/20 text-accent-blue px-3 py-1 rounded border border-accent-blue/30 font-mono font-bold">
              {throttle}%
            </div>
          </div>

          <button className="w-full py-4 bg-accent-red/80 hover:bg-accent-red text-white font-bold rounded-xl shadow-lg glow-red transition-all uppercase tracking-widest flex items-center justify-center gap-2">
            <Shield className="w-5 h-5" />
            Emergency Stop
          </button>
        </div>

        <div className="mt-8 space-y-4 pt-6 border-t border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-400">
              <Cpu className="w-4 h-4 text-accent-blue" />
              <span className="text-sm">Arduino Nano:</span>
            </div>
            <span
              className={`text-sm font-bold ${isConnected ? "text-accent-green" : "text-slate-500"}`}
            >
              {isConnected ? "CONNECTED" : "DISCONNECTED"}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-400">
              <CheckCircle2 className="w-4 h-4 text-accent-green" />
              <span className="text-sm">Sensors:</span>
            </div>
            <span className="text-sm font-bold text-accent-green">OK</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-400">
              <Brain className="w-4 h-4 text-accent-blue" />
              <span className="text-sm">AI Model:</span>
            </div>
            <span
              className={`text-sm font-bold ${isConnected ? "text-accent-green" : "text-slate-500"}`}
            >
              {isConnected ? "ACTIVE" : "INACTIVE"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlsStatus;
