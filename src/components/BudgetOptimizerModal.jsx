import React from 'react';
import { useBuild } from '../context/BuildContext';
import { FORMAT_INR } from '../data/mockData';
import { X, TrendingDown, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

export const BudgetOptimizerModal = () => {
  const {
    isOptimizerOpen,
    setIsOptimizerOpen,
    currentTotal,
    targetBudget,
    applyOptimization,
    showToast
  } = useBuild();

  if (!isOptimizerOpen) return null;

  const overAmount = Math.max(currentTotal - targetBudget, 8500);
  const optimizedTotal = currentTotal - 9500;

  const optimizations = [
    {
      id: 'ssd',
      title: 'Optimize Primary SSD',
      from: 'Crucial T500 1TB Gen4 (₹6,500)',
      to: 'Crucial P3 Plus 1TB (₹4,500)',
      savings: 2000,
      impact: 'Minimal Impact',
      impactColor: 'var(--status-success)',
      desc: '0.2s difference in OS/game load times. Zero difference in gaming FPS or render performance.'
    },
    {
      id: 'ram',
      title: 'Optimize RAM Capacity for Today',
      from: 'G.Skill 32GB Dual Stick Kit (₹9,800)',
      to: 'Corsair Vengeance 16GB Single Stick (₹4,200)',
      savings: 5600,
      impact: 'Zero FPS Loss at 1440p',
      impactColor: 'var(--status-success)',
      desc: 'Drop in an identical second stick down the road. Same 6000MHz speed today.'
    },
    {
      id: 'case',
      title: 'Streamline Chassis & Fan Bundle',
      from: 'Premium Aluminum Frame (₹7,950)',
      to: 'Deepcool CC560 with 4 Pre-installed Fans (₹2,450)',
      savings: 5500,
      impact: 'Zero Thermal Loss',
      impactColor: '#4DA3FF',
      desc: 'Saves buying separate case fan bundles while maintaining high front mesh intake airflow.'
    }
  ];

  return (
    <div className="modal-backdrop" onClick={() => setIsOptimizerOpen(false)}>
      <div
        className="card-surface"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '820px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-default)',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <div className="badge badge-warning" style={{ marginBottom: '8px' }}>
              <TrendingDown size={14} /> SMART BUDGET OPTIMIZER
            </div>
            <h2 style={{ fontSize: '26px', fontWeight: 700, color: '#FFF' }}>
              Reduce Cost Without Sacrificing Performance
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              We analyzed your build components and identified 3 high-value hardware adjustments.
            </p>
          </div>
          <button onClick={() => setIsOptimizerOpen(false)} className="btn-quiet">
            <X size={20} />
          </button>
        </div>

        {/* 3 Optimization Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '28px'
        }}>
          {optimizations.map((opt) => (
            <div
              key={opt.id}
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-default)',
                borderRadius: '16px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '10px'
                }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {opt.title}
                  </span>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    background: 'rgba(53, 208, 127, 0.15)',
                    color: opt.impactColor
                  }}>
                    Save {FORMAT_INR(opt.savings)}
                  </span>
                </div>

                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px', lineHeight: '1.4' }}>
                  <div style={{ textDecoration: 'line-through', color: 'var(--text-faint)' }}>{opt.from}</div>
                  <div style={{ color: 'var(--text-primary)', fontWeight: 500, marginTop: '2px' }}>→ {opt.to}</div>
                </div>

                <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                  {opt.desc}
                </p>
              </div>

              <button
                onClick={() => applyOptimization(opt.id)}
                className="btn-secondary"
                style={{
                  marginTop: '16px',
                  width: '100%',
                  padding: '8px',
                  fontSize: '12px'
                }}
              >
                Apply Swap
              </button>
            </div>
          ))}
        </div>

        {/* Before and After Comparison Box */}
        <div style={{
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '14px',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '24px'
        }}>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Current Build Total:</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#FFF' }} className="tabular-nums">
              {FORMAT_INR(currentTotal)}
            </div>
          </div>

          <ArrowRight size={20} color="var(--accent-purple)" />

          <div>
            <div style={{ fontSize: '12px', color: 'var(--status-success)' }}>Optimized Build Target:</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--status-success)' }} className="tabular-nums">
              {FORMAT_INR(optimizedTotal)}
            </div>
          </div>

          <div style={{
            borderLeft: '1px solid var(--border-default)',
            paddingLeft: '20px'
          }}>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Real-World Performance Retained:</div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--accent-blue)' }}>
              98.4% (Identical 1440p FPS)
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button onClick={() => setIsOptimizerOpen(false)} className="btn-secondary">
            Keep Current Parts
          </button>
          <button
            onClick={() => {
              applyOptimization('ram');
              applyOptimization('ssd');
              showToast("Applied comprehensive budget optimizations!");
            }}
            className="btn-primary"
          >
            Apply Best Optimizations
          </button>
        </div>
      </div>
    </div>
  );
};
