import React from 'react';
import { useBuild } from '../context/BuildContext';
import { Cpu, Heart } from 'lucide-react';

export const Footer = () => {
  const { setCurrentView } = useBuild();

  return (
    <footer style={{
      borderTop: '1px solid var(--border-default)',
      background: 'var(--bg-surface)',
      padding: '80px 0 48px 0',
      marginTop: '120px'
    }}>
      <div className="page-container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '48px',
          marginBottom: '64px'
        }}>
          {/* Column 1: Brand & Tagline */}
          <div style={{ maxWidth: '300px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '16px'
            }}>
              <div style={{
                width: '26px',
                height: '26px',
                borderRadius: '6px',
                background: 'var(--bg-elevated)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-purple)'
              }}>
                <Cpu size={16} />
              </div>
              <span style={{ fontSize: '18px', fontWeight: 800, color: '#FFF' }}>
                PC_DOC<span style={{ color: 'var(--accent-purple)' }}>x</span>
              </span>
            </div>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '20px' }}>
              The intelligent, calm, and balanced PC builder for India. Designed to eliminate guesswork, bottlenecks, and overspending.
            </p>
            <div style={{ fontSize: '12px', color: 'var(--text-faint)' }}>
              Tailored for Indian retailers (PrimeABGB, MDComputers, Vedant, Amazon India).
            </div>
          </div>

          {/* Column 2: Builder & System */}
          <div>
            <h4 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Configurator
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
              <span onClick={() => { setCurrentView('builder'); window.scrollTo(0,0); }} style={{ color: 'var(--text-muted)', cursor: 'pointer' }}>
                Interactive Builder
              </span>
              <span onClick={() => { setCurrentView('wizard'); window.scrollTo(0,0); }} style={{ color: 'var(--text-muted)', cursor: 'pointer' }}>
                3-Step Guided Wizard
              </span>
              <span onClick={() => { setCurrentView('health'); window.scrollTo(0,0); }} style={{ color: 'var(--text-muted)', cursor: 'pointer' }}>
                Compatibility Center
              </span>
              <span onClick={() => { setCurrentView('recommended'); window.scrollTo(0,0); }} style={{ color: 'var(--text-muted)', cursor: 'pointer' }}>
                Canonical Recommended Build
              </span>
              <span onClick={() => { setCurrentView('tasks'); window.scrollTo(0,0); }} style={{ color: 'var(--accent-purple-text)', cursor: 'pointer', fontWeight: 600 }}>
                Efficiency Roadmap & Tasks
              </span>
            </div>
          </div>

          {/* Column 3: Performance & Intel */}
          <div>
            <h4 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Telemetry & Intel
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
              <span onClick={() => { setCurrentView('performance'); window.scrollTo(0,0); }} style={{ color: 'var(--text-muted)', cursor: 'pointer' }}>
                1440p Gaming Benchmarks
              </span>
              <span onClick={() => { setCurrentView('performance'); window.scrollTo(0,0); }} style={{ color: 'var(--text-muted)', cursor: 'pointer' }}>
                Local AI & LLM Suitability
              </span>
              <span onClick={() => { setCurrentView('roadmap'); window.scrollTo(0,0); }} style={{ color: 'var(--text-muted)', cursor: 'pointer' }}>
                4-Year Upgrade Roadmap
              </span>
              <span onClick={() => { setCurrentView('guides'); window.scrollTo(0,0); }} style={{ color: 'var(--text-muted)', cursor: 'pointer' }}>
                Hardware Engineering Guides
              </span>
            </div>
          </div>

          {/* Column 4: Community & Tools */}
          <div>
            <h4 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Exploration
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
              <span onClick={() => { setCurrentView('explore'); window.scrollTo(0,0); }} style={{ color: 'var(--text-muted)', cursor: 'pointer' }}>
                Explore Curated Builds
              </span>
              <span onClick={() => { setCurrentView('compare'); window.scrollTo(0,0); }} style={{ color: 'var(--text-muted)', cursor: 'pointer' }}>
                Side-by-Side Comparison
              </span>
              <span onClick={() => { setCurrentView('saved'); window.scrollTo(0,0); }} style={{ color: 'var(--text-muted)', cursor: 'pointer' }}>
                Saved Builds Library
              </span>
              <span onClick={() => { setCurrentView('review'); window.scrollTo(0,0); }} style={{ color: 'var(--text-muted)', cursor: 'pointer' }}>
                Bill of Materials & Export
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '32px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          fontSize: '13px',
          color: 'var(--text-faint)'
        }}>
          <div>
            © 2026 PC_DOCx. Build smarter. Play harder. Create without limits. All Indian pricing estimates GST inclusive.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>Privacy</span>
            <span>Hardware Methodology</span>
            <span>Indian Retail Partners</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
