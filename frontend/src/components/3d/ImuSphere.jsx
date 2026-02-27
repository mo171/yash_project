'use client';

import { motion } from 'framer-motion';

export default function ImuSphere({ pitch = 0, roll = 0, yaw = 0 }) {
  return (
    <div className="relative w-32 h-32 mx-auto">
      {/* 3D Sphere Container */}
      <motion.div
        className="relative w-full h-full"
        style={{
          perspective: '200px',
        }}
        animate={{
          rotateX: pitch,
          rotateY: yaw,
          rotateZ: roll,
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Main Sphere */}
        <div 
          className="absolute inset-0 rounded-full border-2 border-green-500 bg-gradient-to-br from-green-400/20 to-green-700/40"
          style={{
            background: `
              radial-gradient(circle at 30% 30%, rgba(34, 197, 94, 0.8), rgba(34, 197, 94, 0.2)),
              conic-gradient(from 0deg, rgba(34, 197, 94, 0.3), rgba(34, 197, 94, 0.1))
            `
          }}
        >
          {/* X Axis (Red) */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-red-500 transform -translate-y-0.5" />
          
          {/* Y Axis (Green) */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-green-500 transform -translate-x-0.5" />
          
          {/* Z Axis (Blue) - Fake 3D effect */}
          <div 
            className="absolute top-1/2 left-1/2 w-16 h-0.5 bg-blue-500 transform -translate-x-1/2 -translate-y-0.5"
            style={{
              transform: 'translate(-50%, -50%) rotateZ(45deg) scaleX(0.7)'
            }}
          />

          {/* Center Dot */}
          <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2" />
          
          {/* Grid Lines for 3D Effect */}
          <div className="absolute inset-2">
            {/* Horizontal lines */}
            {[25, 50, 75].map(percent => (
              <div 
                key={`h-${percent}`}
                className="absolute left-0 right-0 h-px bg-green-300/30"
                style={{ top: `${percent}%` }}
              />
            ))}
            
            {/* Vertical lines */}
            {[25, 50, 75].map(percent => (
              <div 
                key={`v-${percent}`}
                className="absolute top-0 bottom-0 w-px bg-green-300/30"
                style={{ left: `${percent}%` }}
              />
            ))}
          </div>
        </div>

        {/* Outer Ring for 3D Effect */}
        <div className="absolute inset-[-4px] rounded-full border border-green-300/20" />
      </motion.div>

      {/* Axis Labels */}
      <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 text-xs text-red-400 font-bold">
        X
      </div>
      <div className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 text-xs text-green-400 font-bold">
        Y
      </div>
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-blue-400 font-bold">
        Z
      </div>
    </div>
  );
}