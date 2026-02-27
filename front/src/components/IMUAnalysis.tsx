import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Box } from "@react-three/drei";
import { Braces, Boxes, Info, TrendingUp } from "lucide-react";

interface IMUAnalysisProps {
  data: any;
}

const DroneModel = ({ data }: { data: any }) => {
  // Simple representation for now, normally we'd rotate based on Pitch/Roll/Yaw
  // The backend snapshot doesn't have orientation but we can simulate it or map it to something
  return (
    <Box args={[2, 0.2, 2]} rotation={[0.1, 0, 0.1]}>
      <meshStandardMaterial color="#38bdf8" wireframe={true} />
    </Box>
  );
};

const IMUAnalysis: React.FC<IMUAnalysisProps> = ({ data }) => {
  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex-1 glass-panel rounded-2xl p-6 flex flex-col border border-white/5 relative overflow-hidden">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 text-center border-b border-white/5 pb-2">
          IMU & AI Analysis
        </h2>

        <div className="flex-1 min-h-0 bg-black/20 rounded-xl relative">
          <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Suspense fallback={null}>
              <DroneModel data={data} />
              <OrbitControls enableZoom={false} />
              <gridHelper args={[10, 10, 0x333333, 0x111111]} />
            </Suspense>
          </Canvas>

          {/* Axis Labels */}
          <div className="absolute top-4 right-4 flex flex-col gap-1 text-[10px] font-mono text-slate-500 uppercase">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500"></span> Pitch:
              2°
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span> Roll:
              -1°
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span> Yaw: 0°
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-accent-green/5 border border-accent-green/20 rounded-xl">
          <div className="flex items-center gap-2 mb-3">
            <Brain className="w-4 h-4 text-accent-green" />
            <h3 className="text-xs font-black text-accent-green uppercase tracking-wider">
              AI Insights
            </h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Efficiency: <span className="text-white font-bold">85%</span> |
            Status: <span className="text-accent-green font-bold">STABLE</span>{" "}
            | Fault:{" "}
            <span className="text-white font-bold">
              {data?.fault_type || "None"}
            </span>
          </p>
          <div className="mt-2 text-[10px] text-slate-500 font-mono">
            Predicted Max Thrust: 1200g
          </div>
        </div>
      </div>
    </div>
  );
};

export default IMUAnalysis;
