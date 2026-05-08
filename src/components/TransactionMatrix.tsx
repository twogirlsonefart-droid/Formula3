'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { Transaction } from '@/types';

interface TransactionMatrixProps {
  transactions: Transaction[];
  maxItems?: number;
}

const TransactionMatrix: React.FC<TransactionMatrixProps> = ({ transactions, maxItems = 15 }) => {
  const displayTransactions = transactions.slice(0, maxItems);

  const getBuyPurity = (txs: Transaction[]) => {
    if (txs.length === 0) return 0;
    const buyCount = txs.filter(tx => tx.type === 'buy').length;
    return ((buyCount / txs.length) * 100).toFixed(1);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'buy':
        return 'text-neon-green shadow-lg shadow-neon-green/50';
      case 'sell':
        return 'text-gray-500';
      default:
        return 'text-cyber-blue';
    }
  };

  const getTypeBackground = (type: string) => {
    switch (type) {
      case 'buy':
        return 'bg-neon-green/10 border-neon-green/30';
      case 'sell':
        return 'bg-gray-900/30 border-gray-700/30';
      default:
        return 'bg-cyber-blue/10 border-cyber-blue/30';
    }
  };

  return (
    <div className="space-y-2">
      <div className="px-3 py-2 border-b border-cyber-blue/30 text-xs font-mono text-cyber-blue grid grid-cols-12 gap-2">
        <div className="col-span-2">TYPE</div>
        <div className="col-span-2">AMOUNT</div>
        <div className="col-span-3">VALUE</div>
        <div className="col-span-2">PRICE</div>
        <div className="col-span-3">WALLET</div>
      </div>

      <div className="space-y-1 max-h-[500px] overflow-y-auto pr-2">
        {displayTransactions.map((tx, index) => (
          <motion.div
            key={tx.id}
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className={`px-3 py-2 rounded border font-mono text-xs grid grid-cols-12 gap-2 items-center ${getTypeBackground(tx.type)}`}
          >
            <div className={`col-span-2 font-bold uppercase ${getTypeColor(tx.type)}`}>
              {tx.type === 'buy' ? '⬆ BUY' : '⬇ SELL'}
            </div>
            <div className="col-span-2 text-cyber-blue">{(tx.amount / 1e6).toFixed(2)}M</div>
            <div className="col-span-3 text-neon-green font-semibold">${(tx.totalValue / 1e6).toFixed(2)}M</div>
            <div className="col-span-2 text-yellow-400">
              {tx.price < 0.001 ? `${(tx.price * 1e6).toFixed(0)}µ` : `$${tx.price.toFixed(4)}`}
            </div>
            <div className="col-span-3 text-gray-400 truncate">
              {tx.walletLabel || `${tx.walletAddress.slice(0, 6)}...`}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 pt-2 border-t border-cyber-blue/30 grid grid-cols-3 gap-2 text-xs font-mono">
        <div className="bg-cyber-blue/10 px-2 py-1 rounded border border-cyber-blue/30">
          <div className="text-cyber-blue">PURITY %</div>
          <div className="text-neon-green font-bold text-lg">{getBuyPurity(displayTransactions)}%</div>
        </div>
        <div className="bg-cyber-blue/10 px-2 py-1 rounded border border-cyber-blue/30">
          <div className="text-cyber-blue">TOTAL TXS</div>
          <div className="text-neon-green font-bold text-lg">{displayTransactions.length}</div>
        </div>
        <div className="bg-cyber-blue/10 px-2 py-1 rounded border border-cyber-blue/30">
          <div className="text-cyber-blue">AVG VALUE</div>
          <div className="text-neon-green font-bold text-lg">
            ${(displayTransactions.reduce((sum, tx) => sum + tx.totalValue, 0) / (displayTransactions.length || 1) / 1e6).toFixed(2)}M
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionMatrix;
