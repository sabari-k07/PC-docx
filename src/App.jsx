import React, { useState, useEffect, useMemo } from 'react';
import { Cpu, Sparkles, CheckCircle2, AlertCircle, Clock, ShieldCheck, Printer } from 'lucide-react';
import confetti from 'canvas-confetti';
import { supabase, isSupabaseConfigured } from './lib/supabase';
import { FALLBACK_CATALOG } from './lib/mockCatalog';
import { formatINR } from './lib/formatters';
import { evaluateBuildCompatibility } from './engines/compatibility';
import CopilotDrawer from './components/CopilotDrawer';
import './App.css';

const SLOTS = [
  { key: 'cpu', label: '01. Processor (CPU)' },
  { key: 'motherboard', label: '02. Motherboard' },
  { key: 'ram', label: '03. Memory (RAM)' },
  { key: 'gpu', label: '04. Graphics Card (GPU)' },
  { key: 'case', label: '05. Chassis / Case' },
  { key: 'psu', label: '06. Power Supply (PSU)' },
];

export default function App() {
  const [catalog, setCatalog] = useState(FALLBACK_CATALOG);
  const [activeSlot, setActiveSlot] = useState('cpu');
  const [build, setBuild] = useState({
    cpu: FALLBACK_CATALOG[0],
    motherboard: FALLBACK_CATALOG[2],
    ram: FALLBACK_CATALOG[4],
    gpu: FALLBACK_CATALOG[5],
    case: FALLBACK_CATALOG[7],
    psu: FALLBACK_CATALOG[8],
  });
  const [copilotOpen, setCopilotOpen] = useState(false);

  // Fetch live catalog from Supabase public.equipment if configured
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;
    async function loadEquipment() {
      try {
        const { data, error } = await supabase.from('equipment').select('*');
        if (!error && data && data.length > 0) {
          setCatalog(data);
        }
      } catch (err) {
        console.warn('Falling back to local catalog:', err);
      }
    }
    loadEquipment();
  }, []);

  const { checks, estimatedDraw, totalCost } = useMemo(
    () => evaluateBuildCompatibility(build),
    [build]
  );

  const filteredParts = catalog.filter((item) => item.category === activeSlot);

  const handleSelectPart = (part) => {
    setBuild((prev) => ({ ...prev, [activeSlot]: part }));
  };

  const handleFinalizeBOM = () => {
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
    window.print();
  };

  return (
    <div className="app-shell">
      {/* Top Bar */}
      <header className="top-nav">
        <div className="brand">
          <Cpu size={18} />
          <span>PC-docx</span>
          <span className="badge">IN-Market v2.4</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button className="btn" onClick={handleFinalizeBOM}>
            <Printer size={14} />
            <span>Export BOM</span>
          </button>
          <button className="btn btn-primary" onClick={() => setCopilotOpen(true)}>
            <Sparkles size={14} />
            <span>AI Copilot</span>
          </button>
        </div>
      </header>

      {/* 3-Column High-Density Configurator */}
      <div className="workspace">
        {/* Left Column: Component Slots */}
        <aside className="sidebar">
          <div style={{ fontSize: 11, color: 'var(--text-muted)', padding: '4px 10px 10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Hardware Stack
          </div>
          {SLOTS.map((slot) => {
            const selected = build[slot.key];
            return (
              <button
                key={slot.key}
                className={`nav-item ${activeSlot === slot.key ? 'active' : ''}`}
                onClick={() => setActiveSlot(slot.key)}
              >
                <div>
                  <div>{slot.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
                    {selected ? selected.name.slice(0, 24) + '...' : 'Unassigned'}
                  </div>
                </div>
                {selected && (
                  <span className="tabular" style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                    {formatINR(selected.price_inr)}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Center Column: Part Decision Canvas */}
        <main className="main-canvas">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.02em' }}>
                Select {SLOTS.find((s) => s.key === activeSlot)?.label.split('. ')[1]}
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 4 }}>
                GST-inclusive street pricing across PrimeABGB, MDComputers & Vedant.
              </p>
            </div>
            <span className="badge tabular">{filteredParts.length} SKUs Available</span>
          </div>

          <div className="part-grid">
            {filteredParts.map((part) => {
              const isSelected = build[activeSlot]?.id === part.id;
              return (
                <div
                  key={part.id}
                  className={`part-card ${isSelected ? 'selected' : ''}`}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontWeight: 500, fontSize: 14 }}>{part.name}</span>
                      <span className="badge tabular" title="Efficiency Quotient (Perf per Watt & Rupee)">
                        EQ {part.eq_score}
                      </span>
                    </div>

                    {/* Specs & Indian Retailer Stock Pills */}
                    <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
                      {Object.entries(part.specs || {}).map(([k, v]) => (
                        <span key={k} className="badge tabular">
                          {k}: {Array.isArray(v) ? v.join('/') : v}
                        </span>
                      ))}
                      {part.retailers &&
                        Object.entries(part.retailers).map(([store, inStock]) => (
                          <span
                            key={store}
                            className="badge"
                            style={{
                              borderColor: inStock ? 'rgba(16,185,129,0.3)' : 'var(--border-subtle)',
                              color: inStock ? 'var(--status-ok)' : 'var(--text-muted)',
                            }}
                          >
                            {store}: {inStock ? 'In Stock' : 'OOS'}
                          </span>
                        ))}
                    </div>
                  </div>

                  <div className="tabular" style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 16, fontWeight: 600 }}>{formatINR(part.price_inr)}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                      {part.wattage > 0 ? `${part.wattage}W TDP` : 'Incl. 18% GST'}
                    </div>
                  </div>

                  <button
                    className={`btn ${isSelected ? 'btn-primary' : ''}`}
                    onClick={() => handleSelectPart(part)}
                  >
                    {isSelected ? 'Selected' : 'Select'}
                  </button>
                </div>
              );
            })}
          </div>
        </main>

        {/* Right Column: Live Compatibility & Power Telemetry */}
        <aside className="telemetry-panel">
          <div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Estimated Street Total</div>
            <div className="tabular" style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.03em', marginTop: 2 }}>
              {formatINR(totalCost)}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Inclusive of 18% GST • Tabular BOM</div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)' }} />

          {/* 6-Layer Compatibility Matrix */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, marginBottom: 12 }}>
              <ShieldCheck size={15} />
              <span>Compatibility Health Matrix</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {checks.map((c) => (
                <div
                  key={c.layer}
                  style={{
                    padding: '10px 12px',
                    borderRadius: 6,
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, fontWeight: 500 }}>
                    <span>{c.layer}</span>
                    {c.status === 'ok' && <CheckCircle2 size={14} color="var(--status-ok)" />}
                    {c.status === 'error' && <AlertCircle size={14} color="var(--status-error)" />}
                    {c.status === 'warn' && <AlertCircle size={14} color="var(--status-warn)" />}
                    {c.status === 'pending' && <Clock size={14} color="var(--text-muted)" />}
                  </div>
                  <div className="tabular" style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4 }}>
                    {c.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Thermal & Power Envelope Summary */}
          <div style={{ marginTop: 'auto', padding: 12, borderRadius: 8, background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
              <span style={{ color: 'var(--text-secondary)' }}>Estimated System Draw</span>
              <span className="tabular" style={{ fontWeight: 600 }}>{estimatedDraw}W</span>
            </div>
          </div>
        </aside>
      </div>

      {/* Gemini + Supabase Edge Function AI Drawer */}
      <CopilotDrawer
        isOpen={copilotOpen}
        onClose={() => setCopilotOpen(false)}
        currentBuild={build}
      />
    </div>
  );
}
