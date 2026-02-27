'use client';

import { Toaster } from 'react-hot-toast';
import { DataProvider } from './contexts/DataProvider';
import DashboardShell from './dashboard/DashboardShell';

export default function DashboardContainer() {
  return (
    <DataProvider>
      <div className="h-screen w-screen bg-slate-950 text-white p-3 overflow-hidden">
        <Toaster position="top-right" />
        <DashboardShell />
      </div>
    </DataProvider>
  );
}