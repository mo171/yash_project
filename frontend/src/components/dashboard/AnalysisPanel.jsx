'use client';

import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import ImuSphere from '../3d/ImuSphere';

export default function AnalysisPanel({ sample }) {
  const pitch = 2;
  const roll = -1;
  const yaw = 0;
  const efficiency = sample?.health ?? 85;
  const faultType = sample?.fault_type ?? 'Normal';
  const maxThrust = 1200;

  return (
    <Card className="h-full bg-slate-900/80 border-cyan-600/35 p-4 rounded-xl shadow-[0_0_40px_rgba(0,140,255,0.12)] overflow-hidden">
      <h2 className="text-center text-2xl font-semibold text-slate-100 tracking-wide border-b border-cyan-500/25 pb-2">
        IMU & AI ANALYSIS
      </h2>

      <div className="mt-3">
        <div className="mb-4">
          <div className="bg-slate-950/80 rounded-lg p-2 h-52 flex items-center justify-center border border-slate-700">
            <ImuSphere pitch={pitch} roll={roll} yaw={yaw} />
          </div>

          <div className="mt-2 grid grid-cols-3 gap-1 text-base">
            <div className="text-center">
              <div className="text-slate-300">PITCH:</div>
              <div className="text-slate-100 font-bold">{pitch}°</div>
            </div>
            <div className="text-center">
              <div className="text-slate-300">ROLL:</div>
              <div className="text-slate-100 font-bold">{roll}°</div>
            </div>
            <div className="text-center">
              <div className="text-slate-300">YAW:</div>
              <div className="text-slate-100 font-bold">{yaw}°</div>
            </div>
          </div>
        </div>

        <div className="bg-emerald-950/30 border border-emerald-600 rounded-lg p-3">
          <h3 className="text-xl font-bold text-emerald-300 mb-2">AI INSIGHTS</h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-300">Efficiency:</span>
              <span className="text-slate-100 font-bold">{efficiency.toFixed(0)}%</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-300">Status:</span>
              <Badge className={faultType === 'Normal' ? 'bg-emerald-600' : 'bg-rose-600'}>
                {faultType === 'Normal' ? 'Stable Operation' : faultType}
              </Badge>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-300">Predicted Max Thrust:</span>
              <span className="text-slate-100 font-bold">{maxThrust}g</span>
            </div>

            {sample && (
              <>
                <div className="flex justify-between">
                  <span className="text-slate-300">Health Score:</span>
                  <span className="text-slate-100 font-bold">{sample.health.toFixed(1)}%</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-300">RUL:</span>
                  <span className="text-slate-100 font-bold">{sample.rul.toFixed(1)} hrs</span>
                </div>

                {sample.anomaly_status === 'ANOMALY' && (
                  <div className="mt-2 p-2 bg-red-900/20 border border-red-600 rounded">
                    <div className="text-red-400 text-xs font-bold">
                      ⚠ ANOMALY DETECTED
                    </div>
                    <div className="text-red-300 text-xs">
                      Severity: {sample.severity?.toFixed(2)}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}