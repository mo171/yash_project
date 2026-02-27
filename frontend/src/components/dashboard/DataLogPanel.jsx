'use client';

import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

function timeLabel(timestamp) {
  return new Date(timestamp).toLocaleTimeString().slice(-8);
}

export default function DataLogPanel({ chartSeries, logs }) {
  const chartData = chartSeries.map((point) => ({
    ...point,
    time: timeLabel(point.t),
  }));

  return (
    <Card className="h-full bg-slate-900/80 border-cyan-600/35 p-4 rounded-xl shadow-[0_0_40px_rgba(0,140,255,0.12)] overflow-hidden">
      <h2 className="text-center text-2xl font-semibold text-slate-100 tracking-wide border-b border-cyan-500/25 pb-2">
        DATA LOG & GRAPHS
      </h2>

      <div className="grid grid-cols-3 gap-4 mt-2 h-[calc(100%-46px)]">
        <div className="col-span-2 min-h-0">
          <div className="bg-slate-950/85 rounded-lg p-3 h-full border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-300">Thrust (g)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-300">RPM</span>
                </div>
              </div>
            </div>

            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="time"
                  stroke="#9CA3AF"
                  fontSize={12}
                />
                <YAxis
                  yAxisId="thrust"
                  stroke="#10B981"
                  fontSize={12}
                  orientation="left"
                />
                <YAxis
                  yAxisId="rpm"
                  stroke="#3B82F6"
                  fontSize={12}
                  orientation="right"
                />
                <Line
                  yAxisId="thrust"
                  type="monotone"
                  dataKey="thrust"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  yAxisId="rpm"
                  type="monotone"
                  dataKey="rpm"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-span-1 min-h-0">
          <div className="bg-slate-950/85 rounded-lg p-3 h-full overflow-y-auto border border-slate-700">
            <div className="space-y-2">
              {logs.map((log, index) => (
                <div key={index} className="text-xs font-mono">
                  <div className="flex justify-between items-center p-2 bg-gray-800/50 rounded">
                    <div className="space-y-1">
                      <div className="text-gray-400">
                        {timeLabel(log.timestamp)}
                      </div>
                      <div className="text-white">
                        Thrust: {(log.thrust * 1000).toFixed(0)}g
                      </div>
                      <div className="text-white">
                        RPM: {log.rpm}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400">Health:</span>
                        <span className="text-white">{log.health.toFixed(1)}%</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={
                          log.fault === 'Normal' 
                            ? 'bg-green-600 text-xs' 
                            : 'bg-red-600 text-xs'
                        }>
                          {log.fault}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {logs.length === 0 && (
                <div className="text-center text-gray-400 py-8">
                  Waiting for data...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}