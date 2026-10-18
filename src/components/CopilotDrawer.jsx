import React, { useState } from 'react';
import { X, Send, Sparkles, AlertTriangle } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { generateLocalHardwareAdvice } from '../services/aiAdvisorService';

const QUICK_PROMPTS = [
  'Check compatibility for my current build.',
  'Search the catalog for GPUs under ₹30000.',
  'Find cheaper alternatives for my current build under ₹80000.',
];

export default function CopilotDrawer({ isOpen, onClose, currentBuild }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'PC_DOCx Copilot active. I can query live Indian catalog stock, verify socket/clearance metadata, or suggest budget optimizations.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const sendMessage = async (promptText) => {
    const text = (promptText ?? input).trim();
    if (!text || loading) return;

    const nextMessages = [...messages, { role: 'user', content: text }];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    if (!isSupabaseConfigured || !supabase) {
      setTimeout(() => {
        const localAdvice = generateLocalHardwareAdvice(text, { components: currentBuild });
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: localAdvice || 'Supabase is not configured in `.env`. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`, then deploy `pc-docx-chat` to enable live Gemini tool-calling.',
          },
        ]);
        setLoading(false);
      }, 400);
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('pc-docx-chat', {
        body: {
          message: text,
          history: nextMessages.slice(-8),
          currentBuild,
        },
      });

      if (error) throw error;

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data?.reply || data?.answer || 'Completed tool check.' },
      ]);
    } catch (err) {
      // Graceful local engine fallback so the user always receives expert hardware advice
      const fallbackAdvice = generateLocalHardwareAdvice(text, { components: currentBuild });
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: fallbackAdvice || `Edge Function Error: ${err.message || 'Check GEMINI_API_KEY secret and function deployment.'}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer" onClick={(e) => e.stopPropagation()}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600 }}>
            <Sparkles size={16} />
            <span>PC_DOCx AI Copilot</span>
            <span className="badge">gemini-2.5-flash</span>
          </div>
          <button className="btn" onClick={onClose} style={{ padding: 6 }}>
            <X size={14} />
          </button>
        </div>

        {/* Quick Prompts */}
        <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Controlled Hardware Tools
          </span>
          {QUICK_PROMPTS.map((q) => (
            <button
              key={q}
              className="btn"
              style={{ justifyContent: 'flex-start', fontSize: 12, padding: '6px 10px', textAlign: 'left' }}
              onClick={() => sendMessage(q)}
            >
              {q}
            </button>
          ))}
        </div>

        {/* Message Thread */}
        <div style={{ flex: 1, padding: 16, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {messages.map((m, idx) => (
            <div
              key={idx}
              style={{
                alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '88%',
                padding: '10px 12px',
                borderRadius: 8,
                fontSize: 13,
                background: m.role === 'user' ? 'var(--text-primary)' : 'var(--bg-elevated)',
                color: m.role === 'user' ? 'var(--bg-root)' : 'var(--text-primary)',
                border: '1px solid var(--border-subtle)',
                whiteSpace: 'pre-wrap',
              }}
            >
              {m.content}
            </div>
          ))}
          {loading && (
            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
              Running catalog & compatibility tools...
            </div>
          )}
        </div>

        {/* Input Box */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          style={{ padding: 14, borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: 8 }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about sockets, PSU load, or INR budget..."
            style={{
              flex: 1,
              background: 'var(--bg-root)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 6,
              padding: '8px 12px',
              color: 'var(--text-primary)',
              fontSize: 13,
            }}
          />
          <button type="submit" className="btn btn-primary" disabled={loading}>
            <Send size={14} />
          </button>
        </form>
      </div>
    </div>
  );
}

export { CopilotDrawer };
