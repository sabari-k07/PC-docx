import React, { useEffect, useRef, useState } from 'react';
import { useBuild } from '../context/BuildContext';
import { FORMAT_INR } from '../data/mockData';
import { getHardwareCopilotResponse, generateLocalHardwareAdvice } from '../services/aiAdvisorService';
import {
  Sparkles, X, Send, RotateCcw, ShieldCheck, Cpu, Copy, Check,
  AlertTriangle, PackageSearch, Wallet, CheckCircle2, Key, Sliders, Zap
} from 'lucide-react';

const nowLabel = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const makeWelcome = () => ({
  id: 'welcome',
  sender: 'ai',
  text: 'Hi! I’m PC_DOCx AI Copilot. I analyze your active build for CPU ↔ GPU bottlenecks, 80+ PSU headroom, thermal thresholds, and Indian market pricing (Nehru Place, SP Road, Lamington Road, MDComputers).\n\nAsk me anything about parts, compatibility, or budget optimization!',
  timestamp: nowLabel(),
  source: 'local-engine'
});

const QUICK_PROMPTS = [
  { label: 'Check Bottleneck & Balance', query: 'Is there a CPU ↔ GPU bottleneck in my current build? Check balance and fund allocation.' },
  { label: 'Analyze PSU Headroom', query: 'Analyze my PSU wattage headroom and electrical efficiency curve under full load.' },
  { label: 'Estimate 1440p Gaming FPS', query: 'Estimate my real-world 1440p gaming FPS in Cyberpunk 2077 and Black Myth: Wukong.' },
  { label: 'Nehru Place vs Online Pricing', query: 'How does offline pricing at Nehru Place and SP Road compare to online retailers for these components?' }
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
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [geminiApiKey, setGeminiApiKey] = useState(() => {
    return (typeof window !== 'undefined' && localStorage.getItem('pc_docx_gemini_api_key')) || '';
  });
  const [engineType, setEngineType] = useState(() => {
    return (typeof window !== 'undefined' && localStorage.getItem('pc_docx_gemini_api_key')) ? 'gemini-live' : 'local-engine';
  });

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
      if (event.key === 'Escape' && isChatOpen) {
        if (showKeyModal) setShowKeyModal(false);
        else setIsChatOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isChatOpen, setIsChatOpen, showKeyModal]);

  if (!isChatOpen) return null;

  const handleSaveApiKey = (e) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      if (geminiApiKey.trim()) {
        localStorage.setItem('pc_docx_gemini_api_key', geminiApiKey.trim());
        setEngineType('gemini-live');
      } else {
        localStorage.removeItem('pc_docx_gemini_api_key');
        setEngineType('local-engine');
      }
    }
    setShowKeyModal(false);
  };

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
    if (prompt.length > 2000) {
      setServiceError('Please keep each message under 2,000 characters.');
      return;
    }

    const priorMessages = messages.filter((m) => m.id !== 'welcome').slice(-12).map((m) => ({
      role: m.sender === 'ai' ? 'model' : 'user',
      text: m.text,
    }));

    setMessages((previous) => [
      ...previous,
      {
        id: `user-${Date.now()}`,
        sender: 'user',
        text: prompt,
        timestamp: nowLabel(),
      }
    ]);
    setInputPrompt('');
    setIsLoading(true);
    setServiceError('');

    try {
      const activeBuild = {
        name: build?.name || 'Current build',
        targetBudget: Number(build?.targetBudget || targetBudget || 100000),
        components: build?.components || {},
        summary: {
          totalInr: currentTotal,
          estimatedPowerW: currentPower,
          healthScore: compReport?.healthScore ?? 95,
        },
      };

      const res = await getHardwareCopilotResponse({
        prompt,
        priorMessages,
        activeBuild,
      });

      if (res.source) setEngineType(res.source);

      setMessages((previous) => [
        ...previous,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: res.answer,
          timestamp: nowLabel(),
          source: res.source,
          isLive: true,
        }
      ]);
    } catch (error) {
      console.error('[PC_DOCx Chat] Execution error:', error);
      // Graceful fallback to local engine ensures user NEVER gets a dead-end error
      const activeBuild = {
        name: build?.name || 'Current build',
        targetBudget: Number(build?.targetBudget || targetBudget || 100000),
        components: build?.components || {},
        summary: { totalInr: currentTotal, estimatedPowerW: currentPower, healthScore: compReport?.healthScore ?? 95 },
      };
      const fallbackText = generateLocalHardwareAdvice(prompt, activeBuild);
      
      setMessages((previous) => [
        ...previous,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: fallbackText,
          timestamp: nowLabel(),
          source: 'local-engine',
          isLive: true,
        }
      ]);
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
        style={{
          width: '100%',
          maxWidth: '580px',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--bg-card)',
          borderLeft: '1px solid var(--border-default)',
          boxShadow: '-8px 0 40px rgba(0,0,0,.7)'
        }}
      >
        {/* Header */}
        <header style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
            <div style={{ width: 36, height: 36, flexShrink: 0, borderRadius: 10, background: 'var(--accent-purple-glow)', color: 'var(--accent-purple)', display: 'grid', placeItems: 'center' }}>
              <Sparkles size={18} />
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 7 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#FFF', margin: 0 }}>PC_DOCx AI Copilot</h3>
                <span style={{
                  fontSize: 10,
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: 999,
                  background: engineType === 'gemini-live' ? 'rgba(124, 92, 255, 0.15)' : 'rgba(53,208,127,.13)',
                  color: engineType === 'gemini-live' ? 'var(--accent-purple)' : 'var(--status-success)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4
                }}>
                  {engineType === 'gemini-live' ? <Sparkles size={10} /> : <Zap size={10} />}
                  {engineType === 'gemini-live' ? 'Gemini 2.5 Flash' : 'Hardware Engine (Active)'}
                </span>
              </div>
              <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: '2px 0 0' }}>
                1440p Gaming · Bottleneck Check · Indian Market Telemetry
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
            <button
              onClick={() => setShowKeyModal(!showKeyModal)}
              className="btn-quiet"
              title="AI Settings & Gemini Key"
              aria-label="AI Settings"
              style={{ padding: 7, borderRadius: 8, color: geminiApiKey ? 'var(--accent-purple)' : 'var(--text-secondary)' }}
            >
              <Key size={16} />
            </button>
            <button
              onClick={clearChatHistory}
              className="btn-quiet"
              title="Reset conversation"
              aria-label="Reset conversation"
              style={{ padding: 7, borderRadius: 8 }}
            >
              <RotateCcw size={16} />
            </button>
            <button
              onClick={() => setIsChatOpen(false)}
              className="btn-quiet"
              title="Close chat"
              aria-label="Close chat"
              style={{ padding: 7, borderRadius: 8 }}
            >
              <X size={18} />
            </button>
          </div>
        </header>

        {/* API Key Modal / Dropdown */}
        {showKeyModal && (
          <form onSubmit={handleSaveApiKey} style={{ padding: '14px 18px', background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border-default)', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#FFF' }}>Google Gemini API Key (Optional)</span>
              <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>Free at aistudio.google.com</span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                type="password"
                value={geminiApiKey}
                onChange={(e) => setGeminiApiKey(e.target.value)}
                placeholder="AIzaSy... (leave blank for built-in local engine)"
                className="input-field"
                style={{ flex: 1, fontSize: 12, padding: '7px 10px' }}
              />
              <button type="submit" className="btn-primary" style={{ padding: '7px 12px', fontSize: 11, borderRadius: 6 }}>
                Save
              </button>
            </div>
            <span style={{ fontSize: 10, color: 'var(--text-faint)' }}>
              If no key is entered, PC_DOCx operates using the built-in Intelligent Hardware Inference Engine with zero network requirements.
            </span>
          </form>
        )}

        {/* Current Build Context Strip */}
        <div style={{
          padding: '8px 18px',
          background: 'rgba(16,18,24,.85)',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          fontSize: 11,
          color: 'var(--text-secondary)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
            <Cpu size={13} color="var(--accent-purple)" />
            <span style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
              {build?.components?.cpu?.name || 'CPU unselected'} · {build?.components?.gpu?.name || 'GPU unselected'}
            </span>
          </div>
          <div style={{ display: 'flex', gap: 9, flexShrink: 0 }}>
            <strong style={{ color: '#FFF' }}>{FORMAT_INR(currentTotal)}</strong>
            <span>{currentPower}W</span>
            <span style={{ color: 'var(--status-success)' }}>{compReport?.healthScore ?? 95}%</span>
          </div>
        </div>

        {/* Messages Container */}
        <div aria-live="polite" style={{ flex: 1, overflowY: 'auto', padding: '18px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {messages.map((message) => {
            const isUser = message.sender === 'user';
            const copied = copiedId === message.id;
            return (
              <div
                key={message.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: isUser ? 'flex-end' : 'flex-start',
                  maxWidth: '96%',
                  alignSelf: isUser ? 'flex-end' : 'flex-start'
                }}
              >
                <div style={{
                  padding: '12px 16px',
                  borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: isUser ? 'var(--accent-gradient)' : 'var(--bg-surface)',
                  color: isUser ? '#FFF' : 'var(--text-primary)',
                  border: isUser ? 'none' : '1px solid var(--border-default)',
                  fontSize: 13,
                  lineHeight: 1.6,
                  whiteSpace: 'pre-wrap',
                  overflowWrap: 'anywhere',
                  boxShadow: 'var(--shadow-sm)',
                  position: 'relative',
                  paddingRight: isUser ? 16 : 36
                }}>
                  {message.text}
                  {!isUser && !message.isError && (
                    <button
                      onClick={() => handleCopyText(message.id, message.text)}
                      className="btn-quiet"
                      title="Copy response"
                      aria-label="Copy response"
                      style={{ position: 'absolute', top: 7, right: 7, padding: 4, opacity: .7 }}
                    >
                      {copied ? <Check size={13} color="var(--status-success)" /> : <Copy size={13} />}
                    </button>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4, padding: '0 4px' }}>
                  <span style={{ fontSize: 10, color: 'var(--text-faint)' }}>{message.timestamp}</span>
                  {!isUser && message.source && (
                    <span style={{ fontSize: 9, color: 'var(--text-muted)' }}>
                      · {message.source === 'gemini-live' ? '✨ Gemini' : '⚡ Hardware Engine'}
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 9,
              padding: '10px 14px',
              borderRadius: 12,
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-default)',
              width: 'fit-content',
              fontSize: 11,
              color: 'var(--text-muted)'
            }}>
              <Sparkles size={14} color="var(--accent-purple)" className="animate-spin" />
              Analyzing active build telemetry and hardware metrics…
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {serviceError && (
          <div role="status" style={{ margin: '0 18px 8px', padding: '8px 12px', borderRadius: 8, background: 'rgba(255,170,60,.08)', border: '1px solid rgba(255,170,60,.25)', color: 'var(--text-secondary)', fontSize: 11, display: 'flex', alignItems: 'flex-start', gap: 7 }}>
            <AlertTriangle size={14} style={{ flexShrink: 0 }} /> <span>{serviceError}</span>
          </div>
        )}

        {/* Input Bar & Suggested Chips */}
        <div style={{ padding: '10px 16px 14px', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-surface)' }}>
          <div style={{ display: 'flex', gap: 6, overflowX: 'auto', whiteSpace: 'nowrap', paddingBottom: 10 }}>
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt.label}
                type="button"
                onClick={() => handleSendMessage(prompt.query)}
                disabled={isLoading}
                className="btn-quiet"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  flexShrink: 0,
                  border: '1px solid var(--border-default)',
                  borderRadius: 999,
                  padding: '6px 10px',
                  fontSize: 11,
                  color: 'var(--text-secondary)',
                  opacity: isLoading ? .5 : 1
                }}
              >
                <Zap size={11} color="var(--accent-purple)" />
                {prompt.label}
              </button>
            ))}
          </div>

          <form onSubmit={(event) => { event.preventDefault(); handleSendMessage(); }} style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
            <textarea
              ref={inputRef}
              value={inputPrompt}
              onChange={(event) => setInputPrompt(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Ask about CPU/GPU bottleneck, 80+ PSU load, or Nehru Place pricing…"
              aria-label="Message PC_DOCx AI Copilot"
              maxLength={2000}
              rows={2}
              className="input-field"
              style={{ flex: 1, minWidth: 0, resize: 'none', padding: '10px 12px', fontSize: 13, lineHeight: 1.4 }}
            />
            <button
              type="submit"
              disabled={!inputPrompt.trim() || isLoading}
              aria-label="Send message"
              className="btn-primary"
              style={{ padding: '11px 13px', borderRadius: 10, opacity: (!inputPrompt.trim() || isLoading) ? .45 : 1 }}
            >
              <Send size={15} />
            </button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8, color: 'var(--text-faint)', fontSize: 10 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <ShieldCheck size={11} /> 100% Offline-safe · Live Indian Market Hardware Rules
            </span>
            <span>Shift + Enter for new line</span>
          </div>
        </div>
      </section>
    </div>
  );
};
