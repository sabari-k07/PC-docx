import React from 'react';
import { useBuild } from '../context/BuildContext';
import { FORMAT_INR, CANONICAL_BUILD } from '../data/mockData';
import { Check, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export const CompareView = () => {
  const { setBuild, setCurrentView, showToast } = useBuild();

  const comparisonBuilds = [
    {
      id: 'build-a',
      name: 'Value 1080p Esports',
      tier: 'Budget Friendly',
      price: 74900,
      cpu: 'Intel Core i5-12400F',
      gpu: 'NVIDIA RTX 5060 8GB',
      ram: '16GB DDR4-3200',
      storage: '1TB Gen3 NVMe',
      psu: '550W 80+ Bronze',
      power: 342,
      gamingScore: 76,
      aiScore: 58,
      upgradeScore: 70,
      valueScore: 88,
      recommended: false
    },
    {
      id: 'build-b',
      name: '1440p Balanced Beast',
      tier: 'Sweet Spot',
      price: 98450,
      cpu: 'AMD Ryzen 5 7600 (AM5)',
      gpu: 'NVIDIA RTX 5070 12GB',
      ram: '16GB DDR5-6000 EXPO',
      storage: '1TB Gen4 NVMe (5000 MB/s)',
      psu: '650W 80+ Bronze',
      power: 438,
      gamingScore: 92,
      aiScore: 84,
      upgradeScore: 88,
      valueScore: 94,
      recommended: true
    },
    {
      id: 'build-c',
      name: 'Creator & 4K AI Pro',
      tier: 'Flagship Power',
      price: 132900,
      cpu: 'AMD Ryzen 7 7800X3D',
      gpu: 'NVIDIA RTX 5070 Ti 16GB',
      ram: '32GB DDR5-6000 Dual',
      storage: '2TB High-Speed Gen4',
      psu: '750W 80+ Gold Modular',
      power: 512,
      gamingScore: 97,
      aiScore: 93,
      upgradeScore: 82,
      valueScore: 79,
      recommended: false
    }
  ];

  const handleSelectBuild = (b) => {
    if (b.id === 'build-b') {
      setBuild(JSON.parse(JSON.stringify(CANONICAL_BUILD)));
    }
    setCurrentView('builder');
    showToast(`Loaded ${b.name} into the builder!`);
  };

  const rows = [
    { label: 'Target Price (INR)', getVal: (b) => FORMAT_INR(b.price), isHero: true },
    { label: 'Processor (CPU)', getVal: (b) => b.cpu, bestIndex: 1 },
    { label: 'Graphics Card (GPU)', getVal: (b) => b.gpu, bestIndex: 1 },
    { label: 'System Memory (RAM)', getVal: (b) => b.ram, bestIndex: 2 },
    { label: 'Primary Storage', getVal: (b) => b.storage, bestIndex: 1 },
    { label: 'Estimated Power Draw', getVal: (b) => `${b.power}W (${b.psu})` },
    { label: '1440p Gaming Score', getVal: (b) => `${b.gamingScore}/100`, bestIndex: 1 },
    { label: 'Local AI / LLM Score', getVal: (b) => `${b.aiScore}/100`, bestIndex: 2 },
    { label: 'Upgrade Readiness', getVal: (b) => `${b.upgradeScore}/100`, bestIndex: 1 },
    { label: 'Value Per Rupee', getVal: (b) => `${b.valueScore}/100`, bestIndex: 1, isWinner: true }
  ];

  return (
    <div className="animate-fade-in" style={{ padding: '40px 0 80px 0' }}>
      <div className="page-container">
        
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <div className="badge badge-purple" style={{ marginBottom: '12px' }}>
            <Sparkles size={12} /> ARCHITECTURAL COMPARISON
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 4vw, 42px)', fontWeight: 800, color: '#FFF', marginBottom: '8px' }}>
            Compare Build Configurations
          </h1>
          <p style={{ fontSize: '17px', color: 'var(--text-secondary)' }}>
            Evaluate performance trade-offs, silicon choices, and price-to-performance across tiers.
          </p>
        </div>

        {/* 3-Column Comparative Matrix */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-default)',
          borderRadius: '24px',
          overflow: 'hidden',
          marginBottom: '40px'
        }}>
          {/* Header Row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '240px 1fr 1fr 1fr',
            borderBottom: '1px solid var(--border-default)',
            background: 'var(--bg-surface)'
          }}>
            <div style={{ padding: '24px 20px', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                SPECIFICATION
              </span>
            </div>

            {comparisonBuilds.map((b) => (
              <div
                key={b.id}
                style={{
                  padding: '24px 20px',
                  background: b.recommended ? 'rgba(124, 92, 255, 0.08)' : 'transparent',
                  borderLeft: '1px solid var(--border-default)',
                  position: 'relative'
                }}
              >
                {b.recommended && (
                  <span className="badge badge-purple" style={{ marginBottom: '8px' }}>
                    RECOMMENDED CHOICE
                  </span>
                )}
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#FFF', marginBottom: '4px' }}>
                  {b.name}
                </h3>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                  {b.tier}
                </div>
              </div>
            ))}
          </div>

          {/* Data Rows */}
          {rows.map((r, rowIdx) => (
            <div
              key={rowIdx}
              style={{
                display: 'grid',
                gridTemplateColumns: '240px 1fr 1fr 1fr',
                borderBottom: rowIdx === rows.length - 1 ? 'none' : '1px solid var(--border-subtle)',
                background: rowIdx % 2 === 0 ? 'transparent' : 'rgba(16, 18, 24, 0.4)',
                minHeight: '64px'
              }}
            >
              {/* Row Label */}
              <div style={{
                padding: '18px 20px',
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center'
              }}>
                {r.label}
              </div>

              {/* 3 Values */}
              {comparisonBuilds.map((b, colIdx) => {
                const val = r.getVal(b);
                const isBest = r.bestIndex === colIdx;

                return (
                  <div
                    key={colIdx}
                    style={{
                      padding: '18px 20px',
                      borderLeft: '1px solid var(--border-subtle)',
                      background: b.recommended ? 'rgba(124, 92, 255, 0.04)' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: r.isHero ? '18px' : '14px',
                      fontWeight: r.isHero || isBest ? 700 : 500,
                      color: r.isHero ? '#FFFFFF' : isBest ? 'var(--text-primary)' : 'var(--text-secondary)'
                    }}
                  >
                    <span>{val}</span>
                    {isBest && (
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: 'rgba(53, 208, 127, 0.15)',
                        color: 'var(--status-success)'
                      }}>
                        <Check size={12} />
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}

          {/* Action Row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '240px 1fr 1fr 1fr',
            borderTop: '1px solid var(--border-default)',
            background: 'var(--bg-surface)',
            padding: '20px'
          }}>
            <div />
            {comparisonBuilds.map((b) => (
              <div key={b.id} style={{ padding: '0 10px' }}>
                <button
                  onClick={() => handleSelectBuild(b)}
                  className={b.recommended ? 'btn-primary' : 'btn-secondary'}
                  style={{ width: '100%', justifyContent: 'center', padding: '10px', fontSize: '13px' }}
                >
                  {b.recommended ? 'Select & Load Build B' : `Load ${b.name}`}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Recommendation Analysis Box */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-default)',
          borderRadius: '20px',
          padding: '28px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent-purple-text)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
              EXECUTIVE HARDWARE RECOMMENDATION
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#FFF', marginBottom: '6px' }}>
              Best choice for your budget: Build B (₹98,450)
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '64ch' }}>
              It hits the ideal sweet spot: 82% of Build C's flagship performance at 74% of the cost, on AMD's modern AM5 platform with long-term DDR5 memory headroom.
            </p>
          </div>

          <button
            onClick={() => handleSelectBuild(comparisonBuilds[1])}
            className="btn-primary"
            style={{ padding: '12px 28px' }}
          >
            <span>Proceed with Build B</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
};
