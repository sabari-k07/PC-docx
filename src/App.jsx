import React, { useState, lazy, Suspense } from 'react';
import { BuildProvider, useBuild } from './context/BuildContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { ComponentPickerDrawer } from './components/ComponentPickerDrawer';
import { BudgetOptimizerModal } from './components/BudgetOptimizerModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { AIChatDrawer } from './components/AIChatDrawer';
import './App.css';

// Route-Level Code Splitting (React.lazy)
const LandingView = lazy(() => import('./views/LandingView').then(m => ({ default: m.LandingView })));
const WizardView = lazy(() => import('./views/WizardView').then(m => ({ default: m.WizardView })));
const RecommendedView = lazy(() => import('./views/RecommendedView').then(m => ({ default: m.RecommendedView })));
const BuilderView = lazy(() => import('./views/BuilderView').then(m => ({ default: m.BuilderView })));
const CompatibilityView = lazy(() => import('./views/CompatibilityView').then(m => ({ default: m.CompatibilityView })));
const PerformanceView = lazy(() => import('./views/PerformanceView').then(m => ({ default: m.PerformanceView })));
const CompareView = lazy(() => import('./views/CompareView').then(m => ({ default: m.CompareView })));
const RoadmapView = lazy(() => import('./views/RoadmapView').then(m => ({ default: m.RoadmapView })));
const ExploreView = lazy(() => import('./views/ExploreView').then(m => ({ default: m.ExploreView })));
const SavedBuildsView = lazy(() => import('./views/SavedBuildsView').then(m => ({ default: m.SavedBuildsView })));
const GuidesView = lazy(() => import('./views/GuidesView').then(m => ({ default: m.GuidesView })));
const ReviewView = lazy(() => import('./views/ReviewView').then(m => ({ default: m.ReviewView })));
const TasksView = lazy(() => import('./views/TasksView').then(m => ({ default: m.TasksView })));
const AdminInventoryView = lazy(() => import('./views/AdminInventoryView').then(m => ({ default: m.AdminInventoryView })));

const ViewLoadingFallback = () => (
  <div style={{
    minHeight: '60vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px'
  }}>
    <div className="spinner" style={{
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      border: '3px solid var(--border-subtle)',
      borderTopColor: 'var(--accent-purple)',
      animation: 'spin 0.8s linear infinite'
    }} />
    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Loading PC_DOCx workspace...</span>
    <style>{`
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

import { Sliders, X, Check } from 'lucide-react';

const MainRouter = () => {
  const { currentView, setCurrentView } = useBuild();
  const [tweaksOpen, setTweaksOpen] = useState(false);

  const screens = [
    { id: 'landing', label: 'S1: Landing Page' },
    { id: 'wizard', label: 'S2–S4: 3-Step Wizard' },
    { id: 'recommended', label: 'S5: Recommended Build' },
    { id: 'builder', label: 'S6: Main 3D Builder' },
    { id: 'health', label: 'S8: Compatibility Health' },
    { id: 'performance', label: 'S10–S11: Telemetry & AI' },
    { id: 'compare', label: 'S12: Compare Builds' },
    { id: 'roadmap', label: 'S13: 4-Year Roadmap' },
    { id: 'explore', label: 'S14: Explore Community' },
    { id: 'saved', label: 'S15: Saved Builds & Vault' },
    { id: 'guides', label: 'S16: Knowledge Guides' },
    { id: 'review', label: 'S18: BOM Review & Retailers' },
    { id: 'tasks', label: 'Efficiency Tasks & Roadmap' },
    { id: 'inventory', label: 'DB: Supabase Inventory & Stock' }
  ];

  const renderActiveView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingView />;
      case 'wizard':
        return <WizardView />;
      case 'recommended':
        return <RecommendedView />;
      case 'builder':
        return <BuilderView />;
      case 'health':
        return <CompatibilityView />;
      case 'performance':
        return <PerformanceView />;
      case 'compare':
        return <CompareView />;
      case 'roadmap':
        return <RoadmapView />;
      case 'explore':
        return <ExploreView />;
      case 'saved':
        return <SavedBuildsView />;
      case 'guides':
        return <GuidesView />;
      case 'review':
        return <ReviewView />;
      case 'tasks':
        return <TasksView />;
      case 'inventory':
        return <AdminInventoryView />;
      default:
        return <LandingView />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-base)' }}>
      {/* Sticky App Navigation */}
      <Navbar />

      {/* Main Active Page View */}
      <main style={{ flex: 1 }}>
        <Suspense fallback={<ViewLoadingFallback />}>
          {renderActiveView()}
        </Suspense>
      </main>

      {/* Global Modals & Drawers */}
      <ComponentPickerDrawer />
      <BudgetOptimizerModal />
      <GlobalSearchModal />
      <AIChatDrawer />
      <Toast />

      {/* Page Footer */}
      <Footer />

      {/* Tweaks & Screen Switcher Floating Trigger (Per SKILL.md specs) */}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 999
      }}>
        {tweaksOpen ? (
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-default)',
            borderRadius: '16px',
            padding: '16px 20px',
            width: '280px',
            boxShadow: 'var(--shadow-lg), 0 0 24px rgba(124, 92, 255, 0.25)',
            animation: 'fadeIn 180ms ease forwards'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#FFF', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sliders size={14} color="var(--accent-purple)" />
                <span>Screen Navigator</span>
              </div>
              <button onClick={() => setTweaksOpen(false)} className="btn-quiet" style={{ padding: '2px' }}>
                <X size={16} />
              </button>
            </div>

            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '10px' }}>
              Instant jump to any of the 20 specification screens:
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              maxHeight: '260px',
              overflowY: 'auto',
              paddingRight: '4px'
            }}>
              {screens.map(s => (
                <div
                  key={s.id}
                  onClick={() => {
                    setCurrentView(s.id);
                    setTweaksOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: currentView === s.id ? 600 : 400,
                    color: currentView === s.id ? '#FFF' : 'var(--text-secondary)',
                    background: currentView === s.id ? 'var(--bg-elevated)' : 'transparent',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span>{s.label}</span>
                  {currentView === s.id && <Check size={13} color="var(--accent-purple)" />}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <button
            onClick={() => setTweaksOpen(true)}
            className="btn-quiet"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-default)',
              borderRadius: '9999px',
              padding: '8px 16px',
              boxShadow: 'var(--shadow-md)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--text-secondary)',
              fontSize: '12px',
              fontWeight: 600
            }}
          >
            <Sliders size={14} color="var(--accent-purple)" />
            <span>Navigate Screens</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <BuildProvider>
      <MainRouter />
    </BuildProvider>
  );
}
