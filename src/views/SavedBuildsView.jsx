import React from 'react';
import { useBuild } from '../context/BuildContext';
import { FORMAT_INR } from '../data/mockData';
import { Bookmark, Trash2, Copy, Share2, ArrowRight, Sparkles, Box } from 'lucide-react';

export const SavedBuildsView = () => {
  const {
    savedBuilds,
    deleteSavedBuild,
    loadSavedBuild,
    saveCurrentBuild,
    setCurrentView,
    showToast
  } = useBuild();

  const handleDuplicate = (b) => {
    saveCurrentBuild();
    showToast(`Duplicated ${b.name}`);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast("Shareable link copied to clipboard!");
  };

  return (
    <div className="animate-fade-in" style={{ padding: '40px 0 80px 0' }}>
      <div className="page-container">
        
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '40px'
        }}>
          <div>
            <div className="badge badge-purple" style={{ marginBottom: '12px' }}>
              <Bookmark size={12} /> PERSONAL HARDWARE VAULT
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 42px)', fontWeight: 800, color: '#FFF', marginBottom: '8px' }}>
              My Saved Builds
            </h1>
            <p style={{ fontSize: '17px', color: 'var(--text-secondary)' }}>
              Track price drops, compare configurations, and resume previous designs.
            </p>
          </div>

          <button
            onClick={() => {
              setCurrentView('wizard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="btn-primary"
          >
            <Sparkles size={16} /> New Build Wizard
          </button>
        </div>

        {/* EMPTY STATE */}
        {savedBuilds.length === 0 ? (
          <div
            className="card-surface"
            style={{
              padding: '80px 40px',
              textAlign: 'center',
              maxWidth: '640px',
              margin: '60px auto'
            }}
          >
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '24px',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-default)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-purple)',
              margin: '0 auto 24px auto'
            }}>
              <Box size={36} />
            </div>

            <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#FFF', marginBottom: '12px' }}>
              Your next PC starts here.
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', maxWidth: '44ch', margin: '0 auto 32px auto' }}>
              Save your first build and come back anytime to track retailer pricing and compatibility updates.
            </p>

            <button
              onClick={() => {
                setCurrentView('builder');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn-primary"
              style={{ padding: '14px 32px' }}
            >
              Start Building Now
            </button>
          </div>
        ) : (
          /* POPULATED GRID */
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '24px'
          }}>
            {savedBuilds.map((b) => (
              <div
                key={b.id}
                className="card-surface"
                style={{
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <span className="badge badge-neutral" style={{ fontSize: '11px' }}>
                      {b.date || 'Saved recently'}
                    </span>
                    <span className="badge badge-success">
                      ✓ {b.compatibility || '100%'} Compatible
                    </span>
                  </div>

                  <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#FFF', marginBottom: '6px' }}>
                    {b.name}
                  </h3>

                  <div style={{ fontSize: '28px', fontWeight: 800, color: '#FFF', marginBottom: '16px' }} className="tabular-nums">
                    {FORMAT_INR(b.price)}
                  </div>

                  <div style={{
                    display: 'flex',
                    gap: '16px',
                    fontSize: '13px',
                    color: 'var(--text-muted)',
                    background: 'var(--bg-surface)',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    marginBottom: '24px'
                  }}>
                    <div>Score: <strong style={{ color: 'var(--accent-purple-text)' }}>{b.score}/100</strong></div>
                    <div>Health: <strong style={{ color: 'var(--status-success)' }}>{b.healthScore || 94}/100</strong></div>
                    <div>Power: <strong style={{ color: 'var(--accent-blue)' }}>{b.power || 438}W</strong></div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <button
                    onClick={() => loadSavedBuild(b)}
                    className="btn-primary"
                    style={{ width: '100%', justifyContent: 'center', padding: '11px' }}
                  >
                    <span>Open in Builder</span>
                    <ArrowRight size={15} />
                  </button>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button onClick={() => handleDuplicate(b)} className="btn-quiet" style={{ fontSize: '12px' }}>
                      <Copy size={13} /> Duplicate
                    </button>
                    <button onClick={handleShare} className="btn-quiet" style={{ fontSize: '12px' }}>
                      <Share2 size={13} /> Share
                    </button>
                    <button
                      onClick={() => deleteSavedBuild(b.id)}
                      className="btn-quiet"
                      style={{ fontSize: '12px', color: 'var(--status-danger)' }}
                    >
                      <Trash2 size={13} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
