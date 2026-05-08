# Formula 2: High-Velocity Momentum Engine

## 🚀 Overview

**Formula 2** is a sophisticated real-time Solana token momentum radar designed to detect buy pressure ignition points before breakouts. It combines three mathematical formulas to create a unified momentum indicator.

---

## 📡 The Three Core Formulas

### Formula A: Buy Pressure Velocity Coefficient
```
V_B = (ΔVolume_5m / Liquidity Pool) × (Buy/Sell Ratio)
```
- Threshold: **V_B > 2.5** triggers IGNITION
- Status: STABLE → COILING → IGNITION → EXPLOSIVE

### Formula B: Bonding Curve Acceleration
```
Acceleration = (P_now - P_prev) / Tokens Minted × 100
```
- Threshold: **Acceleration > 15%** triggers blue glow
- Glow Intensity: 1 (15%), 2 (22%), 3 (30%+)

### Formula C: Concentration Index
```
CI = (Σ(Balance of Top 10 Wallets) / Total Supply) ÷ Wallet Age Average
```
- Healthy: **CI < 0.001**
- Measures distribution and smart money concentration

---

## 🎨 Dashboard Components

| Component | Function |
|-----------|----------|
| **Momentum Gauge** | Real-time speedometer (0-100 scale) |
| **Transaction Matrix** | Live buy/sell feed with purity % |
| **Mars Trajectory** | Path to $100M market cap target |
| **Elon Signal** | Sentiment tracking + alerts |

---

## 🏗️ Tech Stack

- **Frontend**: Next.js 14 + React 18 + TypeScript
- **Styling**: Tailwind CSS + Framer Motion
- **Blockchain**: @solana/web3.js
- **State**: Zustand
- **API**: Helius RPC, Birdeye API

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
open http://localhost:3000
```

---

## 🔌 Environment Setup

```bash
cp .env.example .env.local
# Edit with your API keys:
# - SOLANA_HELIUS_API_KEY
# - NEXT_PUBLIC_OMNIX_MINT
# - BIRDEYE_API_KEY
```

---

## 📊 Live Features

✅ Mock data streaming (ready for real Solana data)
✅ Real-time momentum calculations
✅ Animated UI with cyberpunk theme
✅ WebSocket infrastructure prepared
✅ All three formulas fully implemented

---

## 🎯 Key Metrics

- **Momentum**: 0-100 (overall health)
- **Velocity**: Buy pressure detection
- **Acceleration**: Price action tracking
- **Concentration**: Distribution analysis
- **Sentiment**: Social signal aggregation
- **Purity**: Buy/Sell ratio

---

## 📝 License

MIT - See LICENSE for details

**Built with ⚡ for Solana**
