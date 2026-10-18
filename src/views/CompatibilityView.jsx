import React from 'react';
import { useBuild } from '../context/BuildContext';
import { COMPONENT_CATALOG, FORMAT_INR } from '../data/mockData';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Wrench,
  ArrowRight,
  Sparkles,
  Zap
} from 'lucide-react';

export const CompatibilityView = () => {
  const {
    build,
    compReport,
    selectComponent,
    setCurrentView,
    currentPower,
    showToast
  } = useBuild();

  const handleFixPsuAutomatically = () => {
    const goldPsu = COMPONENT_CATALOG.psu[1]; // Corsair RM750e 750W
    selectComponent('psu', goldPsu);
    showToast("Upgraded PSU to Corsair RM750e 750W Gold (+100W Headroom)!");
  };

  return (
    <div className="animate-fade-in" style={{ padding: '40px 0 80px 0' }}>
      <div className="page-container" style={{ maxWidth: '1100px' }}>
        
        {/* Header Banner */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '24px',
          marginBottom: '48px'
        }}>
          <div>
            <div className="badge badge-success" style={{ marginBottom: '12px' }}>
              <ShieldCheck size={14} /> LIVE COMPATIBILITY VERIFICATION
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 42px)', fontWeight: 800, color: '#FFF', marginBottom: '8px' }}>
              Build Health & Electrical Clearance
            </h1>
            <p style={{ fontSize: '17px', color: 'var(--text-secondary)' }}>
              Deep socket, PCIe bandwidth, physical dimensions, and PSU load analysis.
            </p>
          </div>

          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-default)',
            borderRadius: '20px',
            padding: '20px 32px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Overall Health Rating
            </div>
            <div style={{ fontSize: '48px', fontWeight: 800, color: compReport.healthScore >= 90 ? 'var(--status-success)' : 'var(--status-warning)' }} className="tabular-nums">
              {compReport.healthScore}/100
            </div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#FFF' }}>
              {compReport.healthLabel}
            </div>
          </div>
        </div>

        {/* 2-Column Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 380px',
          gap: '32px',
          alignItems: 'start'
        }} className="health-grid">
          
          {/* Left Column: 6 Check Rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: 'var(--text-faint)',
              letterSpacing: '0.08em',
              marginBottom: '4px'
            }}>
              VERIFIED ELECTRICAL & PHYSICAL SPECIFICATIONS
            </div>

            {compReport.checks.map((check) => {
              const isSuccess = check.type === 'success';
              const isWarning = check.type === 'warning';

              return (
                <div
                  key={check.id}
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-default)',
                    borderRadius: '16px',
                    padding: '20px 24px',
                    minHeight: '76px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px',
                    transition: 'border-color 150ms ease'
                  }}
                >
                  <div style={{
                    marginTop: '2px',
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: isSuccess ? 'rgba(53, 208, 127, 0.12)' : isWarning ? 'rgba(255, 184, 77, 0.12)' : 'rgba(255, 92, 103, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isSuccess ? 'var(--status-success)' : isWarning ? 'var(--status-warning)' : 'var(--status-danger)'
                  }}>
                    {isSuccess ? <CheckCircle2 size={18} /> : isWarning ? <AlertTriangle size={18} /> : <XCircle size={18} />}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#FFFFFF' }}>
                        {check.title}
                      </h4>
                      <span className={`badge ${isSuccess ? 'badge-success' : isWarning ? 'badge-warning' : 'badge-danger'}`}>
                        {check.status}
                      </span>
                    </div>

                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                      {check.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Advisory Action Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* PSU Headroom & 80+ Efficiency Curve Graph */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-default)',
              borderRadius: '20px',
              padding: '24px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '14px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-blue)' }}>
                  <Zap size={18} />
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#FFF' }}>
                    PSU 80+ Efficiency Curve
                  </h3>
                </div>
                <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '6px', background: 'rgba(77, 163, 255, 0.12)', color: 'var(--accent-blue)', fontWeight: 600 }}>
                  {build?.components?.psu?.rating || '80+ Bronze'}
                </span>
              </div>

              {/* Real-time Load Metrics Banner */}
              {(() => {
                const psuWatt = build?.components?.psu?.wattage || 650;
                const loadPct = Math.min(100, Math.round((currentPower / psuWatt) * 100));
                const isGold = (build?.components?.psu?.rating || '').toLowerCase().includes('gold');
                // Estimated efficiency based on load
                const eff = isGold
                  ? (loadPct <= 50 ? 87 + (loadPct / 50) * 3.5 : 90.5 - ((loadPct - 50) / 50) * 3.5)
                  : (loadPct <= 50 ? 82 + (loadPct / 50) * 3.2 : 85.2 - ((loadPct - 50) / 50) * 3.8);
                const wallDraw = Math.round(currentPower / (eff / 100));
                const wasteWatts = wallDraw - currentPower;
                const markerX = 30 + (loadPct / 100) * 300;
                const markerY = 135 - ((eff - 75) / 20) * 105;

                return (
                  <div>
                    {/* SVG Efficiency Graph */}
                    <div style={{ background: 'var(--bg-surface)', borderRadius: '12px', padding: '12px 10px', border: '1px solid var(--border-subtle)', marginBottom: '14px' }}>
                      <svg viewBox="0 0 350 160" style={{ width: '100%', height: 'auto', display: 'block' }}>
                        {/* Grid lines */}
                        <line x1="30" y1="135" x2="330" y2="135" stroke="var(--border-default)" strokeWidth="1" />
                        <line x1="30" y1="85" x2="330" y2="85" stroke="var(--border-subtle)" strokeDasharray="3,3" strokeWidth="1" />
                        <line x1="30" y1="35" x2="330" y2="35" stroke="var(--border-subtle)" strokeDasharray="3,3" strokeWidth="1" />

                        {/* Y-axis labels */}
                        <text x="24" y="138" fill="var(--text-faint)" fontSize="9" textAnchor="end">75%</text>
                        <text x="24" y="88" fill="var(--text-faint)" fontSize="9" textAnchor="end">85%</text>
                        <text x="24" y="38" fill="var(--text-faint)" fontSize="9" textAnchor="end">94%</text>

                        {/* 50% Peak Guide Line */}
                        <line x1="180" y1="20" x2="180" y2="135" stroke="rgba(124, 92, 255, 0.4)" strokeDasharray="2,2" strokeWidth="1" />
                        <text x="180" y="15" fill="var(--accent-purple-text)" fontSize="8.5" fontWeight="600" textAnchor="middle">
                          50% Peak Efficiency Sweet Spot
                        </text>

                        {/* 80+ Gold Standard Curve */}
                        <path
                          d="M 30,122 C 80,68 140,42 180,42 C 240,42 290,66 330,76"
                          fill="none"
                          stroke={isGold ? "var(--status-success)" : "rgba(255, 255, 255, 0.2)"}
                          strokeWidth={isGold ? "2.5" : "1"}
                          strokeDasharray={isGold ? "none" : "2,2"}
                        />

                        {/* 80+ Bronze Standard Curve */}
                        <path
                          d="M 30,130 C 80,95 140,82 180,82 C 240,82 290,95 330,105"
                          fill="none"
                          stroke={!isGold ? "#FFB84D" : "rgba(255, 255, 255, 0.15)"}
                          strokeWidth={!isGold ? "2.5" : "1"}
                        />

                        {/* Current System Load Dot & Pulse */}
                        <line x1={markerX} y1={markerY} x2={markerX} y2="135" stroke="var(--accent-blue)" strokeDasharray="2,2" strokeWidth="1" />
                        <circle cx={markerX} cy={markerY} r="7" fill="rgba(77, 163, 255, 0.3)" />
                        <circle cx={markerX} cy={markerY} r="4" fill="var(--accent-blue)" stroke="#FFF" strokeWidth="1.5" />

                        {/* X-axis labels */}
                        <text x="30" y="148" fill="var(--text-faint)" fontSize="9" textAnchor="middle">0%</text>
                        <text x="90" y="148" fill="var(--text-faint)" fontSize="9" textAnchor="middle">20%</text>
                        <text x="180" y="148" fill="var(--accent-purple-text)" fontSize="9" fontWeight="700" textAnchor="middle">50%</text>
                        <text x="255" y="148" fill="var(--text-faint)" fontSize="9" textAnchor="middle">75%</text>
                        <text x="330" y="148" fill="var(--text-faint)" fontSize="9" textAnchor="middle">100%</text>
                      </svg>
                    </div>

                    {/* Telemetry Breakdown Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '14px' }}>
                      <div style={{ padding: '8px 10px', borderRadius: '8px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
                        <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Current Load</div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFF' }}>
                          {loadPct}% <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 400 }}>({currentPower}W / {psuWatt}W)</span>
                        </div>
                      </div>
                      <div style={{ padding: '8px 10px', borderRadius: '8px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
                        <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Electrical Efficiency</div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--status-success)' }}>
                          ~{eff.toFixed(1)}% <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 400 }}>(Wall: ~{wallDraw}W)</span>
                        </div>
                      </div>
                    </div>

                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '16px' }}>
                      Operating at <strong style={{ color: '#FFF' }}>{loadPct}% load</strong> generates ~{wasteWatts}W in thermal dissipation. Modern power supplies run with maximum acoustic silence and minimal power bill waste near the 50% utilization mark.
                    </div>

                    {loadPct > 65 && (
                      <div style={{
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '12px',
                        padding: '12px',
                        marginBottom: '16px',
                        fontSize: '12px'
                      }}>
                        <div style={{ color: 'var(--text-muted)' }}>Efficiency Upgrade Recommendation:</div>
                        <div style={{ fontWeight: 600, color: '#FFF', marginTop: '2px' }}>
                          Corsair RM750e 750W 80+ Gold Fully Modular (+₹5,100)
                        </div>
                        <div style={{ color: 'var(--status-success)', marginTop: '4px', fontSize: '11px' }}>
                          ✓ Shifter: Drops load to 58%, hitting peak 90.5% electrical conversion.
                        </div>
                      </div>
                    )}

                    {loadPct > 65 && (
                      <button
                        onClick={handleFixPsuAutomatically}
                        className="btn-primary"
                        style={{ width: '100%', justifyContent: 'center', padding: '11px', fontSize: '13px' }}
                      >
                        <Wrench size={15} /> Fix Automatically (Upgrade to 750W Gold)
                      </button>
                    )}
                  </div>
                );
              })()}
            </div>

            {/* Back to Builder */}
            <div style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-default)',
              borderRadius: '16px',
              padding: '20px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#FFF', marginBottom: '6px' }}>
                Ready to review hardware?
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                Your parts are fully verified for physical assembly.
              </p>
              <button
                onClick={() => {
                  setCurrentView('builder');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn-secondary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Return to Builder Canvas
              </button>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .health-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
