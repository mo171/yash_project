'use client';

import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import ThrustDisplay from './ThrustDisplay';
import RpmGauge from './RpmGauge';

export default function RealTimeDataPanel({ sample }) {
  const thrust = sample?.thrust ?? 0;
  const rpm = sample?.rpm ?? 0;
  const voltage = sample?.voltage ?? 0;
  const current = sample?.current ?? 0;
  const power = sample?.power ?? 0;

  return (
    <Card className="h-full bg-slate-900/80 border-cyan-600/35 p-4 rounded-xl shadow-[0_0_40px_rgba(0,140,255,0.12)] overflow-hidden">
      <h2 className="text-center text-2xl font-semibold text-slate-100 tracking-wide border-b border-cyan-500/25 pb-2">
        REAL-TIME DATA
      </h2>

      <div className="grid grid-cols-2 gap-3 h-[66%] mt-2">
        <div className="flex flex-col items-center justify-center">
          <div className="relative">
            <div className="absolute -top-7 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-orange-600 text-white">⚠ Peak Hold</Badge>
            </div>
            <ThrustDisplay value={thrust} />
            <div className="text-center mt-1 text-gray-400 text-xs">
              Peak Hold ⚠
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <RpmGauge value={rpm} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-1">
        <div className="text-center">
          <div className="text-lg font-bold text-cyan-400 mb-1">VOLTAGE:</div>
          <div className="flex items-center justify-center">
            <Badge className="bg-green-500 text-sm px-2 py-1 mr-2">Stable</Badge>
            <span className="text-5xl font-extrabold text-white leading-none">{voltage.toFixed(1)} V</span>
          </div>
        </div>

        <div className="text-center">
          <div className="text-lg font-bold text-cyan-400 mb-1">CURRENT:</div>
          <div className="text-5xl font-extrabold text-white leading-none">{current.toFixed(1)} A</div>
        </div>

        <div className="text-center">
          <div className="text-lg font-bold text-cyan-400 mb-1">POWER:</div>
          <div className="text-5xl font-extrabold text-white leading-none">{power.toFixed(1)} W</div>
        </div>
      </div>
    </Card>
  );
}