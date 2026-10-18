/**
 * PC_DOCx HealthPanel Component
 * Right-side compatibility & power telemetry panel
 */

import React from 'react';
import { useBuild } from '../context/BuildContext.jsx';
import { auditCompatibility } from '../engines/compatibility.js';
import { formatINR, formatWatts } from '../lib/formatters.js';
import {
  ShieldCheck, AlertTriangle, XCircle, CheckCircle2, Zap,
  Activity, Sparkles, ArrowRight, Check, HelpCircle
} from 'lucide-react';

export const HealthPanel = ({ onOpenCopilot, onAutoFix }) => {
  const { build, currentTotal, currentPower, setIsChatOpen, setCurrentView } = useBuild();

  const report = auditCompatibility(build?.components || {});
  const psuWattage = build?.components?.psu?.wattage || 650;
  const loadPercentage = Math.min(Math.round((report.totalPower / psuWattage) * 100), 100);

  const getScoreColor = (score) => {
    if (score >= 90) return 'var(--status-success)';
    if (score >= 75) return 'var(--accent-purple)';
    if (score >= 60) return 'var(--status-warning)';
    return 'var(--status-danger)';
  };

  return (
    <aside
      className="health-panel"
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-default)',
        borderRadius: 16,
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
        width: '100%',
        maxWidth: 360,
        boxShadow: 'var(--shadow-md)'
      }}
    >
      {/* Header with Health Score */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)' }}>
            System Integrity
          </span>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: '#FFF', margin: '2px 0 0', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Activity size={18} color="var(--accent-purple)" /> Health Telemetry
          </h3>
        </div>
        <div style={{
          width: 52,
          height: 52,
          borderRadius: '50%',
          border: `3px solid ${getScoreColor(report.healthScore)}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(255,255,255,0.02)'
        }}>
          <span style={{ fontSize: 16, fontWeight: 800, color: '#FFF', lineHeight: 1 }}>
            {report.healthScore}
          </span>
          <span style={{ fontSize: 8, color: 'var(--text-muted)', fontWeight: 600 }}>/100</span>
        </div>
      </div>

      {/* Power Draw & 80+ PSU Load */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 12,
        padding: 14,
        display: 'flex',
        flexDirection: 'column',
        gap: 10
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12 }}>
          <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 5 }}>
            <Zap size={13} color="var(--status-warning)" /> Peak System Power
          </span>
          <span style={{ color: '#FFF', fontWeight: 700 }}>
            {formatWatts(report.totalPower)} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>/ {psuWattage}W</span>
          </span>
        </div>

        {/* PSU Utilization Progress Bar */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-muted)', marginBottom: 4 }}>
            <span>0W</span>
            <span style={{ color: loadPercentage <= 65 ? 'var(--status-success)' : 'var(--status-warning)' }}>
              {loadPercentage}% Load (Sweet spot: 50%)
            </span>
            <span>{psuWattage}W</span>
          </div>
          <div style={{ height: 6, width: '100%', background: 'rgba(255,255,255,0.06)', borderRadius: 999, overflow: 'hidden', position: 'relative' }}>
            <div
              style={{
                height: '100%',
                width: `${loadPercentage}%`,
                background: loadPercentage > 85 ? 'var(--status-danger)' : loadPercentage > 65 ? 'var(--status-warning)' : 'var(--accent-gradient)',
                borderRadius: 999,
                transition: 'width 0.4s ease'
              }}
            />
          </div>
        </div>
      </div>

      {/* 6-Layer Compatibility Breakdown */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>
            6-Layer Hardware Checks
          </span>
          <span style={{ fontSize: 11, color: report.isCompatible ? 'var(--status-success)' : 'var(--status-danger)', fontWeight: 600 }}>
            {report.isCompatible ? 'All Passed' : 'Action Required'}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {report.checks.map((check) => {
            const isSuccess = check.type === 'success';
            const isWarning = check.type === 'warning';
            const isError = check.type === 'error';

            return (
              <div
                key={check.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 10,
                  padding: '8px 10px',
                  borderRadius: 8,
                  background: isError ? 'rgba(255, 77, 77, 0.08)' : isWarning ? 'rgba(255, 170, 60, 0.06)' : 'rgba(255, 255, 255, 0.02)',
                  border: isError ? '1px solid rgba(255, 77, 77, 0.25)' : isWarning ? '1px solid rgba(255, 170, 60, 0.2)' : '1px solid var(--border-subtle)'
                }}
              >
                <div style={{ marginTop: 2, flexShrink: 0 }}>
                  {isSuccess && <CheckCircle2 size={14} color="var(--status-success)" />}
                  {isWarning && <AlertTriangle size={14} color="var(--status-warning)" />}
                  {isError && <XCircle size={14} color="var(--status-danger)" />}
                  {!isSuccess && !isWarning && !isError && <HelpCircle size={14} color="var(--text-muted)" />}
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 4 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: '#FFF' }}>
                      {check.title}
                    </span>
                    <span style={{
                      fontSize: 9,
                      fontWeight: 700,
                      padding: '1px 5px',
                      borderRadius: 4,
                      background: isError ? 'rgba(255, 77, 77, 0.2)' : isWarning ? 'rgba(255, 170, 60, 0.15)' : 'rgba(53, 208, 127, 0.12)',
                      color: isError ? 'var(--status-danger)' : isWarning ? 'var(--status-warning)' : 'var(--status-success)'
                    }}>
                      {check.status}
                    </span>
                  </div>
                  <p style={{ fontSize: 10, color: 'var(--text-muted)', margin: '2px 0 0', lineHeight: 1.35 }}>
                    {check.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Footer */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 'auto', paddingTop: 10, borderTop: '1px solid var(--border-subtle)' }}>
        <button
          onClick={() => setIsChatOpen(true)}
          className="btn-primary"
          style={{ width: '100%', padding: '10px 14px', borderRadius: 8, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
        >
          <Sparkles size={14} /> Ask Copilot to Audit Build
        </button>
        <button
          onClick={() => setCurrentView('compatibility')}
          className="btn-secondary"
          style={{ width: '100%', padding: '8px 14px', borderRadius: 8, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
        >
          Detailed PSU & Thermals View <ArrowRight size={12} />
        </button>
      </div>
    </aside>
  );
};

export default HealthPanel;
