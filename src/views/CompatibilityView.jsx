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
            
            {/* PSU Headroom Advisory Box */}
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
                gap: '8px',
                color: 'var(--status-warning)',
                marginBottom: '12px'
              }}>
                <AlertTriangle size={18} />
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#FFF' }}>
                  PSU Headroom Advisory
                </h3>
              </div>

              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
                Your selected Corsair CX650 unit provides 650W. With your estimated peak system draw at <strong style={{ color: '#FFF' }}>{currentPower}W</strong> (67% capacity), the system will boot and run reliably. However, future GPU upgrades or heavy transient bursts will benefit from 750W.
              </p>

              <div style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '12px',
                padding: '14px',
                marginBottom: '20px',
                fontSize: '12px'
              }}>
                <div style={{ color: 'var(--text-muted)' }}>Recommendation:</div>
                <div style={{ fontWeight: 600, color: '#FFF', marginTop: '2px' }}>
                  Corsair RM750e 750W 80+ Gold Fully Modular (+₹5,100)
                </div>
                <div style={{ color: 'var(--status-success)', marginTop: '4px' }}>
                  ✓ ATX 3.0 certified with native 12V-2x6 power cabling
                </div>
              </div>

              <button
                onClick={handleFixPsuAutomatically}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '14px' }}
              >
                <Wrench size={16} /> Fix Automatically
              </button>
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
