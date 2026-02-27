'use client';

import ControlsPanel from './ControlsPanel';
import RealTimeDataPanel from './RealTimeDataPanel';
import AnalysisPanel from './AnalysisPanel';
import DataLogPanel from './DataLogPanel';
import { useData } from '../contexts/DataProvider';

export default function DashboardShell() {
  const {
    isConnected,
    isStreaming,
    isActionPending,
    motorData,
    chartSeries,
    logs,
    toggleStreaming,
  } = useData();

  return (
    <>
      <div className="text-center mb-3 border-b border-cyan-500/30 pb-2">
        <h1 className="text-5xl font-semibold text-white tracking-wide">
          AI-Enabled Drone Thrust Measurement System
        </h1>
      </div>

      <div className="grid grid-cols-12 grid-rows-[minmax(0,1fr)_minmax(0,1fr)] gap-4 h-[calc(100vh-92px)]">
        <div className="col-span-3 row-span-2 min-h-0">
          <ControlsPanel
            isConnected={isConnected}
            isStreaming={isStreaming}
            isActionPending={isActionPending}
            onEmergencyToggle={toggleStreaming}
          />
        </div>

        <div className="col-span-9 row-start-1 min-h-0">
          <div className="grid grid-cols-2 gap-4 h-full">
            <RealTimeDataPanel sample={motorData} />
            <AnalysisPanel sample={motorData} />
          </div>
        </div>

        <div className="col-span-9 row-start-2 min-h-0">
          <DataLogPanel chartSeries={chartSeries} logs={logs} />
        </div>
      </div>
    </>
  );
}
