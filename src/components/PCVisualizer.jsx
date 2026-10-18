import React, { useState } from 'react';
import { useBuild } from '../context/BuildContext';
import { ZoomIn, ZoomOut, RotateCcw, Box, Eye, Sparkles } from 'lucide-react';
import { FORMAT_INR } from '../data/mockData';

export const PCVisualizer = ({ compact = false, selectedCategory, onSelectCategory }) => {
  const { build, setPickerCategory } = useBuild();
  const [viewMode, setViewMode] = useState('exploded'); // 'front' | 'side' | 'exploded'
  const [zoomLevel, setZoomLevel] = useState(1);
  const [wireframe, setWireframe] = useState(false);
  const [internalHotspot, setInternalHotspot] = useState('gpu');

  const activeHotspot = selectedCategory || internalHotspot;
  const setActiveHotspot = (id) => {
    setInternalHotspot(id);
    if (onSelectCategory) onSelectCategory(id);
  };

  const gpu = build.components.gpu;
  const cpu = build.components.cpu;
  const cooler = build.components.cooler;
  const ram = build.components.ram;
  const storage = build.components.storage;
  const psu = build.components.psu;
  const pcCase = build.components.case;
  const mobo = build.components.motherboard;
  const os = build.components.os;

  const hotspots = [
    {
      id: 'gpu',
      label: 'GPU',
      name: gpu?.name || 'No GPU selected',
      price: gpu?.price || 0,
      spec: gpu ? `${gpu.vram || '12GB VRAM'} · ${gpu.tdp || 250}W TDP · ${gpu.lengthMm || 242}mm` : 'Graphics card slot empty',
      x: viewMode === 'exploded' ? 380 : viewMode === 'side' ? 360 : 340,
      y: viewMode === 'exploded' ? 310 : viewMode === 'side' ? 290 : 320,
      category: 'gpu'
    },
    {
      id: 'cpu',
      label: 'CPU',
      name: cpu?.name || 'No CPU selected',
      price: cpu?.price || 0,
      spec: cpu ? `${cpu.cores || '6C/12T'} · Socket ${cpu.socket || 'AM5'} · ${cpu.tdp || 65}W` : 'Processor socket unpopulated',
      x: viewMode === 'exploded' ? 290 : viewMode === 'side' ? 320 : 340,
      y: viewMode === 'exploded' ? 180 : viewMode === 'side' ? 200 : 220,
      category: 'cpu'
    },
    {
      id: 'motherboard',
      label: 'Motherboard',
      name: mobo?.name || 'No Motherboard selected',
      price: mobo?.price || 0,
      spec: mobo ? `${mobo.socket || 'AM5'} · ${mobo.ramType || 'DDR5'} · ${mobo.formFactor || 'Micro-ATX'}` : 'Main circuit board unselected',
      x: viewMode === 'exploded' ? 245 : viewMode === 'side' ? 230 : 230,
      y: viewMode === 'exploded' ? 220 : viewMode === 'side' ? 220 : 230,
      category: 'motherboard'
    },
    {
      id: 'cooler',
      label: 'Cooler',
      name: cooler?.name || 'Stock Cooler',
      price: cooler?.price || 0,
      spec: cooler ? `${cooler.heightMm || 155}mm · ${cooler.tdpSupport || 220}W dissipation` : 'CPU thermal cooler',
      x: viewMode === 'exploded' ? 250 : viewMode === 'side' ? 300 : 340,
      y: viewMode === 'exploded' ? 150 : viewMode === 'side' ? 190 : 200,
      category: 'cooler'
    },
    {
      id: 'ram',
      label: 'RAM',
      name: ram?.name || 'DDR5 RAM',
      price: ram?.price || 0,
      spec: ram ? `${ram.speed || '6000 MHz'} · ${ram.type || 'DDR5'} · ${ram.capacityGb || 16}GB` : 'Memory slots empty',
      x: viewMode === 'exploded' ? 350 : viewMode === 'side' ? 380 : 380,
      y: viewMode === 'exploded' ? 180 : viewMode === 'side' ? 200 : 220,
      category: 'ram'
    },
    {
      id: 'storage',
      label: 'Storage',
      name: storage?.name || 'M.2 NVMe SSD',
      price: storage?.price || 0,
      spec: storage ? `${storage.readSpeed || '5000 MB/s'} · Gen4 M.2 2280` : 'High-speed storage drive',
      x: viewMode === 'exploded' ? 330 : viewMode === 'side' ? 350 : 340,
      y: viewMode === 'exploded' ? 250 : viewMode === 'side' ? 260 : 270,
      category: 'storage'
    },
    {
      id: 'psu',
      label: 'Power',
      name: psu?.name || 'Power Supply',
      price: psu?.price || 0,
      spec: psu ? `${psu.wattage || 650}W · ${psu.rating || '80+ Bronze'} · ATX` : 'Power delivery unit',
      x: viewMode === 'exploded' ? 340 : viewMode === 'side' ? 280 : 340,
      y: viewMode === 'exploded' ? 420 : viewMode === 'side' ? 420 : 430,
      category: 'psu'
    },
    {
      id: 'case',
      label: 'Chassis',
      name: pcCase?.name || 'Mid-Tower Case',
      price: pcCase?.price || 0,
      spec: pcCase ? `${pcCase.formFactor || 'Mid-Tower'} · Max GPU: ${pcCase.maxGpuLength || 370}mm` : 'High airflow PC chassis',
      x: viewMode === 'exploded' ? 450 : viewMode === 'side' ? 440 : 440,
      y: viewMode === 'exploded' ? 80 : viewMode === 'side' ? 80 : 80,
      category: 'case'
    },
    {
      id: 'os',
      label: 'OS',
      name: os?.name || 'Windows 11 Home',
      price: os?.price || 0,
      spec: '64-bit · DirectX 12 Ultimate · Pre-optimized',
      x: viewMode === 'exploded' ? 160 : viewMode === 'side' ? 160 : 160,
      y: viewMode === 'exploded' ? 80 : viewMode === 'side' ? 80 : 80,
      category: 'os'
    }
  ];

  const activeSpotData = hotspots.find(h => h.id === activeHotspot) || hotspots[0];

  return (
    <div style={{
      width: '100%',
      background: 'var(--bg-surface)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-card)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }}>
      {/* Top Canvas Controls Bar */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(16, 18, 24, 0.75)'
      }}>
        {/* View Switcher Pill */}
        <div style={{
          display: 'flex',
          background: 'var(--bg-card)',
          padding: '3px',
          borderRadius: '10px',
          border: '1px solid var(--border-default)'
        }}>
          {['front', 'side', 'exploded'].map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              style={{
                background: viewMode === mode ? 'var(--bg-elevated)' : 'transparent',
                color: viewMode === mode ? '#FFF' : 'var(--text-muted)',
                border: 'none',
                padding: '5px 12px',
                borderRadius: '7px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                textTransform: 'capitalize',
                transition: 'all 150ms ease'
              }}
            >
              {mode}
            </button>
          ))}
        </div>

        {/* Subtle Guidance Pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '11px',
          color: 'var(--text-secondary)',
          background: 'var(--bg-card)',
          padding: '4px 10px',
          borderRadius: '20px',
          border: '1px solid var(--border-subtle)'
        }} className="hide-on-mobile">
          <Sparkles size={12} color="var(--accent-purple)" />
          <span>Click any component inside case to inspect & swap</span>
        </div>

        {/* Zoom and Reset Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setWireframe(!wireframe)}
            title="Toggle Wireframe Blueprint"
            className="btn-quiet"
            style={{
              padding: '6px',
              color: wireframe ? 'var(--accent-purple)' : 'var(--text-muted)'
            }}
          >
            <Eye size={16} />
          </button>

          <button
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.15, 1.45))}
            title="Zoom In"
            className="btn-quiet"
            style={{ padding: '6px' }}
          >
            <ZoomIn size={16} />
          </button>
          <button
            onClick={() => setZoomLevel(prev => Math.max(prev - 0.15, 0.85))}
            title="Zoom Out"
            className="btn-quiet"
            style={{ padding: '6px' }}
          >
            <ZoomOut size={16} />
          </button>
          <button
            onClick={() => { setZoomLevel(1); setViewMode('exploded'); }}
            title="Reset Visualizer"
            className="btn-quiet"
            style={{ padding: '6px' }}
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* Main SVG Graphic Canvas */}
      <div style={{
        position: 'relative',
        height: compact ? '280px' : '440px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at 50% 50%, rgba(27, 31, 41, 0.4) 0%, rgba(8, 9, 12, 0.95) 100%)',
        overflow: 'hidden',
        userSelect: 'none'
      }}>
        {/* Subtle engineering grid background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(var(--border-subtle) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
          opacity: 0.6
        }} />

        {/* Scaled Visualizer Vector Artwork */}
        <div style={{
          transform: `scale(${zoomLevel})`,
          transition: 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1)',
          position: 'relative',
          width: '680px',
          height: '460px'
        }}>
          <svg
            viewBox="0 0 680 460"
            style={{
              width: '100%',
              height: '100%',
              filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.6))'
            }}
          >
            <defs>
              <linearGradient id="chassisGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1B1F29" />
                <stop offset="100%" stopColor="#101218" />
              </linearGradient>
              <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(77, 163, 255, 0.08)" />
                <stop offset="100%" stopColor="rgba(124, 92, 255, 0.04)" />
              </linearGradient>
              <linearGradient id="gpuGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#151820" />
                <stop offset="100%" stopColor="#252A36" />
              </linearGradient>
              <linearGradient id="accentGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7C5CFF" />
                <stop offset="100%" stopColor="#4DA3FF" />
              </linearGradient>
            </defs>

            {/* Case Outer Frame */}
            <rect
              x="200"
              y="60"
              width="280"
              height="360"
              rx="16"
              fill={wireframe ? "none" : "url(#chassisGrad)"}
              stroke={activeHotspot === 'case' ? "#7C5CFF" : (wireframe ? "#7C5CFF" : "#292E38")}
              strokeWidth={activeHotspot === 'case' ? "3" : "2"}
              className="svg-clickable-part"
              onClick={() => { setActiveHotspot('case'); setPickerCategory('case'); }}
            >
              <title>Chassis: Click to inspect & swap</title>
            </rect>

            {/* Tempered Glass Tint (Front/Side) */}
            {viewMode !== 'exploded' && !wireframe && (
              <rect
                x="210"
                y="70"
                width="260"
                height="340"
                rx="10"
                fill="url(#glassGrad)"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="1"
                pointerEvents="none"
              />
            )}

            {/* Motherboard Tray */}
            <rect
              x={viewMode === 'exploded' ? "260" : "220"}
              y="110"
              width="200"
              height="230"
              rx="8"
              fill={wireframe ? "none" : "#13161D"}
              stroke={activeHotspot === 'motherboard' ? "#7C5CFF" : "#222733"}
              strokeWidth={activeHotspot === 'motherboard' ? "3" : "1.5"}
              className="svg-clickable-part"
              onClick={() => { setActiveHotspot('motherboard'); setPickerCategory('motherboard'); }}
            >
              <title>Motherboard: Click to inspect & swap</title>
            </rect>

            {/* PSU Shroud Compartment (Bottom) */}
            <rect
              x="210"
              y="360"
              width="260"
              height="50"
              rx="6"
              fill={wireframe ? "none" : "#0D0F14"}
              stroke="#292E38"
              strokeWidth="1"
              pointerEvents="none"
            />
            {/* PSU Unit inside shroud */}
            <g
              className="svg-clickable-part"
              onClick={() => { setActiveHotspot('psu'); setPickerCategory('psu'); }}
            >
              <rect
                x="230"
                y="370"
                width="150"
                height="34"
                rx="4"
                fill={wireframe ? "none" : "#181C24"}
                stroke={activeHotspot === 'psu' ? "#7C5CFF" : "#3D4452"}
                strokeWidth={activeHotspot === 'psu' ? "2.5" : "1"}
              />
              <text x="245" y="392" fill={activeHotspot === 'psu' ? "#FFF" : "#8A91A0"} fontSize="10" fontFamily="Inter" fontWeight="600">
                {psu?.name ? (psu.name.length > 18 ? psu.name.slice(0, 17) + '…' : psu.name) : 'POWER SUPPLY'}
              </text>
              <title>Power Supply: Click to inspect & swap</title>
            </g>

            {/* CPU Socket & Cooler Assembly */}
            <rect
              x={viewMode === 'exploded' ? "280" : "260"}
              y="140"
              width="60"
              height="60"
              rx="6"
              fill={wireframe ? "none" : "#1B1F29"}
              stroke={activeHotspot === 'cpu' ? "#FFFFFF" : "#7C5CFF"}
              strokeWidth={activeHotspot === 'cpu' ? "2.5" : "1"}
              className="svg-clickable-part"
              onClick={() => { setActiveHotspot('cpu'); setPickerCategory('cpu'); }}
            >
              <title>CPU Processor: Click to inspect & swap</title>
            </rect>

            {/* Air Cooler Heatsink Fins & Fan */}
            <g
              className="svg-clickable-part"
              onClick={() => { setActiveHotspot('cooler'); setPickerCategory('cooler'); }}
            >
              <path
                d={viewMode === 'exploded' ? "M 220 120 L 270 120 L 270 180 L 220 180 Z" : "M 255 135 L 295 135 L 295 185 L 255 185 Z"}
                fill={wireframe ? "none" : "#202531"}
                stroke={activeHotspot === 'cooler' ? "#7C5CFF" : "#3D4452"}
                strokeWidth={activeHotspot === 'cooler' ? "2.5" : "1"}
              />
              <circle
                cx={viewMode === 'exploded' ? "245" : "275"}
                cy={viewMode === 'exploded' ? "150" : "160"}
                r="16"
                fill="none"
                stroke={activeHotspot === 'cooler' ? "#7C5CFF" : "#4DA3FF"}
                strokeWidth="1.5"
                opacity={activeHotspot === 'cooler' ? "1" : "0.6"}
              />
              <title>CPU Cooler: Click to inspect & swap</title>
            </g>

            {/* RAM DIMM Slots & Sticks */}
            <g
              className="svg-clickable-part"
              onClick={() => { setActiveHotspot('ram'); setPickerCategory('ram'); }}
            >
              <rect
                x={viewMode === 'exploded' ? "360" : "330"}
                y="140"
                width="8"
                height="60"
                rx="2"
                fill={wireframe ? "none" : (activeHotspot === 'ram' ? "#FFF" : "#7C5CFF")}
                opacity="0.9"
              />
              <rect
                x={viewMode === 'exploded' ? "374" : "344"}
                y="140"
                width="8"
                height="60"
                rx="2"
                fill={wireframe ? "none" : "#1E222D"}
                stroke={activeHotspot === 'ram' ? "#7C5CFF" : "#3D4452"}
                strokeWidth="1"
              />
              <title>RAM Memory: Click to inspect & swap</title>
            </g>

            {/* M.2 NVMe SSD Shield */}
            <rect
              x={viewMode === 'exploded' ? "310" : "270"}
              y="225"
              width="55"
              height="14"
              rx="3"
              fill="#1B1F29"
              stroke={activeHotspot === 'storage' ? "#7C5CFF" : "#4DA3FF"}
              strokeWidth={activeHotspot === 'storage' ? "2" : "1"}
              opacity="0.9"
              className="svg-clickable-part"
              onClick={() => { setActiveHotspot('storage'); setPickerCategory('storage'); }}
            >
              <title>M.2 NVMe SSD: Click to inspect & swap</title>
            </rect>

            {/* GPU (Graphics Card - Prominent Component) */}
            <g
              className="svg-clickable-part"
              onClick={() => { setActiveHotspot('gpu'); setPickerCategory('gpu'); }}
            >
              <rect
                x={viewMode === 'exploded' ? "310" : "240"}
                y={viewMode === 'exploded' ? "275" : "265"}
                width={viewMode === 'exploded' ? "190" : "200"}
                height="54"
                rx="6"
                fill={wireframe ? "none" : "url(#gpuGrad)"}
                stroke={activeHotspot === 'gpu' ? "#A592FF" : "#7C5CFF"}
                strokeWidth={activeHotspot === 'gpu' ? "3" : "2"}
              />
              {/* Dual GPU Fans */}
              <circle cx={viewMode === 'exploded' ? "360" : "290"} cy={viewMode === 'exploded' ? "302" : "292"} r="18" fill="#101218" stroke="#3D4452" strokeWidth="1" />
              <circle cx={viewMode === 'exploded' ? "440" : "370"} cy={viewMode === 'exploded' ? "302" : "292"} r="18" fill="#101218" stroke="#3D4452" strokeWidth="1" />
              {/* GPU Backplate illumination strip */}
              <line
                x1={viewMode === 'exploded' ? "320" : "250"}
                y1={viewMode === 'exploded' ? "280" : "270"}
                x2={viewMode === 'exploded' ? "490" : "430"}
                y2={viewMode === 'exploded' ? "280" : "270"}
                stroke="url(#accentGlow)"
                strokeWidth="2"
              />
              <text x={viewMode === 'exploded' ? "330" : "260"} y={viewMode === 'exploded' ? "322" : "312"} fill="#F5F7FA" fontSize="10" fontFamily="Inter" fontWeight="700">
                {gpu?.name ? (gpu.name.length > 20 ? gpu.name.slice(0, 19) + '…' : gpu.name) : 'No GPU Selected'}
              </text>
              <title>Graphics Card (GPU): Click to inspect & swap</title>
            </g>

            {/* Architectural exploded connector lines */}
            {viewMode === 'exploded' && (
              <g stroke="#3D4452" strokeWidth="1" strokeDasharray="3,3" opacity="0.6">
                <line x1="270" y1="150" x2="280" y2="150" />
                <line x1="345" y1="180" x2="360" y2="180" />
                <line x1="290" y1="280" x2="310" y2="280" />
              </g>
            )}

            {/* Front Panel Intake Fans */}
            <circle cx="470" cy="130" r="28" fill="none" stroke="#292E38" strokeWidth="1" />
            <circle cx="470" cy="205" r="28" fill="none" stroke="#292E38" strokeWidth="1" />
            <circle cx="470" cy="280" r="28" fill="none" stroke="#292E38" strokeWidth="1" />
          </svg>

          {/* Interactive Hotspot Pins */}
          {hotspots.map((spot) => {
            const isSelected = activeHotspot === spot.id;
            const isGpu = spot.id === 'gpu';

            return (
              <div
                key={spot.id}
                onClick={() => {
                  setActiveHotspot(spot.id);
                  setPickerCategory(spot.category);
                }}
                title={`${spot.label}: Click to select & swap`}
                style={{
                  position: 'absolute',
                  left: `${spot.x}px`,
                  top: `${spot.y}px`,
                  transform: 'translate(-50%, -50%)',
                  cursor: 'pointer',
                  zIndex: 20
                }}
              >
                {/* Outer pulsating ring for active hotspot or GPU */}
                {(isGpu || isSelected) && (
                  <div
                    className="pulsing-dot"
                    style={{
                      position: 'absolute',
                      inset: '-6px',
                      borderRadius: '50%',
                      background: isSelected ? 'rgba(124, 92, 255, 0.5)' : 'rgba(124, 92, 255, 0.3)'
                    }}
                  />
                )}

                {/* Hotspot Core Pin */}
                <div style={{
                  width: isSelected ? '20px' : '15px',
                  height: isSelected ? '20px' : '15px',
                  borderRadius: '50%',
                  background: isSelected ? 'var(--accent-purple)' : '#FFFFFF',
                  border: '2px solid #08090C',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.9)',
                  transition: 'all 160ms ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {isSelected ? (
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FFF' }} />
                  ) : (
                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#08090C' }} />
                  )}
                </div>

                {/* Floating Label on active/hover */}
                {isSelected && (
                  <div style={{
                    position: 'absolute',
                    top: '-24px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(8, 9, 12, 0.92)',
                    border: '1px solid var(--accent-purple)',
                    color: '#FFF',
                    fontSize: '10px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '6px',
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.5)'
                  }}>
                    {spot.label} · Click to Swap
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Active Hotspot Telemetry Card */}
      <div style={{
        padding: '16px 20px',
        borderTop: '1px solid var(--border-subtle)',
        background: 'var(--bg-card)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            padding: '4px 10px',
            borderRadius: '6px',
            background: 'var(--accent-purple-glow)',
            color: 'var(--accent-purple-text)',
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase'
          }}>
            {activeSpotData.label} INSPECTOR
          </div>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 600, color: '#FFFFFF' }}>
              {activeSpotData.name}
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              {activeSpotData.spec}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#FFF' }} className="tabular-nums">
              {FORMAT_INR(activeSpotData.price)}
            </div>
            <div style={{
              fontSize: '11px',
              color: build.components[activeSpotData.category] ? 'var(--status-success)' : 'var(--text-muted)',
              fontWeight: 600
            }}>
              {build.components[activeSpotData.category] ? '✓ Active & Verified' : 'Slot Empty'}
            </div>
          </div>

          <button
            onClick={() => setPickerCategory(activeSpotData.category)}
            className="btn-primary"
            style={{
              padding: '8px 18px',
              fontSize: '13px',
              fontWeight: 600
            }}
          >
            {build.components[activeSpotData.category] ? `Change ${activeSpotData.label}` : `+ Select ${activeSpotData.label}`}
          </button>
        </div>
      </div>
    </div>
  );
};
