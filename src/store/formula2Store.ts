import { create } from 'zustand';
import type { RealTimeData, SocialSignal, Transaction } from '@/types';

interface Formula2Store {
  data: RealTimeData | null;
  isConnected: boolean;
  lastUpdate: number;
  setData: (data: RealTimeData) => void;
  addTransaction: (transaction: Transaction) => void;
  addSocialSignal: (signal: SocialSignal) => void;
  setConnected: (connected: boolean) => void;
}

export const useFormula2Store = create<Formula2Store>((set) => ({
  data: null,
  isConnected: false,
  lastUpdate: 0,

  setData: (data: RealTimeData) =>
    set({
      data,
      lastUpdate: Date.now(),
    }),

  addTransaction: (transaction: Transaction) =>
    set((state) => ({
      data: state.data
        ? {
            ...state.data,
            transactions: [transaction, ...state.data.transactions].slice(0, 100),
          }
        : null,
    })),

  addSocialSignal: (signal: SocialSignal) =>
    set((state) => ({
      data: state.data
        ? {
            ...state.data,
            socialSignals: [signal, ...state.data.socialSignals].slice(0, 50),
          }
        : null,
    })),

  setConnected: (connected: boolean) =>
    set({ isConnected: connected }),
}));
