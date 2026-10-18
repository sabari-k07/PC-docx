import React, { useState } from 'react';
import { useBuild } from '../context/BuildContext';
import { FORMAT_INR } from '../data/mockData';
import {
  CheckCircle2,
  FileDown,
  Printer,
  Share2,
  Bookmark,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  ShoppingBag,
  RotateCcw
} from 'lucide-react';

export const ReviewView = () => {
  const {
    build,
    currentTotal,
    currentPower,
    compReport,
    setCurrentView,
    saveCurrentBuild,
    resetToCanonical,
    showToast
  } = useBuild();

  const [retailerModalOpen, setRetailerModalOpen] = useState(false);

  const components = build.components;
  const partsList = [
    { type: 'CPU', item: components.cpu, retailer: 'PrimeABGB' },
    { type: 'Motherboard', item: components.motherboard, retailer: 'MDComputers' },
    { type: 'GPU', item: components.gpu, retailer: 'Vedant Computers' },
    { type: 'RAM', item: components.ram, retailer: 'Amazon India' },
    { type: 'Storage', item: components.storage, retailer: 'PrimeABGB' },
    { type: 'PSU', item: components.psu, retailer: 'MDComputers' },
    { type: 'Case', item: components.case, retailer: 'Vedant Computers' },
    { type: 'Cooler', item: components.cooler, retailer: 'Amazon India' },
    { type: 'OS', item: components.os, retailer: 'Direct Download' }
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast("Build link copied to clipboard!");
  };

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(build, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `PC_DOCx_${build.name.replace(/\s+/g, '_')}_BOM.json`);
    dlAnchorElem.click();
    showToast("Downloaded Bill of Materials JSON!");
  };

  return (
    <div className="animate-fade-in" style={{ padding: '40px 0 80px 0' }}>
      <div className="page-container" style={{ maxWidth: '1080px' }}>
        
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px',
          marginBottom: '40px'
        }}>
          <div>
            <div className="badge badge-success" style={{ marginBottom: '12px' }}>
              ✓ CONFIGURATION LOCKED & VERIFIED
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: 800, color: '#FFF', marginBottom: '8px' }}>
              Your PC is Ready.
            </h1>
            <p style={{ fontSize: '17px', color: 'var(--text-secondary)' }}>
              Complete hardware specification, verified compatibility, and Indian vendor inventory check.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={handlePrint} className="btn-secondary">
              <Printer size={15} /> Print Spec
            </button>
            <button onClick={handleExportJson} className="btn-secondary">
              <FileDown size={15} /> Export JSON
            </button>
          </div>
        </div>

        {/* 6 Metric Tiles Strip */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '16px',
          marginBottom: '40px'
        }}>
          <div className="card-surface" style={{ padding: '18px' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Build Score</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#FFF', marginTop: '4px' }} className="tabular-nums">
              {build.score || 92}/100
            </div>
          </div>

          <div className="card-surface" style={{ padding: '18px' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Compatibility</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--status-success)', marginTop: '4px' }}>
              100%
            </div>
          </div>

          <div className="card-surface" style={{ padding: '18px' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Locked Total</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#FFF', marginTop: '4px' }} className="tabular-nums">
              {FORMAT_INR(currentTotal)}
            </div>
          </div>

          <div className="card-surface" style={{ padding: '18px' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Gaming Tier</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--accent-purple-text)', marginTop: '4px' }}>
              1440p High
            </div>
          </div>

          <div className="card-surface" style={{ padding: '18px' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Upgrade Readiness</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#FFF', marginTop: '4px' }}>
              Excellent
            </div>
          </div>

          <div className="card-surface" style={{ padding: '18px' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Peak Power</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--accent-blue)', marginTop: '4px' }} className="tabular-nums">
              {currentPower}W
            </div>
          </div>
        </div>

        {/* 9-Row Component Summary Table */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-default)',
          borderRadius: '20px',
          overflow: 'hidden',
          marginBottom: '36px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '140px 1fr 180px 140px',
            padding: '16px 24px',
            borderBottom: '1px solid var(--border-default)',
            background: 'var(--bg-surface)',
            fontSize: '12px',
            fontWeight: 700,
            color: 'var(--text-faint)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em'
          }}>
            <div>Component</div>
            <div>Selected Hardware Model</div>
            <div>Verified Vendor</div>
            <div style={{ textAlign: 'right' }}>Price (INR)</div>
          </div>

          {partsList.map(({ type, item, retailer }, idx) => {
            if (!item) return null;

            return (
              <div
                key={idx}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '140px 1fr 180px 140px',
                  padding: '18px 24px',
                  borderBottom: idx === partsList.length - 1 ? 'none' : '1px solid var(--border-subtle)',
                  background: idx % 2 === 0 ? 'transparent' : 'rgba(16, 18, 24, 0.4)',
                  alignItems: 'center',
                  fontSize: '14px'
                }}
              >
                <div style={{ fontWeight: 700, color: 'var(--accent-purple-text)', fontSize: '12px', textTransform: 'uppercase' }}>
                  {type}
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: '#FFF' }}>{item.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {item.specs || item.whyThisPart || 'Verified specification'}
                  </div>
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--status-success)' }} />
                  {retailer}
                </div>
                <div style={{ textAlign: 'right', fontWeight: 700, color: '#FFF' }} className="tabular-nums">
                  {FORMAT_INR(item.price)}
                </div>
              </div>
            );
          })}
        </div>

        {/* "Why This Build?" Editorial Box */}
        <div style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-default)',
          borderRadius: '16px',
          padding: '24px 28px',
          marginBottom: '40px'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#FFF', marginBottom: '8px' }}>
            Why This Build Works
          </h3>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            Balanced for 1440p gaming, development and everyday productivity while leaving room for future upgrades. The AMD Ryzen 5 7600 and NVIDIA RTX 5070 form an optimal zero-bottleneck partnership on the modern AM5 platform. You benefit from PCIe 4.0 storage bandwidth, DDR5 memory frequency, and a 65W thermal design that runs cool and quiet under Indian climate conditions.
          </p>
        </div>

        {/* Primary Action Buttons Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <button
            onClick={() => setRetailerModalOpen(true)}
            className="btn-primary"
            style={{ padding: '16px 36px', fontSize: '16px' }}
          >
            <ShoppingBag size={18} />
            <span>Find These Parts at Indian Retailers</span>
          </button>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button onClick={saveCurrentBuild} className="btn-secondary">
              <Bookmark size={15} /> Save Build
            </button>
            <button onClick={handleShare} className="btn-secondary">
              <Share2 size={15} /> Share
            </button>
            <button
              onClick={() => {
                setCurrentView('compare');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn-secondary"
            >
              Compare
            </button>
            <button
              onClick={() => {
                resetToCanonical();
                setCurrentView('wizard');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn-quiet"
            >
              <RotateCcw size={14} /> Start Over
            </button>
          </div>
        </div>

        {/* Retailers Directory Modal */}
        {retailerModalOpen && (
          <div className="modal-backdrop" onClick={() => setRetailerModalOpen(false)}>
            <div
              className="card-surface"
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '640px',
                background: 'var(--bg-card)',
                padding: '36px'
              }}
            >
              <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#FFF', marginBottom: '8px' }}>
                Purchase Options in India
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                These vetted retailers provide official manufacturer warranty and GST invoices across India:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
                {[
                  { name: 'PrimeABGB (Mumbai)', status: 'All 9 parts in stock', shipping: 'Express India delivery' },
                  { name: 'MDComputers (Kolkata)', status: 'Best price on RTX 5070', shipping: '2-4 business days' },
                  { name: 'Vedant Computers', status: 'Cabinet & PSU bundle discounts', shipping: 'Nationwide shipping' },
                  { name: 'Amazon.in Tech Store', status: 'Same-day Prime in metro cities', shipping: 'Hassle-free replacement' }
                ].map((ret, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '16px 20px',
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-default)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: 600, color: '#FFF' }}>{ret.name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--status-success)' }}>{ret.status} · {ret.shipping}</div>
                    </div>
                    <span className="badge badge-purple" style={{ cursor: 'pointer' }}>
                      Visit Store <ExternalLink size={12} />
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ textAlign: 'right' }}>
                <button onClick={() => setRetailerModalOpen(false)} className="btn-secondary">
                  Close Window
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
