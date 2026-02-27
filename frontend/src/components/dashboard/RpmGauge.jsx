'use client';

import { motion } from 'framer-motion';

export default function RpmGauge({ value = 3200, max = 8000 }) {
  const percentage = (value / max) * 100;
  const rotation = (percentage / 100) * 240 - 120; // 240 degree range, starting at -120

  // Color based on RPM
  const getColor = (rpm) => {
    if (rpm < 2000) return '#10b981'; // Green
    if (rpm < 5000) return '#f59e0b'; // Yellow
    if (rpm < 7000) return '#f97316'; // Orange
    return '#ef4444'; // Red
  };

  const color = getColor(value);

  return (
    <div className="relative">
      <div className="w-40 h-40 relative">
        
        {/* Background Arc */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
          {/* Outer Ring */}
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="#374151"
            strokeWidth="8"
          />
          
          {/* Speed Segments */}
          {[...Array(9)].map((_, i) => {
            const angle = (i * 30 - 120) * (Math.PI / 180);
            const x1 = 100 + 75 * Math.cos(angle);
            const y1 = 100 + 75 * Math.sin(angle);
            const x2 = 100 + 85 * Math.cos(angle);
            const y2 = 100 + 85 * Math.sin(angle);
            
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#10b981"
                strokeWidth="3"
              />
            );
          })}

          {/* Progress Arc */}
          <motion.path
            d="M 25 100 A 75 75 0 0 1 175 100"
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="235.6" // Circumference of arc
            initial={{ strokeDashoffset: 235.6 }}
            animate={{ 
              strokeDashoffset: 235.6 * (1 - percentage / 100)
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />

          {/* Needle */}
          <motion.line
            x1="100"
            y1="100"
            x2="100"
            y2="30"
            stroke="#ef4444"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ rotate: -120 }}
            animate={{ rotate: rotation }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ transformOrigin: '100px 100px' }}
          />

          {/* Center Dot */}
          <circle cx="100" cy="100" r="4" fill="#ef4444" />
        </svg>

        {/* RPM Labels */}
        <div className="absolute inset-0">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((num, i) => {
            const angle = (i * 30 - 120) * (Math.PI / 180);
            const x = 50 + 35 * Math.cos(angle);
            const y = 50 + 35 * Math.sin(angle);
            
            return (
              <div
                key={num}
                className="absolute text-[10px] text-white font-bold"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                {num}
              </div>
            );
          })}
        </div>

        {/* Center RPM Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-16">
          <motion.div 
            className="text-2xl font-bold text-white"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {value}
          </motion.div>
          <div className="text-sm text-gray-400">RPM</div>
        </div>
      </div>
    </div>
  );
}