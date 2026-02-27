'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Slider } from '../ui/slider';
import { Card } from '../ui/card';

export default function ControlsPanel({
  isStreaming,
  isConnected,
  isActionPending,
  onEmergencyToggle,
}) {
  const [throttleValue, setThrottleValue] = useState(35);

  return (
    <Card className="h-full bg-slate-900/80 border-cyan-600/35 p-4 rounded-xl shadow-[0_0_40px_rgba(0,140,255,0.12)] overflow-hidden">
      <h2 className="text-center text-2xl font-semibold text-slate-100 tracking-wide border-b border-cyan-500/25 pb-2">
        CONTROLS & STATUS
      </h2>

      <div className="mt-3">
        <h3 className="text-center text-lg font-semibold text-slate-200 mb-3">THROTTLE CONTROL</h3>
        <div className="flex flex-col items-center">
          <div className="h-64 w-16 rounded-3xl bg-slate-800/80 border border-slate-700 flex items-center justify-center p-2">
            <div className="h-56 flex items-center">
                <Slider
                  value={[throttleValue]}
                  onValueChange={(value) => setThrottleValue(value[0])}
                  max={100}
                  step={1}
                  orientation="vertical"
                  className="h-52"
                />
            </div>
          </div>

          <div className="mt-3 rounded-xl bg-slate-800 border border-slate-700 px-3 py-1.5 text-3xl font-semibold text-slate-100">
            {throttleValue}%
          </div>
        </div>
      </div>

      <Button
        onClick={onEmergencyToggle}
        disabled={isActionPending}
        className="w-full mt-5 h-12 text-lg tracking-wide font-bold bg-red-600 hover:bg-red-700 disabled:opacity-60"
      >
        {isStreaming ? 'EMERGENCY STOP' : 'START STREAM'}
      </Button>

      <div className="mt-4 space-y-2.5 text-base">
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-cyan-400">
            ∞ Arduino Nano:
          </span>
          <Badge className={isConnected ? 'bg-emerald-500 text-sm px-3 py-1' : 'bg-rose-500 text-sm px-3 py-1'}>
            {isConnected ? 'CONNECTED' : 'OFFLINE'}
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-cyan-400">● Sensors:</span>
          <Badge className="bg-emerald-500 text-sm px-3 py-1">OK</Badge>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-cyan-400">◈ AI Model:</span>
          <Badge className={isStreaming ? 'bg-emerald-500 text-sm px-3 py-1' : 'bg-amber-500 text-sm px-3 py-1'}>
            {isStreaming ? 'ACTIVE' : 'STANDBY'}
          </Badge>
        </div>
      </div>
    </Card>
  );
}