import React, { useState } from 'react';
import { useBuild } from '../context/BuildContext';
import { BUILD_GOALS, FORMAT_INR } from '../data/mockData';
import {
  Gamepad2,
  Code2,
  Cpu,
  Video,
  Briefcase,
  Zap,
  Check,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Sliders,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const WizardView = () => {
  const {
    wizardStep,
    setWizardStep,
    selectedPurpose,
    setSelectedPurpose,
    targetBudget,
    setTargetBudget,
    selectedPriority,
    setSelectedPriority,
    platformPref,
    setPlatformPref,
    haveExistingParts,
    setHaveExistingParts,
    setCurrentView,
    resetToCanonical,
    showToast
  } = useBuild();

  const [ownedParts, setOwnedParts] = useState({
    gpu: false,
    storage: false,
    case: false,
    psu: false
  });

  const goalIcons = { Gamepad2, Code2, Cpu, Video, Briefcase, Zap };

  const priorities = [
    {
      id: 'Raw performance',
      title: 'Raw Performance',
      desc: 'Maximum frame rates and compute power today. Aesthetics and noise levels are secondary.',
      icon: Zap
    },
    {
      id: 'Balanced',
      title: 'Balanced',
      desc: 'The sweet spot between speed, acoustics, thermals, and long-term durability.',
      icon: Sparkles
    },
    {
      id: 'Best value',
      title: 'Best Value',
      desc: 'Maximum performance-per-rupee using market price drops and value component champions.',
      icon: Sliders
    },
    {
      id: 'Upgrade-proof',
      title: 'Upgrade-Proof',
      desc: 'Premium motherboard, headroom-rich PSU, and modern socket for seamless multi-year part swaps.',
      icon: ShieldCheck
    }
  ];

  const presetBudgets = [50000, 75000, 100000, 150000, 200000];

  const handleFinishWizard = () => {
    // Fire celebratory confetti!
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 }
    });
    resetToCanonical();
    setCurrentView('recommended');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast("Engineered custom build based on your priorities!");
  };

  return (
    <div className="animate-fade-in" style={{ minHeight: 'calc(100vh - 72px)', display: 'flex', flexDirection: 'column' }}>
      {/* Top Slim Wizard Stepper Bar */}
      <div style={{
        padding: '16px 0',
        borderBottom: '1px solid var(--border-default)',
        background: 'var(--bg-surface)'
      }}>
        <div className="page-container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            <span style={{ color: '#FFF', fontWeight: 600 }}>Step {wizardStep} of 3</span> · {
              wizardStep === 1 ? 'Purpose & Workload' : wizardStep === 2 ? 'Budget Allocation' : 'Engineering Priority'
            }
          </div>

          <button
            onClick={() => setCurrentView('builder')}
            className="btn-quiet"
            style={{ fontSize: '13px', color: 'var(--text-muted)' }}
          >
            Skip to Manual Builder →
          </button>
        </div>
      </div>

      {/* Main Wizard Step Content Area */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        padding: '60px 0'
      }}>
        <div className="page-container" style={{ width: '100%', maxWidth: '960px' }}>
          
          {/* STEP 1: PURPOSE */}
          {wizardStep === 1 && (
            <div className="animate-fade-in">
              <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                <h1 style={{ fontSize: 'clamp(32px, 4vw, 42px)', fontWeight: 800, color: '#FFF', marginBottom: '12px' }}>
                  What are you building for?
                </h1>
                <p style={{ fontSize: '17px', color: 'var(--text-secondary)', maxWidth: '54ch', margin: '0 auto' }}>
                  Start with your primary goal. PC_DOCx configures performance thresholds and part allocations automatically.
                </p>
              </div>

              {/* 3x2 Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px',
                marginBottom: '48px'
              }}>
                {BUILD_GOALS.map((goal) => {
                  const IconComp = goalIcons[goal.icon] || Cpu;
                  const isSelected = selectedPurpose === goal.id;

                  return (
                    <div
                      key={goal.id}
                      onClick={() => setSelectedPurpose(goal.id)}
                      className={`card-surface-interactive ${isSelected ? 'card-selected' : ''}`}
                      style={{
                        padding: '28px',
                        background: isSelected ? 'rgba(124, 92, 255, 0.08)' : 'var(--bg-card)',
                        position: 'relative'
                      }}
                    >
                      {isSelected && (
                        <div style={{
                          position: 'absolute',
                          top: '20px',
                          right: '20px',
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          background: 'var(--accent-purple)',
                          color: '#FFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Check size={14} />
                        </div>
                      )}

                      <div style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '10px',
                        background: 'var(--bg-elevated)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isSelected ? 'var(--accent-purple)' : 'var(--text-muted)',
                        marginBottom: '16px'
                      }}>
                        <IconComp size={22} />
                      </div>

                      <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#FFF', marginBottom: '6px' }}>
                        {goal.title}
                      </h3>
                      <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                        {goal.tagline}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Nav */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button onClick={() => setCurrentView('landing')} className="btn-quiet">
                  Cancel
                </button>
                <button
                  onClick={() => setWizardStep(2)}
                  className="btn-primary"
                  style={{ padding: '12px 28px' }}
                >
                  <span>Continue to Budget</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: BUDGET */}
          {wizardStep === 2 && (
            <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                <h1 style={{ fontSize: 'clamp(32px, 4vw, 42px)', fontWeight: 800, color: '#FFF', marginBottom: '12px' }}>
                  What's your total budget?
                </h1>
                <p style={{ fontSize: '17px', color: 'var(--text-secondary)' }}>
                  We distribute funds intelligently to eliminate bottlenecks between CPU and GPU.
                </p>
              </div>

              {/* Huge Rupee Counter */}
              <div style={{
                textAlign: 'center',
                margin: '24px 0 40px 0'
              }}>
                <div style={{
                  fontSize: 'clamp(56px, 8vw, 92px)',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  letterSpacing: '-0.035em'
                }} className="tabular-nums">
                  {FORMAT_INR(targetBudget)}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Estimated Indian Retail Price (GST Inclusive)
                </div>
              </div>

              {/* Slider */}
              <div style={{ marginBottom: '32px' }}>
                <input
                  type="range"
                  min="30000"
                  max="300000"
                  step="2500"
                  value={targetBudget}
                  onChange={(e) => setTargetBudget(Number(e.target.value))}
                  style={{ width: '100%' }}
                />
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '12px',
                  fontSize: '12px',
                  color: 'var(--text-faint)'
                }}>
                  <span>₹30,000 (Entry Esports)</span>
                  <span>₹1,00,000 (1440p Sweet Spot)</span>
                  <span>₹3,00,000+ (Extreme 4K)</span>
                </div>
              </div>

              {/* Quick Preset Chips */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '12px',
                flexWrap: 'wrap',
                marginBottom: '40px'
              }}>
                {presetBudgets.map((amt) => {
                  const isNearest = targetBudget === amt;
                  return (
                    <button
                      key={amt}
                      onClick={() => setTargetBudget(amt)}
                      className={`nav-pill ${isNearest ? 'active' : ''}`}
                      style={{
                        padding: '8px 18px',
                        fontSize: '14px',
                        fontWeight: 600,
                        border: isNearest ? '2px solid var(--accent-purple)' : '1px solid var(--border-default)',
                        background: isNearest ? 'var(--bg-elevated)' : 'transparent'
                      }}
                    >
                      {amt === 200000 ? '₹2,00,000+' : FORMAT_INR(amt)}
                    </button>
                  );
                })}
              </div>

              {/* Allocation Preview Card */}
              <div style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-default)',
                borderRadius: '16px',
                padding: '20px 24px',
                marginBottom: '48px',
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px'
              }}>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Projected GPU Allocation
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--accent-purple-text)' }} className="tabular-nums">
                    ~{FORMAT_INR(Math.round(targetBudget * 0.45))} (45%)
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Projected CPU Allocation
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: '#FFF' }} className="tabular-nums">
                    ~{FORMAT_INR(Math.round(targetBudget * 0.22))} (22%)
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Motherboard, RAM, PSU, Case
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: '#FFF' }} className="tabular-nums">
                    ~{FORMAT_INR(Math.round(targetBudget * 0.33))} (33%)
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button onClick={() => setWizardStep(1)} className="btn-secondary">
                  <ArrowLeft size={16} /> Back
                </button>
                <button
                  onClick={() => setWizardStep(3)}
                  className="btn-primary"
                  style={{ padding: '12px 28px' }}
                >
                  <span>Continue to Priority</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PRIORITY & PLATFORM */}
          {wizardStep === 3 && (
            <div className="animate-fade-in">
              <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                <h1 style={{ fontSize: 'clamp(32px, 4vw, 42px)', fontWeight: 800, color: '#FFF', marginBottom: '12px' }}>
                  What matters most?
                </h1>
                <p style={{ fontSize: '17px', color: 'var(--text-secondary)' }}>
                  Choose the engineering philosophy that guides part trade-offs.
                </p>
              </div>

              {/* 4 Priority Option Cards */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
                gap: '16px',
                marginBottom: '40px'
              }}>
                {priorities.map((p) => {
                  const IconComp = p.icon;
                  const isSelected = selectedPriority === p.id;

                  return (
                    <div
                      key={p.id}
                      onClick={() => setSelectedPriority(p.id)}
                      className={`card-surface-interactive ${isSelected ? 'card-selected' : ''}`}
                      style={{
                        padding: '24px',
                        background: isSelected ? 'rgba(124, 92, 255, 0.08)' : 'var(--bg-card)'
                      }}
                    >
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        background: 'var(--bg-elevated)',
                        color: isSelected ? 'var(--accent-purple)' : 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '14px'
                      }}>
                        <IconComp size={18} />
                      </div>

                      <h4 style={{ fontSize: '17px', fontWeight: 600, color: '#FFF', marginBottom: '6px' }}>
                        {p.title}
                      </h4>
                      <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                        {p.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Optional Parameters */}
              <div style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-default)',
                borderRadius: '16px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                marginBottom: '48px'
              }}>
                {/* Platform Preference */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 600, color: '#FFF' }}>
                      Platform Architecture Preference
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                      AM5 socket provides multi-year drop-in CPU upgrades.
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    {['No Preference', 'AMD', 'Intel'].map(p => (
                      <button
                        key={p}
                        onClick={() => setPlatformPref(p)}
                        className={`nav-pill ${platformPref === p ? 'active' : ''}`}
                        style={{
                          border: '1px solid var(--border-default)',
                          fontSize: '13px'
                        }}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pre-owned Parts Toggle */}
                <div style={{
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 600, color: '#FFF' }}>
                      I already own some components
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                      Reuse existing storage, chassis, or GPU to maximize the rest of your budget.
                    </div>
                  </div>

                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '8px' }}>
                    <input
                      type="checkbox"
                      checked={haveExistingParts}
                      onChange={(e) => setHaveExistingParts(e.target.checked)}
                      style={{ width: '18px', height: '18px', accentColor: 'var(--accent-purple)' }}
                    />
                    <span style={{ fontSize: '14px', color: '#FFF' }}>Yes</span>
                  </label>
                </div>
              </div>

              {/* Navigation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button onClick={() => setWizardStep(2)} className="btn-secondary">
                  <ArrowLeft size={16} /> Back to Budget
                </button>
                <button
                  onClick={handleFinishWizard}
                  className="btn-primary"
                  style={{ padding: '14px 36px', fontSize: '16px' }}
                >
                  <Sparkles size={18} />
                  <span>Generate My Build</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
