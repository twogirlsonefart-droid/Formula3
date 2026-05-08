'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import MomentumGauge from '@/components/MomentumGauge';
import TransactionMatrix from '@/components/TransactionMatrix';
import OrbitalMap from '@/components/OrbitalMap';
import ElonSignal from '@/components/ElonSignal';
import DataStream from '@/components/DataStream';
import type { Transaction, SocialSignal } from '@/types';

const generateMockTransaction = (): Transaction => {
  const types: Array<'buy' | 'sell'> = ['buy', 'sell'];
  const type = types[Math.floor(Math.random() * types.length)];
  const amount = Math.random() * 1000000;
  const price = Math.random() * 0.001;

  return {
    id: `tx-${Date.now()}-${Math.random()}`,
    signature: `${Math.random().toString(36).substring(7)}`.padEnd(87, '0'),
    timestamp: Date.now() - Math.random() * 300000,
    type,
    amount,
    decimals: 6,
    price,
    totalValue: amount * price,
    walletAddress: `wallet_${Math.random().toString(36).substring(7)}`,
    walletLabel: Math.random() > 0.7 ? 'Whale 🐋' : undefined,
    isTopWallet: Math.random() > 0.9,
    walletAge: Math.random() * 365,
  };
};

const generateMockSignal = (): SocialSignal => {
  const sources = ['Twitter', 'Discord', 'Telegram', 'Blockchain'];
  const messages = [
    'High volume detected on DEX',
    'Whale wallet accumulated tokens',
    'Trending on social media',
    'New partnership announcement',
  ];

  return {
    id: `signal-${Date.now()}`,
    type: 'mention',
    source: sources[Math.floor(Math.random() * sources.length)],
    message: messages[Math.floor(Math.random() * messages.length)],
    sentiment: ['positive', 'negative', 'neutral'][Math.floor(Math.random() * 3)] as any,
    timestamp: Date.now(),
    engagement: Math.random() * 100000,
    priority: Math.random() > 0.8 ? 'critical' : 'high',
  };
};

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [momentum, setMomentum] = useState(42);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [signals, setSignals] = useState<SocialSignal[]>([]);
  const [sentiment, setSentiment] = useState(25);

  useEffect(() => {
    setMounted(true);
    const initialTxs = Array.from({ length: 20 }, () => generateMockTransaction());
    setTransactions(initialTxs);
    const initialSignals = Array.from({ length: 5 }, () => generateMockSignal());
    setSignals(initialSignals);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const txInterval = setInterval(() => {
      const newTx = generateMockTransaction();
      setTransactions((prev) => [newTx, ...prev].slice(0, 100));
      setMomentum((prev) => {
        const change = (Math.random() - 0.5) * 8;
        return Math.max(0, Math.min(100, prev + change));
      });
    }, 2000);

    const signalInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newSignal = generateMockSignal();
        setSignals((prev) => [newSignal, ...prev].slice(0, 50));
      }
      setSentiment((prev) => {
        const change = (Math.random() - 0.5) * 10;
        return Math.max(-100, Math.min(100, prev + change));
      });
    }, 3000);

    return () => {
      clearInterval(txInterval);
      clearInterval(signalInterval);
    };
  }, [mounted]);

  const getStatus = (m: number) => {
    if (m < 25) return 'STABLE';
    if (m < 50) return 'COILING';
    if (m < 75) return 'IGNITION';
    return 'EXPLOSIVE';
  };

  const getGlowIntensity = (m: number) => {
    if (m < 25) return 0;
    if (m < 50) return 1;
    if (m < 75) return 2;
    return 3;
  };

  if (!mounted) {
    return (
      <Layout>
        <div className="w-full h-screen flex items-center justify-center">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}>
            <div className="text-4xl">⚡</div>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="relative w-full min-h-screen p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold glow-text mb-2">
            FORMULA 2
          </h1>
          <p className="text-cyber-blue text-lg font-mono">
            HIGH-VELOCITY MOMENTUM ENGINE • SOLANA NETWORK
          </p>
          <div className="mt-2 text-xs text-gray-500 font-mono">
            {new Date().toLocaleTimeString()}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 bg-deep-space/80 border border-cyber-blue/30 rounded-lg p-4 backdrop-blur-sm relative overflow-hidden"
          >
            <DataStream enabled />
            <div className="relative z-10">
              <h2 className="text-cyber-blue font-bold mb-3 text-sm">BATCH PURITY MATRIX</h2>
              <TransactionMatrix transactions={transactions} maxItems={10} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-deep-space/80 border border-cyber-blue/30 rounded-lg p-8 backdrop-blur-sm"
          >
            <h2 className="text-cyber-blue font-bold mb-6 text-center text-sm">FORMULA 2 MOMENTUM</h2>
            <MomentumGauge
              momentum={momentum}
              status={getStatus(momentum)}
              glowIntensity={getGlowIntensity(momentum)}
            />
            <div className="mt-6 text-center">
              <div className="text-2xl font-bold text-neon-green font-mono">{momentum.toFixed(1)}</div>
              <div className="text-xs text-cyber-blue font-mono mt-1">OVERALL MOMENTUM SCORE</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1 bg-deep-space/80 border border-cyber-blue/30 rounded-lg p-4 backdrop-blur-sm"
          >
            <h2 className="text-cyber-blue font-bold mb-4 text-center text-sm">MARS TRAJECTORY</h2>
            <OrbitalMap
              currentMarketCap={42000000}
              targetMarketCap={100000000}
              distancePercent={(42 / 100) * 100}
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-deep-space/80 border border-cyber-blue/30 rounded-lg p-6 backdrop-blur-sm"
        >
          <h2 className="text-cyber-blue font-bold mb-4 text-sm">ELON SIGNAL MONITOR</h2>
          <ElonSignal signals={signals} sentimentScore={sentiment} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex justify-between items-center px-4 py-2 border-t border-cyber-blue/30 text-xs font-mono text-gray-500"
        >
          <div>Status: <span className="text-neon-green">● ONLINE</span></div>
          <div>Network: <span className="text-neon-green">SOLANA</span></div>
          <div>Mode: <span className="text-neon-green">RADAR ACTIVE</span></div>
          <div>Latency: <span className="text-neon-green">24ms</span></div>
        </motion.div>
      </div>
    </Layout>
  );
}
