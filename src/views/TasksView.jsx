import React, { useState, useEffect, useMemo } from 'react';
import { useBuild } from '../context/BuildContext';
import {
  CheckSquare,
  Square,
  Sparkles,
  Sliders,
  Cpu,
  Layers,
  ArrowRight,
  Plus,
  Trash2,
  RotateCcw,
  CheckCircle2,
  Clock,
  Zap,
  Search,
  Filter,
  AlertTriangle,
  X,
  FileCode,
  ShieldCheck,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

const STORAGE_KEY = 'pc_docx_efficiency_tasks_v2';

const INITIAL_TASKS = [
  // Track 1: Codebase & Runtime Frontend Efficiency
  {
    id: 'task-1',
    track: 'codebase',
    trackName: 'Codebase & Runtime',
    priority: 'P0',
    title: 'Route-Level Code Splitting & Lazy Loading in App.jsx',
    desc: 'Replace static imports with React.lazy() and <Suspense>. Cuts initial bundle by ~40% (334 kB → ~180 kB).',
    targetFile: 'src/App.jsx',
    completed: true
  },
  {
    id: 'task-2',
    track: 'codebase',
    trackName: 'Codebase & Runtime',
    priority: 'P1',
    title: 'Memoize Catalog Filters & Multi-Attribute Sorts',
    desc: 'Cache heavy search, brand filter, and sort passes in ComponentPickerDrawer to avoid rerenders.',
    targetFile: 'src/components/ComponentPickerDrawer.jsx',
    completed: false
  },
  {
    id: 'task-3',
    track: 'codebase',
    trackName: 'Codebase & Runtime',
    priority: 'P1',
    title: 'Pure Component Optimization in PCVisualizer SVG',
    desc: 'Wrap visualizer in React.memo and offload pulsating hotspot animations to GPU-composited CSS transforms.',
    targetFile: 'src/components/PCVisualizer.jsx',
    completed: false
  },
  {
    id: 'task-4',
    track: 'codebase',
    trackName: 'Codebase & Runtime',
    priority: 'P2',
    title: 'Lucide Icon Subpath Tree-Shaking Audit',
    desc: 'Ensure only active SVGs are bundled into the final build artifact without unused metadata.',
    targetFile: 'src/components/Navbar.jsx',
    completed: true
  },
  {
    id: 'task-5',
    track: 'codebase',
    trackName: 'Codebase & Runtime',
    priority: 'P2',
    title: 'Vite Production Chunk Splitting (Rollup manualChunks)',
    desc: 'Isolate vendor-react, vendor-icons, and vendor-confetti into long-term browser cacheable chunks.',
    targetFile: 'vite.config.js',
    completed: false
  },

  // Track 2: Product & Hardware Efficiency (For PC Builders)
  {
    id: 'task-6',
    track: 'hardware',
    trackName: 'Hardware & Builder',
    priority: 'P0',
    title: 'Dynamic Efficiency Quotient (EQ) Badge Engine',
    desc: 'Calculate Gaming FPS / (TDP Watts × Price ₹) to highlight power and budget champions.',
    targetFile: 'src/data/mockData.js',
    completed: false
  },
  {
    id: 'task-7',
    track: 'hardware',
    trackName: 'Hardware & Builder',
    priority: 'P0',
    title: 'PSU 80+ Efficiency Curve Graph',
    desc: 'Display real-time load graph showing 50% utilization as the peak sweet spot for minimal electrical waste.',
    targetFile: 'src/views/CompatibilityView.jsx',
    completed: false
  },
  {
    id: 'task-8',
    track: 'hardware',
    trackName: 'Hardware & Builder',
    priority: 'P1',
    title: 'CPU ↔ GPU Bottleneck Balance Engine',
    desc: 'Detect mismatch ratios (e.g. ₹10K CPU paired with ₹1.15L GPU) and propose balanced fund redistribution.',
    targetFile: 'src/context/BuildContext.jsx',
    completed: false
  },
  {
    id: 'task-9',
    track: 'hardware',
    trackName: 'Hardware & Builder',
    priority: 'P1',
    title: 'Automated "Downsize & Save" Motherboard Recommendations',
    desc: 'Identify over-specified motherboards (e.g. ₹25K X670E on 65W CPU) and offer identical B650 performance.',
    targetFile: 'src/components/BudgetOptimizerModal.jsx',
    completed: true
  },
  {
    id: 'task-10',
    track: 'hardware',
    trackName: 'Hardware & Builder',
    priority: 'P2',
    title: 'Interactive 7-Step Physical Assembly Todo Checklist',
    desc: 'Pre-build bench test, peel cooler film, dual-channel A2/B2 RAM slots, standoff checks, and EXPO activation.',
    targetFile: 'src/views/ReviewView.jsx',
    completed: false
  },

  // Track 3: Data & Offline Architecture
  {
    id: 'task-11',
    track: 'offline',
    trackName: 'Data & Offline',
    priority: 'P2',
    title: 'PWA Offline Caching & Manifest',
    desc: 'Cache locked BOM specs so builders can reference part numbers inside offline computer markets (Nehru Place, SP Road).',
    targetFile: 'vite.config.js',
    completed: false
  },
  {
    id: 'task-12',
    track: 'offline',
    trackName: 'Data & Offline',
    priority: 'P2',
    title: '1-Click Reddit & WhatsApp Spec Formatter',
    desc: 'Export clipboard markdown formatted specifically for r/IndianGaming and hardware builder community groups.',
    targetFile: 'src/views/ReviewView.jsx',
    completed: true
  }
];

export const TasksView = () => {
  const { setCurrentView, showToast } = useBuild();

  // Load from localStorage or fallback
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_TASKS;
  });

  // Filter and search state
  const [trackFilter, setTrackFilter] = useState('all'); // 'all' | 'codebase' | 'hardware' | 'offline'
  const [priorityFilter, setPriorityFilter] = useState('all'); // 'all' | 'P0' | 'P1' | 'P2'
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'pending' | 'completed'
  const [searchQuery, setSearchQuery] = useState('');

  // Add task form state
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newTrack, setNewTrack] = useState('codebase');
  const [newPriority, setNewPriority] = useState('P1');
  const [newTargetFile, setNewTargetFile] = useState('');

  // Confirmation modal state
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);
  const [deletingTaskId, setDeletingTaskId] = useState(null);

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.error(e);
    }
  }, [tasks]);

  // Toggle completion
  const toggleTask = (id) => {
    setTasks(prev => {
      return prev.map(t => {
        if (t.id === id) {
          const nextState = !t.completed;
          if (nextState) {
            confetti({
              particleCount: 30,
              spread: 50,
              origin: { y: 0.8 }
            });
            showToast(`Completed: ${t.title}`);
          }
          return { ...t, completed: nextState };
        }
        return t;
      });
    });
  };

  // Keyboard navigation for task item
  const handleTaskKeyDown = (e, id) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      toggleTask(id);
    }
  };

  // Handle Add Task
  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      showToast('Please provide a task title');
      return;
    }

    const trackNames = {
      codebase: 'Codebase & Runtime',
      hardware: 'Hardware & Builder',
      offline: 'Data & Offline'
    };

    const createdTask = {
      id: `task-custom-${Date.now()}`,
      track: newTrack,
      trackName: trackNames[newTrack],
      priority: newPriority,
      title: newTitle.trim(),
      desc: newDesc.trim() || 'Custom optimization task.',
      targetFile: newTargetFile.trim() || 'd:/Project/PC_DOCx',
      completed: false
    };

    setTasks(prev => [createdTask, ...prev]);
    setNewTitle('');
    setNewDesc('');
    setNewTargetFile('');
    setIsAddFormOpen(false);
    showToast(`Added new task: ${createdTask.title}`);
  };

  // Delete Task
  const confirmDeleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    setDeletingTaskId(null);
    showToast('Task removed from roadmap');
  };

  // Reset to Defaults with safe confirmation
  const handleResetDefaults = () => {
    setTasks(INITIAL_TASKS);
    setConfirmResetOpen(false);
    showToast('Restored all canonical tasks to initial defaults!');
  };

  // Mark all filtered as completed
  const handleMarkAllFilteredComplete = () => {
    const idsToComplete = new Set(filteredTasks.map(t => t.id));
    setTasks(prev => prev.map(t => idsToComplete.has(t.id) ? { ...t, completed: true } : t));
    showToast(`Marked ${idsToComplete.size} tasks complete`);
  };

  // Progress metrics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const overallPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Track breakdown calculations
  const trackStats = useMemo(() => {
    const calc = (trackId) => {
      const trackItems = tasks.filter(t => t.track === trackId);
      const done = trackItems.filter(t => t.completed).length;
      const total = trackItems.length;
      const pct = total > 0 ? Math.round((done / total) * 100) : 0;
      return { done, total, pct };
    };

    return {
      codebase: calc('codebase'),
      hardware: calc('hardware'),
      offline: calc('offline')
    };
  }, [tasks]);

  // Filtered task results
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      // Track match
      if (trackFilter !== 'all' && task.track !== trackFilter) return false;
      // Priority match
      if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false;
      // Status match
      if (statusFilter === 'pending' && task.completed) return false;
      if (statusFilter === 'completed' && !task.completed) return false;
      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = task.title.toLowerCase().includes(q);
        const matchesDesc = task.desc?.toLowerCase().includes(q);
        const matchesFile = task.targetFile?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesFile) return false;
      }
      return true;
    });
  }, [tasks, trackFilter, priorityFilter, statusFilter, searchQuery]);

  return (
    <div className="animate-fade-in" style={{ padding: '36px 0 80px 0' }}>
      <div className="page-container" style={{ maxWidth: '1360px' }}>
        
        {/* HEADER BAR & HERO */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '24px',
          marginBottom: '32px'
        }}>
          <div>
            <div className="badge badge-purple" style={{ marginBottom: '10px' }}>
              <Zap size={13} /> EFFICIENCY ROADMAP & TASK ENGINE
            </div>
            <h1 style={{
              fontSize: 'clamp(30px, 3.8vw, 44px)',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.03em',
              marginBottom: '8px'
            }}>
              Building More Efficiently
            </h1>
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', maxWidth: '72ch', lineHeight: '1.6' }}>
              Dual-track architectural optimization: cutting initial bundle weight and render overhead while guiding Indian builders to peak performance-per-rupee and performance-per-watt.
            </p>
          </div>

          {/* Quick Header Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setIsAddFormOpen(!isAddFormOpen)}
              className="btn-primary"
              aria-label="Add New Task"
              style={{ padding: '12px 22px', fontSize: '14px' }}
            >
              <Plus size={16} />
              <span>{isAddFormOpen ? 'Close Task Form' : 'Add Custom Task'}</span>
            </button>

            <button
              onClick={() => setConfirmResetOpen(true)}
              className="btn-secondary"
              aria-label="Reset All Tasks to Default"
              style={{ padding: '12px 18px', fontSize: '14px' }}
            >
              <RotateCcw size={15} />
              <span>Reset Defaults</span>
            </button>
          </div>
        </div>

        {/* TRACK PROGRESS CARDS GRID (3 Modular Stats) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          marginBottom: '32px'
        }}>
          {/* Card 1: Overall Milestone Progress */}
          <div className="card-surface" style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  GLOBAL ROADMAP PROGRESS
                </span>
                <div style={{ fontSize: '36px', fontWeight: 800, color: overallPercentage === 100 ? 'var(--status-success)' : '#FFFFFF', margin: '6px 0' }} className="tabular-nums">
                  {overallPercentage}%
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  {completedTasks} of {totalTasks} Tasks Completed
                </div>
              </div>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-default)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: overallPercentage === 100 ? 'var(--status-success)' : 'var(--accent-purple)'
              }}>
                <Sparkles size={22} />
              </div>
            </div>

            {/* Visual Bar */}
            <div style={{
              width: '100%',
              height: '8px',
              borderRadius: '4px',
              background: 'var(--bg-elevated)',
              overflow: 'hidden',
              marginTop: '18px'
            }}>
              <div style={{
                width: `${overallPercentage}%`,
                height: '100%',
                background: 'var(--accent-gradient)',
                borderRadius: '4px',
                transition: 'width 280ms cubic-bezier(0.16, 1, 0.3, 1)'
              }} />
            </div>
          </div>

          {/* Card 2: Codebase & Runtime Track */}
          <div className="card-surface" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent-blue)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  TRACK 1: CODEBASE RUNTIME
                </span>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#FFF', margin: '6px 0' }} className="tabular-nums">
                  {trackStats.codebase.done} / {trackStats.codebase.total}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                  Lazy Loading, Memoization & Rollup Chunks
                </div>
              </div>
              <span className="badge badge-neutral" style={{ fontSize: '11px' }}>
                {trackStats.codebase.pct}% Done
              </span>
            </div>

            <div style={{
              width: '100%',
              height: '6px',
              borderRadius: '3px',
              background: 'var(--bg-elevated)',
              overflow: 'hidden',
              marginTop: '18px'
            }}>
              <div style={{
                width: `${trackStats.codebase.pct}%`,
                height: '100%',
                background: 'var(--accent-blue)',
                borderRadius: '3px',
                transition: 'width 280ms ease'
              }} />
            </div>
          </div>

          {/* Card 3: Hardware & Builder Decision Track */}
          <div className="card-surface" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--status-success)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  TRACK 2: HARDWARE EFFICIENCY
                </span>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#FFF', margin: '6px 0' }} className="tabular-nums">
                  {trackStats.hardware.done} / {trackStats.hardware.total}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                  Perf-per-Watt, Bottleneck Detection & Assembly
                </div>
              </div>
              <span className="badge badge-neutral" style={{ fontSize: '11px' }}>
                {trackStats.hardware.pct}% Done
              </span>
            </div>

            <div style={{
              width: '100%',
              height: '6px',
              borderRadius: '3px',
              background: 'var(--bg-elevated)',
              overflow: 'hidden',
              marginTop: '18px'
            }}>
              <div style={{
                width: `${trackStats.hardware.pct}%`,
                height: '100%',
                background: 'var(--status-success)',
                borderRadius: '3px',
                transition: 'width 280ms ease'
              }} />
            </div>
          </div>
        </div>

        {/* EXPANDABLE ADD TASK FORM */}
        {isAddFormOpen && (
          <form
            onSubmit={handleCreateTask}
            className="card-surface animate-fade-in"
            style={{
              padding: '28px',
              marginBottom: '32px',
              border: '1px solid var(--accent-purple)',
              boxShadow: 'var(--shadow-purple)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Plus size={18} color="var(--accent-purple)" />
                <span>Create New Custom Efficiency Task</span>
              </div>
              <button
                type="button"
                onClick={() => setIsAddFormOpen(false)}
                className="btn-quiet"
                aria-label="Close task form"
              >
                <X size={18} />
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '16px',
              marginBottom: '16px'
            }}>
              {/* Task Title */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Task Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Implement Web Worker for physics simulation..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="input-field"
                  required
                />
              </div>

              {/* Target File / Component */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Target File or Module
                </label>
                <input
                  type="text"
                  placeholder="e.g. src/views/BuilderView.jsx"
                  value={newTargetFile}
                  onChange={(e) => setNewTargetFile(e.target.value)}
                  className="input-field"
                />
              </div>

              {/* Category / Track */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Architectural Track
                </label>
                <select
                  value={newTrack}
                  onChange={(e) => setNewTrack(e.target.value)}
                  className="input-field"
                  style={{ cursor: 'pointer' }}
                >
                  <option value="codebase">Codebase & Runtime</option>
                  <option value="hardware">Hardware & Builder</option>
                  <option value="offline">Data & Offline</option>
                </select>
              </div>

              {/* Priority */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Priority Level
                </label>
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value)}
                  className="input-field"
                  style={{ cursor: 'pointer' }}
                >
                  <option value="P0">P0 (Critical / High Impact)</option>
                  <option value="P1">P1 (Medium Priority)</option>
                  <option value="P2">P2 (Low / Future Enhancement)</option>
                </select>
              </div>
            </div>

            {/* Task Description */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Description & Impact Rationale
              </label>
              <textarea
                placeholder="Explain the expected performance or user value gain..."
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="input-field"
                rows={2}
                style={{ resize: 'vertical' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button
                type="button"
                onClick={() => setIsAddFormOpen(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
                style={{ padding: '10px 24px' }}
              >
                <Plus size={16} /> Save Task to Roadmap
              </button>
            </div>
          </form>
        )}

        {/* SEARCH, FILTERS & ACTION BAR */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-default)',
          borderRadius: '18px',
          padding: '18px 24px',
          marginBottom: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {/* Top Row: Search Input + Status Pills */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            {/* Search input */}
            <div style={{ position: 'relative', flex: '1 1 320px', minWidth: '240px' }}>
              <Search
                size={16}
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                  pointerEvents: 'none'
                }}
              />
              <input
                type="text"
                placeholder="Search tasks by title, description, or target file..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field"
                style={{ paddingLeft: '40px' }}
                aria-label="Search efficiency tasks"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="btn-quiet"
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    padding: '2px'
                  }}
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Status Segment Control */}
            <div style={{
              display: 'flex',
              background: 'var(--bg-surface)',
              borderRadius: '10px',
              padding: '3px',
              border: '1px solid var(--border-default)'
            }}>
              {[
                { id: 'all', label: 'All Status' },
                { id: 'pending', label: `Pending (${totalTasks - completedTasks})` },
                { id: 'completed', label: `Done (${completedTasks})` }
              ].map(s => (
                <button
                  key={s.id}
                  onClick={() => setStatusFilter(s.id)}
                  style={{
                    background: statusFilter === s.id ? 'var(--bg-elevated)' : 'transparent',
                    color: statusFilter === s.id ? '#FFFFFF' : 'var(--text-muted)',
                    border: 'none',
                    padding: '6px 14px',
                    borderRadius: '7px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 150ms ease'
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Row: Track & Priority Pills */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '14px'
          }}>
            {/* Track Filter Chips */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', paddingBottom: '2px' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-faint)', fontWeight: 600 }}>Track:</span>
              {[
                { id: 'all', label: `All (${tasks.length})` },
                { id: 'codebase', label: 'Codebase & Runtime' },
                { id: 'hardware', label: 'Hardware & Builder' },
                { id: 'offline', label: 'Data & Offline' }
              ].map(track => (
                <button
                  key={track.id}
                  onClick={() => setTrackFilter(track.id)}
                  className={`nav-pill ${trackFilter === track.id ? 'active' : ''}`}
                  style={{
                    fontSize: '12px',
                    padding: '5px 12px',
                    border: trackFilter === track.id ? '1px solid var(--accent-purple)' : '1px solid var(--border-default)'
                  }}
                >
                  {track.label}
                </button>
              ))}
            </div>

            {/* Priority & Quick Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-faint)', fontWeight: 600 }}>Priority:</span>
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-default)',
                    color: '#FFF',
                    fontSize: '12px',
                    padding: '5px 10px',
                    borderRadius: '8px',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                  aria-label="Filter by priority"
                >
                  <option value="all">All Priorities</option>
                  <option value="P0">P0 (Critical)</option>
                  <option value="P1">P1 (Medium)</option>
                  <option value="P2">P2 (Low)</option>
                </select>
              </div>

              {filteredTasks.length > 0 && (
                <button
                  onClick={handleMarkAllFilteredComplete}
                  className="btn-quiet"
                  style={{ fontSize: '12px', color: 'var(--status-success)' }}
                >
                  <Check size={14} /> Mark Filtered Done
                </button>
              )}
            </div>
          </div>
        </div>

        {/* TASK LIST (Full Width Cards with Interactive Keyboard & Click Focus) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {filteredTasks.length === 0 ? (
            <div
              className="card-surface"
              style={{
                textAlign: 'center',
                padding: '64px 24px',
                color: 'var(--text-muted)'
              }}
            >
              <AlertTriangle size={32} color="var(--accent-purple)" style={{ margin: '0 auto 12px auto' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#FFF', marginBottom: '6px' }}>
                No tasks match your filters
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '40ch', margin: '0 auto 18px auto' }}>
                Try adjusting your search query, status, or track filter to view more items.
              </p>
              <button
                onClick={() => {
                  setTrackFilter('all');
                  setPriorityFilter('all');
                  setStatusFilter('all');
                  setSearchQuery('');
                }}
                className="btn-secondary"
                style={{ padding: '8px 18px', fontSize: '13px' }}
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            filteredTasks.map((task) => {
              const isP0 = task.priority === 'P0';
              const isP1 = task.priority === 'P1';

              return (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  onKeyDown={(e) => handleTaskKeyDown(e, task.id)}
                  tabIndex={0}
                  role="checkbox"
                  aria-checked={task.completed}
                  aria-label={`${task.title} - ${task.completed ? 'Completed' : 'Pending'}`}
                  className="card-surface task-item-card"
                  style={{
                    padding: '22px 28px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '20px',
                    background: task.completed ? 'rgba(16, 18, 24, 0.5)' : 'var(--bg-card)',
                    border: task.completed
                      ? '1px solid var(--border-subtle)'
                      : isP0
                      ? '1px solid rgba(124, 92, 255, 0.4)'
                      : '1px solid var(--border-default)',
                    opacity: task.completed ? 0.72 : 1,
                    transition: 'all 160ms cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  {/* Interactive Checkbox Indicator */}
                  <div
                    style={{
                      marginTop: '3px',
                      color: task.completed ? 'var(--status-success)' : 'var(--text-muted)',
                      flexShrink: 0
                    }}
                  >
                    {task.completed ? (
                      <CheckSquare size={24} color="var(--status-success)" />
                    ) : (
                      <Square size={24} />
                    )}
                  </div>

                  {/* Task Content Body */}
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      flexWrap: 'wrap',
                      marginBottom: '8px'
                    }}>
                      <span className={`badge ${isP0 ? 'badge-purple' : isP1 ? 'badge-warning' : 'badge-neutral'}`} style={{ fontSize: '11px' }}>
                        {task.priority} Priority
                      </span>

                      <span className="badge badge-neutral" style={{ fontSize: '11px' }}>
                        {task.trackName}
                      </span>

                      {task.targetFile && (
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          fontSize: '12px',
                          color: 'var(--text-muted)',
                          background: 'var(--bg-surface)',
                          padding: '2px 8px',
                          borderRadius: '6px',
                          border: '1px solid var(--border-subtle)'
                        }}>
                          <FileCode size={12} color="var(--accent-blue)" />
                          <code style={{ color: 'var(--accent-blue)', fontFamily: 'var(--font-mono)' }}>
                            {task.targetFile}
                          </code>
                        </div>
                      )}

                      {task.completed && (
                        <span style={{ fontSize: '12px', color: 'var(--status-success)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <CheckCircle2 size={13} /> Verified Complete
                        </span>
                      )}
                    </div>

                    <h3 style={{
                      fontSize: '17px',
                      fontWeight: 700,
                      color: task.completed ? 'var(--text-muted)' : '#FFFFFF',
                      textDecoration: task.completed ? 'line-through' : 'none',
                      lineHeight: '1.4',
                      marginBottom: '6px'
                    }}>
                      {task.title}
                    </h3>

                    <p style={{
                      fontSize: '14px',
                      color: task.completed ? 'var(--text-faint)' : 'var(--text-secondary)',
                      lineHeight: '1.6'
                    }}>
                      {task.desc}
                    </p>
                  </div>

                  {/* Right Action: Delete Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeletingTaskId(task.id);
                    }}
                    className="btn-quiet"
                    style={{
                      padding: '8px',
                      borderRadius: '8px',
                      color: 'var(--text-muted)',
                      flexShrink: 0
                    }}
                    title="Remove Task"
                    aria-label={`Remove task ${task.title}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* CONFIRMATION MODAL: RESET DEFAULTS */}
        {confirmResetOpen && (
          <div className="modal-backdrop" onClick={() => setConfirmResetOpen(false)}>
            <div
              className="card-surface"
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '520px',
                background: 'var(--bg-card)',
                padding: '32px',
                border: '1px solid var(--border-default)',
                boxShadow: 'var(--shadow-lg)'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: 'var(--status-warning)',
                marginBottom: '16px'
              }}>
                <AlertTriangle size={24} />
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#FFF' }}>
                  Reset All Tasks to Default?
                </h3>
              </div>

              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '28px' }}>
                This action will restore the canonical 12 efficiency tasks. Any custom tasks you've added or modified will be reset. Are you sure you want to proceed?
              </p>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button
                  onClick={() => setConfirmResetOpen(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleResetDefaults}
                  className="btn-primary"
                  style={{
                    background: 'var(--status-danger)',
                    boxShadow: '0 4px 16px rgba(255, 92, 103, 0.35)'
                  }}
                >
                  Yes, Reset to Defaults
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CONFIRMATION MODAL: DELETE SPECIFIC TASK */}
        {deletingTaskId && (
          <div className="modal-backdrop" onClick={() => setDeletingTaskId(null)}>
            <div
              className="card-surface"
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '480px',
                background: 'var(--bg-card)',
                padding: '28px',
                border: '1px solid var(--border-default)'
              }}
            >
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#FFF', marginBottom: '10px' }}>
                Remove Task from Roadmap?
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '24px' }}>
                Are you sure you want to remove this item? You can restore it later by resetting plan defaults.
              </p>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button onClick={() => setDeletingTaskId(null)} className="btn-secondary">
                  Cancel
                </button>
                <button
                  onClick={() => confirmDeleteTask(deletingTaskId)}
                  className="btn-primary"
                  style={{ background: 'var(--status-danger)' }}
                >
                  Remove Task
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      <style>{`
        .task-item-card:hover {
          border-color: var(--border-hover) !important;
          background: var(--bg-elevated) !important;
          transform: translateY(-1px);
        }
        .task-item-card:focus-visible {
          outline: 2px solid var(--accent-purple) !important;
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
};
