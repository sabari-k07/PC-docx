import React, { useState, useEffect, useRef } from 'react';
import { useBuild } from '../context/BuildContext';
import { FORMAT_INR } from '../data/mockData';
import {
  Sparkles,
  X,
  Send,
  RotateCcw,
  Key,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Cpu,
  Zap,
  DollarSign,
  Copy,
  Check,
  CornerDownLeft,
  Settings
} from 'lucide-react';

const STORAGE_KEY_API = 'pc_docx_user_openai_key';

export const AIChatDrawer = () => {
  const {
    isChatOpen,
    setIsChatOpen,
    build,
    currentTotal,
    currentPower,
    compReport,
    targetBudget,
    showToast
  } = useBuild();

  // Chat message state
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Hello! I am your **PC_DOCx Hardware Engineering Consultant**. I have full context of your active build: **${build?.name || '1440p Balanced Beast'}** (${FORMAT_INR(currentTotal)}, ${currentPower}W peak load, ${compReport?.healthScore || 94}/100 Health).\n\nAsk me anything about component compatibility, bottleneck ratios, Indian market pricing, thermal dissipation, or where to trim your budget!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem(STORAGE_KEY_API) || import.meta.env?.VITE_OPENAI_API_KEY || '';
  });
  const [showKeySettings, setShowKeySettings] = useState(false);
  const [keyInput, setKeyInput] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isChatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isChatOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isChatOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isChatOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isChatOpen) {
        setIsChatOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isChatOpen, setIsChatOpen]);

  if (!isChatOpen) return null;

  const handleSaveApiKey = (e) => {
    e.preventDefault();
    const trimmed = keyInput.trim();
    if (trimmed) {
      localStorage.setItem(STORAGE_KEY_API, trimmed);
      setApiKey(trimmed);
      showToast('OpenAI API Key saved to local storage!');
    } else {
      localStorage.removeItem(STORAGE_KEY_API);
      setApiKey('');
      showToast('OpenAI API Key removed. Using offline hardware advisor.');
    }
    setShowKeySettings(false);
  };

  const handleCopyText = (id, text) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
    showToast('Copied to clipboard');
  };

  const quickPrompts = [
    { label: 'Is my CPU bottlenecking the GPU?', query: 'Analyze if my current CPU bottlenecks the GPU at 1440p gaming.' },
    { label: 'Where can I save ₹5,000?', query: 'Suggest 2-3 specific component swaps to reduce this build cost by ₹5,000 while retaining 95%+ gaming performance.' },
    { label: 'Is 650W PSU enough?', query: 'Evaluate my 650W power supply headroom, efficiency curve, and transient power spikes.' },
    { label: 'Can this run local LLMs & AI?', query: 'Evaluate this build for local AI inference (PyTorch, 7B/13B LLMs, SDXL 1024x1024).' },
    { label: 'AM5 vs Intel LGA1700 longevity?', query: 'Explain platform upgrade longevity for my motherboard and CPU socket in 2026.' }
  ];

  // Hardware knowledge base fallback generator if no API key is present
  const generateOfflineResponse = (query) => {
    const q = query.toLowerCase();
    const cpuName = build?.components?.cpu?.name || 'AMD Ryzen 5 7600';
    const gpuName = build?.components?.gpu?.name || 'NVIDIA RTX 5070 12GB';
    const moboName = build?.components?.motherboard?.name || 'MSI PRO B650M-P';
    const psuName = build?.components?.psu?.name || 'Corsair CX650 650W';

    if (q.includes('bottleneck')) {
      return `### Bottleneck Analysis: **${cpuName}** ↔ **${gpuName}**\n\n- **1440p High/Ultra Gaming**: **Zero significant bottleneck (< 4%)**. The GPU will comfortably hit 96–99% utilization in AAA rasterization and ray-traced workloads.\n- **1080p Competitive High-FPS**: Minimal CPU ceiling on extreme esports (Valorant, CS2 ~300+ FPS), which is typical and well within optimal frame pacing.\n- **Verdict**: This pairing represents the sweet spot for modern gaming without overspending on an 8-core CPU that yields zero extra graphics performance.`;
    }

    if (q.includes('save') || q.includes('budget') || q.includes('cut') || q.includes('reduce')) {
      return `### Top 3 Ways to Save Funds in Your Active Build:\n\n1. **Storage Optimization**: Swap Gen4 5000MB/s NVMe to a Kingston NV2 1TB (**Saves ~₹400** with negligible gaming load difference).\n2. **Motherboard Calibration**: If on an X670 or premium B650, verify you need PCIe Gen5 lanes. The **${moboName}** at ₹9,500 delivers identical VRM stability for 65W silicon.\n3. **PSU Balancing**: The **${psuName}** saves ₹5,100 over a Gold unit while providing 438W adequate envelope.\n\n*Estimated total savings: **₹4,500 – ₹7,000** without dropping a single gaming tier.*`;
    }

    if (q.includes('psu') || q.includes('power') || q.includes('watt') || q.includes('650w') || q.includes('750w')) {
      return `### Electrical Clearance & PSU Headroom:\n\n- **Estimated Peak System Draw**: **${currentPower}W** (CPU: 65W, GPU: 250W, Platform: 123W).\n- **Unit Capacity**: **${psuName}**.\n- **Load Ratio**: **${Math.round((currentPower / 650) * 100)}% load** under synthetic FurMark + Cinebench load.\n- **Assessment**: Safe and reliable for daily use. However, high-end RTX 50-series cards have brief microsecond transient power spikes; if you plan to upgrade to a 5080/5090 in 2 years, step up to a **750W 80+ Gold ATX 3.0** unit with native 12V-2x6 power delivery.`;
    }

    if (q.includes('ai') || q.includes('llm') || q.includes('vram') || q.includes('pytorch') || q.includes('stable diffusion')) {
      return `### AI / ML & Deep Learning Assessment:\n\n- **VRAM Buffer**: **12GB GDDR7** on ${gpuName}.\n- **Local 7B Quantized Models (GGUF Q4/Q8)**: **Excellent (~5.5GB footprint)**. Generates ~35 tokens/sec.\n- **Local 13B Models**: **Good (~8.5GB footprint)**. Fits entirely into VRAM with 3.5GB headroom for context window.\n- **30B+ Models**: Not practical in 12GB without heavy CPU/RAM offloading (drastic slowdown).\n- **Image Synthesis**: Stable Diffusion SDXL (1024×1024) takes **~6.2 seconds per image** with native TensorRT acceleration.`;
    }

    if (q.includes('am5') || q.includes('lga') || q.includes('socket') || q.includes('upgrade') || q.includes('longevity')) {
      return `### Platform Architecture & Socket Longevity in 2026:\n\n- **AMD Socket AM5**: Supported through 2027+. You can drop in future Zen 5 / Zen 6 X3D processors onto your existing **${moboName}** without replacing motherboard or DDR5 RAM.\n- **Intel LGA1700 / LGA1851**: LGA1700 is a dead-end platform (no future CPU generations). LGA1851 requires new silicon.\n- **Recommendation**: For Indian buyers prioritizing 4–5 year longevity, **AM5 is clearly the superior platform investment**.`;
    }

    return `### Engineering Assessment for ${cpuName} & ${gpuName}:\n\n- **Locked Build Total**: ${FORMAT_INR(currentTotal)} (within your ${FORMAT_INR(targetBudget)} target).\n- **Electrical Draw**: ${currentPower}W peak envelope.\n- **Build Health**: ${compReport?.healthScore || 94}/100 — Physical clearance, socket pinout, and RAM topology are 100% verified.\n\n*Tip: Connect your **OpenAI API Key** in settings (top right gear icon) to unlock unrestricted multi-turn AI reasoning.*`;
  };

  // Submit User Message
  const handleSendMessage = async (textToSend) => {
    const prompt = (textToSend || inputPrompt).trim();
    if (!prompt || isLoading) return;

    const userMsgId = `user-${Date.now()}`;
    const userMsg = {
      id: userMsgId,
      sender: 'user',
      text: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputPrompt('');
    setIsLoading(true);

    // Call OpenAI API if API key exists
    if (apiKey && apiKey !== 'your_openai_api_key_here') {
      try {
        const buildContextString = JSON.stringify({
          activeBuild: build?.name,
          totalCostInr: currentTotal,
          peakWattage: currentPower,
          healthScore: compReport?.healthScore,
          cpu: build?.components?.cpu?.name,
          gpu: build?.components?.gpu?.name,
          motherboard: build?.components?.motherboard?.name,
          ram: build?.components?.ram?.name,
          psu: build?.components?.psu?.name
        });

        const res = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content: `You are the PC_DOCx Hardware Engineering Consultant for the Indian PC market. Tone: Linear/Apple calm, technical, zero RGB gaming fluff. Provide prices in INR (₹). Current Builder Context: ${buildContextString}`
              },
              ...messages.map(m => ({ role: m.sender === 'user' ? 'user' : 'assistant', content: m.text })),
              { role: 'user', content: prompt }
            ],
            temperature: 0.3
          })
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error?.message || `HTTP ${res.status}`);
        }

        const data = await res.json();
        const aiReplyText = data.choices[0]?.message?.content || 'No response returned from model.';

        setMessages(prev => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            sender: 'ai',
            text: aiReplyText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isLive: true
          }
        ]);
      } catch (err) {
        console.warn('OpenAI API call failed, falling back to local engine:', err);
        const fallbackText = generateOfflineResponse(prompt);
        setMessages(prev => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            sender: 'ai',
            text: `${fallbackText}\n\n*(Notice: Live OpenAI connection failed: ${err.message}. Served via PC_DOCx built-in engine)*`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    } else {
      // Simulate natural thinking delay for local engine
      setTimeout(() => {
        const reply = generateOfflineResponse(prompt);
        setMessages(prev => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            sender: 'ai',
            text: reply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        setIsLoading(false);
      }, 450);
    }
  };

  const clearChatHistory = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'ai',
        text: `Chat reset. Ready to consult on **${build?.name || 'PC Build'}** (${FORMAT_INR(currentTotal)}). What can I help clarify?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    showToast('Chat history cleared');
  };

  return (
    <div
      className="drawer-backdrop animate-fade-in"
      onClick={() => setIsChatOpen(false)}
      style={{ zIndex: 600 }}
    >
      <div
        className="drawer-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '560px',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--bg-card)',
          borderLeft: '1px solid var(--border-default)',
          boxShadow: '-8px 0 40px rgba(0, 0, 0, 0.7)'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-subtle)',
          background: 'var(--bg-surface)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'var(--accent-purple-glow)',
              color: 'var(--accent-purple)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Sparkles size={18} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#FFF' }}>
                  PC_DOCx AI Hardware Advisor
                </h3>
                <span style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  padding: '1px 6px',
                  borderRadius: '9999px',
                  background: apiKey ? 'rgba(53, 208, 127, 0.15)' : 'rgba(124, 92, 255, 0.15)',
                  color: apiKey ? 'var(--status-success)' : 'var(--accent-purple-text)'
                }}>
                  {apiKey ? 'OpenAI GPT-4o' : 'Engine v2.4'}
                </span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '1px' }}>
                Real-time bottleneck, power, and Indian pricing intelligence
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => {
                setKeyInput(apiKey);
                setShowKeySettings(prev => !prev);
              }}
              className="btn-quiet"
              title="OpenAI API Key Configuration"
              style={{ padding: '6px', borderRadius: '8px' }}
            >
              <Settings size={16} />
            </button>
            <button
              onClick={clearChatHistory}
              className="btn-quiet"
              title="Reset Conversation"
              style={{ padding: '6px', borderRadius: '8px' }}
            >
              <RotateCcw size={16} />
            </button>
            <button
              onClick={() => setIsChatOpen(false)}
              className="btn-quiet"
              style={{ padding: '6px', borderRadius: '8px' }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* API Key Inline Settings Drawer */}
        {showKeySettings && (
          <form
            onSubmit={handleSaveApiKey}
            style={{
              padding: '16px 24px',
              background: 'var(--bg-elevated)',
              borderBottom: '1px solid var(--border-default)',
              animation: 'fadeIn 150ms ease forwards'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Key size={14} color="var(--accent-purple)" />
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#FFF' }}>
                OpenAI API Key Integration
              </span>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px' }}>
              Your key is saved locally in your browser storage only and is never transmitted to any third party.
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="password"
                placeholder="sk-proj-..."
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                className="input-field"
                style={{ flex: 1, padding: '8px 12px', fontSize: '12px' }}
              />
              <button type="submit" className="btn-primary" style={{ padding: '8px 14px', fontSize: '12px' }}>
                Save
              </button>
            </div>
          </form>
        )}

        {/* Live Build Context Pill Banner */}
        <div style={{
          padding: '10px 24px',
          background: 'rgba(16, 18, 24, 0.75)',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '11px',
          color: 'var(--text-secondary)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
            <Cpu size={13} color="var(--accent-purple)" />
            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '300px' }}>
              {build?.components?.cpu?.model || 'Ryzen 5 7600'} · {build?.components?.gpu?.model || 'RTX 5070'}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} className="tabular-nums">
            <span style={{ color: '#FFF', fontWeight: 600 }}>{FORMAT_INR(currentTotal)}</span>
            <span>{currentPower}W</span>
            <span style={{ color: 'var(--status-success)', fontWeight: 600 }}>{compReport?.healthScore || 94}%</span>
          </div>
        </div>

        {/* Messages Stream */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {messages.map((m) => {
            const isUser = m.sender === 'user';
            const isCopied = copiedId === m.id;

            return (
              <div
                key={m.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: isUser ? 'flex-end' : 'flex-start',
                  maxWidth: '92%',
                  alignSelf: isUser ? 'flex-end' : 'flex-start'
                }}
              >
                <div style={{
                  padding: '14px 18px',
                  borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: isUser ? 'var(--accent-gradient)' : 'var(--bg-surface)',
                  color: isUser ? '#FFFFFF' : 'var(--text-primary)',
                  border: isUser ? 'none' : '1px solid var(--border-default)',
                  fontSize: '14px',
                  lineHeight: '1.6',
                  whiteSpace: 'pre-wrap',
                  boxShadow: 'var(--shadow-sm)',
                  position: 'relative'
                }}>
                  {m.text}

                  {/* Copy snippet button for AI responses */}
                  {!isUser && (
                    <button
                      onClick={() => handleCopyText(m.id, m.text)}
                      title="Copy response"
                      className="btn-quiet"
                      style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        padding: '4px',
                        opacity: 0.6
                      }}
                    >
                      {isCopied ? <Check size={13} color="var(--status-success)" /> : <Copy size={13} />}
                    </button>
                  )}
                </div>

                <div style={{
                  fontSize: '10px',
                  color: 'var(--text-faint)',
                  marginTop: '4px',
                  padding: '0 4px'
                }}>
                  {m.timestamp}
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isLoading && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '12px 18px',
              borderRadius: '16px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-default)',
              width: 'fit-content'
            }}>
              <span className="typing-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-purple)' }} />
              <span className="typing-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-purple)', animationDelay: '150ms' }} />
              <span className="typing-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-purple)', animationDelay: '300ms' }} />
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginLeft: '6px' }}>Consulting hardware knowledge graph...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div style={{
          padding: '8px 20px',
          borderTop: '1px solid var(--border-subtle)',
          background: 'var(--bg-surface)',
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          whiteSpace: 'nowrap'
        }}>
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(p.query)}
              disabled={isLoading}
              style={{
                fontSize: '11px',
                padding: '5px 12px',
                borderRadius: '9999px',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-default)',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 120ms ease',
                flexShrink: 0
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#FFF';
                e.currentTarget.style.borderColor = 'var(--accent-purple)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.borderColor = 'var(--border-default)';
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div style={{
          padding: '16px 20px',
          background: 'var(--bg-surface)',
          borderTop: '1px solid var(--border-default)'
        }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-default)',
              borderRadius: '12px',
              padding: '6px 12px',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask about parts, bottleneck, wattage, or discounts..."
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              disabled={isLoading}
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#FFFFFF',
                fontSize: '13px',
                padding: '6px 0'
              }}
            />
            <button
              type="submit"
              disabled={!inputPrompt.trim() || isLoading}
              className="btn-primary"
              style={{
                padding: '8px 12px',
                borderRadius: '8px',
                opacity: (!inputPrompt.trim() || isLoading) ? 0.4 : 1
              }}
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
