import React from "react";
import { Battery, Zap, Thermometer, CloudLightning } from "lucide-react";

interface RealTimeDataProps {
  data: any;
}

const RealTimeData: React.FC<RealTimeDataProps> = ({ data }) => {
  const thrustPercentage = Math.min(((data?.thrust || 0) / 1000) * 100, 100);
  const rpmPercentage = Math.min(((data?.rpm || 0) / 10000) * 100, 100);

  return (
    <div className="h-full glass-panel rounded-2xl p-6 flex flex-col border border-white/5">
      <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 text-center border-b border-white/5 pb-2">
        Real-Time Data
      </h2>

      <div className="grid grid-cols-2 gap-8 flex-1">
        {/* Thrust Gauge */}
        <div className="relative flex flex-col items-center justify-center">
          <svg className="w-48 h-48 transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="80"
              fill="transparent"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="12"
            />
            <circle
              cx="96"
              cy="96"
              r="80"
              fill="transparent"
              stroke="#38bdf8"
              strokeWidth="12"
              strokeDasharray={2 * Math.PI * 80}
              strokeDashoffset={2 * Math.PI * 80 * (1 - thrustPercentage / 100)}
              strokeLinecap="round"
              className="transition-all duration-500 ease-out glow-blue"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
            <span className="text-xs text-slate-400 uppercase tracking-widest">
              Thrust
            </span>
            <span className="text-4xl font-black text-white">
              {Math.round(data?.thrust || 0)}
            </span>
            <span className="text-lg font-bold text-slate-500">g</span>
            <div className="mt-2 px-2 py-0.5 bg-accent-blue/10 border border-accent-blue/30 rounded text-[10px] text-accent-blue uppercase font-bold">
              Peak Hold
            </div>
          </div>
        </div>

        {/* RPM Gauge */}
        <div className="relative flex flex-col items-center justify-center">
          <svg className="w-48 h-48 transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="80"
              fill="transparent"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="12"
            />
            <circle
              cx="96"
              cy="96"
              r="80"
              fill="transparent"
              stroke={data?.rpm > 7000 ? "#ef4444" : "#22c55e"}
              strokeWidth="12"
              strokeDasharray={2 * Math.PI * 80}
              strokeDashoffset={2 * Math.PI * 80 * (1 - rpmPercentage / 100)}
              strokeLinecap="round"
              className="transition-all duration-500 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
            <span className="text-xs text-slate-400 uppercase tracking-widest">
              RPM
            </span>
            <span className="text-4xl font-black text-white">
              {data?.rpm || 0}
            </span>
            <span className="text-xs font-bold text-slate-500">REV/MIN</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/5">
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-2 text-slate-400 mb-1">
            <Battery className="w-4 h-4 text-accent-green" />
            <span className="text-xs font-bold uppercase">Voltage</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black">{data?.voltage || 0}</span>
            <span className="text-sm font-bold text-slate-500">V</span>
          </div>
          <div className="w-12 h-1.5 bg-slate-800 rounded-full overflow-hidden mt-1">
            <div
              className="h-full bg-accent-green"
              style={{ width: "85%" }}
            ></div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-2 text-slate-400 mb-1">
            <CloudLightning className="w-4 h-4 text-accent-blue" />
            <span className="text-xs font-bold uppercase">Current</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black">{data?.current || 0}</span>
            <span className="text-sm font-bold text-slate-500">A</span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-2 text-slate-400 mb-1">
            <Zap className="w-4 h-4 text-orange-400" />
            <span className="text-xs font-bold uppercase">Power</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black">
              {Math.round(data?.power || 0)}
            </span>
            <span className="text-sm font-bold text-slate-500">W</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeData;
