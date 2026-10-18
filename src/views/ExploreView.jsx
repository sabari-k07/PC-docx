import React, { useState } from 'react';
import { useBuild } from '../context/BuildContext';
import { FEATURED_BUILDS, FORMAT_INR } from '../data/mockData';
import { Sparkles, ArrowRight, ShieldCheck, Check } from 'lucide-react';

export const ExploreView = () => {
  const { loadSavedBuild, setCurrentView, showToast } = useBuild();
  const [activeFilter, setActiveFilter] = useState('All');

  const filterChips = ['All', 'Gaming', 'AI & ML', 'Developer', 'Creator', 'Budget'];

  const filteredBuilds = FEATURED_BUILDS.filter(b => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Gaming') return b.useCase.toLowerCase().includes('gaming');
    if (activeFilter === 'AI & ML') return b.useCase.toLowerCase().includes('ai') || b.name.includes('AI');
    if (activeFilter === 'Creator') return b.useCase.toLowerCase().includes('video') || b.name.includes('Creator');
    if (activeFilter === 'Budget') return b.price < 80000;
    return true;
  });

  return (
    <div className="animate-fade-in" style={{ padding: '40px 0 80px 0' }}>
      <div className="page-container">
        
        {/* Header */}
        <div style={{ marginBottom: '36px' }}>
          <div className="badge badge-purple" style={{ marginBottom: '12px' }}>
            <Sparkles size={12} /> VERIFIED INDIAN COMMUNITY CONFIGURATIONS
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 4vw, 42px)', fontWeight: 800, color: '#FFF', marginBottom: '8px' }}>
            Explore Proven PC Builds
          </h1>
          <p style={{ fontSize: '17px', color: 'var(--text-secondary)' }}>
            Tested and benchmarked configurations ready to clone and customize.
          </p>
        </div>

        {/* Filter Chips Bar */}
        <div style={{
          display: 'flex',
          gap: '10px',
          overflowX: 'auto',
          paddingBottom: '16px',
          marginBottom: '36px'
        }}>
          {filterChips.map(chip => (
            <button
              key={chip}
              onClick={() => setActiveFilter(chip)}
              className={`nav-pill ${activeFilter === chip ? 'active' : ''}`}
              style={{
                fontSize: '13px',
                padding: '8px 18px',
                fontWeight: 600,
                border: activeFilter === chip ? '1px solid var(--accent-purple)' : '1px solid var(--border-default)',
                background: activeFilter === chip ? 'var(--bg-elevated)' : 'transparent'
              }}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* 2-Column Grid of 4 Large Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
          gap: '28px'
        }} className="explore-grid">
          {filteredBuilds.map((buildItem) => {
            const isPopular = buildItem.tag === 'Most Popular';

            return (
              <div
                key={buildItem.id}
                className="card-surface"
                style={{
                  padding: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: isPopular ? '2px solid var(--accent-purple)' : '1px solid var(--border-default)',
                  boxShadow: isPopular ? 'var(--shadow-purple)' : 'none'
                }}
              >
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '16px'
                  }}>
                    <span className={`badge ${isPopular ? 'badge-purple' : 'badge-neutral'}`}>
                      {buildItem.tag}
                    </span>
                    <span style={{ fontSize: '13px', color: 'var(--status-success)', fontWeight: 600 }}>
                      ✓ 100% Tested & In Stock
                    </span>
                  </div>

                  <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#FFF', marginBottom: '8px' }}>
                    {buildItem.name}
                  </h3>

                  <div style={{
                    fontSize: '32px',
                    fontWeight: 800,
                    color: '#FFF',
                    marginBottom: '20px'
                  }} className="tabular-nums">
                    {FORMAT_INR(buildItem.price)}
                  </div>

                  {/* Component Spec Matrix */}
                  <div style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '16px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    fontSize: '13px',
                    marginBottom: '28px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Processor:</span>
                      <strong style={{ color: '#FFF' }}>{buildItem.cpu}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Graphics Card:</span>
                      <strong style={{ color: '#FFF' }}>{buildItem.gpu}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>System Memory:</span>
                      <strong style={{ color: '#FFF' }}>{buildItem.ram}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Estimated Draw:</span>
                      <span style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>{buildItem.power}W Power</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Build Score:</span>
                      <span style={{ color: 'var(--accent-purple-text)', fontWeight: 800 }}>{buildItem.score}/100 Rating</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={() => loadSavedBuild(buildItem)}
                    className={isPopular ? 'btn-primary' : 'btn-secondary'}
                    style={{ flex: 1, justifyContent: 'center', padding: '12px' }}
                  >
                    <span>Use This Build</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      <style>{`
        @media (max-width: 600px) {
          .explore-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
