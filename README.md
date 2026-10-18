# PC-docx

> **India's Premier Intelligent PC Configurator & Hardware Decision Platform**

A calm, high-density, precise PC building web application engineered for Indian gamers, developers, creators, and AI practitioners.

## ✨ Key Features
- **Indian Market Optimization**: Native Indian Rupee (`₹`) formatting, live retailer stock indicators (PrimeABGB, MDComputers, Vedant Computers, Amazon India), and GST-inclusive pricing.
- **20-Screen Architecture**: Full journey from goal-oriented 3-step wizard to 3D chassis visualizer, deep 6-layer compatibility health checks, 4-year upgrade roadmap, and printable BOM review.
- **Hardware Decision Engines**:
  - Live Compatibility Engine (Socket, RAM types, GPU physical clearance, PSU headroom, thermal envelope)
  - Dynamic Efficiency Quotient (EQ) Badge Engine (Performance per Watt & Rupee)
  - Interactive PSU 80+ Efficiency Curve & Load Analysis
  - CPU ↔ GPU Bottleneck Balancing Engine
  - "Downsize & Save" Budget Optimizer
- **Dark Mode Native**: Linear / Vercel / Apple Configurator design system with tabular numbers and zero RGB neon gaming clutter.
- **Supabase Backend Ready**: PostgreSQL schema and seed data for live equipment catalog management.

## 🛠️ Tech Stack
- **Frontend**: React 18, Vite, Lucide Icons, Canvas Confetti
- **Styling**: Vanilla CSS Design Tokens (Dark-Mode Native)
- **Backend / Database**: Supabase (PostgreSQL, Storage, Realtime)

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and add your Supabase credentials:
```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```
