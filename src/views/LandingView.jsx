import React from 'react';
import { useBuild } from '../context/BuildContext';
import { BUILD_GOALS, FEATURED_BUILDS, FORMAT_INR } from '../data/mockData';
import {
  Sparkles,
  ShieldCheck,
  Zap,
  TrendingDown,
  Layers,
  ArrowRight,
  Gamepad2,
  Code2,
  Cpu,
  Video,
  Briefcase,
  CheckCircle2
} from 'lucide-react';

export const LandingView = () => {
  const { setCurrentView, setWizardStep, setSelectedPurpose, loadSavedBuild } = useBuild();

  const goalIcons = {
    Gamepad2,
    Code2,
    Cpu,
    Video,
    Briefcase,
    Zap
  };

  const startWithGoal = (goalId) => {
    setSelectedPurpose(goalId);
    setWizardStep(2); // take directly to budget step
    setCurrentView('wizard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '40px' }}>
      {/* SECTION 1: HERO (Full Viewport Height - 72px) */}
      <section style={{
        minHeight: 'calc(100vh - 72px)',
        display: 'flex',
        alignItems: 'center',
        padding: '60px 0',
        position: 'relative'
      }}>
        <div className="page-container" style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr',
          gap: '64px',
          alignItems: 'center',
          width: '100%'
        }}>
          {/* Left Hero Column */}
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '9999px',
              background: 'rgba(124, 92, 255, 0.12)',
              border: '1px solid rgba(124, 92, 255, 0.3)',
              marginBottom: '28px'
            }}>
              <Sparkles size={14} color="var(--accent-purple-text)" />
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent-purple-text)', letterSpacing: '0.06em' }}>
                THE SMARTER PC BUILDER FOR INDIA
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(42px, 5.2vw, 68px)',
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: '-0.035em',
              marginBottom: '24px',
              color: '#FFFFFF'
            }}>
              Build a PC that <span style={{
                background: 'var(--accent-gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>actually fits</span> your needs.
            </h1>

            <p style={{
              fontSize: '18px',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              maxWidth: '52ch',
              marginBottom: '36px'
            }}>
              Tell PC_DOCx your budget in ₹ and what you want to do. We'll help you create a balanced, compatible and upgrade-ready PC without the guesswork.
            </p>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  setCurrentView('wizard');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn-primary"
                style={{ padding: '14px 32px', fontSize: '16px' }}
              >
                <span>Build My PC</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={() => {
                  setCurrentView('explore');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn-secondary"
                style={{ padding: '14px 28px', fontSize: '16px' }}
              >
                Explore Curated Builds
              </button>
            </div>

            {/* Quick canonical ticker */}
            <div style={{
              marginTop: '44px',
              display: 'flex',
              gap: '24px',
              alignItems: 'center',
              fontSize: '13px',
              color: 'var(--text-muted)'
            }}>
              <div>
                <span style={{ color: '#FFF', fontWeight: 700 }} className="tabular-nums">100%</span> Compatibility Engine
              </div>
              <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--border-default)' }} />
              <div>
                <span style={{ color: 'var(--status-success)', fontWeight: 700 }}>₹ GST Inclusive</span> Real-Time Pricing
              </div>
            </div>
          </div>

          {/* Right Hero Column: Premium PC Tower Graphic with 5 Hotspot Pins */}
          <div style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }} className="hero-tower-container">
            {/* Ambient Purple Backlight */}
            <div style={{
              position: 'absolute',
              width: '320px',
              height: '320px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(124, 92, 255, 0.18) 0%, transparent 70%)',
              filter: 'blur(40px)',
              zIndex: 1
            }} />

            {/* Architectural Isometric PC Art */}
            <div style={{
              width: '100%',
              maxWidth: '440px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-default)',
              borderRadius: '24px',
              padding: '36px',
              position: 'relative',
              zIndex: 2,
              boxShadow: 'var(--shadow-lg)'
            }}>
              <div style={{
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--text-faint)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '16px'
              }}>
                CANONICAL CONFIGURATION · ₹98,450
              </div>

              {/* 5 Hardware Pin Rows */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  background: 'var(--bg-surface)',
                  borderRadius: '12px',
                  border: '1px solid var(--border-subtle)'
                }}>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--accent-purple-text)', fontWeight: 600 }}>CPU</div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#FFF' }}>AMD Ryzen 5 7600</div>
                  </div>
                  <span className="badge badge-success">✓ 65W TDP</span>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  background: 'var(--bg-surface)',
                  borderRadius: '12px',
                  border: '2px solid var(--accent-purple)',
                  boxShadow: 'var(--shadow-purple)'
                }}>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--accent-purple-text)', fontWeight: 600 }}>GPU (HIGHLIGHT)</div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#FFF' }}>NVIDIA RTX 5070 12GB</div>
                  </div>
                  <span className="badge badge-purple">1440p Beast</span>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  background: 'var(--bg-surface)',
                  borderRadius: '12px',
                  border: '1px solid var(--border-subtle)'
                }}>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>RAM</div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#FFF' }}>16GB DDR5-6000 EXPO</div>
                  </div>
                  <span className="badge badge-neutral">AM5 Ready</span>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  background: 'var(--bg-surface)',
                  borderRadius: '12px',
                  border: '1px solid var(--border-subtle)'
                }}>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>COOLING</div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#FFF' }}>Deepcool AK400 Air</div>
                  </div>
                  <span className="badge badge-neutral">Whisper Quiet</span>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  background: 'var(--bg-surface)',
                  borderRadius: '12px',
                  border: '1px solid var(--border-subtle)'
                }}>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>POWER DRAW</div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#FFF' }}>438W / 650W Bronze</div>
                  </div>
                  <span className="badge badge-success">Stable</span>
                </div>
              </div>

              {/* Inspect in builder button */}
              <button
                onClick={() => {
                  setCurrentView('builder');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn-quiet"
                style={{
                  width: '100%',
                  marginTop: '16px',
                  color: 'var(--accent-purple-text)',
                  border: '1px solid var(--border-default)',
                  borderRadius: '10px',
                  padding: '10px'
                }}
              >
                Inspect 3D Visualizer & Hotspots →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: TRUST STRIP (4 Items in One Row) */}
      <section style={{
        borderTop: '1px solid var(--border-default)',
        borderBottom: '1px solid var(--border-default)',
        background: 'var(--bg-surface)',
        padding: '40px 0',
        marginBottom: '140px'
      }}>
        <div className="page-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '32px'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
              <div style={{ padding: '8px', borderRadius: '10px', background: 'var(--bg-elevated)', color: 'var(--status-success)' }}>
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#FFF' }}>Live Compatibility Engine</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Sockets, memory lanes, cooler clearances, and PCIe lanes checked live.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
              <div style={{ padding: '8px', borderRadius: '10px', background: 'var(--bg-elevated)', color: 'var(--accent-blue)' }}>
                <Zap size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#FFF' }}>Real-World Telemetry</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Simulated 1440p gaming FPS & local AI VRAM suitability metrics.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
              <div style={{ padding: '8px', borderRadius: '10px', background: 'var(--bg-elevated)', color: 'var(--status-warning)' }}>
                <TrendingDown size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#FFF' }}>Indian Budget Optimization</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Distributes rupees to maximize GPU & CPU with zero component waste.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
              <div style={{ padding: '8px', borderRadius: '10px', background: 'var(--bg-elevated)', color: 'var(--accent-purple)' }}>
                <Layers size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#FFF' }}>4-Year Upgrade Roadmap</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Clear timeline for future RAM additions, GPU swaps, and drop-in AM5 CPUs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: HOW IT WORKS (3 Large Steps) */}
      <section style={{ marginBottom: '140px' }}>
        <div className="page-container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 64px auto' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 700, color: '#FFF', marginBottom: '12px' }}>
              How PC_DOCx Works
            </h2>
            <p style={{ fontSize: '17px', color: 'var(--text-secondary)' }}>
              A disciplined, engineering-first approach to building your personal computer.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px'
          }}>
            <div className="card-surface" style={{ position: 'relative' }}>
              <div style={{
                fontSize: '48px',
                fontWeight: 800,
                color: 'var(--border-default)',
                marginBottom: '16px',
                fontFamily: 'var(--font-mono)'
              }}>
                01
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#FFF', marginBottom: '10px' }}>
                Choose your goal
              </h3>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Select gaming, local AI, software development, or creation. PC_DOCx calibrates part thresholds and VRAM minimums.
              </p>
            </div>

            <div className="card-surface" style={{ position: 'relative' }}>
              <div style={{
                fontSize: '48px',
                fontWeight: 800,
                color: 'var(--border-default)',
                marginBottom: '16px',
                fontFamily: 'var(--font-mono)'
              }}>
                02
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#FFF', marginBottom: '10px' }}>
                Set your budget in ₹
              </h3>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Slide smoothly from ₹30,000 to ₹3,00,000. Our allocator reserves ~45% for GPU and optimizes core platform balance.
              </p>
            </div>

            <div className="card-surface" style={{ position: 'relative' }}>
              <div style={{
                fontSize: '48px',
                fontWeight: 800,
                color: 'var(--border-default)',
                marginBottom: '16px',
                fontFamily: 'var(--font-mono)'
              }}>
                03
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#FFF', marginBottom: '10px' }}>
                Get a build you can trust
              </h3>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Receive full 100% compatibility verification, thermal headroom report, power supply validation, and retailer links.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: WHAT ARE YOU BUILDING FOR? (6 Cards in 3x2 Grid) */}
      <section style={{ marginBottom: '140px' }}>
        <div className="page-container">
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 700, color: '#FFF', marginBottom: '12px' }}>
              What are you building for?
            </h2>
            <p style={{ fontSize: '17px', color: 'var(--text-secondary)' }}>
              Start with your goal. PC_DOCx handles the technical complexity.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            {BUILD_GOALS.map((goal) => {
              const IconComp = goalIcons[goal.icon] || Cpu;
              return (
                <div
                  key={goal.id}
                  onClick={() => startWithGoal(goal.id)}
                  className="card-surface-interactive"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '180px'
                  }}
                >
                  <div>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'var(--bg-elevated)',
                      border: '1px solid var(--border-default)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-purple)',
                      marginBottom: '16px'
                    }}>
                      <IconComp size={22} />
                    </div>
                    <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#FFF', marginBottom: '8px' }}>
                      {goal.title}
                    </h3>
                    <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                      {goal.tagline}
                    </p>
                  </div>

                  <div style={{
                    marginTop: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--accent-purple-text)'
                  }}>
                    <span>Configure for {goal.title}</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 5: FEATURED VERIFIED BUILDS (3 Cards) */}
      <section style={{ marginBottom: '140px' }}>
        <div className="page-container">
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '48px',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <h2 style={{ fontSize: '36px', fontWeight: 700, color: '#FFF', marginBottom: '12px' }}>
                Featured Reference Builds
              </h2>
              <p style={{ fontSize: '17px', color: 'var(--text-secondary)' }}>
                Hand-optimized configurations calibrated against Indian component inventories.
              </p>
            </div>
            <button
              onClick={() => {
                setCurrentView('explore');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn-secondary"
            >
              View All Builds →
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px'
          }}>
            {FEATURED_BUILDS.slice(0, 3).map((fb) => (
              <div
                key={fb.id}
                className="card-surface"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: fb.tag === 'Most Popular' ? '2px solid var(--accent-purple)' : '1px solid var(--border-default)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <span className={`badge ${fb.tag === 'Most Popular' ? 'badge-purple' : 'badge-neutral'}`}>
                      {fb.tag}
                    </span>
                    <span style={{ fontSize: '13px', color: 'var(--status-success)', fontWeight: 600 }}>
                      ✓ 100% Compatible
                    </span>
                  </div>

                  <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#FFF', marginBottom: '6px' }}>
                    {fb.name}
                  </h3>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: '#FFF', marginBottom: '20px' }} className="tabular-nums">
                    {FORMAT_INR(fb.price)}
                  </div>

                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    padding: '16px',
                    background: 'var(--bg-surface)',
                    borderRadius: '12px',
                    fontSize: '13px',
                    marginBottom: '24px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Processor:</span>
                      <span style={{ color: '#FFF', fontWeight: 500 }}>{fb.cpu}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Graphics:</span>
                      <span style={{ color: '#FFF', fontWeight: 500 }}>{fb.gpu}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>RAM:</span>
                      <span style={{ color: '#FFF', fontWeight: 500 }}>{fb.ram}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Build Score:</span>
                      <span style={{ color: 'var(--accent-purple-text)', fontWeight: 700 }}>{fb.score}/100</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => loadSavedBuild(fb)}
                  className={fb.tag === 'Most Popular' ? 'btn-primary' : 'btn-secondary'}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Load in Builder
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: HIGH-IMPACT FINAL CTA BAND */}
      <section>
        <div className="page-container">
          <div style={{
            background: 'linear-gradient(180deg, rgba(21, 24, 32, 0.95) 0%, rgba(16, 18, 24, 0.95) 100%)',
            border: '1px solid var(--border-default)',
            borderRadius: '28px',
            padding: '72px 48px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: '-100px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '400px',
              height: '200px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(124, 92, 255, 0.25) 0%, transparent 70%)',
              filter: 'blur(50px)',
              pointerEvents: 'none'
            }} />

            <h2 style={{ fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: 800, color: '#FFF', marginBottom: '16px' }}>
              Your next PC starts here.
            </h2>
            <p style={{ fontSize: '18px', color: 'var(--text-secondary)', maxWidth: '48ch', margin: '0 auto 36px auto' }}>
              Design a rock-solid computer tailored to your exact budget and workflows in under 3 minutes.
            </p>

            <button
              onClick={() => {
                setCurrentView('wizard');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn-primary"
              style={{ padding: '16px 40px', fontSize: '17px' }}
            >
              <Sparkles size={18} />
              <span>Launch 3-Step Guided Builder</span>
            </button>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 960px) {
          .page-container {
            grid-template-columns: 1fr !important;
          }
          .hero-tower-container {
            order: -1;
            margin-bottom: 24px;
          }
        }
      `}</style>
    </div>
  );
};
