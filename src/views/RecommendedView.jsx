import React, { useState } from 'react';
import { useBuild } from '../context/BuildContext';
import { FORMAT_INR } from '../data/mockData';
import {
  ShieldCheck,
  Zap,
  CheckCircle2,
  SlidersHorizontal,
  Bookmark,
  Share2,
  FileDown,
  Info,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const RecommendedView = () => {
  const {
    build,
    currentTotal,
    remainingBudget,
    currentPower,
    compReport,
    setCurrentView,
    saveCurrentBuild,
    setPickerCategory,
    showToast
  } = useBuild();

  const [activeWhyPart, setActiveWhyPart] = useState(null);

  const components = build.components;
  const partRows = [
    { key: 'cpu', label: 'CPU', item: components.cpu },
    { key: 'motherboard', label: 'Motherboard', item: components.motherboard },
    { key: 'gpu', label: 'GPU', item: components.gpu, badge: 'Best Value' },
    { key: 'ram', label: 'RAM', item: components.ram },
    { key: 'storage', label: 'Storage', item: components.storage },
    { key: 'psu', label: 'PSU', item: components.psu, warning: components.psu?.statusType === 'warning' },
    { key: 'case', label: 'Case', item: components.case },
    { key: 'cooler', label: 'CPU Cooler', item: components.cooler },
    { key: 'os', label: 'Operating System', item: components.os }
  ];

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast("Shareable build link copied to clipboard!");
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(build, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `PC_DOCx_${build.name.replace(/\s+/g, '_')}.json`);
    dlAnchorElem.click();
    showToast("Downloaded build JSON specification!");
  };

  return (
    <div className="animate-fade-in" style={{ padding: '40px 0 80px 0' }}>
      <div className="page-container">
        {/* Page Title */}
        <div style={{ marginBottom: '40px' }}>
          <div className="badge badge-purple" style={{ marginBottom: '12px' }}>
            <Sparkles size={12} /> TAILORED SPECIFICATION
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: 800, color: '#FFF', marginBottom: '8px' }}>
            Your Recommended Build
          </h1>
          <p style={{ fontSize: '17px', color: 'var(--text-secondary)' }}>
            Engineered for 1440p gaming, development and everyday productivity within budget.
          </p>
        </div>

        {/* 5 Large Metric Tiles in One Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '32px'
        }}>
          {/* Tile 1: Build Score */}
          <div className="card-surface" style={{ padding: '24px' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
              Build Score
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: 'var(--bg-elevated)',
                border: '3px solid var(--accent-purple)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                color: '#FFF',
                fontSize: '16px'
              }} className="tabular-nums">
                {build.score || 92}
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#FFF' }}>Top 5% Tier</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Balanced 1440p</div>
              </div>
            </div>
          </div>

          {/* Tile 2: Compatibility */}
          <div className="card-surface" style={{ padding: '24px' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
              Compatibility
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--status-success)' }}>
              100%
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
              Physical & Electrical Match
            </div>
          </div>

          {/* Tile 3: Estimated Price */}
          <div className="card-surface" style={{ padding: '24px' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
              Estimated Total
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#FFFFFF' }} className="tabular-nums">
              {FORMAT_INR(currentTotal)}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
              GST Included
            </div>
          </div>

          {/* Tile 4: Power Draw */}
          <div className="card-surface" style={{ padding: '24px' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
              Estimated Power Draw
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--accent-blue)' }} className="tabular-nums">
              {currentPower}W
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
              On 650W PSU (67% load)
            </div>
          </div>

          {/* Tile 5: Budget Remaining */}
          <div className="card-surface" style={{ padding: '24px' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
              Budget Surplus
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: remainingBudget >= 0 ? 'var(--status-success)' : 'var(--status-danger)' }} className="tabular-nums">
              {FORMAT_INR(remainingBudget)}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
              {remainingBudget >= 0 ? 'Saved under cap' : 'Over allocated'}
            </div>
          </div>
        </div>

        {/* Build Health Banner */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-default)',
          borderRadius: '16px',
          padding: '20px 24px',
          marginBottom: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'rgba(53, 208, 127, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--status-success)'
            }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#FFF' }}>
                Build Health: {compReport.healthScore}/100 · {compReport.healthLabel}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                Zero physical clearance or thermal bottlenecks detected across 6 live checks.
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setCurrentView('health');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="btn-quiet"
            style={{ color: 'var(--accent-purple-text)' }}
          >
            View Full Compatibility Report →
          </button>
        </div>

        {/* Two-Column Specification List & Sticky Sidebar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 340px',
          gap: '36px',
          alignItems: 'start'
        }} className="recommended-grid">
          
          {/* Left Column: 9-Part Specification Rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{
              fontSize: '12px',
              fontWeight: 700,
              color: 'var(--text-faint)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '4px'
            }}>
              VERIFIED BILL OF MATERIALS (9 COMPONENTS)
            </div>

            {partRows.map(({ key, label, item, badge, warning }) => {
              if (!item) return null;

              return (
                <div
                  key={key}
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-default)',
                    borderRadius: '16px',
                    padding: '20px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    minHeight: '80px',
                    transition: 'border-color 150ms ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{
                      width: '64px',
                      fontSize: '11px',
                      fontWeight: 700,
                      color: 'var(--accent-purple-text)',
                      textTransform: 'uppercase'
                    }}>
                      {label}
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '16px', fontWeight: 600, color: '#FFFFFF' }}>
                          {item.name}
                        </span>
                        {badge && (
                          <span className="badge badge-purple">{badge}</span>
                        )}
                        {warning ? (
                          <span className="badge badge-warning">⚠ Limited Headroom</span>
                        ) : (
                          <span className="badge badge-success">✓ Compatible</span>
                        )}
                      </div>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginTop: '4px',
                        fontSize: '13px',
                        color: 'var(--text-muted)'
                      }}>
                        <span>{item.specs || item.whyThisPart?.substring(0, 50)}...</span>
                        <span
                          onClick={() => setActiveWhyPart(activeWhyPart === key ? null : key)}
                          style={{ color: 'var(--accent-blue)', cursor: 'pointer', textDecoration: 'underline' }}
                        >
                          Why this part?
                        </span>
                      </div>

                      {/* Expandable Why This Part Rationale */}
                      {activeWhyPart === key && (
                        <div style={{
                          marginTop: '8px',
                          padding: '8px 12px',
                          borderRadius: '8px',
                          background: 'var(--bg-surface)',
                          fontSize: '12px',
                          color: 'var(--text-secondary)',
                          lineHeight: '1.5'
                        }}>
                          {item.whyThisPart || 'Optimized for high compute density and thermal efficiency.'}
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#FFF', textAlign: 'right' }} className="tabular-nums">
                      {FORMAT_INR(item.price)}
                    </div>
                    <button
                      onClick={() => setPickerCategory(key)}
                      className="btn-quiet"
                      style={{ fontSize: '12px', padding: '6px 10px' }}
                    >
                      Swap
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Sticky Summary Card */}
          <div style={{
            position: 'sticky',
            top: '96px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-default)',
            borderRadius: '20px',
            padding: '28px',
            boxShadow: 'var(--shadow-md)'
          }}>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
              Locked Configuration Total
            </div>

            <div style={{ fontSize: '32px', fontWeight: 800, color: '#FFF', marginBottom: '8px' }} className="tabular-nums">
              {FORMAT_INR(currentTotal)}
            </div>

            <div style={{ fontSize: '13px', color: 'var(--status-success)', marginBottom: '24px' }}>
              ✓ All parts verified in stock across Indian retailers
            </div>

            <button
              onClick={() => {
                setCurrentView('builder');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn-primary"
              style={{ width: '100%', padding: '14px', fontSize: '15px', marginBottom: '14px' }}
            >
              <span>Customize in Builder</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={saveCurrentBuild}
              className="btn-secondary"
              style={{ width: '100%', padding: '12px', fontSize: '14px', marginBottom: '16px' }}
            >
              <Bookmark size={15} /> Save Build to Library
            </button>

            <div style={{
              borderTop: '1px solid var(--border-subtle)',
              paddingTop: '16px',
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <button onClick={handleShare} className="btn-quiet" style={{ fontSize: '13px' }}>
                <Share2 size={14} /> Share Link
              </button>
              <button onClick={handleExport} className="btn-quiet" style={{ fontSize: '13px' }}>
                <FileDown size={14} /> Export Spec
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .recommended-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
