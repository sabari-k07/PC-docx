import React, { useState } from 'react';
import { useBuild } from '../context/BuildContext';
import { BENCHMARKS_1440P } from '../data/mockData';
import {
  Gamepad2,
  Cpu,
  Code2,
  Video,
  Activity,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Zap
} from 'lucide-react';

export const PerformanceView = () => {
  const { build, setCurrentView } = useBuild();
  const [activeTab, setActiveTab] = useState('gaming'); // 'gaming' | 'ai-ml' | 'dev' | 'creative'
  const [resolution, setResolution] = useState('1440p');

  const gpu = build.components.gpu;
  const cpu = build.components.cpu;

  // Scale FPS slightly based on resolution toggle
  const getResolutionMultiplier = () => {
    if (resolution === '1080p') return 1.35;
    if (resolution === '4k') return 0.58;
    return 1.0;
  };

  const mult = getResolutionMultiplier();

  return (
    <div className="animate-fade-in" style={{ padding: '40px 0 80px 0' }}>
      <div className="page-container">
        
        {/* Page Heading */}
        <div style={{ marginBottom: '36px' }}>
          <div className="badge badge-purple" style={{ marginBottom: '12px' }}>
            <Activity size={12} /> HARDWARE TELEMETRY & BENCHMARKS
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 4vw, 42px)', fontWeight: 800, color: '#FFF', marginBottom: '8px' }}>
            How Will Your PC Perform?
          </h1>
          <p style={{ fontSize: '17px', color: 'var(--text-secondary)' }}>
            Real-world performance estimates for <strong style={{ color: '#FFF' }}>{gpu?.name || 'RTX 5070'}</strong> paired with <strong style={{ color: '#FFF' }}>{cpu?.name || 'Ryzen 5 7600'}</strong>.
          </p>
        </div>

        {/* Top Category Tabs */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          paddingBottom: '20px',
          borderBottom: '1px solid var(--border-default)',
          marginBottom: '36px'
        }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            {[
              { id: 'gaming', label: 'Gaming FPS', icon: Gamepad2 },
              { id: 'ai-ml', label: 'Local AI & ML', icon: Cpu },
              { id: 'dev', label: 'Development & Build Times', icon: Code2 },
              { id: 'creative', label: '4K Video & 3D Render', icon: Video }
            ].map(tab => {
              const IconComp = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`nav-pill ${isActive ? 'active' : ''}`}
                  style={{
                    padding: '8px 18px',
                    fontSize: '14px',
                    fontWeight: 600,
                    border: isActive ? '1px solid var(--border-default)' : '1px solid transparent',
                    background: isActive ? 'var(--bg-elevated)' : 'transparent'
                  }}
                >
                  <IconComp size={16} color={isActive ? 'var(--accent-purple)' : 'var(--text-muted)'} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {activeTab === 'gaming' && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-default)',
              borderRadius: '10px',
              padding: '3px'
            }}>
              {['1080p', '1440p', '4k'].map(res => (
                <button
                  key={res}
                  onClick={() => setResolution(res)}
                  style={{
                    background: resolution === res ? 'var(--bg-elevated)' : 'transparent',
                    color: resolution === res ? '#FFF' : 'var(--text-muted)',
                    border: 'none',
                    padding: '5px 14px',
                    borderRadius: '7px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textTransform: 'uppercase'
                  }}
                >
                  {res}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* TAB 1: GAMING FPS DASHBOARD (S10) */}
        {activeTab === 'gaming' && (
          <div className="animate-fade-in">
            {/* 4 Large Benchmark Cards in 2x2 Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
              marginBottom: '36px'
            }}>
              {BENCHMARKS_1440P.games.map((game, idx) => {
                const scaledFps = Math.round(game.fps * mult);
                const scaledLow = Math.round(game.low1Pct * mult);
                const pct = Math.min(Math.round((scaledFps / game.maxTarget) * 100), 100);

                return (
                  <div
                    key={idx}
                    className="card-surface"
                    style={{ padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div>
                          <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#FFF' }}>
                            {game.title}
                          </h3>
                          <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                            {game.preset.replace('1440p', resolution.toUpperCase())}
                          </div>
                        </div>

                        <span className="badge badge-success">
                          ✓ Smooth
                        </span>
                      </div>

                      <div style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: '8px',
                        margin: '20px 0 16px 0'
                      }}>
                        <span style={{ fontSize: '48px', fontWeight: 800, color: '#FFFFFF' }} className="tabular-nums">
                          {scaledFps}
                        </span>
                        <span style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-muted)' }}>
                          FPS
                        </span>
                      </div>

                      {/* Performance Bar */}
                      <div style={{
                        width: '100%',
                        height: '8px',
                        background: 'var(--bg-elevated)',
                        borderRadius: '4px',
                        overflow: 'hidden',
                        marginBottom: '14px'
                      }}>
                        <div style={{
                          width: `${pct}%`,
                          height: '100%',
                          background: 'var(--accent-gradient)',
                          borderRadius: '4px'
                        }} />
                      </div>
                    </div>

                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '13px',
                      color: 'var(--text-muted)',
                      borderTop: '1px solid var(--border-subtle)',
                      paddingTop: '12px'
                    }}>
                      <span>1% Low Minimum: <strong style={{ color: '#FFF' }}>{scaledLow} FPS</strong></span>
                      <span style={{ color: 'var(--status-success)' }}>Zero Stutter</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 4 Stat Tiles */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
              marginBottom: '28px'
            }}>
              <div className="card-surface" style={{ padding: '20px' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Aggregate Average FPS
                </div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#FFF', marginTop: '4px' }} className="tabular-nums">
                  {Math.round(BENCHMARKS_1440P.stats.averageFps * mult)} FPS
                </div>
                <div style={{ fontSize: '12px', color: 'var(--status-success)', marginTop: '2px' }}>
                  Optimal for 144Hz-240Hz monitors
                </div>
              </div>

              <div className="card-surface" style={{ padding: '20px' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  1% Low Stability
                </div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#FFF', marginTop: '4px' }} className="tabular-nums">
                  {Math.round(BENCHMARKS_1440P.stats.low1Pct * mult)} FPS
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Frametime variance under 3.2ms
                </div>
              </div>

              <div className="card-surface" style={{ padding: '20px' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  GPU Utilization
                </div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--accent-purple-text)', marginTop: '4px' }}>
                  97%
                </div>
                <div style={{ fontSize: '12px', color: 'var(--status-success)', marginTop: '2px' }}>
                  Fully saturated — Zero CPU bottleneck
                </div>
              </div>

              <div className="card-surface" style={{ padding: '20px' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  CPU Utilization
                </div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--accent-blue)', marginTop: '4px' }}>
                  58%
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Healthy headroom for Discord/Recording
                </div>
              </div>
            </div>

            <div style={{ fontSize: '13px', color: 'var(--text-muted)', textAlign: 'center' }}>
              Caption: High/Ultra Presets · DLSS Quality where available · Performance estimates are indicative and depend on drivers and ambient temperatures.
            </div>
          </div>
        )}

        {/* TAB 2: AI & ML PERFORMANCE DASHBOARD (S11) */}
        {activeTab === 'ai-ml' && (
          <div className="animate-fade-in">
            {/* Top 4 AI Tiles */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
              marginBottom: '32px'
            }}>
              <div className="card-surface" style={{ padding: '20px' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Dedicated VRAM</div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#FFF', marginTop: '4px' }}>12 GB GDDR7</div>
                <div style={{ fontSize: '12px', color: 'var(--accent-blue)' }}>672 GB/s Bandwidth</div>
              </div>

              <div className="card-surface" style={{ padding: '20px' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>CUDA Acceleration</div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--status-success)', marginTop: '4px' }}>Native</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>CUDA 12.x & cuDNN Ready</div>
              </div>

              <div className="card-surface" style={{ padding: '20px' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>7B / 8B Local LLM</div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--accent-purple-text)', marginTop: '4px' }}>Excellent</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>~48 tokens/sec on Llama 3</div>
              </div>

              <div className="card-surface" style={{ padding: '20px' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>SDXL Image Gen</div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#FFF', marginTop: '4px' }}>6.2s / Batch</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>1024×1024 TensorRT FP16</div>
              </div>
            </div>

            {/* Visual VRAM Allocation Bar */}
            <div className="card-surface" style={{ padding: '28px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#FFF' }}>
                    12GB GPU Memory Footprint Simulation (Llama 3 8B Q4)
                  </h3>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                    Visual distribution of weights, attention cache, and system overhead in VRAM.
                  </div>
                </div>
                <span className="badge badge-success">Fits Comfortably (71% utilized)</span>
              </div>

              <div style={{
                width: '100%',
                height: '28px',
                borderRadius: '8px',
                background: 'var(--bg-elevated)',
                display: 'flex',
                overflow: 'hidden',
                margin: '20px 0 16px 0'
              }}>
                <div style={{ width: '46%', background: 'var(--accent-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: '#FFF' }}>
                  Model Weights (5.5GB)
                </div>
                <div style={{ width: '25%', background: '#4DA3FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: '#FFF' }}>
                  KV Cache 8k (3.0GB)
                </div>
                <div style={{ width: '29%', background: 'var(--border-default)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>
                  Free Buffer (3.5GB)
                </div>
              </div>

              <div style={{ display: 'flex', gap: '24px', fontSize: '12px', color: 'var(--text-muted)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'var(--accent-purple)' }} />
                  <span>Model Weights (46%)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#4DA3FF' }} />
                  <span>Context Window Cache (25%)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'var(--border-default)' }} />
                  <span>Available GPU Buffer (29%)</span>
                </div>
              </div>
            </div>

            {/* Model Suitability Breakdown Rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {BENCHMARKS_1440P.aiTelemetry.models.map((mod, i) => (
                <div
                  key={i}
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-default)',
                    borderRadius: '16px',
                    padding: '20px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '16px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      background: mod.fits ? 'rgba(53, 208, 127, 0.12)' : 'rgba(255, 184, 77, 0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: mod.fits ? 'var(--status-success)' : 'var(--status-warning)'
                    }}>
                      {mod.fits ? <CheckCircle2 size={20} /> : <AlertTriangle size={20} />}
                    </div>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: 600, color: '#FFF' }}>{mod.name}</div>
                      <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                        Requires {mod.vramNeeded} GB VRAM · {mod.speedTokensPerSec > 5 ? `${mod.speedTokensPerSec} tokens/sec` : 'CPU fallback required'}
                      </div>
                      {mod.note && (
                        <div style={{ fontSize: '12px', color: 'var(--status-warning)', marginTop: '4px' }}>
                          {mod.note}
                        </div>
                      )}
                    </div>
                  </div>

                  <span className={`badge ${mod.status === 'Excellent' ? 'badge-success' : mod.status === 'Good' ? 'badge-purple' : 'badge-warning'}`}>
                    {mod.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: DEVELOPMENT & COMPILATION */}
        {activeTab === 'dev' && (
          <div className="card-surface animate-fade-in" style={{ padding: '36px' }}>
            <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#FFF', marginBottom: '12px' }}>
              Software Development & Compilation Benchmarks
            </h3>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '32px' }}>
              The 6C/12T Zen 4 architecture with 32MB L3 Cache delivers fast iteration cycles for modern programming stacks.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
              <div style={{ background: 'var(--bg-surface)', padding: '20px', borderRadius: '12px' }}>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Linux Kernel Compilation (defconfig)</div>
                <div style={{ fontSize: '26px', fontWeight: 800, color: '#FFF', margin: '8px 0' }}>82 Seconds</div>
                <div style={{ fontSize: '12px', color: 'var(--status-success)' }}>Top tier for sub-₹20K CPU</div>
              </div>

              <div style={{ background: 'var(--bg-surface)', padding: '20px', borderRadius: '12px' }}>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Large Next.js / TypeScript Build</div>
                <div style={{ fontSize: '26px', fontWeight: 800, color: '#FFF', margin: '8px 0' }}>14.2 Seconds</div>
                <div style={{ fontSize: '12px', color: 'var(--status-success)' }}>Instant HMR with Gen4 SSD</div>
              </div>

              <div style={{ background: 'var(--bg-surface)', padding: '20px', borderRadius: '12px' }}>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Simultaneous Docker Containers</div>
                <div style={{ fontSize: '26px', fontWeight: 800, color: '#FFF', margin: '8px 0' }}>12+ Containers</div>
                <div style={{ fontSize: '12px', color: 'var(--accent-blue)' }}>Recommend 32GB RAM upgrade</div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CONTENT CREATION */}
        {activeTab === 'creative' && (
          <div className="card-surface animate-fade-in" style={{ padding: '36px' }}>
            <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#FFF', marginBottom: '12px' }}>
              4K Video Scrubbing & 3D Render Pipelines
            </h3>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '32px' }}>
              Equipped with dual 9th Gen NVENC encoders with AV1 hardware acceleration.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
              <div style={{ background: 'var(--bg-surface)', padding: '20px', borderRadius: '12px' }}>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>DaVinci Resolve 4K Export (10 min timeline)</div>
                <div style={{ fontSize: '26px', fontWeight: 800, color: '#FFF', margin: '8px 0' }}>3 min 12 sec</div>
                <div style={{ fontSize: '12px', color: 'var(--status-success)' }}>Native AV1 hardware encoding</div>
              </div>

              <div style={{ background: 'var(--bg-surface)', padding: '20px', borderRadius: '12px' }}>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Blender 4.2 Cycles (Monster Scene)</div>
                <div style={{ fontSize: '26px', fontWeight: 800, color: '#FFF', margin: '8px 0' }}>2,840 Samples/sec</div>
                <div style={{ fontSize: '12px', color: 'var(--accent-purple-text)' }}>OptiX GPU acceleration</div>
              </div>

              <div style={{ background: 'var(--bg-surface)', padding: '20px', borderRadius: '12px' }}>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Premiere Pro Multi-Cam Playback</div>
                <div style={{ fontSize: '26px', fontWeight: 800, color: '#FFF', margin: '8px 0' }}>Full 60 FPS</div>
                <div style={{ fontSize: '12px', color: 'var(--status-success)' }}>Zero dropped frames at 1440p</div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
