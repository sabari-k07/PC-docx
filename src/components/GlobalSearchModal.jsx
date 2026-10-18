import React, { useState, useEffect, useRef } from 'react';
import { useBuild } from '../context/BuildContext';
import { COMPONENT_CATALOG, FEATURED_BUILDS, GUIDES, FORMAT_INR } from '../data/mockData';
import { Search, X, Cpu, Bookmark, BookOpen, ArrowRight, CornerDownLeft } from 'lucide-react';

export const GlobalSearchModal = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    setPickerCategory,
    setCurrentView,
    loadSavedBuild,
    showToast
  } = useBuild();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  // Global keyboard shortcut ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  // Flatten searchable components
  const allComponents = Object.entries(COMPONENT_CATALOG).flatMap(([catKey, items]) => {
    return items.map(item => ({
      type: 'component',
      category: catKey,
      id: item.id,
      title: item.name,
      subtitle: `${catKey.toUpperCase()} · ${FORMAT_INR(item.price)}`,
      item
    }));
  });

  const allBuilds = FEATURED_BUILDS.map(b => ({
    type: 'build',
    id: b.id,
    title: b.name,
    subtitle: `${FORMAT_INR(b.price)} · Score: ${b.score}/100 · ${b.useCase}`,
    item: b
  }));

  const allGuides = GUIDES.map(g => ({
    type: 'guide',
    id: g.id,
    title: g.title,
    subtitle: `${g.category} · ${g.readTime}`,
    item: g
  }));

  const q = query.trim().toLowerCase();

  const matchedComponents = allComponents.filter(c =>
    !q || c.title.toLowerCase().includes(q) || c.subtitle.toLowerCase().includes(q)
  ).slice(0, 4);

  const matchedBuilds = allBuilds.filter(b =>
    !q || b.title.toLowerCase().includes(q) || b.subtitle.toLowerCase().includes(q)
  ).slice(0, 3);

  const matchedGuides = allGuides.filter(g =>
    !q || g.title.toLowerCase().includes(q) || g.subtitle.toLowerCase().includes(q)
  ).slice(0, 3);

  const totalResults = [...matchedComponents, ...matchedBuilds, ...matchedGuides];

  const handleSelect = (item) => {
    setIsSearchOpen(false);
    if (item.type === 'component') {
      setPickerCategory(item.category);
    } else if (item.type === 'build') {
      loadSavedBuild(item.item);
    } else if (item.type === 'guide') {
      setCurrentView('guides');
    }
  };

  return (
    <div className="modal-backdrop" onClick={() => setIsSearchOpen(false)}>
      <div
        className="card-surface"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '640px',
          padding: 0,
          background: 'var(--bg-card)',
          border: '1px solid var(--border-default)',
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.8)',
          overflow: 'hidden'
        }}
      >
        {/* Top Input Bar */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <Search size={20} color="var(--accent-purple)" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search CPUs, GPUs, builds or guides..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#FFFFFF',
              fontSize: '16px',
              fontFamily: 'var(--font-sans)'
            }}
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="btn-quiet"
            style={{ padding: '4px' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Results Body */}
        <div style={{
          maxHeight: '420px',
          overflowY: 'auto',
          padding: '12px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {totalResults.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
              No components, builds, or guides matched "{query}".
            </div>
          ) : (
            <>
              {/* Components Group */}
              {matchedComponents.length > 0 && (
                <div>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-faint)', padding: '6px 12px' }}>
                    Hardware Components
                  </div>
                  {matchedComponents.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => handleSelect(c)}
                      style={{
                        padding: '10px 14px',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        transition: 'background 120ms ease',
                        background: 'transparent'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-elevated)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '6px',
                          background: 'var(--bg-surface)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--accent-purple)'
                        }}>
                          <Cpu size={16} />
                        </div>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: 600, color: '#FFF' }}>{c.title}</div>
                          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{c.subtitle}</div>
                        </div>
                      </div>
                      <ArrowRight size={14} color="var(--text-faint)" />
                    </div>
                  ))}
                </div>
              )}

              {/* Builds Group */}
              {matchedBuilds.length > 0 && (
                <div>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-faint)', padding: '6px 12px' }}>
                    Curated Configurations
                  </div>
                  {matchedBuilds.map((b) => (
                    <div
                      key={b.id}
                      onClick={() => handleSelect(b)}
                      style={{
                        padding: '10px 14px',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        transition: 'background 120ms ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-elevated)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '6px',
                          background: 'var(--bg-surface)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--accent-blue)'
                        }}>
                          <Bookmark size={16} />
                        </div>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: 600, color: '#FFF' }}>{b.title}</div>
                          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{b.subtitle}</div>
                        </div>
                      </div>
                      <ArrowRight size={14} color="var(--text-faint)" />
                    </div>
                  ))}
                </div>
              )}

              {/* Guides Group */}
              {matchedGuides.length > 0 && (
                <div>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-faint)', padding: '6px 12px' }}>
                    Technical Guides
                  </div>
                  {matchedGuides.map((g) => (
                    <div
                      key={g.id}
                      onClick={() => handleSelect(g)}
                      style={{
                        padding: '10px 14px',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        transition: 'background 120ms ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-elevated)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '6px',
                          background: 'var(--bg-surface)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--status-success)'
                        }}>
                          <BookOpen size={16} />
                        </div>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: 600, color: '#FFF' }}>{g.title}</div>
                          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{g.subtitle}</div>
                        </div>
                      </div>
                      <ArrowRight size={14} color="var(--text-faint)" />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Bottom Keyboard Hint Bar */}
        <div style={{
          padding: '12px 20px',
          borderTop: '1px solid var(--border-subtle)',
          background: 'var(--bg-surface)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '12px',
          color: 'var(--text-faint)'
        }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span><kbd style={{ background: 'var(--bg-card)', padding: '2px 5px', borderRadius: '4px', border: '1px solid var(--border-default)' }}>↵</kbd> select</span>
            <span><kbd style={{ background: 'var(--bg-card)', padding: '2px 5px', borderRadius: '4px', border: '1px solid var(--border-default)' }}>esc</kbd> close</span>
          </div>
          <div>PC_DOCx Hardware Registry</div>
        </div>
      </div>
    </div>
  );
};
