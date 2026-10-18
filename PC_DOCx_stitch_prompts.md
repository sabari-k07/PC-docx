# PC_DOCx — Stitch Prompt Set (spacious, one screen per prompt)

How to use: paste PART A once at the start of the project (or at the top of any prompt where Stitch seems to forget it). Then paste ONE screen prompt from PART B at a time, in order. Each prompt ends with "Generate this as one separate screen only."

---

## PART A — GLOBAL CONTEXT (paste first)

Product: **PC_DOCx**, a premium, intelligent PC builder for India (prices in ₹, Indian grouping like ₹1,00,000). Tagline: "Build smarter. Play harder. Create without limits." Feel: Linear / Vercel / Apple configurator. Calm, precise, premium, beginner-friendly. Not a gaming site, not an admin dashboard, not a store.

**Colors (dark):** background #08090C, secondary #101218, card #151820, elevated #1B1F29, text #F5F7FA, secondary text #A7ADB8, muted text #8A91A0, border #292E38, accent purple #7C5CFF (text-safe #A592FF), accent blue #4DA3FF, success #35D07F, warning #FFB84D, danger #FF5C67. Purple→blue gradient ONLY on the primary button, hero accent and score ring. No neon, no glowing borders. **Font:** Inter. Tabular numbers for prices and scores.

**Canonical build (use these exact numbers everywhere):** Budget ₹1,00,000 · Total ₹98,450 · Remaining ₹1,550 · Build Score 92/100 · Build Health 94/100 (Excellent) · Compatibility 100% · Power 438W.
CPU Ryzen 5 7600 ₹17,500 · Motherboard MSI PRO B650M-P ₹9,500 · GPU RTX 5070 12GB ₹55,000 · RAM Corsair 16GB DDR5-6000 ₹4,200 · Storage Crucial P3 Plus 1TB ₹4,500 · PSU Corsair CX650 650W ₹3,800 · Case Deepcool CC560 ₹2,450 · Cooler Deepcool AK400 ₹1,500 · OS Install later ₹0.

### SPACING AND DENSITY RULES (apply to every screen)
The interface must feel **open, calm and uncluttered**, never cramped or "filled".
- Content max-width 1200px, centered, on a 12-column grid with 32px gutters. Page side padding 64px desktop, 24px mobile.
- **Vertical space between sections: 120–160px desktop, 64px mobile.** Page top padding below the navbar: 96px.
- Navbar height 72px. Card padding 32px (24px on small cards). Gap between cards 24–32px. Card radius 20px, buttons 12px, inputs 12px.
- **One job per screen, one idea per section.** One primary button per screen; secondary actions as quiet text buttons.
- Maximum 3 cards per row (use-case grid is 3×2). Maximum 4–5 data points visible per card. Everything else goes behind "Technical details" or an expander.
- Body text 16–17px with line height 1.7 and a max line length of ~65 characters. Section headings 32–40px with 16px space below, then a 48px gap before content.
- Large empty areas are intentional. Do NOT fill the screen to the edges. Do NOT place multiple dense panels side by side on small screens.
- Lists rows at least 72px tall with a 1px divider. No tiny text below 13px.

---

## PART B — SCREEN PROMPTS (run one at a time)

### S1. Landing page (desktop, long scroll)
Design the PC_DOCx landing page as one tall page, following the spacing rules. Sections, each separated by 140px:
1. **Navbar** (transparent): logo "PC_DOCx" left; Build · Explore Builds · Compare · Performance · Guides center; Search, Saved Builds, Theme, Profile icons and a **Build My PC** button right.
2. **Hero (full viewport height):** eyebrow THE SMARTER PC BUILDER; H1 "Build a PC that actually fits your needs." (72px bold, max 3 lines, left aligned); body "Tell PC_DOCx your budget and what you want to do. We'll help you create a balanced, compatible and upgrade-ready PC without the guesswork."; buttons **Build My PC** (primary) and **Explore Builds** (quiet). On the right, a large premium PC tower illustration with five small labels (CPU, GPU, RAM, Cooling, Power). Lots of empty space around the tower.
3. **Trust strip:** four items in one row, each with an icon and a short line: Live Compatibility, Performance Insights, Budget Optimization, Upgrade Planning.
4. **"How it works":** 3 large steps (Choose your goal → Set your budget → Get a build you can trust), each with a big number, a title and two lines of text.
5. **"What are you building for?"** subtitle "Start with your goal. PC_DOCx handles the complexity." Six large cards in a 3×2 grid: Gaming, Development, AI & Machine Learning, Content Creation, Productivity, Ultimate Performance, each with an icon, title and one-line description.
6. **Featured builds:** 3 cards (₹60K 1080p Gaming, ₹1L 1440p Beast, ₹1.5L AI Workstation) with price, CPU, GPU and a score.
7. **Final CTA band:** "Your next PC starts here." with the Build My PC button.
8. **Footer:** minimal, 4 link columns.
Generate this as one separate screen only.

### S2. Wizard step 1: purpose
A full-screen focused page (no marketing content). Slim top bar with logo and a step indicator "Step 1 of 3 · Purpose". Centered content: H1 "What are you building for?" and subtitle "Start with your goal. PC_DOCx handles the complexity." Six large selectable cards in a 3×2 grid: Gaming ("High FPS gaming and competitive performance"), Development ("Programming, containers and development workloads"), AI & Machine Learning ("Local AI, LLMs, CUDA and GPU workloads"), Content Creation ("Video editing, rendering and creative workflows"), Productivity ("Fast and reliable everyday computing"), Ultimate Performance ("No compromises. Maximum performance."). Show **Gaming as selected** (purple border, check icon, soft purple tint). Bottom: a back link and a **Continue** button. Generate this as one separate screen only.

### S3. Wizard step 2: budget
Same focused layout, "Step 2 of 3 · Budget". H1 "What's your budget?" A very large centered amount **₹80,000** (96px). Below it a wide, smooth slider (₹30,000 to ₹3,00,000) with a purple filled track. Under the slider, five preset chips: ₹50K, ₹75K, ₹1L, ₹1.5L, ₹2L+ (₹75K slightly highlighted as nearest). Small muted text: "Prices are estimated and may vary by retailer." Back link and **Continue** button. Generate this as one separate screen only.

### S4. Wizard step 3: priority
Same layout, "Step 3 of 3 · Priority". H1 "What matters most?" Four large option cards in one row: Raw performance, Balanced (selected), Best value, Upgrade-proof, each with an icon and a one-line explanation. Below, two quiet optional rows: platform preference (No preference / AMD / Intel) and a toggle "I already have some parts". Primary button **Generate My Build**. Generate this as one separate screen only.

### S5. Recommended build result
Page heading "Your recommended build" with subtitle "Optimized for your workload and budget." First section: a row of 5 large metric tiles with generous padding: Build Score 92/100 (gradient ring), Compatibility 100% Compatible, Estimated Price ₹98,450, Power Draw 438W, Budget Remaining ₹1,550. Below, a Build Health bar 94/100 "Excellent". Then, 120px lower, the parts list: 9 rows of 80px each (component label, product name, price, a green "✓ Compatible" tag, and a "Why this part?" text link). To the right of the list, sticky and uncluttered: a card with the total and the primary button **Customize in Builder** and a quiet **Save Build** link. Generate this as one separate screen only.

### S6. Main builder (desktop)
Builder page with the slim journey stepper at top (Purpose · Budget · Build · Optimize · Performance · Upgrade · Review; "Build" active). Three columns with breathing room: LEFT (300px) component navigation with 9 rows of 72px (CPU, Motherboard, GPU, RAM, Storage, PSU, Case, CPU Cooler, Operating System), each showing the label, product name, price and a small status tag; CENTER (flexible, at least 520px) a large PC visualizer showing an exploded PC illustration with 6 hotspot dots (GPU highlighted with a tooltip "RTX 5070 12GB · 12GB VRAM"), view switch Front / Side / Exploded, and small Zoom and Reset controls; RIGHT (340px, sticky) "YOUR BUILD" card: Total ₹98,450, Budget ₹1,00,000, Remaining ₹1,550, Build Health 94/100, a compact 7-line checklist with check icons, then one primary button **View Full Build** and quiet links Optimize, Save, Share. A Beginner / Advanced toggle sits in the top right of the page. Keep ample empty space in the center column; do not add extra panels. Generate this as one separate screen only.

### S7. Component picker (GPU)
Show the builder dimmed in the background with a large right-side drawer (720px) titled "Choose your GPU". Search field "Search components...", filter chips (Price, Brand, VRAM, Power, Availability) in one row, sort dropdown (Recommended). A vertical list of 5 generous product cards (not a tight grid): RTX 5060 8GB ₹31,500 · RTX 5060 Ti 16GB ₹45,500 · **RTX 5070 12GB ₹55,000 (selected, BEST VALUE)** · RX 9070 XT 16GB ₹68,000 · RTX 5070 Ti 16GB ₹78,000. Each card shows image, name, brand, price, performance score, VRAM, power, rating and buttons Select / Compare, plus a small line showing the impact of choosing it (e.g. "+₹23,000 · +4 performance · over budget by ₹21,450"). One card shows "Price unavailable" and one shows a red "This component doesn't work with your current build" flag. Generate this as one separate screen only.

### S8. Compatibility center
Page with heading "Build Health", a large score 94/100 and status "Excellent". Below, 6 check rows of 72px with icon + text status: CPU / Motherboard ✓ Compatible · RAM / Motherboard ✓ Compatible · GPU / Case ✓ Fits · PSU / System ⚠ Limited headroom (amber) · CPU / Cooler ✓ Compatible · BIOS ✓ Ready. On the right, an open explanation panel: "PSU Headroom Warning. Your selected PSU provides limited headroom. Your system should work, but future GPU upgrades may require more power. Recommendation: Consider a 750W PSU." with button **Fix Automatically** and a small preview of the change. Generate this as one separate screen only.

### S9. Budget optimizer
Heading "You're ₹8,500 over budget." Subtitle "We found three ways to reduce cost while preserving most of your performance." Three large option cards in a row, each with a before/after line, savings and an impact tag: Change SSD (Save ₹2,000, Minimal), Change RAM (Save ₹1,500, Minimal), Change Case (Save ₹5,500, None). Below, a clean before/after summary: Original ₹1,08,500 → Optimized ₹99,500, Performance retained 97%. Buttons: **Apply Best Optimization** (primary) and **View Alternatives** (quiet). Generate this as one separate screen only.

### S10. Performance dashboard: gaming
Heading "How will your PC perform?" Tabs: Gaming (active), AI / ML, Development, Content Creation. A 1080p / 1440p / 4K selector with 1440p active. Four large benchmark cards in a 2×2 grid: Cyberpunk 2077 92 FPS, GTA V 148 FPS, Valorant 320 FPS, Forza Horizon 5 118 FPS (each with a small bar). Below, four stat tiles: Average FPS 170, 1% Low 131, GPU Utilization 97%, CPU Utilization 58%, and one clean chart. Caption: "1440p · High preset · DLSS Quality · no ray tracing". Disclaimer: "Performance estimates are indicative and depend on game settings, drivers and system configuration." Generate this as one separate screen only.

### S11. Performance dashboard: AI / ML
Same page, AI / ML tab active. Tiles: VRAM 12GB, CUDA Supported, Local LLM Excellent, Stable Diffusion Excellent. A large VRAM bar (12GB) with markers. Three model rows: 7B Excellent (~5.5GB), 13B Good (~8.5GB), 30B+ Not practical (~19GB, exceeds 12GB). Note: "SDXL 1024×1024 · about 6 seconds per image". Generate this as one separate screen only.

### S12. Compare builds
Heading "Compare Builds". Three columns, Build A "Value 1080p", Build B "1440p Balanced" (highlighted, "Recommended"), Build C "Creator / AI". Rows with 64px height: Price ₹74,900 / ₹98,450 / ₹1,32,900; CPU; GPU (RTX 5060 8GB / RTX 5070 12GB / RTX 5070 Ti 16GB); RAM; Storage; Power 342W / 438W / 512W; Gaming Score 76 / 92 / 97; AI Score 58 / 84 / 93; Upgrade Score 70 / 88 / 82; Value Score 88 / 94 / 79. Highlight the best in each row with a check icon. Bottom card: "Best choice for your budget: Build B. Best balance of performance, upgradeability and price." Generate this as one separate screen only.

### S13. Upgrade roadmap
Heading "Your Upgrade Path" with an "Upgrade Ready — 92%" gauge. A vertical timeline with large spacing: Current Build (₹98,450) → Year 1 "Upgrade to 32GB RAM" (~₹6,500, ✓ Compatible) → Year 2 "Upgrade GPU" (+ 750W PSU, ~₹31,500, ⚠ Requires PSU upgrade) → Year 3 "CPU upgrade on the same AM5 board" (~₹28,000, ✓ Compatible). Each step shows estimated cost, expected performance improvement and status. Generate this as one separate screen only.

### S14. Explore builds
Heading "Explore PC Builds", subtitle "Find inspiration or start with a proven configuration." One row of filter chips: Gaming, AI, Developer, Creator, Budget, Performance. A 2-column grid of 4 large cards: ₹60K 1080p Gaming, ₹1L 1440p Beast, ₹1.5L AI Workstation, ₹2L Creator Pro, each showing price, CPU, GPU, RAM, a score and a use-case tag, with buttons **View Build** and **Use This Build**. Generate this as one separate screen only.

### S15. Saved builds
Heading "My Builds". A grid of 3 cards (name, price, score, compatibility, last updated) with an overflow menu (Open, Duplicate, Compare, Share, Delete). Also design the empty state on its own screen frame: centered illustration, "Your next PC starts here.", "Save your first build and come back anytime." and a **Start Building** button. Generate as two separate screens.

### S16. Guides
Heading "PC Building Guides". A row of category tabs: Beginner, Gaming, AI, Performance, Upgrades, Troubleshooting. A 3-column grid of 6 article cards (category, title, short description, reading time): How to choose the right GPU · How much RAM do you actually need? · How to calculate PSU requirements · AMD vs Intel for gaming · What is VRAM? · How to build an AI PC. Generous card padding. Generate this as one separate screen only.

### S17. Global search overlay
A centered search overlay over a dimmed page. Input placeholder "Search CPUs, GPUs, builds or guides..." with the typed text "rtx". Results grouped into Components (RTX 5070 · GPU · ₹55,000; RTX 5060 Ti · GPU · ₹45,500), Builds (Best ₹1L Gaming Builds), Guides (How to choose the right GPU). One result highlighted, keyboard hints (↑↓ to move, Enter to open, Esc to close) at the bottom. Generate this as one separate screen only.

### S18. Final review
Heading "Your PC is ready." A row of 6 metric tiles: Build Score 92/100, Compatibility 100%, Total ₹98,450, Gaming 1440p Excellent, Upgradeability Excellent, Power 438W. Below, a clean component summary table (9 rows). Then a section "Why this build?" with the text "Balanced for 1440p gaming, development and everyday productivity while leaving room for future upgrades." Buttons: **Find These Parts** (primary), and quiet Save Build, Share Build, Compare, Start Over. Generate this as one separate screen only.

### S19. Mobile builder (390px wide)
Mobile layout, not a shrunken desktop. Top bar: logo, search icon, menu icon. Vertical flow with 24px padding: component list (9 rows of 64px), PC visualizer card, Build Health card (94/100), build summary card. A sticky bottom bar showing "₹98,450 · 92/100" and a **View Build** button. Generate this as one separate screen only.

### S20. Mobile component picker (390px wide)
Mobile bottom sheet over the dimmed builder, titled "Choose your GPU", with a search field, a horizontally scrollable row of filter chips, and a vertical list of full-width product cards with a **Select** button each. Generate this as one separate screen only.

---

## PART C — FOLLOW-UP PROMPTS (use if a result still feels cramped)
- "Increase vertical spacing between sections to 140px, increase card padding to 32px, and remove any element that isn't essential. Keep one primary action."
- "Reduce the number of visible data points per card to 4. Move the rest into an expandable 'Technical details' section."
- "Make the layout narrower and more centered (max width 1200px) with larger side margins, and make headings larger."
- "Split this long page into separate screens, one per section."
