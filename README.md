# PC-docx

> **India's Premier Intelligent PC Configurator & Hardware Decision Platform**

A calm, high-density, precise PC building web application engineered for Indian gamers, developers, creators, and AI practitioners.

## ✨ Key Features
- **Indian Market Optimization**: Native Indian Rupee (`₹`) formatting, live retailer stock indicators (PrimeABGB, MDComputers, Vedant Computers, Amazon India), and GST-inclusive pricing.
- **20-Screen Architecture**: Full journey from goal-oriented 3-step wizard to 3D chassis visualizer, deep 6-layer compatibility health checks, 4-year upgrade roadmap, and printable BOM review.
- **Hardware Decision Engines**:
  - Live Compatibility Engine (Socket, RAM types, GPU physical clearance, PSU headroom, thermal envelope)
  - Dynamic Efficiency Quotient (EQ) Badge Engine (Performance per Watt & Rupee)
  - Interactive PSU 80+ Efficiency Curve & Load Analysis
  - CPU ↔ GPU Bottleneck Balancing Engine
  - "Downsize & Save" Budget Optimizer
- **Dark Mode Native**: Linear / Vercel / Apple Configurator design system with tabular numbers and zero RGB neon gaming clutter.
- **Supabase Backend Ready**: PostgreSQL schema and seed data for live equipment catalog management.

## 🛠️ Tech Stack
- **Frontend**: React 18, Vite, Lucide Icons, Canvas Confetti
- **Styling**: Vanilla CSS Design Tokens (Dark-Mode Native)
- **Backend / Database**: Supabase (PostgreSQL, Storage, Realtime)

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and add your Supabase credentials:
```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

---

## 🤖 PC_DOCx AI Copilot (Google Gemini + Supabase Edge Functions)

The existing AI drawer now calls a server-side Supabase Edge Function. The browser does **not** store or send a Gemini API key. The assistant has three controlled tools:

- **Catalog search** — searches `public.equipment` and returns database-backed names, prices, specifications, and stock fields.
- **Compatibility checks** — evaluates known CPU/motherboard socket, RAM type, case form-factor, and rough PSU capacity metadata. Missing data is reported as not checked; this is not a complete hardware certification.
- **Budget alternatives** — finds cheaper catalog alternatives for selected components and estimates possible savings. It does not silently change the current build.

### 1. Configure the frontend

Copy `.env.example` to `.env` and set your Supabase project URL and public anon key:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

The browser anon key is public by design. Never put a Supabase service-role key or Gemini key in any `VITE_*` variable, React file, or committed `.env` file.

### 2. Install the Supabase CLI and sign in

Install the Supabase CLI using the official instructions, then run from the project root:

```bash
supabase login
supabase link --project-ref YOUR_PROJECT_REF
```

The project ref is the subdomain in your Supabase project URL.

### 3. Set server-side Gemini secrets

Create an API key in Google AI Studio, then set it as a Supabase Edge Function secret. Run this in PowerShell or a terminal (replace the placeholder locally; do not commit the real value):

```bash
supabase secrets set GEMINI_API_KEY=YOUR_GEMINI_API_KEY
supabase secrets set GEMINI_MODEL=gemini-2.5-flash
```

Optional: restrict browser origins for production. Replace the URL with the exact deployed website origin:

```bash
supabase secrets set CHAT_ALLOWED_ORIGIN=https://your-domain.example
```

For local development, leave `CHAT_ALLOWED_ORIGIN` unset (the function uses `*` by default). Configure production CORS to the exact site origin before launch.

### 4. Deploy the Edge Function

```bash
supabase functions deploy pc-docx-chat
```

Keep JWT verification enabled for this function. The React client invokes it through the configured Supabase client; the function uses `SUPABASE_SERVICE_ROLE_KEY` only inside the Edge Function runtime to read the catalog. Supabase provides `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to deployed functions automatically.

### 5. Ensure the catalog contains hardware records

The assistant searches `public.equipment`. Run the existing database schema in the Supabase SQL Editor if you have not already created the table, then seed your catalog through the Admin Inventory page or `supabase/seed.sql`. Product-specific recommendations and current prices are only as accurate as the records you have inserted.

### 6. Run and verify

```bash
npm install
npm run dev
```

Open the AI Copilot and test:

1. `Check compatibility for my current build.`
2. `Search the catalog for GPUs under ₹30000.`
3. `Find cheaper alternatives for my current build under ₹80000.`

If the chat reports that Supabase is not configured, check `.env` and restart Vite. If the function returns a configuration error, verify `GEMINI_API_KEY` in Supabase Edge Function secrets and redeploy. If product search is empty, seed `public.equipment` first.

### Operational and safety notes

- The Gemini API key and service-role key are server-side secrets only.
- The assistant can read catalog data and return advice; it cannot mutate a user's build.
- The backend validates message length and trims history, and tool arguments are validated before querying.
- For a public production deployment, add edge/API rate limiting (and optionally CAPTCHA/Turnstile) to control Gemini spend. Review the existing database RLS policies before production; the supplied schema includes broad write policies that should be tightened for an internet-facing admin inventory.
- Compatibility output is a metadata-based guide, not a guarantee of BIOS support, physical clearance, connector support, or real-world stability.
