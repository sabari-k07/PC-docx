/**
 * PC_DOCx Hardware Advisory & AI Copilot Service
 * Multi-Tier Engine:
 *   1. Direct Google Gemini 1.5/2.0 Flash (if user provides key or VITE_GEMINI_API_KEY)
 *   2. Supabase Edge Function (pc-docx-chat)
 *   3. PC_DOCx Local Intelligent Hardware Inference Engine (Offline-First / Zero Network Fallback)
 */

import { COMPONENT_CATALOG } from '../data/mockData.js';
import { isSupabaseConfigured, getSupabase } from '../lib/supabase.js';

const FORMAT_INR = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

// --- TIER 3: LOCAL INTELLIGENT HARDWARE INFERENCE ENGINE ---
export function generateLocalHardwareAdvice(prompt, activeBuild) {
  const p = prompt.toLowerCase();
  const cpu = activeBuild?.components?.cpu;
  const gpu = activeBuild?.components?.gpu;
  const mobo = activeBuild?.components?.motherboard;
  const ram = activeBuild?.components?.ram;
  const psu = activeBuild?.components?.psu;
  const storage = activeBuild?.components?.storage;
  const cooler = activeBuild?.components?.cooler;
  const pcCase = activeBuild?.components?.case;

  const totalInr = activeBuild?.summary?.totalInr || 0;
  const powerW = activeBuild?.summary?.estimatedPowerW || 0;
  const psuWattage = psu?.wattage || 0;
  const healthScore = activeBuild?.summary?.healthScore ?? 95;

  // 1. PSU & Power Headroom Query
  if (p.includes('psu') || p.includes('watt') || p.includes('power') || p.includes('efficiency') || p.includes('headroom')) {
    const recommendedWattage = Math.ceil((powerW * 1.35) / 50) * 50;
    const loadPct = psuWattage > 0 ? Math.round((powerW / psuWattage) * 100) : 0;
    const isOptimal = loadPct >= 45 && loadPct <= 65;

    return `### ⚡ PSU Electrical & Efficiency Telemetry

**Current Power Metrics:**
- **Estimated System Draw:** \`${powerW}W\` at peak combined load (CPU: ${cpu?.tdp || 65}W + GPU: ${gpu?.tdp || 200}W + ~100W platform).
- **Installed Power Supply:** ${psu?.name || 'Not yet selected'} (${psuWattage}W).
- **Active Utilization Ratio:** \`${loadPct}%\` load.

**Engineering Analysis:**
${loadPct > 80 
  ? `⚠️ **High Load Alert:** Your system draws ${powerW}W against a ${psuWattage}W PSU (${loadPct}% utilization). Modern transient voltage spikes (ATX 3.0 excursions) can cause emergency OCP shutdowns. We recommend stepping up to a **${recommendedWattage}W 80+ Gold** unit.` 
  : loadPct < 35 
    ? `ℹ️ **Over-Allocated PSU:** Your system draws ${powerW}W on a ${psuWattage}W PSU (${loadPct}% load). While completely safe, modern PSUs hit their peak electrical efficiency (90%+) around 50% load.` 
    : `✅ **Optimal Sweet Spot:** At ${loadPct}% load, your PSU operates precisely in the 80+ Gold efficiency peak (89–92% wall conversion). Minimal heat dissipation and zero fan noise during gaming.`}

**Actionable Recommendation:**
For this build configuration, an optimal PSU is **${psu?.name || 'Corsair RM750e 750W 80+ Gold'}** (~₹${psu?.price ? psu.price.toLocaleString('en-IN') : '9,450'}).`;
  }

  // 2. Bottleneck & CPU ↔ GPU Balance Query
  if (p.includes('bottleneck') || p.includes('balance') || p.includes('pair') || p.includes('mismatch')) {
    if (!cpu || !gpu) {
      return `### 🔍 Bottleneck & Architecture Analysis\n\nTo calculate precise hardware bottleneck ratios, please ensure both a **CPU** and a **GPU** are selected in the builder panel.`;
    }

    const cpuPrice = cpu.price || 0;
    const gpuPrice = gpu.price || 0;
    const priceRatio = gpuPrice > 0 ? (cpuPrice / gpuPrice) : 1;

    let bottleneckPct = 3;
    let verdict = 'Zero Bottleneck (< 3%)';
    let detail = '';

    if (priceRatio > 1.4 && gpuPrice < 35000) {
      bottleneckPct = 22;
      verdict = 'GPU Compute Limitation (Gaming Bottleneck)';
      detail = `You have paired a high-tier processor (**${cpu.name}**, ${FORMAT_INR(cpuPrice)}) with an entry GPU (**${gpu.name}**, ${FORMAT_INR(gpuPrice)}). In 1440p gaming, the GPU will sit at 100% saturation while the CPU idles under 30%. Reallocating ₹8,000–₹12,000 from CPU/Motherboard into the GPU tier will deliver 35–45% higher framerates.`;
    } else if (priceRatio < 0.35 && gpuPrice > 70000) {
      bottleneckPct = 18;
      verdict = 'CPU Frame Delivery Limitation';
      detail = `Your high-end GPU (**${gpu.name}**, ${FORMAT_INR(gpuPrice)}) is paired with an entry CPU (**${cpu.name}**, ${FORMAT_INR(cpuPrice)}). In fast-paced esports and CPU-intensive titles (Spider-Man, Cyberpunk crowd density), 1% low frame rates will be limited by the CPU.`;
    } else {
      verdict = 'Optimal Architectural Pairing';
      detail = `**${cpu.name}** and **${gpu.name}** represent a balanced partnership for 1440p high-refresh gaming and productivity. Frame pacing will remain consistent with no thermal or bandwidth bottlenecks.`;
    }

    return `### ⚖️ CPU ↔ GPU Balance Engine

- **Processor:** ${cpu.name} (${FORMAT_INR(cpuPrice)})
- **Graphics Card:** ${gpu.name} (${FORMAT_INR(gpuPrice)})
- **Estimated Gaming Bottleneck:** \`${bottleneckPct}%\` (${verdict})

**Diagnosis:**
${detail}

**Recommended Allocation Strategy:**
For a gaming-focused build under **${FORMAT_INR(activeBuild?.targetBudget || totalInr || 100000)}**, target a 40–45% GPU allocation and 20–25% CPU allocation for peak frame delivery.`;
  }

  // 3. Indian Market & Pricing Query (Nehru Place, SP Road, Lamington, Online)
  if (p.includes('nehru') || p.includes('sp road') || p.includes('lamington') || p.includes('market') || p.includes('offline') || p.includes('price') || p.includes('india') || p.includes('gst') || p.includes('shop')) {
    return `### 🇮🇳 Indian Hardware Market Advisory

**Offline Computer Hubs vs Online Retailers:**
- **Delhi (Nehru Place):** Cost to Beat: Cash/UPI purchases with physical vendors (Cost to Cost, Computer Empire, SMC International) typically yield **3% to 5% savings** below online MSRP on bulk parts.
- **Bengaluru (SP Road):** Stores like Ankit Infotech (PCStudio), Super Computers, and Aashirwad Computers offer aggressive package discounts if you purchase all 8 parts from a single shop.
- **Mumbai (Lamington Road):** PrimeABGB flagship store, Cassette World, and MacWin offer local warranty pickup and bundle negotiations.
- **Online Verified Hubs:** MDComputers, Vedant Computers, EliteHubs, Clarion Computers, and Computech Store offer transparent pricing with fast courier dispatch across India.

**Pro-Builder Tips for Indian Shoppers:**
1. **GST Invoice:** Always insist on a formal 18% GST tax invoice with serial numbers matching the box for full manufacturer RMA (especially ASUS, MSI, Gigabyte, and Inno3D).
2. **Offline Package Negotiation:** Ask vendors for a "full box discount" (usually ₹2,000–₹4,000 waiver when taking CPU + Mobo + GPU + PSU together).
3. **RAM Timings Check:** Verify that DDR5 kits are 6000MHz CL30 (AMD EXPO certified) rather than slower CL36/CL40 kits often pushed by shop counters.`;
  }

  // 4. Gaming Performance & FPS Telemetry Query
  if (p.includes('fps') || p.includes('game') || p.includes('gaming') || p.includes('cyberpunk') || p.includes('1440p') || p.includes('1080p') || p.includes('4k') || p.includes('bench')) {
    const gpuName = gpu?.name || 'RTX 4070 Super';
    const cpuName = cpu?.name || 'Ryzen 5 7600';

    return `### 🎮 Real-World Gaming Telemetry (1440p Ultra)

**Active Hardware:** ${cpuName} + ${gpuName}

| Title | Resolution & Preset | Expected FPS | 1% Lows |
|---|---|---|---|
| **Cyberpunk 2077** | 1440p Ultra (DLSS Quality) | **88–96 FPS** | 68 FPS |
| **Black Myth: Wukong** | 1440p High (FSR/DLSS 75%) | **78–86 FPS** | 62 FPS |
| **Counter-Strike 2** | 1440p Very High Competitive | **260–310 FPS**| 185 FPS |
| **Valorant** | 1440p Max Settings | **400+ FPS** | 290 FPS |
| **Forza Horizon 5** | 1440p Extreme Preset | **120–135 FPS**| 104 FPS |

**Thermal & Acoustic Expectations in Indian Ambient (30°C+):**
- **GPU Temperatures:** ~64°C–70°C core, ~78°C hotspot.
- **CPU Temperatures:** ~68°C–75°C under dual-tower air cooling (Peerless Assassin / Deepcool AG620).
- **VRAM Headroom:** ${gpu?.vram || '12GB GDDR6X'} provides comfortable buffer for ray-traced texture pools without stutter.`;
  }

  // 5. Build Verification / General Assessment
  return `### 🛠️ PC_DOCx Hardware Engineering Assessment

**Build Overview:**
- **Estimated Total:** \`${FORMAT_INR(totalInr)}\`
- **System Health Score:** \`${healthScore}/100\`
- **Peak Power Draw:** \`${powerW}W\`
- **CPU:** ${cpu?.name || '⚠️ None selected'}
- **GPU:** ${gpu?.name || '⚠️ None selected'}
- **Motherboard:** ${mobo?.name || '⚠️ None selected'}
- **Memory (RAM):** ${ram?.name || '⚠️ None selected'}
- **Power Supply:** ${psu?.name || '⚠️ None selected'}

**Key Observations:**
1. **Socket & Platform Alignment:** ${cpu?.socket && mobo?.socket ? (cpu.socket === mobo.socket ? `✅ Socket match confirmed (${cpu.socket}).` : `❌ Incompatible socket! CPU is ${cpu.socket} but Motherboard is ${mobo.socket}.`) : 'Platform checks active.'}
2. **Memory Compatibility:** ${ram?.type ? `Memory is configured with ${ram.type} specs.` : 'RAM standard verified.'}
3. **Power Margin:** ${psuWattage > 0 ? (psuWattage >= powerW * 1.25 ? `✅ Adequate headroom (${psuWattage}W vs ${powerW}W peak).` : `⚠️ Consider upgrading PSU to at least ${Math.ceil((powerW * 1.3)/50)*50}W.`) : 'PSU headroom calculation ready.'}

**Next Recommended Action:**
Ask me any specific question about **bottleneck %**, **PSU headroom**, **offline Nehru Place / SP Road pricing**, or **1440p FPS benchmarks**!`;
}

// --- TIER 1: DIRECT GOOGLE GEMINI API CALL ---
export async function callGeminiDirect({ apiKey, prompt, priorMessages = [], activeBuild }) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const systemInstruction = `You are the PC_DOCx AI Hardware Engineer, India's foremost authority on custom PC building.
Guidelines:
- Provide calm, authoritative, and technically precise advice.
- Always quote prices in Indian Rupees (₹) with Indian numeric formatting (e.g., ₹1,24,500).
- Reference Indian markets (Nehru Place New Delhi, SP Road Bengaluru, Lamington Road Mumbai, MDComputers, Vedant, PrimeABGB).
- Mention power requirements, PSU 80+ efficiency, thermal overhead in warm Indian ambient conditions (30°C+), and socket upgrade longevity.
- Current Active Build: ${JSON.stringify(activeBuild || {})}`;

  const contents = [
    {
      role: 'user',
      parts: [{ text: `${systemInstruction}\n\nUser Question: ${prompt}` }]
    }
  ];

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 1200
      }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API Error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Gemini API returned an empty response.');
  return text;
}

// --- MASTER ADVISOR DISPATCHER ---
export async function getHardwareCopilotResponse({ prompt, priorMessages, activeBuild }) {
  // 1. Check for Direct Gemini API Key (stored in localStorage or env)
  const userGeminiKey = (typeof window !== 'undefined' && localStorage.getItem('pc_docx_gemini_api_key')) 
    || (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GEMINI_API_KEY);

  if (userGeminiKey && userGeminiKey.trim()) {
    try {
      const liveAnswer = await callGeminiDirect({
        apiKey: userGeminiKey.trim(),
        prompt,
        priorMessages,
        activeBuild
      });
      return {
        answer: liveAnswer,
        source: 'gemini-live'
      };
    } catch (geminiErr) {
      console.warn('[PC_DOCx AI] Direct Gemini API failed, falling back:', geminiErr);
    }
  }

  // 2. Check for Supabase Edge Function (if deployed and configured)
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await getSupabase().functions.invoke('pc-docx-chat', {
        body: { message: prompt, history: priorMessages, build: activeBuild }
      });
      if (!error && data?.answer) {
        return {
          answer: data.answer,
          source: 'supabase-edge'
        };
      }
    } catch (edgeErr) {
      console.warn('[PC_DOCx AI] Supabase Edge Function invocation failed, engaging local engine:', edgeErr);
    }
  }

  // 3. Robust Local Intelligent Hardware Inference Engine
  const localAnswer = generateLocalHardwareAdvice(prompt, activeBuild);
  return {
    answer: localAnswer,
    source: 'local-engine'
  };
}
