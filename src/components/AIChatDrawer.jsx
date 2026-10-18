import React, { useEffect, useRef, useState } from 'react';
import { useBuild } from '../context/BuildContext';
import { FORMAT_INR } from '../data/mockData';
import { getSupabase, isSupabaseConfigured } from '../lib/supabase';
import {
  Sparkles, X, Send, RotateCcw, ShieldCheck, Cpu, Copy, Check,
  AlertTriangle, PackageSearch, Wallet, CheckCircle2
} from 'lucide-react';

const nowLabel = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
const makeWelcome = () => ({
  id: 'welcome', sender: 'ai',
  text: 'Hi! I’m PC_DOCx AI Copilot. I can search your component catalog, check key compatibility details, and suggest budget-friendly alternatives. I’ll distinguish catalog data from general advice and won’t change your build without your action.',
  timestamp: nowLabel(),
});

const QUICK_PROMPTS = [
  { label: 'Check my compatibility', query: 'Check compatibility for my current build. Show conflicts and any checks that cannot be verified.' },
  { label: 'Find GPU options', query: 'Search the catalog for GPUs under ₹30000 and compare the available options.' },
  { label: 'Optimize my budget', query: 'Find cheaper compatible alternatives for my current build and estimate possible savings. Use my current target budget.' },
];

export const AIChatDrawer = () => {
  const {
    isChatOpen, setIsChatOpen, build, currentTotal, currentPower,
    compReport, targetBudget,
  } = useBuild();
  const [messages, setMessages] = useState([makeWelcome()]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [serviceError, setServiceError] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isChatOpen) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isChatOpen, isLoading]);

  useEffect(() => {
    if (isChatOpen) inputRef.current?.focus();
  }, [isChatOpen]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape' && isChatOpen) setIsChatOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isChatOpen, setIsChatOpen]);

  if (!isChatOpen) return null;

  const handleCopyText = async (id, text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId(null), 1500);
    } catch {
      setServiceError('Clipboard access is unavailable in this browser.');
    }
  };

  const handleSendMessage = async (textToSend) => {
    const prompt = (textToSend ?? inputPrompt).trim();
    if (!prompt || isLoading) return;
    if (prompt.length > 1800) {
      setServiceError('Please keep each message under 1,800 characters.');
      return;
    }

    const priorMessages = messages.filter((m) => m.id !== 'welcome').slice(-12).map((m) => ({
      role: m.sender === 'ai' ? 'model' : 'user', text: m.text,
    }));
    setMessages((previous) => [...previous, {
      id: `user-${Date.now()}`, sender: 'user', text: prompt, timestamp: nowLabel(),
    }]);
    setInputPrompt('');
    setIsLoading(true);
    setServiceError('');

    try {
      if (!isSupabaseConfigured()) {
        throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file, then deploy the pc-docx-chat Edge Function.');
      }

      const activeBuild = {
        name: build?.name || 'Current build',
        targetBudget: Number(build?.targetBudget || targetBudget || 100000),
        components: Object.fromEntries(Object.entries(build?.components || {}).map(([category, part]) => [category, part ? {
          id: part.id, name: part.name || part.model, brand: part.brand,
          price: Number(part.price || 0), socket: part.socket || part.socket_type,
          type: part.type || part.ram_type, formFactor: part.formFactor || part.form_factor,
          tdp: Number(part.tdp || part.wattage || 0), wattage: Number(part.wattage || 0),
          vram: part.vram, perfScore: part.perfScore || part.perf_score,
        } : null])),
        summary: { totalInr: currentTotal, estimatedPowerW: currentPower, healthScore: compReport?.healthScore ?? null },
      };

      const { data, error } = await getSupabase().functions.invoke('pc-docx-chat', {
        body: { message: prompt, history: priorMessages, build: activeBuild },
      });
      if (error) {
        const detail = data?.error || error.message || 'Could not connect to the chat service.';
        throw new Error(detail);
      }
      if (!data?.answer) throw new Error(data?.error || 'The chat service returned no answer.');
      setMessages((previous) => [...previous, {
        id: `ai-${Date.now()}`, sender: 'ai', text: data.answer, timestamp: nowLabel(), isLive: true,
      }]);
    } catch (error) {
      const message = error?.message || 'The chat request failed.';
      setServiceError(message);
      setMessages((previous) => [...previous, {
        id: `error-${Date.now()}`, sender: 'ai',
        text: `I couldn’t reach the AI service, so I haven’t generated a hardware recommendation.\n\n${message}\n\nCheck the setup steps in the project README, then try again.`,
        timestamp: nowLabel(), isError: true,
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChatHistory = () => {
    setMessages([makeWelcome()]);
    setServiceError('');
  };

  return (
    <div className="drawer-backdrop animate-fade-in" onClick={() => setIsChatOpen(false)} style={{ zIndex: 600 }}>
      <section
        className="drawer-panel"
        role="dialog"
        aria-modal="true"
        aria-label="PC_DOCx AI Copilot"
        onClick={(event) => event.stopPropagation()}
        style={{ width: '100%', maxWidth: '560px', height: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-card)', borderLeft: '1px solid var(--border-default)', boxShadow: '-8px 0 40px rgba(0,0,0,.7)' }}
      >
        <header style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
            <div style={{ width: 34, height: 34, flexShrink: 0, borderRadius: 9, background: 'var(--accent-purple-glow)', color: 'var(--accent-purple)', display: 'grid', placeItems: 'center' }}><Sparkles size={18} /></div>
            <div style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 7 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#FFF', margin: 0 }}>PC_DOCx AI Copilot</h3>
                <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 999, background: 'rgba(53,208,127,.13)', color: 'var(--status-success)' }}>Gemini · Tool-enabled</span>
              </div>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '3px 0 0' }}>Catalog search · Compatibility · Budget alternatives</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0 }}>
            <button onClick={clearChatHistory} className="btn-quiet" title="Reset conversation" aria-label="Reset conversation" style={{ padding: 7, borderRadius: 8 }}><RotateCcw size={16} /></button>
            <button onClick={() => setIsChatOpen(false)} className="btn-quiet" title="Close chat" aria-label="Close chat" style={{ padding: 7, borderRadius: 8 }}><X size={18} /></button>
          </div>
        </header>

        <div style={{ padding: '10px 20px', background: 'rgba(16,18,24,.75)', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, fontSize: 11, color: 'var(--text-secondary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, minWidth: 0 }}><Cpu size={13} color="var(--accent-purple)" /><span style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{build?.components?.cpu?.name || build?.components?.cpu?.model || 'CPU not selected'} · {build?.components?.gpu?.name || build?.components?.gpu?.model || 'GPU not selected'}</span></div>
          <div style={{ display: 'flex', gap: 9, flexShrink: 0 }}><strong style={{ color: '#FFF' }}>{FORMAT_INR(currentTotal)}</strong><span>{currentPower}W</span><span style={{ color: 'var(--status-success)' }}>{compReport?.healthScore ?? '—'}%</span></div>
        </div>

        <div aria-live="polite" style={{ flex: 1, overflowY: 'auto', padding: '22px 20px', display: 'flex', flexDirection: 'column', gap: 15 }}>
          {messages.map((message) => {
            const isUser = message.sender === 'user';
            const copied = copiedId === message.id;
            return <div key={message.id} style={{ display: 'flex', flexDirection: 'column', alignItems: isUser ? 'flex-end' : 'flex-start', maxWidth: '96%', alignSelf: isUser ? 'flex-end' : 'flex-start' }}>
              <div style={{ padding: '13px 16px', borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px', background: isUser ? 'var(--accent-gradient)' : 'var(--bg-surface)', color: isUser ? '#FFF' : 'var(--text-primary)', border: isUser ? 'none' : '1px solid var(--border-default)', fontSize: 13, lineHeight: 1.65, whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', boxShadow: 'var(--shadow-sm)', position: 'relative', paddingRight: isUser ? 16 : 36 }}>
                {message.text}
                {!isUser && !message.isError && <button onClick={() => handleCopyText(message.id, message.text)} className="btn-quiet" title="Copy response" aria-label="Copy response" style={{ position: 'absolute', top: 7, right: 7, padding: 4, opacity: .7 }}>{copied ? <Check size={13} color="var(--status-success)" /> : <Copy size={13} />}</button>}
                {message.isError && <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, color: 'var(--status-warning)', fontSize: 11 }}><AlertTriangle size={13} /> Setup / connection issue</div>}
              </div>
              <span style={{ fontSize: 10, color: 'var(--text-faint)', marginTop: 4, padding: '0 4px' }}>{message.timestamp}</span>
            </div>;
          })}
          {isLoading && <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '12px 15px', borderRadius: 14, background: 'var(--bg-surface)', border: '1px solid var(--border-default)', width: 'fit-content', fontSize: 11, color: 'var(--text-muted)' }}><Sparkles size={14} color="var(--accent-purple)" /> Checking catalog and analyzing your request…</div>}
          <div ref={messagesEndRef} />
        </div>

        {serviceError && <div role="status" style={{ margin: '0 18px 8px', padding: '9px 12px', borderRadius: 8, background: 'rgba(255,170,60,.08)', border: '1px solid rgba(255,170,60,.25)', color: 'var(--text-secondary)', fontSize: 11, display: 'flex', alignItems: 'flex-start', gap: 7 }}><AlertTriangle size={14} style={{ flexShrink: 0 }} /> <span>{serviceError}</span></div>}

        <div style={{ padding: '10px 18px', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-surface)' }}>
          <div style={{ display: 'flex', gap: 7, overflowX: 'auto', whiteSpace: 'nowrap', paddingBottom: 10 }}>
            {QUICK_PROMPTS.map((prompt) => <button key={prompt.label} type="button" onClick={() => handleSendMessage(prompt.query)} disabled={isLoading} className="btn-quiet" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, flexShrink: 0, border: '1px solid var(--border-default)', borderRadius: 999, padding: '7px 10px', fontSize: 11, color: 'var(--text-secondary)', opacity: isLoading ? .5 : 1 }}>{prompt.label === 'Find GPU options' ? <PackageSearch size={12} /> : prompt.label === 'Optimize my budget' ? <Wallet size={12} /> : <CheckCircle2 size={12} />}{prompt.label}</button>)}
          </div>
          <form onSubmit={(event) => { event.preventDefault(); handleSendMessage(); }} style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
            <textarea
              ref={inputRef}
              value={inputPrompt}
              onChange={(event) => setInputPrompt(event.target.value)}
              onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); handleSendMessage(); } }}
              placeholder="Ask about parts, compatibility, or your budget…"
              aria-label="Message PC_DOCx AI Copilot"
              maxLength={1800}
              rows={2}
              className="input-field"
              style={{ flex: 1, minWidth: 0, resize: 'none', padding: '11px 12px', fontSize: 13, lineHeight: 1.4 }}
            />
            <button type="submit" disabled={!inputPrompt.trim() || isLoading} aria-label="Send message" className="btn-primary" style={{ padding: '12px 14px', borderRadius: 10, opacity: (!inputPrompt.trim() || isLoading) ? .45 : 1 }}><Send size={15} /></button>
          </form>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 8, color: 'var(--text-faint)', fontSize: 10 }}><ShieldCheck size={12} /> Gemini API key stays server-side. Product details depend on your Supabase catalog.</div>
        </div>
      </section>
    </div>
  );
};
