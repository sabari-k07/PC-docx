/**
 * PC_DOCx Mock Catalog & Fallback Indian Market Data
 * Structured identically to public.equipment
 */

export const FALLBACK_CATALOG = [
  {
    id: 'cpu-1', category: 'cpu', name: 'AMD Ryzen 5 7600X', price_inr: 19499,
    wattage: 105, eq_score: 92, retailers: { PrimeABGB: true, MDComputers: true, Vedant: true },
    specs: { socket: 'AM5', cores: 6, memory_support: 'DDR5' }
  },
  {
    id: 'cpu-2', category: 'cpu', name: 'Intel Core i5-14600K', price_inr: 26800,
    wattage: 125, eq_score: 86, retailers: { PrimeABGB: true, MDComputers: false, Vedant: true },
    specs: { socket: 'LGA1700', cores: 14, memory_support: 'DDR5' }
  },
  {
    id: 'mobo-1', category: 'motherboard', name: 'MSI B650M Gaming Plus WiFi', price_inr: 14650,
    wattage: 35, eq_score: 94, retailers: { PrimeABGB: true, MDComputers: true, Vedant: true },
    specs: { socket: 'AM5', ram_type: 'DDR5', form_factor: 'mATX' }
  },
  {
    id: 'mobo-2', category: 'motherboard', name: 'ASUS Prime B760M-A WiFi D5', price_inr: 15200,
    wattage: 35, eq_score: 88, retailers: { PrimeABGB: false, MDComputers: true, Vedant: true },
    specs: { socket: 'LGA1700', ram_type: 'DDR5', form_factor: 'mATX' }
  },
  {
    id: 'ram-1', category: 'ram', name: 'G.Skill Flare X5 32GB (16GBx2) DDR5 6000MHz CL30', price_inr: 10499,
    wattage: 10, eq_score: 95, retailers: { PrimeABGB: true, MDComputers: true, Vedant: true },
    specs: { ram_type: 'DDR5', capacity_gb: 32 }
  },
  {
    id: 'gpu-1', category: 'gpu', name: 'Sapphire Pulse Radeon RX 7700 XT 12GB', price_inr: 39999,
    wattage: 245, eq_score: 91, retailers: { PrimeABGB: true, MDComputers: true, Vedant: true },
    specs: { length_mm: 280, vram_gb: 12 }
  },
  {
    id: 'gpu-2', category: 'gpu', name: 'Zotac Gaming GeForce RTX 4060 Twin Edge 8GB', price_inr: 27900,
    wattage: 115, eq_score: 89, retailers: { PrimeABGB: true, MDComputers: true, Vedant: true },
    specs: { length_mm: 222, vram_gb: 8 }
  },
  {
    id: 'case-1', category: 'case', name: 'Lian Li Lancool 205M Mesh (Black)', price_inr: 5690,
    wattage: 0, eq_score: 93, retailers: { PrimeABGB: true, MDComputers: true, Vedant: false },
    specs: { max_gpu_mm: 350, supported_mobo: ['mATX', 'ITX'] }
  },
  {
    id: 'psu-1', category: 'psu', name: 'Deepcool PM750D 750W 80+ Gold', price_inr: 6499,
    wattage: 0, eq_score: 90, retailers: { PrimeABGB: true, MDComputers: true, Vedant: true },
    specs: { capacity_w: 750, rating: '80+ Gold' }
  }
];

export default FALLBACK_CATALOG;
