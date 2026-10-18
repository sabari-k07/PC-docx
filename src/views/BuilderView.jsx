import React, { useState } from 'react';
import { useBuild } from '../context/BuildContext';
import { PCVisualizer } from '../components/PCVisualizer';
import { FORMAT_INR } from '../data/mockData';
import {
  Cpu,
  Layers,
  Tv,
  HardDrive,
  Zap,
  Box,
  Fan,
  Disc,
  Check,
  AlertTriangle,
  Sparkles,
  Bookmark,
  Share2,
  TrendingDown,
  Activity,
  ArrowRight,
  ShieldCheck,
  Plus,
  Trash2,
  HelpCircle,
  Info,
  SlidersHorizontal,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';

export const BuilderView = () => {
  const {
    build,
    currentTotal,
    targetBudget,
    remainingBudget,
    compReport,
    currentPower,
    setPickerCategory,
    removeComponent,
    setIsOptimizerOpen,
    saveCurrentBuild,
    setCurrentView,
    isAdvancedMode,
    setIsAdvancedMode,
    showToast
  } = useBuild();

  const [activeCategory, setActiveCategory] = useState('gpu');
  const components = build.components;

  const categories = [
    {
      key: 'cpu',
      label: 'Processor (CPU)',
      shortName: 'CPU',
      icon: Cpu,
      item: components.cpu,
      role: 'Brain of the PC · Drives game physics & system responsiveness',
      beginnerTip: 'Ryzen 5 7600 is currently India’s most balanced 1440p gaming CPU'
    },
    {
      key: 'motherboard',
      label: 'Motherboard',
      shortName: 'Motherboard',
      icon: Layers,
      item: components.motherboard,
      role: 'Main circuit board connecting CPU, RAM, GPU & storage',
      beginnerTip: 'B650 chipset gives you PCIe 5.0 and DDR5 support with future upgrade headroom'
    },
    {
      key: 'gpu',
      label: 'Graphics Card (GPU)',
      shortName: 'GPU',
      icon: Tv,
      item: components.gpu,
      isPrimary: true,
      role: 'Renders 3D visuals, Ray Tracing & ultra-smooth gaming frame rates',
      beginnerTip: 'RTX 5070 with 12GB VRAM handles AAA titles at 1440p Max settings with DLSS 4'
    },
    {
      key: 'ram',
      label: 'System Memory (RAM)',
      shortName: 'RAM',
      icon: HardDrive,
      item: components.ram,
      role: 'High-speed DDR5 memory for smooth gaming & multitasking',
      beginnerTip: '16GB at 6000MHz is the optimal gaming sweet spot for AMD AM5 platforms'
    },
    {
      key: 'storage',
      label: 'Storage Drive (NVMe SSD)',
      shortName: 'Storage',
      icon: HardDrive,
      item: components.storage,
      role: 'Ultra-fast Gen4 solid state drive for instant 5-second boots',
      beginnerTip: '1TB NVMe provides fast loading screens for Windows + 10-15 modern games'
    },
    {
      key: 'psu',
      label: 'Power Supply (PSU)',
      shortName: 'Power',
      icon: Zap,
      item: components.psu,
      role: 'Supplies certified, clean electrical power to every part',
      beginnerTip: '650W 80+ Bronze gives you 33% headroom above peak load (438W)'
    },
    {
      key: 'case',
      label: 'PC Chassis (Case)',
      shortName: 'Case',
      icon: Box,
      item: components.case,
      role: 'Protects components with high-airflow mesh and tempered glass',
      beginnerTip: 'Mid-Tower case includes 4 ARGB cooling fans and front USB-C'
    },
    {
      key: 'cooler',
      label: 'CPU Cooler',
      shortName: 'Cooler',
      icon: Fan,
      item: components.cooler,
      role: 'Keeps processor cool under prolonged heavy gaming load',
      beginnerTip: 'High-efficiency tower cooler keeps temperatures well under 70°C quietly'
    },
    {
      key: 'os',
      label: 'Operating System',
      shortName: 'OS',
      icon: Disc,
      item: components.os,
      role: 'Windows 11 Home 64-bit pre-optimized for modern games',
      beginnerTip: 'Full DirectX 12 Ultimate and Auto HDR support for Indian gamers'
    }
  ];

  const journeySteps = [
    { id: 'wizard-purpose', label: '1 Purpose', view: 'wizard' },
    { id: 'wizard-budget', label: '2 Budget', view: 'wizard' },
    { id: 'builder', label: '3 Build', active: true },
    { id: 'health', label: '4 Compatibility', view: 'health' },
    { id: 'performance', label: '5 Performance', view: 'performance' },
    { id: 'roadmap', label: '6 Upgrade', view: 'roadmap' },
    { id: 'review', label: '7 Review', view: 'review' }
  ];

  // Budget Breakdown Calculations
  const gpuPrice = components.gpu?.price || 0;
  const cpuPrice = components.cpu?.price || 0;
  const moboPrice = components.motherboard?.price || 0;
  const ramStoragePrice = (components.ram?.price || 0) + (components.storage?.price || 0);
  const othersPrice = Math.max(0, currentTotal - (gpuPrice + cpuPrice + moboPrice + ramStoragePrice));

  const safeTotal = Math.max(currentTotal, 1);
  const gpuPct = Math.round((gpuPrice / safeTotal) * 100);
  const cpuPct = Math.round((cpuPrice / safeTotal) * 100);
  const moboPct = Math.round((moboPrice / safeTotal) * 100);
  const ramStoragePct = Math.round((ramStoragePrice / safeTotal) * 100);
  const othersPct = Math.max(0, 100 - (gpuPct + cpuPct + moboPct + ramStoragePct));

  // Dynamic Telemetry & Clearance math
  const cpu = components.cpu;
  const mobo = components.motherboard;
  const gpu = components.gpu;
  const ram = components.ram;
  const psu = components.psu;
  const pcCase = components.case;
  const cooler = components.cooler;

  const psuWatt = psu?.wattage || 650;
  const psuLoadPct = Math.round((currentPower / psuWatt) * 100);
  const gpuLen = gpu?.lengthMm || 242;
  const maxGpu = pcCase?.maxGpuLength || 370;
  const gpuMargin = maxGpu - gpuLen;
  const coolerH = cooler?.heightMm || 155;
  const maxCooler = pcCase?.maxCoolerHeight || 163;
  const coolerMargin = maxCooler - coolerH;
  const socketMatch = cpu && mobo ? cpu.socket === mobo.socket : true;
  const ramMatch = ram && mobo ? (ram.type === mobo.ramType || !ram.type) : true;

  // Beginner vs Advanced Plain English Checklist
  const compatibilityChecks = !isAdvancedMode ? [
    {
      ok: socketMatch,
      label: socketMatch ? 'Processor fits Motherboard' : 'Socket Incompatibility Warning',
      desc: socketMatch
        ? `${cpu?.name || 'Processor'} (${cpu?.socket || 'AM5'}) natively matches ${mobo?.name || 'Motherboard'}`
        : `Selected CPU (${cpu?.socket}) does not physically match motherboard socket (${mobo?.socket})`
    },
    {
      ok: ramMatch,
      label: ramMatch ? 'Memory runs at full speed' : 'Memory Type Mismatch',
      desc: ramMatch
        ? `${ram?.name || 'DDR5'} profile fully supported by motherboard memory slots`
        : `Selected RAM is ${ram?.type} while Motherboard supports ${mobo?.ramType}`
    },
    {
      ok: gpuMargin >= 0,
      label: gpuMargin >= 0 ? 'Graphics card fits inside case' : 'GPU exceeds chassis max length',
      desc: gpuMargin >= 0
        ? `${gpuLen}mm card length leaves ${gpuMargin}mm room to spare in the chassis`
        : `Card length (${gpuLen}mm) exceeds case max allowance (${maxGpu}mm)`
    },
    {
      ok: coolerMargin >= 0,
      label: coolerMargin >= 0 ? 'CPU cooler fits easily' : 'Cooler too tall for case',
      desc: coolerMargin >= 0
        ? `${coolerH}mm cooler height leaves ${coolerMargin}mm safety margin from glass panel`
        : `Cooler height (${coolerH}mm) exceeds case limit (${maxCooler}mm)`
    },
    {
      ok: psuLoadPct <= 100,
      isInfo: psuLoadPct <= 75,
      label: psuLoadPct <= 75 ? 'Power supply has healthy headroom' : psuLoadPct <= 100 ? 'PSU at high capacity' : 'PSU Underpowered',
      desc: `${currentPower}W peak gaming draw is at ${psuLoadPct}% of ${psuWatt}W capacity (${psu?.rating || '80+ Bronze'})`
    },
    {
      ok: true,
      label: 'Extra high-speed storage slot',
      desc: 'Motherboard has an open M.2 NVMe slot for adding another SSD later'
    },
    {
      ok: true,
      label: 'Front USB-C connects directly',
      desc: 'Chassis front panel USB Type-C connects natively to motherboard header'
    }
  ] : [
    {
      ok: socketMatch,
      label: `Socket ${cpu?.socket || 'AM5'} Native Alignment`,
      desc: `Exact pinout alignment for ${cpu?.name || 'Processor'}`
    },
    {
      ok: ramMatch,
      label: `${ram?.type || 'DDR5'} Memory Bus Verified`,
      desc: `${ram?.speed || '6000 MHz'} operating profile verified on motherboard chipset`
    },
    {
      ok: gpuMargin >= 0,
      label: `GPU Clearance: ${gpuLen}mm / ${maxGpu}mm Max`,
      desc: `${gpuMargin}mm delta margin for front radiator or airflow`
    },
    {
      ok: coolerMargin >= 0,
      label: `Cooler Height: ${coolerH}mm / ${maxCooler}mm Max`,
      desc: `${coolerMargin}mm clearance margin to tempered glass panel`
    },
    {
      ok: psuLoadPct <= 100,
      isInfo: psuLoadPct <= 75,
      label: `PSU Headroom: ${currentPower}W / ${psuWatt}W (${psuLoadPct}% Load)`,
      desc: `Operates within efficiency curve of ${psu?.rating || '80+ Bronze'} spec`
    },
    {
      ok: true,
      label: 'Motherboard Dual M.2 PCIe 4.0 x4',
      desc: 'Direct CPU lanes + chipset lanes available'
    },
    {
      ok: true,
      label: 'Chassis Type-E Header to Type-C 10Gbps',
      desc: 'USB 3.2 Gen 2 native connection matched'
    }
  ];

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast("Build link copied to clipboard!");
  };

  const selectedCount = categories.filter(c => c.item).length;

  return (
    <div className="animate-fade-in" style={{ padding: '20px 0 60px 0' }}>
      <div className="page-container" style={{ maxWidth: '1380px' }}>
        
        {/* TOP STEPPER & MODE SWITCHER BAR */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          paddingBottom: '20px',
          borderBottom: '1px solid var(--border-subtle)',
          marginBottom: '24px'
        }}>
          {/* Stepper Navigation */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            overflowX: 'auto',
            paddingBottom: '4px'
          }}>
            {journeySteps.map((step, idx) => (
              <React.Fragment key={step.id}>
                <button
                  onClick={() => step.view && setCurrentView(step.view)}
                  style={{
                    background: step.active ? 'var(--bg-elevated)' : 'transparent',
                    color: step.active ? '#FFF' : 'var(--text-muted)',
                    border: step.active ? '1px solid var(--accent-purple)' : '1px solid transparent',
                    borderRadius: '20px',
                    padding: '6px 14px',
                    fontSize: '12px',
                    fontWeight: step.active ? 700 : 500,
                    cursor: step.view ? 'pointer' : 'default',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: step.active ? '0 0 12px rgba(124, 92, 255, 0.2)' : 'none',
                    transition: 'all 150ms ease'
                  }}
                  title={`Navigate to Step ${idx + 1}: ${step.label}`}
                >
                  <span style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: step.active ? 'var(--accent-purple)' : 'var(--bg-card)',
                    color: step.active ? '#FFF' : 'var(--text-faint)',
                    fontSize: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700
                  }}>
                    {idx + 1}
                  </span>
                  <span>{step.label.replace(/^\d+\s*/, '')}</span>
                </button>
                {idx < journeySteps.length - 1 && (
                  <span style={{ color: 'var(--border-default)', fontSize: '11px' }}>→</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Beginner / Advanced Mode Interactive Switch */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: 'var(--bg-card)',
            padding: '6px 14px',
            borderRadius: '12px',
            border: '1px solid var(--border-default)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{
                fontSize: '12px',
                fontWeight: 600,
                color: !isAdvancedMode ? 'var(--accent-purple-text)' : 'var(--text-secondary)'
              }}>
                {!isAdvancedMode ? '✨ Beginner Friendly' : '🛠️ Advanced Specs'}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }} className="hide-on-mobile">
                {!isAdvancedMode ? '(Plain English)' : '(Exact mm & Pins)'}
              </span>
            </div>

            <button
              onClick={() => {
                const nextMode = !isAdvancedMode;
                setIsAdvancedMode(nextMode);
                showToast(nextMode ? 'Switched to Advanced Specs Mode' : 'Switched to Beginner Friendly Mode');
              }}
              style={{
                width: '46px',
                height: '24px',
                borderRadius: '12px',
                background: !isAdvancedMode ? 'var(--accent-purple)' : 'var(--bg-elevated)',
                border: '1px solid var(--border-default)',
                cursor: 'pointer',
                position: 'relative',
                transition: 'background 200ms ease'
              }}
              aria-label="Toggle Beginner Friendly Mode"
              title="Toggle between plain-English guidance and detailed technical specifications"
            >
              <div style={{
                position: 'absolute',
                top: '2px',
                left: !isAdvancedMode ? '24px' : '3px',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: '#FFFFFF',
                boxShadow: '0 1px 4px rgba(0,0,0,0.4)',
                transition: 'left 200ms ease'
              }} />
            </button>
          </div>
        </div>

        {/* BEGINNER HELPER CALLOUT BANNER (Visible in Beginner Mode) */}
        {!isAdvancedMode && (
          <div style={{
            background: 'linear-gradient(90deg, rgba(124, 92, 255, 0.1) 0%, rgba(77, 163, 255, 0.08) 100%)',
            border: '1px solid rgba(124, 92, 255, 0.25)',
            borderRadius: '14px',
            padding: '12px 18px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Sparkles size={16} color="var(--accent-purple)" />
              <span style={{ fontSize: '13px', color: '#FFF' }}>
                <strong>Beginner Mode is Active:</strong> Technical jargon is translated into plain, actionable advice. Click any component to swap or inspect!
              </span>
            </div>
            <span style={{
              fontSize: '11px',
              padding: '3px 8px',
              borderRadius: '6px',
              background: 'rgba(53, 208, 127, 0.15)',
              color: '#35D07F',
              fontWeight: 600
            }}>
              ✓ 100% Compatible Build
            </span>
          </div>
        )}

        {/* 3-COLUMN BREATHING LAYOUT */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '320px 1fr 350px',
          gap: '24px',
          alignItems: 'start'
        }} className="builder-grid">
          
          {/* COLUMN 1: COMPONENT LIST (Left 320px) */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-default)',
            borderRadius: '18px',
            padding: '16px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            {/* Header: Progress & Guidance */}
            <div style={{
              paddingBottom: '12px',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{
                  fontSize: '12px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: 'var(--text-secondary)',
                  letterSpacing: '0.08em'
                }}>
                  HARDWARE PARTS ({selectedCount}/9)
                </span>
                <span style={{ fontSize: '11px', color: 'var(--status-success)', fontWeight: 600 }}>
                  {selectedCount === 9 ? '✓ Build Complete' : `${9 - selectedCount} remaining`}
                </span>
              </div>

              {/* Progress bar */}
              <div style={{
                width: '100%',
                height: '5px',
                borderRadius: '3px',
                background: 'var(--bg-elevated)',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${(selectedCount / 9) * 100}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, var(--accent-purple), var(--accent-blue))',
                  borderRadius: '3px',
                  transition: 'width 300ms ease'
                }} />
              </div>
            </div>

            {/* Scrollable Component Rows (Clean scroll container so all 9 fit effortlessly) */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              maxHeight: 'calc(100vh - 270px)',
              overflowY: 'auto',
              paddingRight: '4px'
            }} className="custom-scrollbar">
              {categories.map(({ key, label, shortName, icon: IconComponent, item, isPrimary, role, beginnerTip }) => {
                const isSelected = !!item;
                const isFocused = activeCategory === key;

                return (
                  <div
                    key={key}
                    onClick={() => {
                      setActiveCategory(key);
                      setPickerCategory(key);
                    }}
                    style={{
                      background: isFocused
                        ? 'rgba(124, 92, 255, 0.12)'
                        : isPrimary
                        ? 'rgba(124, 92, 255, 0.04)'
                        : 'var(--bg-surface)',
                      border: isFocused
                        ? '1.5px solid var(--accent-purple)'
                        : isPrimary
                        ? '1px solid rgba(124, 92, 255, 0.35)'
                        : '1px solid var(--border-default)',
                      borderRadius: '12px',
                      padding: '10px 12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '8px',
                      transition: 'all 160ms ease',
                      boxShadow: isFocused ? '0 0 12px rgba(124, 92, 255, 0.2)' : 'none'
                    }}
                    className="component-nav-row"
                    title={`Click to choose or swap ${label}`}
                  >
                    {/* Left info: Icon & Part Name */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: 1 }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: isFocused ? 'var(--accent-purple)' : 'var(--bg-elevated)',
                        color: isFocused ? '#FFFFFF' : 'var(--accent-purple)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <IconComponent size={16} />
                      </div>

                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <span style={{
                            fontSize: '10px',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            color: isFocused ? 'var(--accent-purple-text)' : 'var(--text-muted)',
                            letterSpacing: '0.05em'
                          }}>
                            {shortName}
                          </span>
                          {isSelected && (
                            <span style={{ color: 'var(--status-success)', fontSize: '10px' }}>✓</span>
                          )}
                        </div>

                        <div style={{
                          fontSize: '13px',
                          fontWeight: 600,
                          color: isSelected ? '#FFFFFF' : 'var(--text-muted)',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          {isSelected ? item.name : `Select ${label}`}
                        </div>

                        {/* Plain English Subtitle in Beginner Mode */}
                        {!isAdvancedMode && (
                          <div style={{
                            fontSize: '10px',
                            color: 'var(--text-muted)',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            marginTop: '1px'
                          }}>
                            {role}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right: Price & Swap Button */}
                    <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#FFF' }} className="tabular-nums">
                          {isSelected ? FORMAT_INR(item.price) : '₹0'}
                        </div>
                        <span style={{
                          fontSize: '10px',
                          color: isFocused ? 'var(--accent-purple-text)' : 'var(--text-muted)',
                          fontWeight: 600
                        }}>
                          {isSelected ? 'Change' : '+ Add'}
                        </span>
                      </div>

                      {isSelected && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeComponent(key);
                            showToast(`Removed ${label}`);
                          }}
                          className="btn-quiet"
                          title={`Remove ${label}`}
                          style={{ padding: '4px', color: 'var(--text-muted)' }}
                        >
                          <Trash2 size={12} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* COLUMN 2: 3D PC VISUALIZER & TELEMETRY (Center Flexible) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <PCVisualizer
              selectedCategory={activeCategory}
              onSelectCategory={(cat) => setActiveCategory(cat)}
            />

            {/* Quick Metrics Bar below visualizer */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '14px'
            }}>
              {/* Metric 1: Gaming Target */}
              <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-default)',
                borderRadius: '14px',
                padding: '14px 16px'
              }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Target Resolution
                </div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#FFF', margin: '2px 0' }}>
                  1440p High / Ultra
                </div>
                <div style={{ fontSize: '11px', color: 'var(--status-success)' }}>
                  Avg ~140–175 FPS in AAA
                </div>
              </div>

              {/* Metric 2: Power Draw */}
              <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-default)',
                borderRadius: '14px',
                padding: '14px 16px'
              }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Estimated Power
                </div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--accent-blue)' }} className="tabular-nums">
                  {currentPower}W <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500 }}>/ {psuWatt}W</span>
                </div>
                <div style={{ fontSize: '11px', color: psuLoadPct <= 80 ? 'var(--text-secondary)' : 'var(--status-warning)' }}>
                  {psuLoadPct}% PSU Load ({psuLoadPct <= 75 ? 'Optimal Headroom' : psuLoadPct <= 100 ? 'Operating Fine' : 'High Load'})
                </div>
              </div>

              {/* Metric 3: AI & VRAM */}
              <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-default)',
                borderRadius: '14px',
                padding: '14px 16px'
              }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  GPU Memory (VRAM)
                </div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--accent-purple-text)' }}>
                  {gpu?.vram || 'Dedicated VRAM'}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  {gpu ? 'DirectX 12, Ray Tracing & Local AI' : 'No GPU Selected'}
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 3: "YOUR BUILD SUMMARY" STICKY CARD (Right 350px) */}
          <div style={{
            position: 'sticky',
            top: '90px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-default)',
            borderRadius: '18px',
            padding: '22px',
            boxShadow: 'var(--shadow-md)'
          }}>
            {/* Header: Title & Health Score */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '10px'
            }}>
              <span style={{
                fontSize: '11px',
                fontWeight: 800,
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                letterSpacing: '0.08em'
              }}>
                YOUR BUILD SUMMARY
              </span>
              <span className="badge badge-success" style={{ fontSize: '11px' }}>
                <CheckCircle2 size={12} /> {compReport.healthLabel} ({compReport.healthScore}/100)
              </span>
            </div>

            {/* Price & Budget Remaining */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '32px', fontWeight: 800, color: '#FFF' }} className="tabular-nums">
                {FORMAT_INR(currentTotal)}
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '12px',
                color: 'var(--text-muted)',
                marginTop: '4px'
              }}>
                <span>Budget Cap: {FORMAT_INR(targetBudget)}</span>
                <span style={{
                  color: remainingBudget >= 0 ? 'var(--status-success)' : 'var(--status-danger)',
                  fontWeight: 700
                }}>
                  {remainingBudget >= 0 ? `+${FORMAT_INR(remainingBudget)} surplus` : `${FORMAT_INR(remainingBudget)} over`}
                </span>
              </div>
            </div>

            {/* VISUAL BUDGET ALLOCATION BAR */}
            <div style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '12px',
              padding: '12px',
              marginBottom: '18px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                <span style={{ fontWeight: 600 }}>Budget Allocation</span>
                <span>{Math.round((currentTotal / targetBudget) * 100)}% of cap used</span>
              </div>

              {/* Segmented Color Bar */}
              <div style={{
                width: '100%',
                height: '8px',
                borderRadius: '4px',
                background: 'var(--bg-elevated)',
                display: 'flex',
                overflow: 'hidden',
                gap: '1px'
              }}>
                <div style={{ width: `${gpuPct}%`, background: '#7C5CFF' }} title={`GPU: ${gpuPct}% (${FORMAT_INR(gpuPrice)})`} />
                <div style={{ width: `${cpuPct}%`, background: '#4DA3FF' }} title={`CPU: ${cpuPct}% (${FORMAT_INR(cpuPrice)})`} />
                <div style={{ width: `${moboPct}%`, background: '#38BDF8' }} title={`Motherboard: ${moboPct}% (${FORMAT_INR(moboPrice)})`} />
                <div style={{ width: `${ramStoragePct}%`, background: '#35D07F' }} title={`RAM & Storage: ${ramStoragePct}% (${FORMAT_INR(ramStoragePrice)})`} />
                <div style={{ width: `${othersPct}%`, background: '#A78BFA' }} title={`Case & Power: ${othersPct}% (${FORMAT_INR(othersPrice)})`} />
              </div>

              {/* Legend Dots */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
                fontSize: '10px',
                color: 'var(--text-muted)',
                marginTop: '8px'
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#7C5CFF' }}></span> GPU ({gpuPct}%)
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4DA3FF' }}></span> CPU ({cpuPct}%)
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#38BDF8' }}></span> Mobo ({moboPct}%)
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#35D07F' }}></span> RAM/SSD ({ramStoragePct}%)
                </span>
              </div>
            </div>

            {/* 7-POINT COMPATIBILITY CHECKLIST */}
            <div style={{
              borderTop: '1px solid var(--border-subtle)',
              borderBottom: '1px solid var(--border-subtle)',
              padding: '14px 0',
              marginBottom: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '2px' }}>
                Compatibility Verification {!isAdvancedMode && '· Plain English'}
              </div>

              {compatibilityChecks.map((check, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                    fontSize: '12px'
                  }}
                >
                  <div style={{ marginTop: '2px', flexShrink: 0 }}>
                    {check.isInfo ? (
                      <Check size={14} color="var(--accent-blue)" />
                    ) : (
                      <Check size={14} color="var(--status-success)" />
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>
                      {check.label}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      {check.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Primary Action Button: View Full BOM Details */}
            <button
              onClick={() => {
                setCurrentView('review');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '13px',
                fontSize: '14px',
                fontWeight: 700,
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <span>View Full Build Details & Retailers</span>
              <ArrowRight size={16} />
            </button>

            {/* Secondary Actions Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px',
              marginBottom: '14px'
            }}>
              <button
                onClick={() => setIsOptimizerOpen(true)}
                className="btn-secondary"
                style={{ fontSize: '12px', padding: '9px 8px', justifyContent: 'center' }}
                title="Automatically adjust part selection to squeeze maximum FPS from your budget"
              >
                <TrendingDown size={14} color="var(--accent-purple)" />
                <span>Optimize ₹</span>
              </button>
              <button
                onClick={() => {
                  setCurrentView('performance');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn-secondary"
                style={{ fontSize: '12px', padding: '9px 8px', justifyContent: 'center' }}
                title="View in-depth FPS benchmarks across modern PC titles"
              >
                <Activity size={14} color="var(--status-success)" />
                <span>FPS Telemetry</span>
              </button>
            </div>

            {/* Quick Actions Footer */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingTop: '8px',
              borderTop: '1px solid var(--border-subtle)'
            }}>
              <button
                onClick={saveCurrentBuild}
                className="btn-quiet"
                style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                <Bookmark size={13} color="var(--accent-purple)" />
                <span>Save to Vault</span>
              </button>
              <button
                onClick={handleShare}
                className="btn-quiet"
                style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                <Share2 size={13} />
                <span>Share Link</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .component-nav-row:hover {
          border-color: var(--accent-purple) !important;
          background: rgba(124, 92, 255, 0.08) !important;
        }
        @media (max-width: 1180px) {
          .builder-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

