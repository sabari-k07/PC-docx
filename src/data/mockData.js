// PC_DOCx Mock Data, Hardware Catalogs, and Benchmarks (All prices in INR ₹)

export const CANONICAL_BUILD = {
  id: "build-canonical-1440p",
  name: "1440p Balanced Beast",
  purpose: "Gaming",
  priority: "Balanced",
  platform: "AMD",
  targetBudget: 100000,
  score: 92,
  healthScore: 94,
  healthLabel: "Excellent",
  compatibility: "100%",
  powerDraw: 438,
  recommendedPsuWatts: 650,
  components: {
    cpu: {
      id: "cpu-r5-7600",
      category: "cpu",
      categoryName: "CPU",
      brand: "AMD",
      model: "Ryzen 5 7600",
      name: "AMD Ryzen 5 7600",
      price: 17500,
      tdp: 65,
      socket: "AM5",
      cores: "6 Cores / 12 Threads",
      clock: "3.8 GHz (5.1 GHz Boost)",
      status: "Compatible",
      whyThisPart: "Sweet spot for 1440p gaming and compiles on the modern AM5 platform with 65W low thermal output."
    },
    motherboard: {
      id: "mobo-msi-b650m-p",
      category: "motherboard",
      categoryName: "Motherboard",
      brand: "MSI",
      model: "PRO B650M-P",
      name: "MSI PRO B650M-P DDR5",
      price: 9500,
      socket: "AM5",
      formFactor: "Micro-ATX",
      ramType: "DDR5",
      ramSlots: 4,
      m2Slots: 2,
      pcieGen: "PCIe 4.0",
      status: "Compatible",
      whyThisPart: "Stable VRMs, 4 DDR5 DIMM slots, dual M.2 Gen4 NVMe slots, and native AM5 forward compatibility."
    },
    gpu: {
      id: "gpu-rtx-5070",
      category: "gpu",
      categoryName: "GPU",
      brand: "NVIDIA",
      model: "GeForce RTX 5070 12GB",
      name: "NVIDIA GeForce RTX 5070 12GB",
      price: 55000,
      vram: "12GB GDDR7",
      tdp: 250,
      lengthMm: 242,
      perfScore: 92,
      badge: "Best Value",
      status: "Compatible",
      whyThisPart: "Exceptional 1440p rasterization and DLSS 4 frame generation. Native CUDA acceleration for local LLMs."
    },
    ram: {
      id: "ram-corsair-16-d5",
      category: "ram",
      categoryName: "RAM",
      brand: "Corsair",
      model: "Vengeance 16GB (1x16GB) DDR5-6000",
      name: "Corsair Vengeance 16GB DDR5-6000",
      price: 4200,
      type: "DDR5",
      speed: "6000 MHz",
      capacityGb: 16,
      latency: "CL36",
      status: "Compatible",
      whyThisPart: "AMD EXPO certified 6000MHz sweet spot. Leaves open slot for simple 32GB drop-in upgrade."
    },
    storage: {
      id: "ssd-crucial-p3-plus-1tb",
      category: "storage",
      categoryName: "Storage",
      brand: "Crucial",
      model: "P3 Plus 1TB PCIe 4.0 M.2 NVMe",
      name: "Crucial P3 Plus 1TB NVMe",
      price: 4500,
      capacityGb: 1000,
      interface: "PCIe 4.0 x4",
      readSpeed: "5000 MB/s",
      status: "Compatible",
      whyThisPart: "Rapid 5000 MB/s read speeds for instant Windows boots and DirectStorage game loading."
    },
    psu: {
      id: "psu-corsair-cx650",
      category: "psu",
      categoryName: "PSU",
      brand: "Corsair",
      model: "CX650 650W 80+ Bronze",
      name: "Corsair CX650 650W 80+ Bronze",
      price: 3800,
      wattage: 650,
      rating: "80+ Bronze",
      modular: "Non-Modular",
      status: "Limited Headroom",
      statusType: "warning",
      whyThisPart: "Reliable Japanese primary capacitors. Ample 438W system power, though tight for future 80-class GPUs."
    },
    case: {
      id: "case-deepcool-cc560",
      category: "case",
      categoryName: "Case",
      brand: "Deepcool",
      model: "CC560 Mid-Tower with 4 LED Fans",
      name: "Deepcool CC560 Mid-Tower",
      price: 2450,
      formFactor: "ATX / Micro-ATX",
      maxGpuLength: 370,
      maxCoolerHeight: 163,
      includedFans: 4,
      status: "Fits",
      whyThisPart: "High airflow mesh front panel, tempered glass, and 4 included pre-wired fans saving ₹1,500 on extras."
    },
    cooler: {
      id: "cooler-deepcool-ak400",
      category: "cooler",
      categoryName: "CPU Cooler",
      brand: "Deepcool",
      model: "AK400 Single-Tower Performance Air Cooler",
      name: "Deepcool AK400 Air Cooler",
      price: 1500,
      tdpSupport: 220,
      heightMm: 155,
      noiseLevel: "29 dBA",
      status: "Compatible",
      whyThisPart: "4 direct-touch heatpipes capable of 220W dissipation, keeping the 65W 7600 whisper-quiet under 68°C."
    },
    os: {
      id: "os-install-later",
      category: "os",
      categoryName: "Operating System",
      brand: "Microsoft",
      model: "Install later (Windows 11 / Linux)",
      name: "Install Later (USB UEFI)",
      price: 0,
      status: "Ready",
      whyThisPart: "Download official Microsoft ISO onto USB drive; license key can be activated later."
    }
  }
};

// Calculate canonical total
export const getBuildTotal = (components) => {
  return Object.values(components).reduce((sum, item) => sum + (item ? item.price : 0), 0);
};

// Dynamic Efficiency Quotient (EQ) Badge Engine
// Calculates: Gaming FPS / (TDP Watts × Price ₹) normalized to 1.0–9.9 scale
export const calculateComponentEQ = (item, category = 'gpu') => {
  if (!item) return { score: 0, grade: 'N/A', label: 'Unrated', badgeColor: 'var(--text-muted)' };
  
  const price = item.price || item.price_inr || 1;
  const tdp = Math.max(item.tdp || item.wattage || 65, 15);
  const perf = item.perfScore || item.perf_score || (category === 'gpu' ? 85 : 80);

  // Raw quotient: (perf * 100,000) / (tdp * price)
  const rawQuotient = (perf * 100000) / (tdp * price);
  const normalizedScore = Math.min(9.9, Math.max(4.0, Number((rawQuotient * 1.32).toFixed(1))));

  let grade = 'B';
  let label = 'Balanced Efficiency';
  let badgeColor = 'var(--text-muted)';

  if (normalizedScore >= 8.5) {
    grade = 'A+';
    label = 'EQ Champion (Peak FPS/W/₹)';
    badgeColor = 'var(--status-success)';
  } else if (normalizedScore >= 7.0) {
    grade = 'A';
    label = 'High Efficiency Sweet Spot';
    badgeColor = 'var(--accent-purple)';
  } else if (normalizedScore >= 5.5) {
    grade = 'B';
    label = 'Standard Efficiency';
    badgeColor = 'var(--text-secondary)';
  } else {
    grade = 'C';
    label = 'High Power Draw';
    badgeColor = 'var(--status-warning)';
  }

  return {
    score: normalizedScore,
    grade,
    label,
    badgeColor,
    rawQuotient: rawQuotient.toFixed(2)
  };
};

export const COMPONENT_CATALOG = {
  cpu: [
    {
      id: "cpu-r5-5600",
      brand: "AMD",
      name: "AMD Ryzen 5 5600",
      price: 10200,
      socket: "AM4",
      tdp: 65,
      cores: "6C / 12T",
      clock: "3.5 GHz (4.4 GHz Boost)",
      perfScore: 72,
      inStock: true
    },
    {
      id: "cpu-i5-12400f",
      brand: "Intel",
      name: "Intel Core i5-12400F",
      price: 10400,
      socket: "LGA1700",
      tdp: 65,
      cores: "6C / 12T",
      clock: "2.5 GHz (4.4 GHz Boost)",
      perfScore: 74,
      inStock: true
    },
    {
      id: "cpu-r5-7600",
      brand: "AMD",
      name: "AMD Ryzen 5 7600",
      price: 17500,
      socket: "AM5",
      tdp: 65,
      cores: "6C / 12T",
      clock: "3.8 GHz (5.1 GHz Boost)",
      perfScore: 88,
      badge: "Best Value",
      inStock: true
    },
    {
      id: "cpu-i5-14600k",
      brand: "Intel",
      name: "Intel Core i5-14600K",
      price: 28500,
      socket: "LGA1700",
      tdp: 125,
      cores: "14C / 20T",
      clock: "3.5 GHz (5.3 GHz Boost)",
      perfScore: 94,
      inStock: true
    },
    {
      id: "cpu-r7-7800x3d",
      brand: "AMD",
      name: "AMD Ryzen 7 7800X3D",
      price: 38900,
      socket: "AM5",
      tdp: 120,
      cores: "8C / 16T · 3D V-Cache",
      clock: "4.2 GHz (5.0 GHz Boost)",
      perfScore: 99,
      badge: "Fastest Gaming CPU",
      inStock: true
    }
  ],
  motherboard: [
    {
      id: "mobo-msi-a520m",
      brand: "MSI",
      name: "MSI A520M-A PRO",
      price: 4500,
      socket: "AM4",
      formFactor: "Micro-ATX",
      ramType: "DDR4",
      inStock: true
    },
    {
      id: "mobo-msi-b650m-p",
      brand: "MSI",
      name: "MSI PRO B650M-P DDR5",
      price: 9500,
      socket: "AM5",
      formFactor: "Micro-ATX",
      ramType: "DDR5",
      badge: "Recommended",
      inStock: true
    },
    {
      id: "mobo-gigabyte-b650-gaming",
      brand: "Gigabyte",
      name: "Gigabyte B650 Gaming X AX (Wi-Fi)",
      price: 15400,
      socket: "AM5",
      formFactor: "ATX",
      ramType: "DDR5",
      inStock: true
    },
    {
      id: "mobo-asus-b760m",
      brand: "ASUS",
      name: "ASUS Prime B760M-A WiFi DDR5",
      price: 13900,
      socket: "LGA1700",
      formFactor: "Micro-ATX",
      ramType: "DDR5",
      inStock: true
    }
  ],
  gpu: [
    {
      id: "gpu-rtx-5060",
      brand: "NVIDIA",
      name: "NVIDIA GeForce RTX 5060 8GB",
      price: 31500,
      vram: "8GB GDDR6",
      tdp: 115,
      perfScore: 74,
      deltaDesc: "Save ₹23,500 · -18 Gaming Score · Fits budget easily",
      inStock: true
    },
    {
      id: "gpu-rtx-5060-ti",
      brand: "NVIDIA",
      name: "NVIDIA GeForce RTX 5060 Ti 16GB",
      price: 45500,
      vram: "16GB GDDR6",
      tdp: 165,
      perfScore: 83,
      deltaDesc: "Save ₹9,500 · -9 Gaming Score · Generous 16GB VRAM",
      inStock: true
    },
    {
      id: "gpu-rtx-5070",
      brand: "NVIDIA",
      name: "NVIDIA GeForce RTX 5070 12GB",
      price: 55000,
      vram: "12GB GDDR7",
      tdp: 250,
      perfScore: 92,
      badge: "BEST VALUE · 1440p SWEET SPOT",
      deltaDesc: "Current selection · Balanced 1440p ultra & AI",
      inStock: true
    },
    {
      id: "gpu-rx-9070-xt",
      brand: "AMD",
      name: "AMD Radeon RX 9070 XT 16GB",
      price: 68000,
      vram: "16GB GDDR6",
      tdp: 300,
      perfScore: 95,
      deltaDesc: "+₹13,000 (Over budget by ₹11,450) · +3 Gaming Score",
      inStock: true
    },
    {
      id: "gpu-rtx-5070-ti",
      brand: "NVIDIA",
      name: "NVIDIA GeForce RTX 5070 Ti 16GB",
      price: 78000,
      vram: "16GB GDDR7",
      tdp: 285,
      perfScore: 97,
      deltaDesc: "+₹23,000 · +5 Gaming Score · Requires 750W PSU upgrade",
      warning: "Requires 750W+ PSU upgrade",
      inStock: true
    }
  ],
  ram: [
    {
      id: "ram-corsair-16-d4",
      brand: "Corsair",
      name: "Corsair Vengeance LPX 16GB (2x8GB) DDR4-3200",
      price: 3100,
      type: "DDR4",
      capacityGb: 16,
      speed: "3200 MHz",
      inStock: true
    },
    {
      id: "ram-corsair-16-d5",
      brand: "Corsair",
      name: "Corsair Vengeance 16GB (1x16GB) DDR5-6000",
      price: 4200,
      type: "DDR5",
      capacityGb: 16,
      speed: "6000 MHz",
      badge: "Optimal",
      inStock: true
    },
    {
      id: "ram-gskill-32-d5",
      brand: "G.Skill",
      name: "G.Skill Flare X5 32GB (2x16GB) DDR5-6000 CL30",
      price: 9800,
      type: "DDR5",
      capacityGb: 32,
      speed: "6000 MHz",
      badge: "Enthusiast",
      inStock: true
    }
  ],
  storage: [
    {
      id: "ssd-kingston-nv2-1tb",
      brand: "Kingston",
      name: "Kingston NV2 1TB PCIe 4.0 NVMe",
      price: 4100,
      capacityGb: 1000,
      readSpeed: "3500 MB/s",
      inStock: true
    },
    {
      id: "ssd-crucial-p3-plus-1tb",
      brand: "Crucial",
      name: "Crucial P3 Plus 1TB PCIe 4.0 NVMe",
      price: 4500,
      capacityGb: 1000,
      readSpeed: "5000 MB/s",
      badge: "Recommended",
      inStock: true
    },
    {
      id: "ssd-wd-black-2tb",
      brand: "WD",
      name: "WD Black SN850X 2TB NVMe with Heatsink",
      price: 13900,
      capacityGb: 2000,
      readSpeed: "7300 MB/s",
      badge: "High Endurance",
      inStock: true
    }
  ],
  psu: [
    {
      id: "psu-corsair-cx650",
      brand: "Corsair",
      name: "Corsair CX650 650W 80+ Bronze",
      price: 3800,
      wattage: 650,
      rating: "80+ Bronze",
      statusText: "67% load under peak gaming",
      inStock: true
    },
    {
      id: "psu-corsair-rm750e",
      brand: "Corsair",
      name: "Corsair RM750e 750W 80+ Gold Fully Modular ATX 3.0",
      price: 8900,
      wattage: 750,
      rating: "80+ Gold",
      badge: "Recommended for Headroom",
      inStock: true
    },
    {
      id: "psu-msi-a850gl",
      brand: "MSI",
      name: "MSI MAG A850GL 850W 80+ Gold PCIe 5.0",
      price: 10800,
      wattage: 850,
      rating: "80+ Gold",
      inStock: true
    }
  ],
  case: [
    {
      id: "case-deepcool-cc560",
      brand: "Deepcool",
      name: "Deepcool CC560 Mid-Tower (4 Fans Included)",
      price: 2450,
      maxGpuLength: 370,
      badge: "Best Value",
      inStock: true
    },
    {
      id: "case-ant-ice-511",
      brand: "Ant Esports",
      name: "Ant Esports ICE-511 Max Mesh ARGB",
      price: 3400,
      maxGpuLength: 360,
      inStock: true
    },
    {
      id: "case-lianli-lancool-216",
      brand: "Lian Li",
      name: "Lian Li Lancool 216 RGB High Airflow",
      price: 7600,
      maxGpuLength: 392,
      badge: "Premium Acoustics",
      inStock: true
    }
  ],
  cooler: [
    {
      id: "cooler-stock",
      brand: "AMD",
      name: "AMD Wraith Stealth Included Cooler",
      price: 0,
      tdpSupport: 65,
      inStock: true
    },
    {
      id: "cooler-deepcool-ak400",
      brand: "Deepcool",
      name: "Deepcool AK400 Performance Air Cooler",
      price: 1500,
      tdpSupport: 220,
      badge: "Whisper Quiet",
      inStock: true
    },
    {
      id: "cooler-deepcool-ls520",
      brand: "Deepcool",
      name: "Deepcool LS520 240mm ARGB Liquid AIO",
      price: 6800,
      tdpSupport: 280,
      badge: "Liquid Cooler",
      inStock: true
    }
  ],
  os: [
    {
      id: "os-install-later",
      brand: "Microsoft",
      name: "Install Later (USB UEFI Windows / Linux)",
      price: 0,
      badge: "Most Common",
      inStock: true
    },
    {
      id: "os-win11-home",
      brand: "Microsoft",
      name: "Microsoft Windows 11 Home 64-Bit OEM DVD/USB",
      price: 9500,
      inStock: true
    }
  ]
};

export const BUILD_GOALS = [
  {
    id: "gaming",
    title: "Gaming",
    tagline: "High FPS gaming, competitive esports & AAA immersion",
    icon: "Gamepad2",
    recommendedGpuTier: "High",
    recommendedRamGb: 16
  },
  {
    id: "development",
    title: "Development",
    tagline: "Programming, Docker containers, multi-core compile & dev VMs",
    icon: "Code2",
    recommendedGpuTier: "Medium",
    recommendedRamGb: 32
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    tagline: "Local LLMs, CUDA acceleration, PyTorch models & heavy VRAM",
    icon: "Cpu",
    recommendedGpuTier: "High VRAM",
    recommendedRamGb: 32
  },
  {
    id: "creation",
    title: "Content Creation",
    tagline: "4K video editing, 3D rendering, Blender, DaVinci & animation",
    icon: "Video",
    recommendedGpuTier: "High",
    recommendedRamGb: 32
  },
  {
    id: "productivity",
    title: "Productivity",
    tagline: "Fast, quiet, multi-monitor reliability for everyday workflow",
    icon: "Briefcase",
    recommendedGpuTier: "Entry",
    recommendedRamGb: 16
  },
  {
    id: "ultimate",
    title: "Ultimate Performance",
    tagline: "No compromises. Flagship silicon, zero limits & maximum power",
    icon: "Zap",
    recommendedGpuTier: "Flagship",
    recommendedRamGb: 64
  }
];

export const FEATURED_BUILDS = [
  {
    id: "featured-1",
    name: "1080p Pure Esports Champion",
    tag: "Budget King",
    price: 59900,
    score: 81,
    healthScore: 96,
    cpu: "Intel Core i5-12400F",
    gpu: "NVIDIA RTX 5060 8GB",
    ram: "16GB DDR4",
    storage: "1TB NVMe",
    power: 310,
    useCase: "Esports & 1080p Gaming"
  },
  {
    id: "featured-2",
    name: "1440p Balanced Beast",
    tag: "Most Popular",
    price: 98450,
    score: 92,
    healthScore: 94,
    cpu: "AMD Ryzen 5 7600",
    gpu: "NVIDIA RTX 5070 12GB",
    ram: "16GB DDR5-6000",
    storage: "1TB Gen4 NVMe",
    power: 438,
    useCase: "1440p Ultra & Local AI"
  },
  {
    id: "featured-3",
    name: "AI Workstation & 4K Rig",
    tag: "Powerhouse",
    price: 148900,
    score: 96,
    healthScore: 98,
    cpu: "AMD Ryzen 7 7800X3D",
    gpu: "NVIDIA RTX 5070 Ti 16GB",
    ram: "32GB DDR5-6000",
    storage: "2TB Gen4 NVMe",
    power: 512,
    useCase: "Heavy LLMs & 4K Gaming"
  },
  {
    id: "featured-4",
    name: "Creator Pro Studio",
    tag: "Professional",
    price: 198500,
    score: 98,
    healthScore: 99,
    cpu: "Intel Core i7-14700K",
    gpu: "NVIDIA RTX 5080 16GB",
    ram: "64GB DDR5",
    storage: "4TB High-Speed Gen4",
    power: 650,
    useCase: "8K Video & 3D Pipelines"
  }
];

export const BENCHMARKS_1440P = {
  games: [
    { title: "Cyberpunk 2077", preset: "1440p Ultra · DLSS Quality", fps: 92, low1Pct: 74, maxTarget: 120 },
    { title: "Grand Theft Auto V", preset: "1440p Very High · Max FXAA", fps: 148, low1Pct: 118, maxTarget: 165 },
    { title: "Valorant", preset: "1440p Competitive High", fps: 320, low1Pct: 265, maxTarget: 360 },
    { title: "Forza Horizon 5", preset: "1440p Extreme Preset", fps: 118, low1Pct: 98, maxTarget: 144 }
  ],
  stats: {
    averageFps: 170,
    low1Pct: 131,
    gpuUtilization: 97,
    cpuUtilization: 58
  },
  aiTelemetry: {
    vramTotal: 12,
    models: [
      { name: "Llama 3 8B (Q4_K_M)", vramNeeded: 5.5, status: "Excellent", speedTokensPerSec: 48, fits: true },
      { name: "Mistral 7B Instruct", vramNeeded: 5.8, status: "Excellent", speedTokensPerSec: 52, fits: true },
      { name: "Qwen 2.5 14B (Q4)", vramNeeded: 9.2, status: "Good", speedTokensPerSec: 22, fits: true },
      { name: "Llama 3 70B (Q4)", vramNeeded: 39.0, status: "Not Practical", speedTokensPerSec: 2, fits: false, note: "Exceeds single GPU 12GB VRAM; requires dual 5090 or system RAM offloading." }
    ],
    imageGen: {
      model: "Stable Diffusion XL (SDXL)",
      resolution: "1024 x 1024",
      speedSecondsPerBatch: 6.2,
      acceleration: "NVIDIA TensorRT FP16"
    }
  }
};

export const GUIDES = [
  {
    id: "gpu-guide",
    title: "How to Choose the Right GPU in 2026: VRAM vs Rasterization",
    category: "GPU & Graphics",
    readTime: "6 min read",
    summary: "Why 8GB VRAM is struggling in modern 1440p game textures and how to calculate memory requirements for local AI models without overspending.",
    content: `Modern game textures at 1440p routinely exceed 9GB of memory footprint. When video memory runs out, Windows pages textures over the PCIe bus into system RAM, triggering brutal frametime micro-stutters even on high-end chipsets.

For a balanced Indian PC build between ₹80,000 and ₹1,20,000, 12GB to 16GB of GDDR6/GDDR7 VRAM is the safe baseline for the next 4 years.`
  },
  {
    id: "ram-guide",
    title: "How Much RAM Do You Actually Need? 16GB vs 32GB vs 64GB",
    category: "Memory",
    readTime: "4 min read",
    summary: "Real-world tests across Windows 11, Chrome tabs, video rendering, and modern titles like Hogwarts Legacy and Cities Skylines 2.",
    content: `16GB remains sufficient for pure gaming workloads. However, developers running Docker containers or creators scrubbing 4K timelines should budget for a single 16GB stick today, and drop in a matching second stick within 12 months for 32GB dual-channel perfection.`
  },
  {
    id: "psu-guide",
    title: "Demystifying Power Supplies: 80 Plus Ratings & Transient Spikes",
    category: "Power & Electrical",
    readTime: "5 min read",
    summary: "How to calculate true system wattage and avoid unstable voltage shutdowns under fluctuating Indian power grids.",
    content: `A 650W power supply handles our 438W canonical build with ease during gaming. However, modern GPUs experience microsecond transient spikes up to 1.5x their rated TDP. For zero coil whine and long-term upgradeability, consider an ATX 3.0 power supply with native 12V-2x6 power cabling.`
  },
  {
    id: "socket-guide",
    title: "AMD AM5 vs Intel LGA1851: Platform Longevity Compared",
    category: "Processors",
    readTime: "7 min read",
    summary: "A breakdown of socket lifespans, DDR5 memory controller compatibility, and total cost of ownership over 5 years.",
    content: `AMD has committed to AM5 socket support through 2027+. Building on B650 today means you can upgrade your CPU to a 9000-series or future X3D processor 3 years down the line without replacing your motherboard or RAM.`
  },
  {
    id: "vram-ai-guide",
    title: "What is VRAM and Why Does Local AI Care So Much?",
    category: "AI & ML",
    readTime: "8 min read",
    summary: "Understanding memory bandwidth, quantized models (GGUF, AWQ), and why GPU memory speed dominates CPU cores for LLM inference.",
    content: `Large language models require storing billions of model weights in ultra-fast memory. While DDR5 system RAM tops out around 50–70 GB/s, a modern GPU offers 500–1000 GB/s bandwidth. Having all layers fit into GPU VRAM delivers 50x faster tokens-per-second output.`
  },
  {
    id: "first-build-guide",
    title: "First-Time Assembly Checklist: Mistakes to Avoid on Your First Boot",
    category: "Hands-On Assembly",
    readTime: "9 min read",
    summary: "Avoid common pitfalls like forgot-the-I/O-shield, plastic peel on the CPU cooler heatsink, and single-channel RAM slots.",
    content: `Always assemble your core components (CPU, cooler, 1 RAM stick, GPU) on top of the motherboard box outside the case to test initial POST display before mounting everything into the chassis.`
  }
];

export const UPGRADE_ROADMAP = [
  {
    phase: "Today (Year 0)",
    title: "As Built — 1440p Balanced Beast",
    cost: "₹98,450",
    status: "Active Current Build",
    statusType: "success",
    specs: "Ryzen 5 7600 · RTX 5070 12GB · 16GB DDR5 · 650W PSU",
    gain: "Runs all AAA titles at 1440p 90+ FPS and local 7B AI models."
  },
  {
    phase: "Year 1",
    title: "Dual-Channel Memory Expansion",
    cost: "~₹4,200",
    status: "100% Plug & Play",
    statusType: "success",
    specs: "Add second 16GB Corsair DDR5-6000 stick for 32GB total",
    gain: "+8% 1% low FPS stability; zero memory paging during heavy multitasking."
  },
  {
    phase: "Year 2–3",
    title: "Graphics & Power Surge",
    cost: "~₹32,000 (Net after selling RTX 5070)",
    status: "Advisory: Requires 750W PSU",
    statusType: "warning",
    specs: "Upgrade to future 60-Series GPU + 750W/850W Gold PSU",
    gain: "Seamless 4K high-refresh gaming and 16GB+ VRAM for larger 30B models."
  },
  {
    phase: "Year 4",
    title: "In-Socket AM5 Processor Upgrade",
    cost: "~₹25,000",
    status: "Compatible on Existing B650 Board",
    statusType: "success",
    specs: "Drop-in AMD Ryzen 9000X3D / next-gen AM5 processor",
    gain: "Extends core system longevity to 2030+ with just a free BIOS update."
  }
];

export const FORMAT_INR = (amount) => {
  if (amount === undefined || amount === null) return "₹0";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
};
