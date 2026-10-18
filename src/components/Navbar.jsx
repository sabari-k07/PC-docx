import React, { useState } from 'react';
import { useBuild } from '../context/BuildContext';
import { Search, Bookmark, ShieldCheck, Sparkles, Menu, X, Cpu, SlidersHorizontal } from 'lucide-react';
import { FORMAT_INR } from '../data/mockData';

export const Navbar = () => {
  const {
    currentView,
    setCurrentView,
    savedBuilds,
    setIsSearchOpen,
    setIsChatOpen,
    isAdvancedMode,
    setIsAdvancedMode,
    compReport,
    currentTotal
  } = useBuild();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'builder', label: 'Build' },
    { id: 'explore', label: 'Explore Builds' },
    { id: 'compare', label: 'Compare' },
    { id: 'performance', label: 'Performance' },
    { id: 'roadmap', label: 'Upgrade Path' },
    { id: 'guides', label: 'Guides' },
    { id: 'tasks', label: 'Tasks' },
    { id: 'inventory', label: 'Inventory' }
  ];

  const handleNavClick = (viewId) => {
    setCurrentView(viewId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      left: 0,
      right: 0,
      height: '72px',
      background: 'rgba(8, 9, 12, 0.85)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-default)',
      zIndex: 500,
      display: 'flex',
      alignItems: 'center'
    }}>
      <div className="page-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
      }}>
        {/* Left: Brand Logo */}
        <div
          onClick={() => handleNavClick('landing')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '8px',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-default)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-purple)'
          }}>
            <Cpu size={18} />
          </div>
          <span style={{
            fontSize: '20px',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: '#FFFFFF'
          }}>
            PC_DOC<span style={{ color: 'var(--accent-purple)' }}>x</span>
          </span>
          <span style={{
            fontSize: '10px',
            padding: '2px 6px',
            borderRadius: '4px',
            background: 'rgba(124, 92, 255, 0.15)',
            color: 'var(--accent-purple-text)',
            fontWeight: 600,
            marginLeft: '4px'
          }}>
            INDIA
          </span>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }} className="desktop-nav">
          {navLinks.map((link) => {
            const isActive = currentView === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`nav-pill ${isActive ? 'active' : ''}`}
                style={{
                  background: isActive ? 'var(--bg-elevated)' : 'transparent',
                  border: isActive ? '1px solid var(--border-default)' : '1px solid transparent'
                }}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          {/* Quick Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="btn-quiet"
            title="Global Search (⌘K)"
            style={{
              border: '1px solid var(--border-default)',
              padding: '6px 12px',
              borderRadius: '10px'
            }}
          >
            <Search size={16} />
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }} className="search-hotkey">⌘K</span>
          </button>

          {/* AI Advisor Chatbot Trigger */}
          <button
            onClick={() => setIsChatOpen(true)}
            className="btn-quiet"
            title="PC_DOCx AI Hardware Advisor"
            style={{
              border: '1px solid rgba(124, 92, 255, 0.4)',
              background: 'rgba(124, 92, 255, 0.1)',
              color: 'var(--accent-purple-text)',
              padding: '6px 13px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 600,
              fontSize: '13px',
              boxShadow: '0 0 12px rgba(124, 92, 255, 0.15)'
            }}
          >
            <Sparkles size={15} color="var(--accent-purple)" />
            <span className="hide-on-mobile">AI Advisor</span>
          </button>

          {/* Health Status Quick Indicator */}
          <button
            onClick={() => handleNavClick('health')}
            className="btn-quiet"
            title="System Compatibility Status"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <ShieldCheck size={17} color={compReport.healthScore >= 90 ? '#35D07F' : '#FFB84D'} />
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }} className="hide-on-mobile">
              {compReport.healthScore}/100
            </span>
          </button>

          {/* Saved Builds Icon with Count */}
          <button
            onClick={() => handleNavClick('saved')}
            className="btn-quiet"
            title="My Saved Builds"
            style={{ position: 'relative' }}
          >
            <Bookmark size={17} />
            {savedBuilds.length > 0 && (
              <span style={{
                position: 'absolute',
                top: '2px',
                right: '4px',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: 'var(--accent-purple)',
                color: '#FFF',
                fontSize: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700
              }}>
                {savedBuilds.length}
              </span>
            )}
          </button>

          {/* Primary CTA */}
          <button
            onClick={() => {
              setCurrentView('wizard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="btn-primary"
            style={{
              padding: '9px 18px',
              fontSize: '14px'
            }}
          >
            <Sparkles size={15} />
            <span>Build My PC</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn-quiet mobile-menu-btn"
            style={{ display: 'none' }}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div style={{
          position: 'absolute',
          top: '72px',
          left: 0,
          right: 0,
          background: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border-default)',
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          zIndex: 499
        }}>
          {navLinks.map((link) => (
            <div
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                background: currentView === link.id ? 'var(--bg-elevated)' : 'transparent',
                color: currentView === link.id ? '#FFF' : 'var(--text-secondary)',
                fontWeight: 500,
                cursor: 'pointer'
              }}
            >
              {link.label}
            </div>
          ))}
          <div style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Current Build Total:</span>
            <span style={{ fontSize: '16px', fontWeight: 700, color: '#FFF' }}>{FORMAT_INR(currentTotal)}</span>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 880px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: inline-flex !important; }
          .hide-on-mobile { display: none !important; }
          .search-hotkey { display: none !important; }
        }
      `}</style>
    </header>
  );
};
