import React from 'react';
import { useBuild } from '../context/BuildContext';
import { CheckCircle2 } from 'lucide-react';

export const Toast = () => {
  const { toastMessage } = useBuild();

  if (!toastMessage) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '32px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 2000,
      background: 'var(--bg-elevated)',
      border: '1px solid var(--border-hover)',
      boxShadow: 'var(--shadow-lg), 0 0 20px rgba(124, 92, 255, 0.25)',
      borderRadius: 'var(--radius-button)',
      padding: '12px 24px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      color: '#FFFFFF',
      fontSize: '14px',
      fontWeight: 500,
      animation: 'fadeIn 200ms ease forwards',
      pointerEvents: 'none'
    }}>
      <CheckCircle2 size={18} color="var(--accent-purple)" />
      <span>{toastMessage}</span>
    </div>
  );
};
