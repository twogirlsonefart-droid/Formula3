import type { Transaction, VelocityMetrics, AccelerationMetrics, ConcentrationMetrics, Formula2State } from '@/types';

const VELOCITY_THRESHOLD = 2.5;
const ACCELERATION_THRESHOLD = 15;

export function calculateVelocityCoefficient(
  buyVolume: number,
  sellVolume: number,
  liquidityPool: number,
  buyVolume5m: number,
  sellVolume5m: number
): VelocityMetrics {
  const poolSize = liquidityPool || 1000000;
  const safeSellVolume = sellVolume || 1;

  const volumeRatio = buyVolume5m / poolSize;
  const buyToSellRatio = buyVolume / safeSellVolume;
  const velocityCoefficient = volumeRatio * buyToSellRatio;

  let status: 'STABLE' | 'COILING' | 'IGNITION' | 'EXPLOSIVE';
  if (velocityCoefficient < 0.5) {
    status = 'STABLE';
  } else if (velocityCoefficient < VELOCITY_THRESHOLD) {
    status = 'COILING';
  } else if (velocityCoefficient < 5) {
    status = 'IGNITION';
  } else {
    status = 'EXPLOSIVE';
  }

  return {
    velocityCoefficient: parseFloat(velocityCoefficient.toFixed(4)),
    buyVolume5m,
    sellVolume5m,
    buyToSellRatio: parseFloat(buyToSellRatio.toFixed(4)),
    liquidityPool: poolSize,
    ignitionThreshold: VELOCITY_THRESHOLD,
    status,
  };
}

export function calculateBondingCurveAcceleration(
  currentPrice: number,
  previousPrice: number,
  tokensMinted: number
): AccelerationMetrics {
  const priceDifference = currentPrice - previousPrice;
  const safeTokensMinted = tokensMinted || 1;

  const acceleration = (priceDifference / safeTokensMinted) * 100;
  const clampedAcceleration = Math.min(Math.max(acceleration, -50), 50);

  let glowIntensity: 0 | 1 | 2 | 3 = 0;
  if (clampedAcceleration > ACCELERATION_THRESHOLD) {
    if (clampedAcceleration > 30) glowIntensity = 3;
    else if (clampedAcceleration > 22) glowIntensity = 2;
    else glowIntensity = 1;
  }

  const isBreakout = clampedAcceleration > ACCELERATION_THRESHOLD;

  return {
    acceleration: parseFloat(clampedAcceleration.toFixed(2)),
    priceNow: currentPrice,
    pricePrev: previousPrice,
    priceChange: parseFloat(priceDifference.toFixed(8)),
    tokensMinted,
    glowIntensity,
    isBreakout,
  };
}

export function calculateConcentrationIndex(
  topWalletsBalance: number,
  totalSupply: number,
  averageWalletAge: number
): ConcentrationMetrics {
  const safeSupply = totalSupply || 1;
  const safeWalletAge = averageWalletAge || 1;

  const concentrationRatio = topWalletsBalance / safeSupply;
  const concentrationIndex = concentrationRatio / safeWalletAge;

  const distributionScore = Math.max(0, 100 - concentrationIndex * 1000);

  return {
    concentrationIndex: parseFloat(concentrationIndex.toFixed(6)),
    topWalletsBalance,
    totalSupply: safeSupply,
    averageWalletAge: parseFloat(averageWalletAge.toFixed(2)),
    topWalletsCount: 10,
    distributionScore: parseFloat(distributionScore.toFixed(2)),
  };
}

export function calculateOverallMomentum(
  velocityMetrics: VelocityMetrics,
  accelerationMetrics: AccelerationMetrics,
  concentrationMetrics: ConcentrationMetrics
): number {
  const velocityScore = Math.min(100, (velocityMetrics.velocityCoefficient / 5) * 100);
  const accelerationScore = Math.max(0, Math.min(100, ((accelerationMetrics.acceleration + 30) / 60) * 100));
  const concentrationScore = concentrationMetrics.distributionScore;

  const overallMomentum = (velocityScore * 0.5) + (accelerationScore * 0.35) + (concentrationScore * 0.15);

  return parseFloat(Math.min(100, Math.max(0, overallMomentum)).toFixed(2));
}
