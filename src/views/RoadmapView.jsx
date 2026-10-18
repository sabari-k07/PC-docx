import React from 'react';
import { useBuild } from '../context/BuildContext';
import { UPGRADE_ROADMAP } from '../data/mockData';
import { Layers, CheckCircle2, AlertTriangle, ArrowRight, Sparkles, Cpu, Clock } from 'lucide-react';

export const RoadmapView = () => {
  const { setCurrentView } = useBuild();

  return (
    <div className="animate-fade-in" style={{ padding: '40px 0 80px 0' }}>
      <div className="page-container" style={{ maxWidth: '880px' }}>
        
        {/* Header with Circular Readiness Gauge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '24px',
          marginBottom: '56px'
        }}>
          <div>
            <div className="badge badge-purple" style={{ marginBottom: '12px' }}>
              <Layers size={14} /> 4-YEAR LONGEVITY PROJECTION
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 42px)', fontWeight: 800, color: '#FFF', marginBottom: '8px' }}>
              Your Component Upgrade Path
            </h1>
            <p style={{ fontSize: '17px', color: 'var(--text-secondary)' }}>
              How your PC evolves over 4 years without replacing core platform hardware.
            </p>
          </div>

          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-default)',
            borderRadius: '20px',
            padding: '20px 28px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Platform Longevity
            </div>
            <div style={{ fontSize: '42px', fontWeight: 800, color: 'var(--status-success)' }} className="tabular-nums">
              92%
            </div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#FFF' }}>
              AM5 Forward-Proof
            </div>
          </div>
        </div>

        {/* Vertical Chronological Timeline */}
        <div style={{
          position: 'relative',
          paddingLeft: '36px',
          display: 'flex',
          flexDirection: 'column',
          gap: '40px'
        }}>
          {/* Vertical Connecting Hairline */}
          <div style={{
            position: 'absolute',
            left: '11px',
            top: '20px',
            bottom: '20px',
            width: '2px',
            background: 'linear-gradient(180deg, var(--accent-purple) 0%, var(--border-default) 100%)'
          }} />

          {UPGRADE_ROADMAP.map((step, idx) => {
            const isWarning = step.statusType === 'warning';

            return (
              <div key={idx} style={{ position: 'relative' }}>
                {/* Timeline Node Pin */}
                <div style={{
                  position: 'absolute',
                  left: '-36px',
                  top: '18px',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: idx === 0 ? 'var(--accent-purple)' : 'var(--bg-card)',
                  border: idx === 0 ? '4px solid var(--bg-base)' : '2px solid var(--border-default)',
                  boxShadow: idx === 0 ? 'var(--shadow-purple)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 2
                }}>
                  {idx === 0 && (
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FFF' }} />
                  )}
                </div>

                {/* Timeline Content Card */}
                <div
                  className="card-surface"
                  style={{
                    padding: '28px',
                    border: idx === 0 ? '2px solid var(--accent-purple)' : '1px solid var(--border-default)'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '12px',
                    marginBottom: '12px'
                  }}>
                    <div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '12px',
                        fontWeight: 700,
                        color: 'var(--accent-purple-text)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        marginBottom: '4px'
                      }}>
                        <Clock size={13} /> {step.phase}
                      </div>

                      <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#FFF' }}>
                        {step.title}
                      </h3>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '20px', fontWeight: 800, color: '#FFF' }} className="tabular-nums">
                        {step.cost}
                      </div>
                      <span className={`badge ${isWarning ? 'badge-warning' : 'badge-success'}`} style={{ marginTop: '4px' }}>
                        {isWarning ? <AlertTriangle size={11} /> : <CheckCircle2 size={11} />}
                        {step.status}
                      </span>
                    </div>
                  </div>

                  <div style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '12px',
                    padding: '14px 18px',
                    margin: '16px 0',
                    fontSize: '13px',
                    color: '#FFFFFF'
                  }}>
                    <strong style={{ color: 'var(--text-muted)' }}>Action: </strong>
                    {step.specs}
                  </div>

                  <div style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    <strong style={{ color: 'var(--status-success)' }}>Performance Gain: </strong>
                    {step.gain}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div style={{ marginTop: '56px', textAlign: 'center' }}>
          <button
            onClick={() => {
              setCurrentView('builder');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="btn-primary"
            style={{ padding: '14px 32px' }}
          >
            <span>Return to Interactive Builder</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
};
