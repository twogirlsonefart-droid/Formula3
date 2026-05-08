'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface MomentumGaugeProps {
  momentum: number;
  status: 'STABLE' | 'COILING' | 'IGNITION' | 'EXPLOSIVE';
  glowIntensity: number;
}

const MomentumGauge: React.FC<MomentumGaugeProps> = ({ momentum, status, glowIntensity }) => {
  const rotation = (momentum / 100) * 180 - 90;

  const getStatusColor = () => {
    switch (status) {
      case 'STABLE':
        return 'from-blue-500 to-blue-400';
      case 'COILING':
        return 'from-yellow-500 to-orange-400';
      case 'IGNITION':
        return 'from-orange-500 to-red-400';
      case 'EXPLOSIVE':
        return 'from-red-600 to-red-500';
      default:
        return 'from-cyber-blue to-blue-400';
    }
  };

  const getGlowIntensity = () => {
    if (glowIntensity === 0) return 'shadow-none';
    if (glowIntensity === 1) return 'shadow-lg shadow-cyber-blue/50';
    if (glowIntensity === 2) return 'shadow-xl shadow-cyber-blue/75';
    return 'shadow-2xl shadow-cyber-blue';
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <motion.div
        className={`absolute inset-0 rounded-full border-2 border-cyber-blue/30 ${getGlowIntensity()}`}
        animate={glowIntensity > 0 ? { opacity: [0.5, 1, 0.5] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />

      <svg viewBox="0 0 200 120" className="w-full h-auto">
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          stroke="#1a1a2e"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />

        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00D2FF" />
            <stop offset="33%" stopColor="#FFB700" />
            <stop offset="66%" stopColor="#FF6B6B" />
            <stop offset="100%" stopColor="#FF0000" />
          </linearGradient>
        </defs>

        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          stroke="url(#gaugeGradient)"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          style={{
            strokeDasharray: `${(momentum / 100) * 251} 251`,
            transition: 'stroke-dasharray 0.5s ease-out',
          }}
        />

        <circle cx="100" cy="100" r="8" fill="#00D2FF" />

        <motion.g
          style={{ transformOrigin: '100px 100px' }}\n          animate={{ rotate: rotation }}
          transition={{ type: 'spring', stiffness: 100, damping: 30 }}
        >
          <line x1="100" y1="100" x2="100" y2="30" stroke="#00D2FF" strokeWidth="2" />
          <circle cx="100" cy="100" r="4" fill="#00D2FF" />
        </motion.g>

        <text x="20" y="115" fontSize="10" fill="#00D2FF" textAnchor="start">
          STABLE
        </text>
        <text x="100" y="115" fontSize="10" fill="#FFB700" textAnchor="middle">
          COILING
        </text>
        <text x="160" y="115" fontSize="10" fill="#FF6B6B" textAnchor="end">
          EXPLOSIVE
        </text>
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className={`text-4xl font-bold bg-gradient-to-r ${getStatusColor()} bg-clip-text text-transparent`}>
          {momentum.toFixed(1)}
        </div>
        <div className="text-xs text-cyber-blue font-mono mt-1">{status}</div>
      </div>
    </div>
  );
};

export default MomentumGauge;
