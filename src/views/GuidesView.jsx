import React, { useState } from 'react';
import { useBuild } from '../context/BuildContext';
import { GUIDES } from '../data/mockData';
import { BookOpen, Clock, ArrowRight, X, Sparkles } from 'lucide-react';

export const GuidesView = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [readingGuide, setReadingGuide] = useState(null);

  const categories = ['All', 'GPU & Graphics', 'Memory', 'Power & Electrical', 'Processors', 'AI & ML', 'Hands-On Assembly'];

  const filteredGuides = GUIDES.filter(g => {
    if (selectedCategory === 'All') return true;
    return g.category.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  return (
    <div className="animate-fade-in" style={{ padding: '40px 0 80px 0' }}>
      <div className="page-container">
        
        {/* Header */}
        <div style={{ marginBottom: '36px' }}>
          <div className="badge badge-purple" style={{ marginBottom: '12px' }}>
            <BookOpen size={12} /> HARDWARE INTEL & ENGINEERING GUIDES
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 4vw, 42px)', fontWeight: 800, color: '#FFF', marginBottom: '8px' }}>
            PC Building Guides
          </h1>
          <p style={{ fontSize: '17px', color: 'var(--text-secondary)' }}>
            Written by hardware engineers. Zero sponsored fluff. Clear technical answers for the Indian market.
          </p>
        </div>

        {/* Category Tabs */}
        <div style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '16px',
          marginBottom: '36px'
        }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`nav-pill ${selectedCategory === cat ? 'active' : ''}`}
              style={{
                fontSize: '13px',
                padding: '8px 18px',
                fontWeight: 600,
                border: selectedCategory === cat ? '1px solid var(--accent-purple)' : '1px solid var(--border-default)',
                background: selectedCategory === cat ? 'var(--bg-elevated)' : 'transparent'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3-Column Grid of 6 Guide Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {filteredGuides.map(guide => (
            <div
              key={guide.id}
              onClick={() => setReadingGuide(guide)}
              className="card-surface-interactive"
              style={{
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '14px',
                  fontSize: '12px'
                }}>
                  <span className="badge badge-neutral">{guide.category}</span>
                  <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} /> {guide.readTime}
                  </span>
                </div>

                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#FFF', lineHeight: '1.4', marginBottom: '10px' }}>
                  {guide.title}
                </h3>

                <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                  {guide.summary}
                </p>
              </div>

              <div style={{
                marginTop: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--accent-purple-text)'
              }}>
                <span>Read Full Intel</span>
                <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>

        {/* Reader Modal */}
        {readingGuide && (
          <div className="modal-backdrop" onClick={() => setReadingGuide(null)}>
            <div
              className="card-surface"
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '680px',
                maxHeight: '80vh',
                overflowY: 'auto',
                background: 'var(--bg-card)',
                padding: '36px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <span className="badge badge-purple">{readingGuide.category} · {readingGuide.readTime}</span>
                <button onClick={() => setReadingGuide(null)} className="btn-quiet">
                  <X size={20} />
                </button>
              </div>

              <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#FFF', lineHeight: '1.3', marginBottom: '20px' }}>
                {readingGuide.title}
              </h2>

              <div style={{
                fontSize: '15px',
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                whiteSpace: 'pre-line'
              }}>
                {readingGuide.content}
              </div>

              <div style={{ marginTop: '32px', textAlign: 'right' }}>
                <button onClick={() => setReadingGuide(null)} className="btn-secondary">
                  Close Article
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
