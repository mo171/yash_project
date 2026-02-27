'use client';

import { motion } from 'framer-motion';

export default function ThrustDisplay({ value = 0.45 }) {
  const percentage = Math.min((value / 2.0) * 100, 100); // Assuming max thrust around 2.0 kgf

  return (
    <div className="relative">
      <div className="w-40 h-40 rounded-full border-4 border-cyan-500 bg-gray-900 flex items-center justify-center relative">
        
        {/* Progress Arc */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
          {/* Background Arc */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#374151"
            strokeWidth="3"
          />
          
          {/* Progress Arc */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 45}`}
            initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
            animate={{ 
              strokeDashoffset: 2 * Math.PI * 45 * (1 - percentage / 100)
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </svg>

        {/* Center Content */}
        <div className="text-center z-10">
          <div className="text-sm text-cyan-400 mb-1">THRUST:</div>
          <motion.div 
            className="text-3xl font-bold text-white"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {(value * 1000).toFixed(0)}g
          </motion.div>
        </div>
      </div>

      {/* Outer Ring Decorations */}
      <div className="absolute inset-0 rounded-full">
        {/* Tick marks around the circle */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-4 bg-gray-600"
            style={{
              top: '2px',
              left: 'calc(50% - 2px)',
              transformOrigin: '2px 94px',
              transform: `rotate(${i * 30}deg)`
            }}
          />
        ))}
      </div>
    </div>
  );
}