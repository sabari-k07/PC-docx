# PC_DOCx — Master Design Engineering & Production Prompt System

> **A Complete Synthesis of the Web Design Engineer Skill & PC_DOCx 20-Screen Product Architecture**  
> *Target Aesthetic: Linear · Vercel · Apple Configurator · Calm, Precise, High-Density Utility for India's PC Hardware Market.*

---

## SECTION 1: MASTER SYSTEM PROMPT (ROLE & CORE PROTOCOL)

```markdown
You are a Principal Web Design Engineer and Creative Technologist specializing in ultra-refined, high-performance web applications. Your craft bridges the visual restraint of Apple hardware configurators, the density and speed of Linear, and the typography-first elegance of Vercel.

Your mission is to architect, design, and implement **PC_DOCx** — India's premier intelligent PC building platform. The bar is not merely "functional"; it is "stunning, intentional, and effortless." Every pixel serves a purpose, every millisecond of transition feels natural, and every piece of technical information is presented with clarity and zero visual clutter.

### Core Persona Rules
1. **Design Read & Calibrated Dials**:
   - **Artifact**: Intelligent PC Configurator & Hardware Decision Platform.
   - **Audience**: Indian gamers, software engineers, AI/ML practitioners, content creators, and first-time builders seeking confidence without overwhelm.
   - **Visual Language**: Modern Tool / Builder SaaS meets Apple Hardware Showcase (Deep slate canvas, razor-thin borders, purposeful typography, monospaced tabular data metrics, calm purple/blue focal highlights).
   - **Mode**: Greenfield Production Build.
   - **Five Dials Calibration**:
     - Visual Variance: `7/10` (Refined, deliberate rhythm; consistent 12-column grid with spacious breathing room).
     - Motion Intensity: `4/10` (Quiet, physics-informed micro-interactions: 150–220ms ease-out transitions; no distracting bounces or loops).
     - Information Density: `6/10` (High utility, zero clutter; maximum 4–5 visible metrics per card; technical depths tucked into clean expanders).
     - Asset Dependence: `6/10` (Isometric PC exploded-view visualizers, component silhouettes, and clean hardware iconography).
     - Brand Fidelity: `10/10` (Strict adherence to the PC_DOCx token specification, canonical build numbers, and Indian rupee formatting).

2. **Absolute Anti-Clichés (What PC_DOCx Is NOT)**:
   - **NOT an RGB Neon Gaming Site**: No oversaturated green/magenta glows, no angular "cyber" tribal patterns, no gamer typography.
   - **NOT an E-Commerce Warehouse**: No screaming red "BUY NOW!" badges, no cluttered banner ads, no star rating spam on every corner.
   - **NOT a Sterile Enterprise Admin Dashboard**: No grey table soup, no unstyled data grids, no generic material-UI cards.
   - **No Gradient Abuse**: The signature purple-to-blue gradient is strictly reserved for three elements: the single primary button per screen, the hero accent text, and the circular build score ring. Everywhere else uses flat, deliberate tokens.
   - **No Emojis as Icons**: Use clean, crisp inline SVG icons (16–20px hairline strokes). Never substitute emojis (e.g. 🚀, 💻, 🔥) for UI icons.
   - **No Fake or Inconsistent Numbers**: Always use the canonical dataset and correct Indian currency formatting (`₹` symbol with Indian comma grouping, e.g., `₹1,00,000`, `₹98,450`, `₹1,550`).
```

---

## SECTION 2: BRAND SPECIFICATION & DESIGN TOKENS

### 2.1 Color Architecture (Dark Mode Native)
All interfaces are built on a calibrated dark foundation designed to minimize eye fatigue during extended planning sessions while giving physical hardware visuals maximum contrast.

| Token Name | Hex Code | HSL / OKLCH | Semantic Application |
|---|---|---|---|
| `--bg-base` | `#08090C` | `hsl(225, 20%, 4%)` | Deep viewport canvas background |
| `--bg-surface` | `#101218` | `hsl(225, 20%, 8%)` | Secondary containers, outer sections, sidebars |
| `--bg-card` | `#151820` | `hsl(223, 20%, 10%)` | Interactive cards, drawer panels, modal surfaces |
| `--bg-elevated` | `#1B1F29` | `hsl(222, 21%, 13%)` | Hover states, active chips, dropdown menus, tooltips |
| `--border-subtle` | `#222733` | `hsl(223, 20%, 17%)` | Inner dividers, silent card outlines |
| `--border-default` | `#292E38` | `hsl(220, 16%, 19%)` | Standard card borders, inactive inputs, tab bars |
| `--border-focus` | `#7C5CFF` | `hsl(252, 100%, 68%)` | Active focus rings, selected card borders |
| `--text-primary` | `#F5F7FA` | `hsl(216, 20%, 97%)` | Page titles, primary numbers, active tab labels |
| `--text-secondary` | `#A7ADB8` | `hsl(218, 10%, 69%)` | Body copy, descriptions, secondary component names |
| `--text-muted` | `#8A91A0` | `hsl(221, 10%, 58%)` | Category labels, footnotes, disclaimers, keyboard hints |
| `--accent-purple` | `#7C5CFF` | `hsl(252, 100%, 68%)` | Primary interactive accent, selected checkmarks |
| `--accent-purple-text` | `#A592FF` | `hsl(250, 100%, 79%)` | Accessible high-contrast text on dark surfaces |
| `--accent-blue` | `#4DA3FF` | `hsl(211, 100%, 65%)` | Secondary accent, link hovers, gradient stop |
| `--accent-gradient` | `linear-gradient(135deg, #7C5CFF 0%, #4DA3FF 100%)` | Strictly for primary CTA, score ring, hero highlight |
| `--status-success` | `#35D07F` | `hsl(149, 63%, 51%)` | 100% Compatible tags, verified badges, positive health |
| `--status-warning` | `#FFB84D` | `hsl(36, 100%, 65%)` | PSU headroom warnings, bottleneck flags, caution alerts |
| `--status-danger` | `#FF5C67` | `hsl(356, 100%, 68%)` | Incompatible parts, over-budget warnings, missing requirements |

### 2.2 Typography Scale & Rules
- **Font Family**: `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`.
- **Code & Numeric Figures**: Tabular numbers enabled globally on all prices, wattage, FPS scores, and percentages via `font-feature-settings: 'tnum' on, 'cv05' on, 'cv11' on`.
- **Typographic Scale**:
  - `Hero Display`: 64px–72px / Line-height: 1.08 / Letter-spacing: -0.035em / Font-weight: 700
  - `Page Heading (H1)`: 36px–40px / Line-height: 1.15 / Letter-spacing: -0.025em / Font-weight: 700
  - `Section Title (H2)`: 28px–32px / Line-height: 1.25 / Letter-spacing: -0.02em / Font-weight: 600
  - `Card Header (H3)`: 20px–22px / Line-height: 1.35 / Letter-spacing: -0.015em / Font-weight: 600
  - `Subheading / Lead`: 18px–20px / Line-height: 1.5 / Letter-spacing: -0.01em / Font-weight: 400
  - `Body Standard`: 16px–17px / Line-height: 1.7 / Max-width: 65ch / Font-weight: 400
  - `Body Compact / Meta`: 14px–15px / Line-height: 1.5 / Font-weight: 400
  - `Eyebrow / Badge`: 12px–13px / Letter-spacing: 0.08em / Text-transform: uppercase / Font-weight: 600

### 2.3 Layout Spacing & Spatial Rhythm
- **Global Centered Canvas**: `max-width: 1200px` centered with `margin: 0 auto`.
- **Gutter & Grid**: 12-column responsive layout with `32px` gutters.
- **Horizontal Viewport Padding**: `64px` on desktop (≥1024px), `32px` on tablet, `24px` on mobile (<768px).
- **Vertical Section Spacing**: `120px–160px` between major landing sections on desktop (`64px–80px` on mobile).
- **Navbar Offset**: `72px` fixed navbar height, with `96px` top padding on underlying page contents.
- **Component Radii**:
  - Cards & Containers: `20px`
  - Interactive Buttons & Form Inputs: `12px`
  - Filter Chips & Status Badges: `9999px` (Pill shape) or `8px`
  - Checkboxes & Micro-toggles: `6px`

---

## SECTION 3: CANONICAL BENCHMARK DATASET

Whenever generating builds, components, or metrics, the system **must** utilize these exact canonical figures to maintain cross-screen continuity:

```json
{
  "canonical_build": {
    "name": "1440p Balanced Beast",
    "target_budget_inr": 100000,
    "actual_total_inr": 98450,
    "budget_remaining_inr": 1550,
    "build_score": 92,
    "build_health_score": 94,
    "build_health_label": "Excellent",
    "compatibility_rate": "100%",
    "estimated_power_draw_watts": 438,
    "recommended_psu_watts": 650,
    "components": [
      { "category": "CPU", "model": "AMD Ryzen 5 7600", "price_inr": 17500, "status": "Compatible", "specs": "6C / 12T · 5.1GHz Boost · 65W TDP" },
      { "category": "Motherboard", "model": "MSI PRO B650M-P", "price_inr": 9500, "status": "Compatible", "specs": "AM5 · Micro-ATX · DDR5 · PCIe 4.0" },
      { "category": "GPU", "model": "NVIDIA GeForce RTX 5070 12GB", "price_inr": 55000, "status": "Compatible", "badge": "Best Value", "specs": "12GB GDDR7 · 250W TDP · DLSS 4" },
      { "category": "RAM", "model": "Corsair Vengeance 16GB DDR5-6000", "price_inr": 4200, "status": "Compatible", "specs": "CL36 · EXPO Supported · 1x16GB" },
      { "category": "Storage", "model": "Crucial P3 Plus 1TB M.2 NVMe", "price_inr": 4500, "status": "Compatible", "specs": "PCIe 4.0 · 5000 MB/s Read" },
      { "category": "PSU", "model": "Corsair CX650 650W 80+ Bronze", "price_inr": 3800, "status": "Limited Headroom", "specs": "650W Non-Modular · ATX 3.0" },
      { "category": "Case", "model": "Deepcool CC560 Mid-Tower", "price_inr": 2450, "status": "Fits", "specs": "ATX · 4x Pre-installed LED Fans" },
      { "category": "Cooler", "model": "Deepcool AK400 Air Cooler", "price_inr": 1500, "status": "Compatible", "specs": "Single Tower · 220W TDP Capable" },
      { "category": "Operating System", "model": "Install later (Windows 11 / Linux)", "price_inr": 0, "status": "Ready", "specs": "USB Installation via UEFI" }
    ],
    "benchmarks_1440p_high": {
      "cyberpunk_2077_fps": 92,
      "gta_v_fps": 148,
      "valorant_fps": 320,
      "forza_horizon_5_fps": 118,
      "average_fps": 170,
      "one_percent_low_fps": 131,
      "gpu_utilization_pct": 97,
      "cpu_utilization_pct": 58
    },
    "ai_ml_capabilities": {
      "vram_capacity_gb": 12,
      "cuda_status": "Native Hardware Accelerated",
      "tensor_cores": "5th Gen Tensor Cores",
      "local_llm_7b": "Excellent (~5.5GB VRAM footprint)",
      "local_llm_13b": "Good (~8.5GB VRAM footprint)",
      "local_llm_30b": "Not practical (~19GB exceeds VRAM)",
      "sdxl_image_gen_speed": "6.2 sec / 1024x1024 batch"
    }
  }
}
```

---

## SECTION 4: GLOBAL INTERACTION & COMPONENT RULES

1. **Hierarchy of Action**:
   - Exactly **one** primary CTA per view (styled with `--accent-gradient`, 12px border radius, white text, subtle hover lift `translateY(-1px)` and soft purple glow shadow).
   - Secondary actions are **quiet text or outlined buttons** (transparent background, `--border-default`, `--text-secondary`, hovering to `--text-primary` and `--bg-elevated`).
2. **Lists and Data Rows**:
   - Component list items must be at least `72px–80px` in height with `1px solid var(--border-subtle)` dividers.
   - Text never drops below `13px`.
   - Tags like `"✓ Compatible"` use soft pill backgrounds (`rgba(53, 208, 127, 0.12)`) with green text (`#35D07F`).
3. **Card Composition**:
   - Maximum 3 cards per row on desktop (2 on tablet, 1 on mobile).
   - Visible data points per card capped at 4–5 to avoid cognitive fatigue. Extra specs are placed behind a subtle `"Technical Details ▾"` disclosure.
4. **Interactive States Mandatory for All Controls**:
   - Default, `:hover`, `:focus-visible` (2px solid `#7C5CFF` offset 2px), `:active`, and `:disabled`.
5. **No Cluttered Frames**:
   - Visual mockups must not render fake laptop/phone bezels unless explicitly requested. Render edge-to-edge, clean browser surfaces.

---

## SECTION 5: SCREEN-BY-SCREEN PRODUCTION PROMPTS (S1 TO S20)

Below are the 20 modular, production-ready screen prompts. Each prompt is engineered to be run standalone or fed into a builder to generate the individual view with full fidelity.

---

### S1. Landing Page (Desktop, Long Scroll)

```markdown
Design and build the comprehensive landing page for PC_DOCx as a high-aesthetic, spacious desktop web experience.
- Background: #08090C; Content Max-Width: 1200px centered; Section vertical rhythm: 140px separation.

Sections to include:
1. Fixed Navbar (Height: 72px, backdrop-filter: blur(16px), background: rgba(8, 9, 12, 0.8), border-bottom: 1px solid #292E38):
   - Left: Wordmark "PC_DOCx" in 20px bold white with a subtle purple dot.
   - Center: Nav links (Build, Explore Builds, Compare, Performance, Guides) in 15px #A7ADB8, hovering to #F5F7FA.
   - Right: Search trigger (⌘K), Saved Builds bookmark icon, Theme indicator, User profile avatar, and a primary CTA button "Build My PC".
2. Hero Section (Full Viewport Height - 72px):
   - Left Column (55%): Eyebrow badge "THE SMARTER PC BUILDER" in 13px tracking-wide #A592FF. H1: "Build a PC that actually fits your needs." (70px, bold, max 3 lines, tight line height 1.1). Sub-headline: "Tell PC_DOCx your budget and what you want to do. We'll help you create a balanced, compatible and upgrade-ready PC without the guesswork." (18px #A7ADB8, max 50ch). Action row: Primary "Build My PC" (purple-blue gradient) and quiet ghost button "Explore Builds".
   - Right Column (45%): Architectural 3D isometric PC tower visual with expansive negative space around it. 5 interactive hotspot pins connected by hairline lines to callouts: [CPU: Ryzen 5 7600], [GPU: RTX 5070 12GB], [RAM: DDR5-6000], [Cooling: 220W Air Cooler], [Power: 650W Bronze].
3. Trust Bar (4-Column Single Row):
   - Hairline cards featuring: "Live Compatibility Engine", "Real-World Performance Insights", "Indian Market Budget Optimization", and "Future-Proof Upgrade Planning". Each with a 20px hairline monochrome SVG icon and one concise explanatory line.
4. "How It Works" (3-Step Spatial Sequence):
   - Numbered step cards (01 / 02 / 03) in a 3-column row:
     - 01 Choose your goal (Select gaming, ML, development, or creative priorities).
     - 02 Set your budget in ₹ (Interactive dynamic slider with instant part redistribution).
     - 03 Get a build you can trust (Every bottleneck analyzed, every part checked for compatibility).
5. "What Are You Building For?" (Goal Selection Grid):
   - Section heading: "Start with your goal. PC_DOCx handles the complexity."
   - 3×2 grid of large 20px-radius cards: Gaming, Development, AI & Machine Learning, Content Creation, Everyday Productivity, Ultimate Performance. Each card features a custom SVG glyph, title, and 1-line description. Hovering reveals a soft `#7C5CFF` border glow.
6. Featured Curated Builds:
   - 3 spacious cards: "₹60,000 — 1080p eSports Champion", "₹1,00,000 — 1440p Balanced Beast" (flagged with "Most Popular"), "₹1,50,000 — AI & 4K Workstation". Displaying key CPU, GPU, RAM, Build Score (92/100), and "Inspect Build" link.
7. High-Impact Closing CTA Band:
   - Centered container with gradient background sheen: "Your next PC starts here." Subtitle: "Zero guesswork. 100% verified compatibility." Primary "Build My PC" CTA.
8. Minimalist Footer:
   - 4 clean link columns (Product, Knowledge, Tools, Community) and copyright with Indian pricing transparency note.
```

---

### S2. Wizard Step 1: Purpose

```markdown
Design Wizard Step 1 of the PC_DOCx builder as a focused, distraction-free screen.
- Layout: No marketing distractions. Slim top header (Height: 60px) with logo left, step indicator "Step 1 of 3 · Purpose" center, and "Exit to Builder" right.
- Centered Content Container (Max-Width: 960px):
  - Heading: "What are you building for?" (36px, bold, white).
  - Subtitle: "Start with your goal. PC_DOCx configures performance thresholds and part allocations automatically."
  - 3×2 Grid of Large Selectable Purpose Cards (Padding: 32px, Radius: 20px, Background: #151820, Border: 1px solid #292E38):
    1. Gaming: "High FPS gaming, AAA immersion, and competitive esports performance."
    2. Development: "Compiling code, Docker containers, multi-threaded workloads, and virtualization."
    3. AI & Machine Learning: "Local LLM inference, CUDA acceleration, PyTorch models, and high VRAM."
    4. Content Creation: "Video editing, 4K scrubbing, 3D rendering, and color grading pipelines."
    5. Everyday Productivity: "Silent, ultra-reliable daily computing, multi-monitor multitasking, and office workflows."
    6. Ultimate Performance: "Zero compromises. Top-tier silicon, maximum power, and thermal excellence."
  - State Display: Card 1 (Gaming) is actively selected with a prominent 2px solid #7C5CFF border, a soft purple background tint (rgba(124, 92, 255, 0.08)), and a glowing purple checkmark badge in the top right.
  - Sticky Bottom Navigation: Left "Cancel" ghost link; Right "Continue to Budget →" primary button (disabled until purpose selected, active state glowing).
```

---

### S3. Wizard Step 2: Budget

```markdown
Design Wizard Step 2 of the PC_DOCx builder focusing on Indian Rupee budget allocation.
- Header: Slim bar with progress indicator: "Step 2 of 3 · Budget" (Step 1 marked complete with check).
- Centered Content Container (Max-Width: 800px):
  - Heading: "What's your total budget?"
  - Subtitle: "We distribute funds intelligently to eliminate bottlenecks between CPU and GPU."
  - Primary Budget Display: Huge, commanding tabular figure: "₹80,000" in 96px bold Inter with a subtle gradient shimmer.
  - Continuous Slider:
    - Range: ₹30,000 to ₹3,00,000 with step intervals of ₹2,500.
    - Track: Height 8px, background #292E38 with purple fill up to the thumb. Thumb: 28px circular ring with white center and subtle drop shadow.
  - Quick-Select Preset Chips (One horizontal row below slider):
    - [ ₹50,000 ]  [ ₹75,000 (Active/Nearest) ]  [ ₹1,00,000 ]  [ ₹1,50,000 ]  [ ₹2,00,000+ ]
    - Selected chip has a purple border and elevated surface #1B1F29.
  - Smart Budget Allocation Hint Card:
    - Subtle container showing projected split for ₹80,000: "GPU: ~45% (₹36,000) · CPU: ~22% (₹17,500) · Core Platform: ~33% (₹26,500)".
  - Disclaimer Footnote: "Hardware prices reflect real-time Indian retail estimates (GST inclusive) and may vary by vendor."
  - Footer Bar: "← Back" quiet text button and "Continue to Priority →" primary button.
```

---

### S4. Wizard Step 3: Priority & Platform

```markdown
Design Wizard Step 3 of the PC_DOCx builder capturing architecture priorities and pre-owned components.
- Header: Progress indicator: "Step 3 of 3 · Priority".
- Centered Container (Max-Width: 920px):
  - Heading: "What matters most in your build?"
  - Subtitle: "Choose the engineering philosophy that guides part trade-offs."
  - 4 Option Cards in a Single Row (or 2×2 on tablet):
    1. Raw Performance: Maximum compute power today; aesthetics and acoustics secondary.
    2. Balanced (Active Selected): The sweet spot between performance, thermals, acoustics, and longevity.
    3. Best Value: Maximum performance-per-rupee using market price drops and value gems.
    4. Upgrade-Proof: Premium motherboard, high-headroom PSU, and modern socket for seamless future part swaps.
    - Card 2 (Balanced) shows the selected state: purple border, checkmark, elevated dark surface.
  - Optional Parameter Controls (Subtle rows below with generous vertical spacing):
    - Platform Preference Segmented Control: [ No Preference (Selected) | AMD AM5 | Intel LGA1700/1851 ].
    - Form Factor Toggle: [ Standard ATX (Selected) | Compact Micro-ATX | Small Form Factor ITX ].
    - Pre-Owned Hardware Switch: Clean iOS-style switch: "I already have some parts" (expands an inline drawer if toggled).
  - Bottom Bar: "← Back to Budget" and Primary CTA button: "Generate My Build ✨" with a prominent purple-blue gradient and soft elevation.
```

---

### S5. Recommended Build Result

```markdown
Design the Recommended Build Result page showcasing the generated configuration for ₹1,00,000 budget.
- Header: "Your Recommended Build" with subtitle "Engineered for 1440p Gaming & Development within ₹1,00,000."
- Top Metric Banner (5 Large Metric Tiles in One Row, 32px padding, radius 20px, background #151820):
  1. Build Score: "92/100" with a circular SVG gradient progress ring.
  2. Compatibility: "100% Compatible" with a green check shield badge.
  3. Estimated Total: "₹98,450" (Tabular bold text).
  4. Power Draw: "438W" (Under 650W PSU rating).
  5. Budget Remaining: "₹1,550" (Surplus saved).
- Health Bar Banner (Full width below metrics):
  - Progress bar filled to 94%: "Build Health: 94/100 · Excellent. Zero physical clearance or thermal bottlenecks detected."
- Main Content Area (Two Columns, 120px lower):
  - Left Column (70%): The Canonical 9-Part Specification List.
    - 9 rows (Height: 80px each, hairline borders):
      - CPU: AMD Ryzen 5 7600 — ₹17,500 · "✓ Compatible" · link "Why this part?"
      - Motherboard: MSI PRO B650M-P — ₹9,500 · "✓ Compatible"
      - GPU: RTX 5070 12GB — ₹55,000 · "✓ Compatible" · "★ Best Value in Tier"
      - RAM: Corsair 16GB DDR5-6000 — ₹4,200 · "✓ Compatible"
      - Storage: Crucial P3 Plus 1TB NVMe — ₹4,500 · "✓ Compatible"
      - PSU: Corsair CX650 650W — ₹3,800 · "⚠ Limited Headroom"
      - Case: Deepcool CC560 — ₹2,450 · "✓ Fits"
      - Cooler: Deepcool AK400 — ₹1,500 · "✓ Compatible"
      - OS: Install later — ₹0 · "✓ Ready"
  - Right Column (30%, Sticky):
    - Quick Action Summary Card:
      - Total Price: ₹98,450 (GST Incl.).
      - Primary Button: "Customize in Builder" (Takes build to S6).
      - Secondary Buttons: "Save Build", "Share Link", "Export PDF Spec Sheet".
```

---

### S6. Main Interactive Builder (Desktop)

```markdown
Design the core desktop PC_DOCx Builder application page.
- Top Journey Stepper Bar: Slim pill navigation across the top:
  [ 1. Purpose · 2. Budget · 3. Build (Active) · 4. Optimize · 5. Performance · 6. Upgrade · 7. Review ]
- Mode Switch (Top Right): Beginner / Advanced toggle.
- 3-Column Breathing Layout (Max-Width: 1440px):
  - Column 1: Component Navigation (Left, 300px width):
    - Vertical stack of 9 component selector rows (Height: 72px each):
      - CPU, Motherboard, GPU, RAM, Storage, PSU, Case, CPU Cooler, OS.
      - Each row displays: Small category icon, part name, current price in ₹, and a status indicator (Green check or yellow warning). Clicking opens the Component Picker drawer (S7).
  - Column 2: Visualizer Canvas (Center, Flexible, min 540px width):
    - Clean dark staging surface with subtle grid lines.
    - Centered isometric exploded PC chassis rendering.
    - 6 Interactive Hotspot Dots (GPU dot is pulsating in purple).
    - Active Tooltip on GPU: "NVIDIA RTX 5070 12GB · PCIe 4.0 x16 · 250W TDP · 242mm length".
    - Top View Switcher Pill: [ Front | Side | Exploded (Active) ].
    - Bottom Canvas Controls: Zoom (+ / -), Reset Camera, and Wireframe toggle.
  - Column 3: "YOUR BUILD" Sticky Summary (Right, 340px width):
    - Surface: #151820 with 1px border #292E38, padding: 24px, radius: 20px.
    - Financials: Total ₹98,450 | Budget ₹1,00,000 | Remaining ₹1,550.
    - Build Health: 94/100 (Badge: Excellent).
    - 7-Point Live Checklist:
      ✓ Socket AM5 Match
      ✓ DDR5 Speed Supported
      ✓ GPU Clearance (242mm of 370mm)
      ✓ Cooler Height (155mm of 163mm)
      ⚠ PSU Headroom (438W / 650W - 67% load)
      ✓ Motherboard M.2 Slots Available
      ✓ Front Panel USB-C Header Matched
    - Actions:
      - Primary Button: "View Full Build Details" (Purple-blue gradient).
      - Action Bar: [ Optimize Budget (S9) ] · [ Performance (S10) ] · [ Save ] · [ Share ].
```

---

### S7. Component Picker Drawer (GPU Replacement)

```markdown
Design the Component Picker Drawer for GPU selection overlaid on the dimmed Main Builder background.
- Drawer Specifications: Right-anchored sheet (Width: 720px on desktop, full height, background: #151820, border-left: 1px solid #292E38, soft backdrop blur on remaining viewport).
- Drawer Header:
  - Title: "Choose your Graphics Card (GPU)" with close button (×) right.
  - Search Input: "Search by chipset, brand, or VRAM..." with search icon.
  - Filter Chips (Horizontal row):
    - Price Range [All ▼] · Brand [All / NVIDIA / AMD] · VRAM [≥12GB (Active)] · TDP · In Stock Only.
  - Sort Dropdown: [ Recommended for 1440p ▼ ].
- Component Card List (5 generous cards, 24px padding, radius 16px, background #101218, border 1px solid #292E38):
  1. NVIDIA RTX 5060 8GB — ₹31,500
     - Specs: 8GB GDDR6 · 115W · Performance Score: 74/100
     - Delta: Save ₹23,500 · -18 Gaming Score · Fits budget easily
     - Button: [ Select This ]
  2. NVIDIA RTX 5060 Ti 16GB — ₹45,500
     - Specs: 16GB GDDR6 · 165W · Performance Score: 83/100
     - Delta: Save ₹9,500 · -9 Gaming Score
     - Button: [ Select This ]
  3. NVIDIA RTX 5070 12GB — ₹55,000 (CURRENTLY SELECTED)
     - Badge: "CURRENT SELECTION · BEST VALUE"
     - Border: 2px solid #7C5CFF with purple tint
     - Specs: 12GB GDDR7 · 250W · Performance Score: 92/100
     - Button: [ Selected ✓ ] (Disabled ghost button)
  4. AMD Radeon RX 9070 XT 16GB — ₹68,000
     - Specs: 16GB GDDR6 · 300W · Performance Score: 95/100
     - Delta: +₹13,000 (Over budget by ₹11,450) · +3 Gaming Score
     - Button: [ Select This ]
  5. NVIDIA RTX 5070 Ti 16GB — ₹78,000
     - Specs: 16GB GDDR7 · 285W · Performance Score: 97/100
     - Warning Flag: "⚠ Exceeds PSU Capacity — Requires 750W+ PSU & Over budget by ₹21,450"
     - Button: [ Select with Required Changes ]
```

---

### S8. Compatibility & Health Center

```markdown
Design the dedicated Build Health & Verification screen for PC_DOCx.
- Heading: "Build Health & Compatibility Report"
- Top Summary Banner:
  - Large Score Display: "94/100" in 64px tabular bold, status badge "Excellent".
  - Sub-text: "Your system has no critical incompatibilities. One advisory flagged for future expansion headroom."
- Two-Column Layout (1200px container):
  - Left Column (60%): 6 Interactive Compatibility Checks (Rows: 72px height, padding: 20px, radius: 16px):
    1. CPU & Motherboard: "✓ Socket AM5 fully supported by MSI PRO B650M-P (No BIOS flash required)."
    2. RAM & Motherboard: "✓ Corsair DDR5-6000 running at rated speed via AMD EXPO profile."
    3. GPU & Case Clearance: "✓ RTX 5070 (242mm) fits comfortably in Deepcool CC560 (supports up to 370mm)."
    4. PSU & System Power: "⚠ Limited Power Headroom (Amber Alert). Peak draw is 438W on a 650W supply (67% utilization)."
    5. CPU Cooler & Thermal Envelope: "✓ Deepcool AK400 (220W dissipation) keeps Ryzen 5 7600 (65W TDP) under 68°C."
    6. Physical Dimensions & Clearances: "✓ CPU Cooler height (155mm) fits within chassis allowance (163mm)."
  - Right Column (40%): Actionable Resolution Panel:
    - Card: "PSU Headroom Advisory" (Border: 1px solid #FFB84D, soft amber glow).
    - Explanation: "While the Corsair CX650 is completely stable for this build today, modern transient power spikes and future high-tier GPU upgrades will benefit from a 750W gold-rated unit."
    - Recommendation: "Switch to Corsair RM750e 750W 80+ Gold (+₹2,400)."
    - Action: Primary Button "Fix Automatically" and "Keep Current Part" ghost link.
```

---

### S9. Budget Optimizer (Cost Reduction Engine)

```markdown
Design the Budget Optimizer interface when a user is ₹8,500 over their intended target.
- Hero Alert Banner:
  - Heading: "You're ₹8,500 over budget." (Red/Amber subtle accent).
  - Subtitle: "PC_DOCx identified 3 targeted part swaps that save money with minimal to zero impact on real-world FPS."
- 3 Optimization Proposal Cards in a Horizontal Row (Radius: 20px, Background: #151820):
  1. Optimize SSD Storage:
     - Swap: Crucial T500 Gen4 → Crucial P3 Plus 1TB
     - Cost Delta: Save ₹2,000 (₹6,500 → ₹4,500)
     - Real-World Impact: "Minimal — 0.2s difference in game load times; 0 FPS difference."
     - Impact Tag: [ Minimal Impact ] (Green badge)
  2. Optimize RAM Kit:
     - Swap: G.Skill RGB 32GB → Corsair Vengeance 16GB DDR5-6000
     - Cost Delta: Save ₹3,800 (₹8,000 → ₹4,200)
     - Real-World Impact: "Low — Identical 1440p gaming FPS; easily upgraded with second stick later."
     - Impact Tag: [ Low Impact ] (Green badge)
  3. Optimize Chassis & Fans:
     - Swap: Lian Li O11 Dynamic → Deepcool CC560 (Includes 4 Fans)
     - Cost Delta: Save ₹5,500 (₹7,950 → ₹2,450)
     - Real-World Impact: "Zero — Identical airflow; saves buying standalone case fan bundles."
     - Impact Tag: [ Zero FPS Impact ] (Cyan badge)
- Before & After Summary Comparison Bar:
  - Left: "Original Build: ₹1,08,500"
  - Center Arrow: "→"
  - Right: "Optimized Build: ₹97,200"
  - Metric Pill: "Performance Retained: 98.4% · Total Savings: ₹11,300"
- Bottom Actions:
  - Primary Button: "Apply Best Optimization (Save ₹11,300)"
  - Secondary: "Review Item by Item"
```

---

### S10. Performance Dashboard: Gaming & Framerates

```markdown
Design the real-world Gaming Performance Dashboard for PC_DOCx.
- Header: "Expected Gaming Performance" with subtitle "Simulated real-world benchmarks based on aggregate telemetry and hardware specs."
- Top Controls:
  - Category Tabs: [ Gaming (Active) | AI & Machine Learning | Development | Content Creation ]
  - Resolution Toggle Pill: [ 1080p Ultra | 1440p High (Active) | 4K Balanced ]
- 4 Large Benchmark Cards in a 2×2 Grid (Padding: 28px, Background: #151820, Border: 1px solid #292E38):
  1. Cyberpunk 2077 (1440p Ultra · DLSS Quality):
     - Large Framerate: "92 FPS" with horizontal performance bar filled to 75%.
     - Minimum 1% Low: 74 FPS (Smooth, zero stutter).
  2. Grand Theft Auto V (1440p Very High):
     - Large Framerate: "148 FPS"
     - Minimum 1% Low: 118 FPS.
  3. Valorant (1440p Competitive High):
     - Large Framerate: "320 FPS" (Maxes out high-refresh 240Hz/360Hz esports displays).
     - Minimum 1% Low: 265 FPS.
  4. Forza Horizon 5 (1440p Extreme):
     - Large Framerate: "118 FPS"
     - Minimum 1% Low: 98 FPS.
- System Telemetry Summary (4 Stat Cards in One Row):
  - Average Gaming FPS: "170 FPS"
  - 1% Low Stability: "131 FPS"
  - GPU Utilization: "97% (Fully Saturated - No Bottleneck)"
  - CPU Utilization: "58% (Healthy Headroom for Background Discord/Recording)"
- Telemetry Disclaimer: "Estimates reflect driver version 572.xx+ with ReBAR enabled. Actual FPS may vary ±5% with ambient room temperature."
```

---

### S11. Performance Dashboard: AI & Machine Learning

```markdown
Design the AI & Machine Learning capability analysis dashboard for PC_DOCx.
- Top Tabs: [ Gaming | AI & Machine Learning (Active) | Development | Content Creation ]
- Key Hardware Metric Tiles (4 in a row):
  1. Dedicated VRAM: "12 GB GDDR7" (High speed memory bandwidth: 672 GB/s)
  2. Tensor Core Architecture: "5th Gen Tensor Cores" (FP8, FP16 hardware acceleration)
  3. CUDA Availability: "Native Supported · CUDA 12.x / cuDNN"
  4. Local LLM Suitability: "High Rating (Up to 13B Parameters)"
- Visual Memory Allocation Bar (Width: 100%, Height: 24px, Radius: 12px, Background #101218 with distinct colored segments):
  - Segment 1 (5.5GB): 7B Model Weights (Llama 3, Mistral) — 46% (Green)
  - Segment 2 (3.0GB): KV Cache & Context Window (8k tokens) — 25% (Cyan)
  - Segment 3 (3.5GB): System Overhead & Free Buffer — 29% (Slate)
- Local Model Execution Matrix (3 Horizontal Cards):
  1. 7B LLMs (Llama 3 8B Q4_K_M / Mistral 7B):
     - Badge: "Excellent Performance"
     - Inference Speed: ~48 tokens/second · Fits completely into 12GB VRAM.
  2. 13B–14B LLMs (Qwen 2.5 14B Q4 / DeepSeek 14B):
     - Badge: "Good Performance"
     - Inference Speed: ~22 tokens/second · Consumes ~9.2GB VRAM.
  3. 30B+ LLMs (Command R+ / Llama 70B):
     - Badge: "Not Practical on Single GPU" (Amber alert)
     - Note: "Requires system RAM offloading (1–3 tokens/sec). Recommend dual 5070 or 5090 for 70B models."
- Generative Image Benchmark Card:
  - "Stable Diffusion XL (SDXL 1024×1024)": Generates 1 batch (30 steps, DPM++ 2M Karras) in 6.2 seconds using TensorRT acceleration.
```

---

### S12. Build Comparison Matrix

```markdown
Design a side-by-side Build Comparison screen comparing 3 balanced price tiers.
- Header: "Compare Build Configurations" with subtitle "Evaluate performance trade-offs across price points."
- 3 Column Comparison Layout (Build A: ₹74,900 | Build B: ₹98,450 [Highlighted "Recommended"] | Build C: ₹1,32,900):
  - Header Row:
    - Build A: "Value 1080p Esports" (Price: ₹74,900)
    - Build B: "1440p Balanced Beast" (Price: ₹98,450 · Badge: "Best Value" in purple)
    - Build C: "4K Creator & AI Pro" (Price: ₹1,32,900)
  - Comparative Criterion Rows (64px height each, with checkmarks highlighting the category winner):
    - Processor: Ryzen 5 5600X vs Ryzen 5 7600 (✓) vs Ryzen 7 7800X3D (✓)
    - Graphics Card: RTX 5060 8GB vs RTX 5070 12GB (✓) vs RTX 5070 Ti 16GB (✓)
    - System Memory: 16GB DDR4 vs 16GB DDR5-6000 vs 32GB DDR5-6000 (✓)
    - Power Consumption: 342W vs 438W vs 512W
    - 1440p Gaming Score: 76/100 vs 92/100 (✓) vs 97/100
    - AI / LLM Score: 58/100 vs 84/100 vs 93/100 (✓)
    - Upgrade Longevity: 70/100 vs 88/100 (✓) vs 82/100
    - Value Per Rupee: 88/100 vs 94/100 (✓ Winner) vs 79/100
- Bottom Recommendation Banner:
  - "Best choice for your budget: Build B (₹98,450). It delivers 82% of Build C's performance at 74% of the cost, on modern AM5 architecture."
  - Action button: "Select Build B & Continue".
```

---

### S13. Upgrade Roadmap & Future-Proofing Timeline

```markdown
Design an interactive Upgrade Roadmap screen illustrating component longevity over a 4-year horizon.
- Heading: "Your 4-Year Upgrade Roadmap"
- Overall Metric: Circular Gauge "Upgrade Readiness: 92%" (Status: Highly Future-Proof on AM5 Platform).
- Vertical Chronological Timeline (Left hairline track with glowing node pins):
  1. Node 0 — Day 1: As Built (Today)
     - Total Investment: ₹98,450
     - State: AM5 B650 Platform, 16GB DDR5, RTX 5070 12GB. Plays all current titles at 1440p Ultra.
  2. Node 1 — Year 1: Memory Density Boost (~₹4,200)
     - Action: Add matching 16GB DDR5 stick (Upgrade to 32GB Dual-Channel).
     - Feasibility: "✓ 100% Compatible · Motherboard has open DIMM slot · Tool-free 5 minute install."
     - Benefit: Eliminates RAM paging in heavy video export & 100+ browser tabs.
  3. Node 2 — Year 2: Next-Gen GPU Swap (~₹32,000 net after selling RTX 5070)
     - Action: Upgrade to future 60-Series GPU.
     - Advisory Flag: "⚠ Requires PSU Upgrade to 750W/850W at that time."
     - Feasibility: PCIe 4.0/5.0 backward compatible.
  4. Node 3 — Year 3–4: In-Socket CPU Upgrade (~₹25,000)
     - Action: Drop in future Ryzen 9000/10000 X3D CPU on the existing MSI B650 motherboard.
     - Feasibility: "✓ AM5 socket supported through 2027+ · Simple BIOS update."
     - Benefit: Extends total system lifespan by an extra 3 years without replacing motherboard or RAM.
```

---

### S14. Explore Community & Verified Builds

```markdown
Design the Explore Builds showcase page for discovery and inspiration.
- Header: "Explore PC Builds" with subtitle "Browse verified configurations tested by Indian builders and hardware engineers."
- Filter Controls (Single horizontal chip bar):
  - [ All Builds ]  [ 🎮 Gaming (Active) ]  [ 🤖 AI & ML ]  [ 💻 Developer ]  [ 🎨 Creator ]  [ Under ₹75,000 ]  [ ₹1,00,000 ]  [ High-End ]
- 2-Column Responsive Card Grid (4 prominent build cards, radius 20px, background #151820, border 1px solid #292E38):
  1. Card 1: "₹60,000 — 1080p Pure Esports"
     - Tags: [ Budget King ] [ 1080p 144Hz ]
     - Specs: Intel Core i5-12400F · RTX 5060 8GB · 16GB DDR4 · 1TB SSD
     - Score: 81/100 · Compatibility: 100%
     - Actions: [ View Build ]  [ Use as Template ]
  2. Card 2: "₹1,00,000 — 1440p Balanced Beast" (Highlighted with purple border & "Community Favorite" tag)
     - Tags: [ 1440p Ultra ] [ AM5 Platform ]
     - Specs: AMD Ryzen 5 7600 · RTX 5070 12GB · 16GB DDR5 · 1TB NVMe
     - Score: 92/100 · Compatibility: 100%
     - Actions: [ View Build ]  [ Use as Template ]
  3. Card 3: "₹1,50,000 — AI Workstation & 4K Rig"
     - Tags: [ Local LLMs ] [ CUDA Accelerated ]
     - Specs: AMD Ryzen 7 7700X · RTX 5070 Ti 16GB · 32GB DDR5 · 2TB Gen4 SSD
     - Score: 95/100 · Compatibility: 100%
     - Actions: [ View Build ]  [ Use as Template ]
  4. Card 4: "₹2,00,000 — Creator Pro Studio"
     - Tags: [ DaVinci Resolve ] [ 3D Rendering ]
     - Specs: AMD Ryzen 9 7900X · RTX 5080 16GB · 64GB DDR5 · 4TB Storage
     - Score: 98/100 · Compatibility: 100%
     - Actions: [ View Build ]  [ Use as Template ]
```

---

### S15. Saved Builds & Empty State

```markdown
Design the Saved Builds dashboard screen including both populated and zero-data states.
- Header: "My Saved Builds" with subtitle "Manage, share, and track prices for your saved configurations."
- View A: Populated State (3 Builds in a 3-Column Grid):
  - Card Details:
    - Build Name: "1440p Balanced Beast"
    - Last Modified: "Updated 2 hours ago"
    - Price: "₹98,450" (Green indicator: "₹1,200 lower than last week")
    - Key Metrics: Score 92/100 · 100% Compatible · 438W
    - Overflow Action Menu (...): [ Open in Builder | Duplicate | Compare with Another | Share Link | Delete ]
- View B: Zero-Data Empty State (Rendered in isolated container or toggle):
  - Minimalist centered visual: Isometric line-art drawing of an empty PC case chassis.
  - Heading: "Your next PC starts here."
  - Body: "You haven't saved any configurations yet. Configure your dream build from scratch or customize one of our proven templates."
  - Action: Primary Button "Start Your First Build" and quiet link "Explore Community Builds".
```

---

### S16. PC Building Knowledge Guides

```markdown
Design the Guides & Knowledge Center for PC_DOCx.
- Heading: "PC Building Guides & Hardware Intel" with subtitle "Written by engineers. Zero affiliate fluff. Clear technical answers for the Indian market."
- Category Tabs: [ All Guides | Beginner Basics (Active) | GPU & VRAM | Power & PSUs | Processors | Troubleshooting ]
- 3-Column Grid of 6 High-Value Guide Cards (Radius 20px, Background #151820, Border 1px solid #292E38):
  1. "How to Choose the Right GPU in 2026: VRAM vs Rasterization"
     - Meta: Category: GPU Guide · 6 min read
     - Summary: Why 8GB is no longer enough for 1440p gaming and what VRAM you need for local AI models.
  2. "How Much RAM Do You Actually Need? 16GB vs 32GB vs 64GB"
     - Meta: Category: Memory · 4 min read
     - Summary: Benchmarked across Windows 11, multi-tab browsers, gaming, and code compilation.
  3. "Demystifying Power Supplies: 80 Plus Ratings & Transient Spikes"
     - Meta: Category: Power & Electrical · 5 min read
     - Summary: How to calculate actual system wattage and avoid unstable voltage shutdowns in Indian conditions.
  4. "AMD AM5 vs Intel LGA1851: Which Socket Will Last Longer?"
     - Meta: Category: Architecture · 7 min read
     - Summary: Upgrade pathways, platform longevity, DDR5 memory controller stability compared.
  5. "What is VRAM and Why Does Local AI Care So Much?"
     - Meta: Category: AI / Deep Learning · 8 min read
     - Summary: Understanding memory bandwidth, quantized models (GGUF, AWQ), and offloading to system RAM.
  6. "First-Time Assembly Checklist: Mistakes to Avoid on Your First Boot"
     - Meta: Category: Hands-On Assembly · 9 min read
     - Summary: Thermal paste application, motherboard standoff placement, front-panel headers, and initial BIOS setup.
```

---

### S17. Global Search & Command Palette Overlay

```markdown
Design the Global Search & Command Palette overlay (triggered via ⌘K or search icon).
- Overlay Structure:
  - Dimmed, blurred backdrop: rgba(8, 9, 12, 0.75) with backdrop-filter: blur(12px).
  - Centered Modal Dialog (Width: 640px, Background: #151820, Border: 1px solid #292E38, Radius: 20px, Shadow: 0 24px 64px rgba(0, 0, 0, 0.8)).
- Top Search Input Bar:
  - Search Icon, text input field with placeholder "Search components, builds, guides, or troubleshooting...", active text: "rtx".
  - Clear text button right (ESC to close).
- Grouped Search Results List:
  - Group 1: Hardware Components
    - Item 1 (Highlighted/Focused): NVIDIA GeForce RTX 5070 12GB · GPU · ₹55,000 · "In Stock" (Press ENTER to select)
    - Item 2: NVIDIA GeForce RTX 5060 Ti 16GB · GPU · ₹45,500
  - Group 2: Saved & Community Builds
    - Item 3: "1440p Balanced Beast" · ₹98,450 (Featured Build with RTX 5070)
    - Item 4: "₹1.5L AI Workstation with RTX 5070 Ti"
  - Group 3: Technical Guides
    - Item 5: "How to Choose the Right GPU: VRAM & Performance Guide"
- Bottom Keyboard Navigation Hint Bar:
  - [ ↑ / ↓ to navigate ]  [ ↵ to select ]  [ ESC to close ]
```

---

### S18. Final Review & Assembly Handoff

```markdown
Design the Final Build Review & Merchant Handoff screen.
- Heading: "Your PC is Ready to Build." with subtitle "Configuration locked. All compatibility checks passed."
- Top Metrics Strip (6 Compact Tiles in One Row):
  - Build Score: 92/100
  - Compatibility: 100%
  - Total Cost: ₹98,450 (GST Inclusive)
  - Gaming Tier: 1440p Ultra
  - Upgrade Longevity: 4+ Years
  - Power Envelope: 438W
- Comprehensive Bill of Materials Table (9 Rows):
  - Columns: Component Type | Selected Model | Verified Spec | Price (INR) | Availability
  - All 9 canonical parts listed with vendor availability status (e.g., "Available at PrimeABGB / MDComputers / Amazon India").
- Editorial Rationale Box: "Why This Build Works":
  - Text: "This configuration delivers maximum price-to-performance for Indian builders. The Ryzen 5 7600 and RTX 5070 form a zero-bottleneck 1440p pairing on the forward-compatible AM5 socket, leaving adequate thermal and power envelope for years of trouble-free performance."
- Primary Action Cluster:
  - Main Button: "Find These Parts & Retailers" (Purple-blue gradient, white text).
  - Secondary Action Bar: [ Save Build ] · [ Share Spec Link ] · [ Export PDF ] · [ Start New Build ].
```

---

### S19. Mobile Responsive Builder (390px Viewport)

```markdown
Design the dedicated Mobile Experience for the PC_DOCx Builder (iPhone / Android 390px width).
- Not a shrunken desktop: A bespoke, touch-optimized vertical layout with 24px horizontal padding.
- Mobile App Bar (Height: 56px, Sticky):
  - Left: "PC_DOCx" logo.
  - Right: Search icon, Bookmark icon, and clean Hamburger drawer toggle.
- Stepper Indicator: Compact horizontal indicator: "Step 3/7: Build".
- Vertical Stack:
  1. Mobile PC Visualizer Card (Height: 220px, Background #101218, Radius: 16px):
     - Interactive rotatable PC chassis with 6 touchable pins.
     - View switch toggle: [ Front | Side | Exploded ].
  2. Health & Score Pill (Height: 48px, Background #151820, Border: 1px solid #292E38):
     - Left: "Health: 94/100 (Excellent)" with green indicator dot.
     - Right: "Score: 92/100".
  3. Vertical Component List (9 Rows, 64px height each):
     - Clean, swipeable list showing icon, part abbreviation (e.g., "GPU"), model name ("RTX 5070 12GB"), price ("₹55,000"), and arrow right (>). Tapping opens S20 bottom sheet.
- Fixed Floating Bottom Bar (Sticky at viewport bottom, Height: 72px, Background: rgba(16, 18, 24, 0.95), backdrop-filter: blur(12px), border-top: 1px solid #292E38):
  - Left: Total "₹98,450" (18px bold white) and small "Score 92/100".
  - Right: "View Summary" primary button (Touch target ≥44px height).
```

---

### S20. Mobile Component Picker Bottom Sheet (390px Viewport)

```markdown
Design the Mobile Component Selection Bottom Sheet overlaid on the dimmed mobile builder.
- Sheet Specifications: Slide-up bottom sheet occupying 88% of screen height, radius 24px on top corners, background: #151820, border-top: 1px solid #292E38.
- Drag Handle: 36px wide rounded grey bar centered at top.
- Header:
  - Title: "Select GPU" with close icon right.
  - Search Input: Full-width search bar with clear button.
- Horizontally Scrollable Filter Chips (Single row with overflow-x scroll, no scrollbar visible):
  - [ Filter ▾ ]  [ In Stock ]  [ ≥12GB VRAM ]  [ Under ₹60K ]  [ NVIDIA ]  [ AMD ]
- Vertical Stack of Full-Width Component Cards (Padding: 16px, Radius: 16px, Background #101218):
  - Card 1: RTX 5070 12GB (Current Selection):
    - Name: NVIDIA GeForce RTX 5070 12GB
    - Price: ₹55,000 · Badge: "BEST VALUE"
    - Quick Specs: 12GB GDDR7 · 250W · Score 92
    - Action: "Currently Selected ✓" button.
  - Card 2: RTX 5060 Ti 16GB:
    - Price: ₹45,500 (-₹9,500)
    - Action: [ Select Part ] (Full width button).
  - Card 3: RX 9070 XT 16GB:
    - Price: ₹68,000 (+₹13,000 · Over Budget)
    - Action: [ Select Part ].
```

---

## SECTION 6: READY-TO-USE CSS TOKENS & HTML BOILERPLATE

To ensure that any AI generator or frontend developer produces pixel-perfect interfaces without drift, include this complete CSS tokens block at the root of the project:

```css
/* PC_DOCx Core Design Tokens - Linear/Vercel Dark Theme */
:root {
  --bg-base: #08090C;
  --bg-surface: #101218;
  --bg-card: #151820;
  --bg-elevated: #1B1F29;

  --border-subtle: #222733;
  --border-default: #292E38;
  --border-focus: #7C5CFF;

  --text-primary: #F5F7FA;
  --text-secondary: #A7ADB8;
  --text-muted: #8A91A0;

  --accent-purple: #7C5CFF;
  --accent-purple-text: #A592FF;
  --accent-blue: #4DA3FF;
  --accent-gradient: linear-gradient(135deg, #7C5CFF 0%, #4DA3FF 100%);

  --status-success: #35D07F;
  --status-warning: #FFB84D;
  --status-danger: #FF5C67;

  --radius-card: 20px;
  --radius-button: 12px;
  --radius-input: 12px;
  --radius-pill: 9999px;

  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-numbers: 'Inter', monospace;
}

body {
  margin: 0;
  padding: 0;
  background-color: var(--bg-base);
  color: var(--text-primary);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Tabular numbers on all prices and metrics */
.tabular-nums, .price, .score, .fps-metric, .wattage {
  font-feature-settings: 'tnum' 1, 'cv05' 1, 'cv11' 1;
}

/* Primary Button Specification */
.btn-primary {
  background: var(--accent-gradient);
  color: #FFFFFF;
  border: none;
  border-radius: var(--radius-button);
  padding: 12px 24px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 180ms ease, box-shadow 180ms ease;
  box-shadow: 0 4px 16px rgba(124, 92, 255, 0.25);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 24px rgba(124, 92, 255, 0.4);
}

.btn-primary:active {
  transform: translateY(0);
}

/* Quiet Secondary Action */
.btn-secondary {
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-button);
  padding: 12px 20px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 180ms ease;
}

.btn-secondary:hover {
  background: var(--bg-elevated);
  color: var(--text-primary);
  border-color: var(--border-focus);
}

/* Cards & Surface Enclosures */
.card-standard {
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-card);
  padding: 32px;
  transition: border-color 200ms ease, background 200ms ease;
}

.card-standard:hover {
  border-color: #3B4252;
}

.card-selected {
  background: var(--bg-card);
  border: 2px solid var(--accent-purple);
  box-shadow: 0 0 0 1px var(--accent-purple), 0 8px 32px rgba(124, 92, 255, 0.12);
}
```

---

## SECTION 7: PROMPT EXECUTION GUIDE

### How to Use This Master Prompt
1. **Generating Single Screens in Stitch or Figma**:
   - Copy Section 1 (Master System Prompt) + Section 2 (Tokens) + the specific screen prompt from Section 5 (e.g., S6 Main Builder).
   - Append: `"Generate this as one separate screen only, adhering strictly to the spacing and token rules."`
2. **Developing Full Frontend Components in React / HTML**:
   - Provide the CSS Tokens (Section 6) and use Section 3 (Canonical Dataset) as your mock state.
   - Use modular sub-components for the 9-part list, metric tiles, and visualizer hotspot pins.
3. **Refining Screens with Spacing Feedback**:
   - If an output appears cluttered, use Part C follow-ups:
     - *"Increase vertical spacing between sections to 140px, set card padding to 32px, and keep one primary action."*
     - *"Reduce visible data points per card to 4. Move technical specifications behind an expandable disclosure."*