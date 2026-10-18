-- ==============================================================================
-- PC_DOCx SUPABASE SEED DATA
-- Realistic hardware catalog, Indian pricing (INR ₹), compatibility specs & stock quantities
-- ==============================================================================

INSERT INTO public.equipment (
    id, name, brand, category, model_number, sku, image_url, price_inr, 
    short_desc, detailed_desc, specs, socket_type, chipset, ram_type, form_factor, wattage, vram, 
    stock_quantity, availability_status, perf_score, is_featured, badge
) VALUES 
-- PROCESSORS (CPU)
(
    'cpu-r5-7600', 'AMD Ryzen 5 7600', 'AMD', 'cpu', '100-100001015BOX', 'AMD-R5-7600-AM5', 
    'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&auto=format&fit=crop&q=80', 
    17500, '6 Cores / 12 Threads 5.1GHz Boost Zen 4 AM5 Processor', 
    'The sweet spot for 1440p gaming and compiles on the modern AM5 platform with 65W low thermal output and included Wraith Stealth cooler.',
    '{"cores": "6 Cores / 12 Threads", "base_clock": "3.8 GHz", "boost_clock": "5.1 GHz", "l3_cache": "32 MB", "pcie_version": "PCIe 5.0"}'::jsonb,
    'AM5', NULL, 'DDR5', NULL, 65, NULL, 
    24, 'In Stock', 88, true, 'Best Value'
),
(
    'cpu-r7-7800x3d', 'AMD Ryzen 7 7800X3D', 'AMD', 'cpu', '100-100000910WOF', 'AMD-R7-7800X3D', 
    'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&auto=format&fit=crop&q=80', 
    38900, '8 Cores / 16 Threads with 96MB 3D V-Cache Flagship Gaming CPU', 
    'Undisputed fastest gaming CPU on the market. Stacked 3D V-Cache delivers unparalleled 1% low frametimes in competitive and open-world titles.',
    '{"cores": "8 Cores / 16 Threads", "base_clock": "4.2 GHz", "boost_clock": "5.0 GHz", "l3_cache": "96 MB 3D V-Cache", "pcie_version": "PCIe 5.0"}'::jsonb,
    'AM5', NULL, 'DDR5', NULL, 120, NULL, 
    8, 'In Stock', 99, true, 'Fastest Gaming CPU'
),
(
    'cpu-i5-12400f', 'Intel Core i5-12400F', 'Intel', 'cpu', 'BX8071512400F', 'INT-I5-12400F-LGA', 
    'https://images.unsplash.com/photo-1555617778-02518510b9fa?w=600&auto=format&fit=crop&q=80', 
    10400, '6 Performance Cores / 12 Threads Budget Champion', 
    'Affordable 1080p and 1440p esports processor with robust IPC and low 65W power consumption on LGA1700 platform.',
    '{"cores": "6 P-Cores / 12 Threads", "base_clock": "2.5 GHz", "boost_clock": "4.4 GHz", "l3_cache": "18 MB"}'::jsonb,
    'LGA1700', NULL, 'DDR4 / DDR5', NULL, 65, NULL, 
    35, 'In Stock', 74, false, 'Budget King'
),
(
    'cpu-i5-14600k', 'Intel Core i5-14600K', 'Intel', 'cpu', 'BX8071514600K', 'INT-I5-14600K', 
    'https://images.unsplash.com/photo-1555617778-02518510b9fa?w=600&auto=format&fit=crop&q=80', 
    28500, '14 Cores (6P + 8E) / 20 Threads Unlocked Desktop Processor', 
    'High single-core clock speeds up to 5.3GHz combined with efficient E-cores for fast code compilation and video rendering.',
    '{"cores": "14 Cores (6P+8E) / 20 Threads", "boost_clock": "5.3 GHz", "l3_cache": "24 MB"}'::jsonb,
    'LGA1700', NULL, 'DDR5', NULL, 125, NULL, 
    14, 'In Stock', 94, false, NULL
),

-- GRAPHICS CARDS (GPU)
(
    'gpu-rtx-5070', 'NVIDIA GeForce RTX 5070 12GB', 'NVIDIA', 'gpu', 'RTX5070-12G-OC', 'NV-RTX5070-12G', 
    'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop&q=80', 
    55000, '12GB GDDR7 192-bit DLSS 4 Next-Gen Graphics Card', 
    'Exceptional 1440p rasterization and DLSS 4 frame generation. Native CUDA acceleration for local LLMs, PyTorch, and TensorRT pipelines.',
    '{"vram": "12GB GDDR7", "memory_bus": "192-bit", "bandwidth": "672 GB/s", "length_mm": 242, "outputs": "3x DP 2.1, 1x HDMI 2.1a"}'::jsonb,
    NULL, NULL, NULL, 'PCIe 4.0 x16', 250, '12GB GDDR7', 
    18, 'In Stock', 92, true, 'Best Value'
),
(
    'gpu-rtx-5060', 'NVIDIA GeForce RTX 5060 8GB', 'NVIDIA', 'gpu', 'RTX5060-8G', 'NV-RTX5060-8G', 
    'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop&q=80', 
    31500, '8GB GDDR6 Efficient 1080p Esports GPU', 
    'Ultra-efficient 115W GPU for 1080p competitive esports titles with DLSS 3 and AV1 hardware encoding.',
    '{"vram": "8GB GDDR6", "memory_bus": "128-bit", "length_mm": 210}'::jsonb,
    NULL, NULL, NULL, 'PCIe 4.0 x8', 115, '8GB GDDR6', 
    40, 'In Stock', 74, false, NULL
),
(
    'gpu-rtx-5060-ti', 'NVIDIA GeForce RTX 5060 Ti 16GB', 'NVIDIA', 'gpu', 'RTX5060TI-16G', 'NV-RTX5060TI-16G', 
    'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop&q=80', 
    45500, '16GB GDDR6 High-VRAM Workstation & Gaming GPU', 
    'Generous 16GB memory footprint ideal for fine-tuning local open-source LLMs, 4K video scrubbing, and heavy texture mods.',
    '{"vram": "16GB GDDR6", "memory_bus": "128-bit", "length_mm": 235}'::jsonb,
    NULL, NULL, NULL, 'PCIe 4.0 x8', 165, '16GB GDDR6', 
    12, 'In Stock', 83, false, '16GB VRAM Gem'
),
(
    'gpu-rx-9070-xt', 'AMD Radeon RX 9070 XT 16GB', 'AMD', 'gpu', 'RX9070XT-16G', 'AMD-RX9070XT', 
    'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop&q=80', 
    68000, '16GB GDDR6 RDNA 4 Pure Rasterization Monster', 
    'Massive raw 1440p and 4K rasterization performance with 16GB high-bandwidth video memory and DisplayPort 2.1 support.',
    '{"vram": "16GB GDDR6", "memory_bus": "256-bit", "length_mm": 280}'::jsonb,
    NULL, NULL, NULL, 'PCIe 4.0 x16', 300, '16GB GDDR6', 
    7, 'Low Stock', 95, false, 'Raw Raster King'
),

-- MOTHERBOARDS
(
    'mobo-msi-b650m-p', 'MSI PRO B650M-P DDR5', 'MSI', 'motherboard', 'PRO-B650M-P', 'MSI-B650M-P', 
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80', 
    9500, 'Micro-ATX AM5 DDR5 Motherboard with Dual Gen4 M.2', 
    'Robust VRMs, 4 DDR5 memory slots up to 6400MHz (OC), dual PCIe 4.0 M.2 slots, and full AM5 platform longevity.',
    '{"socket": "AM5", "chipset": "AMD B650", "ram_slots": 4, "max_ram_gb": 128, "m2_slots": 2, "form_factor": "Micro-ATX"}'::jsonb,
    'AM5', 'B650', 'DDR5', 'Micro-ATX', 50, NULL, 
    30, 'In Stock', 88, true, 'Recommended'
),
(
    'mobo-gigabyte-b650-gaming', 'Gigabyte B650 Gaming X AX (Wi-Fi 6E)', 'Gigabyte', 'motherboard', 'B650-GAMING-X-AX', 'GIGA-B650-AX', 
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80', 
    15400, 'ATX AM5 Motherboard with Wi-Fi 6E, PCIe 5.0 M.2 & Triple M.2', 
    '14+2+1 digital power phases, large heatsinks, built-in Wi-Fi 6E and Bluetooth 5.3, and front panel USB-C 20Gbps.',
    '{"socket": "AM5", "chipset": "AMD B650", "ram_slots": 4, "m2_slots": 3, "form_factor": "ATX", "wifi": "Wi-Fi 6E"}'::jsonb,
    'AM5', 'B650', 'DDR5', 'ATX', 65, NULL, 
    15, 'In Stock', 94, false, 'Wi-Fi 6E'
),

-- RAM (MEMORY)
(
    'ram-corsair-16-d5', 'Corsair Vengeance 16GB (1x16GB) DDR5-6000', 'Corsair', 'ram', 'CMK16GX5M1B6000Z36', 'COR-16G-D5-6000', 
    'https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?w=600&auto=format&fit=crop&q=80', 
    4200, 'DDR5 6000MHz CL36 AMD EXPO / Intel XMP Optimized RAM', 
    'Low-profile aluminum heatspreader, AMD EXPO certified for one-click 6000MHz stability on Ryzen 7000/9000 systems.',
    '{"speed": "6000 MHz", "capacity": "16 GB", "latency": "CL36-36-36-76", "voltage": "1.35V", "profiles": "AMD EXPO / XMP 3.0"}'::jsonb,
    NULL, NULL, 'DDR5', 'DIMM', 15, NULL, 
    50, 'In Stock', 90, true, 'Optimal'
),
(
    'ram-gskill-32-d5', 'G.Skill Flare X5 32GB (2x16GB) DDR5-6000 CL30', 'G.Skill', 'ram', 'F5-6000J3038F16GX2-FX5', 'GSK-32G-D5-CL30', 
    'https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?w=600&auto=format&fit=crop&q=80', 
    9800, 'Ultra-Low Latency DDR5 6000MHz CL30 Dual Channel Kit', 
    'Tightest primary timings (CL30-38-38-96) for lowest latency in memory-sensitive titles like CS2, Valorant, and simulation games.',
    '{"speed": "6000 MHz", "capacity": "32 GB (2x16GB)", "latency": "CL30", "voltage": "1.35V"}'::jsonb,
    NULL, NULL, 'DDR5', 'DIMM', 20, NULL, 
    22, 'In Stock', 98, false, 'Enthusiast'
),

-- STORAGE (NVMe SSD)
(
    'ssd-crucial-p3-plus-1tb', 'Crucial P3 Plus 1TB PCIe 4.0 M.2 NVMe', 'Crucial', 'storage', 'CT1000P3PSSD8', 'CRU-P3P-1TB', 
    'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&auto=format&fit=crop&q=80', 
    4500, '1TB M.2 2280 NVMe SSD with 5000 MB/s Sequential Read', 
    'High-speed PCIe Gen4 NVMe performance delivering rapid Windows boot times and instant game level streaming via DirectStorage.',
    '{"interface": "PCIe 4.0 x4", "form_factor": "M.2 2280", "read_speed": "5000 MB/s", "write_speed": "4200 MB/s", "tbw": 220}'::jsonb,
    NULL, NULL, NULL, 'M.2 2280', 8, NULL, 
    60, 'In Stock', 88, true, 'Recommended'
),
(
    'ssd-wd-black-2tb', 'WD Black SN850X 2TB NVMe PCIe 4.0', 'Western Digital', 'storage', 'WDS200T2X0E', 'WD-SN850X-2TB', 
    'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&auto=format&fit=crop&q=80', 
    13900, '2TB Extreme Speed Gaming SSD 7300 MB/s with DRAM Cache', 
    'Dedicated DRAM cache, BiCS5 3D TLC NAND, and top-tier sustained read/write speeds for massive 4K video scratch disks.',
    '{"interface": "PCIe 4.0 x4", "read_speed": "7300 MB/s", "write_speed": "6600 MB/s", "dram_cache": true}'::jsonb,
    NULL, NULL, NULL, 'M.2 2280', 10, NULL, 
    18, 'In Stock', 99, false, 'High Endurance'
),

-- POWER SUPPLIES (PSU)
(
    'psu-corsair-cx650', 'Corsair CX650 650W 80+ Bronze', 'Corsair', 'psu', 'CP-9020278-IN', 'COR-CX650-BRONZE', 
    'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=600&auto=format&fit=crop&q=80', 
    3800, '650W 80 Plus Bronze Certified Reliable Power Supply', 
    '120mm thermally controlled rifle bearing fan, black braided sleeve cables, and dedicated single +12V rail.',
    '{"wattage": 650, "efficiency": "80+ Bronze", "fan_size": "120mm", "form_factor": "ATX"}'::jsonb,
    NULL, NULL, NULL, 'ATX', 650, NULL, 
    30, 'In Stock', 82, true, 'Canonical Choice'
),
(
    'psu-corsair-rm750e', 'Corsair RM750e 750W 80+ Gold Fully Modular ATX 3.0', 'Corsair', 'psu', 'CP-9020262-IN', 'COR-RM750E-GOLD', 
    'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=600&auto=format&fit=crop&q=80', 
    8900, '750W ATX 3.0 & PCIe 5.0 Ready 80+ Gold Power Supply', 
    'Full modular cabling, 105°C Japanese primary capacitors, native 12V-2x6 cable, and Zero-RPM silent fan mode.',
    '{"wattage": 750, "efficiency": "80+ Gold", "atx_version": "ATX 3.0", "modular": "Fully Modular"}'::jsonb,
    NULL, NULL, NULL, 'ATX', 750, NULL, 
    16, 'In Stock', 96, false, 'Upgrade Recommended'
),

-- CHASSIS (CASE)
(
    'case-deepcool-cc560', 'Deepcool CC560 Mid-Tower (4 Fans Included)', 'Deepcool', 'case', 'R-CC560-BKGAA4-G-1', 'DC-CC560-4FAN', 
    'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop&q=80', 
    2450, 'High-Airflow Tempered Glass Mid-Tower with 4x Pre-installed Fans', 
    'Perforated front mesh intake, full-size tempered glass side panel, supports up to 370mm GPUs and 163mm CPU air coolers.',
    '{"gpu_max_length": 370, "cooler_max_height": 163, "preinstalled_fans": 4, "form_factor_support": "ATX, Micro-ATX, Mini-ITX"}'::jsonb,
    NULL, NULL, NULL, 'Mid-Tower ATX', 0, NULL, 
    25, 'In Stock', 86, true, 'Best Value'
),
(
    'case-lianli-lancool-216', 'Lian Li Lancool 216 RGB High Airflow', 'Lian Li', 'case', 'LANCOOL-216R-X', 'LL-LC216-RGB', 
    'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop&q=80', 
    7600, 'Dual 160mm ARGB Front Intake Fans Premium Acoustics Chassis', 
    'Engineered for maximum thermal dissipation with continuous fine mesh and innovative rear PCIe external exhaust bracket.',
    '{"gpu_max_length": 392, "cooler_max_height": 180, "preinstalled_fans": 3, "form_factor_support": "E-ATX, ATX, Micro-ATX"}'::jsonb,
    NULL, NULL, NULL, 'Mid-Tower ATX', 0, NULL, 
    11, 'In Stock', 96, false, 'Premium Acoustics'
),

-- CPU COOLERS
(
    'cooler-deepcool-ak400', 'Deepcool AK400 Performance Air Cooler', 'Deepcool', 'cooler', 'R-AK400-BKNPNP-G', 'DC-AK400-AIR', 
    'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&auto=format&fit=crop&q=80', 
    1500, 'Single-Tower 4 Direct-Touch Heatpipe 220W TDP Air Cooler', 
    'Matrix fin array with fluid dynamic bearing 120mm PWM fan. Keeps 65W and 105W processors under 68°C with whisper-quiet 29 dBA noise.',
    '{"tdp_capacity": 220, "height_mm": 155, "fan_noise": "29 dBA", "socket_support": "AM5, AM4, LGA1700, LGA1200"}'::jsonb,
    'AM5, LGA1700', NULL, NULL, NULL, 0, NULL, 
    32, 'In Stock', 89, true, 'Whisper Quiet'
),
(
    'cooler-deepcool-ls520', 'Deepcool LS520 240mm ARGB Liquid AIO', 'Deepcool', 'cooler', 'R-LS520-BKAMNT-G-1', 'DC-LS520-240', 
    'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&auto=format&fit=crop&q=80', 
    6800, '240mm 4th Gen Pump High Performance Liquid Cooler', 
    'Anti-leak technology, high-density aluminum radiator, and mirror infinity cap with addressable RGB.',
    '{"tdp_capacity": 280, "radiator_size": "240mm", "socket_support": "AM5, LGA1700, AM4"}'::jsonb,
    'AM5, LGA1700', NULL, NULL, NULL, 0, NULL, 
    14, 'In Stock', 95, false, 'Liquid AIO'
),

-- OPERATING SYSTEM
(
    'os-install-later', 'Install Later (USB UEFI Windows / Linux)', 'Microsoft', 'os', 'OS-FREE-INSTALL', 'OS-INSTALL-LATER', 
    'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&auto=format&fit=crop&q=80', 
    0, 'Download Official Media Creation Tool via USB', 
    'Download official Microsoft ISO onto USB drive; license key can be activated later.',
    '{"delivery": "Digital / Self-Install", "architecture": "64-bit"}'::jsonb,
    NULL, NULL, NULL, NULL, 0, NULL, 
    999, 'In Stock', 100, true, 'Most Common'
),
(
    'os-win11-home', 'Microsoft Windows 11 Home 64-Bit OEM DVD/USB', 'Microsoft', 'os', 'KW9-00633', 'MS-WIN11-HOME', 
    'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&auto=format&fit=crop&q=80', 
    9500, 'Official Retail Activation License for 1 PC', 
    'DirectStorage, Auto-HDR, Windows Defender Antivirus, and full Microsoft support.',
    '{"delivery": "Physical USB + Retail Key", "version": "Windows 11 Home 64-Bit"}'::jsonb,
    NULL, NULL, NULL, NULL, 0, NULL, 
    40, 'In Stock', 95, false, NULL
)
ON CONFLICT (id) DO UPDATE SET
    price_inr = EXCLUDED.price_inr,
    stock_quantity = EXCLUDED.stock_quantity,
    availability_status = EXCLUDED.availability_status,
    updated_at = NOW();

-- SEED CANONICAL BUILD INTO PC_BUILDS
INSERT INTO public.pc_builds (
    id, name, target_budget, actual_total, score, health_score, health_label, compatibility_rate, power_draw, components
) VALUES (
    'build-canonical-1440p', '1440p Balanced Beast', 100000, 98450, 92, 94, 'Excellent', '100%', 438,
    '{
        "cpu": {"id": "cpu-r5-7600", "name": "AMD Ryzen 5 7600", "price": 17500, "status": "Compatible"},
        "motherboard": {"id": "mobo-msi-b650m-p", "name": "MSI PRO B650M-P DDR5", "price": 9500, "status": "Compatible"},
        "gpu": {"id": "gpu-rtx-5070", "name": "NVIDIA GeForce RTX 5070 12GB", "price": 55000, "status": "Compatible"},
        "ram": {"id": "ram-corsair-16-d5", "name": "Corsair Vengeance 16GB DDR5-6000", "price": 4200, "status": "Compatible"},
        "storage": {"id": "ssd-crucial-p3-plus-1tb", "name": "Crucial P3 Plus 1TB NVMe", "price": 4500, "status": "Compatible"},
        "psu": {"id": "psu-corsair-cx650", "name": "Corsair CX650 650W 80+ Bronze", "price": 3800, "status": "Limited Headroom"},
        "case": {"id": "case-deepcool-cc560", "name": "Deepcool CC560 Mid-Tower", "price": 2450, "status": "Fits"},
        "cooler": {"id": "cooler-deepcool-ak400", "name": "Deepcool AK400 Air Cooler", "price": 1500, "status": "Compatible"},
        "os": {"id": "os-install-later", "name": "Install Later (USB UEFI)", "price": 0, "status": "Ready"}
    }'::jsonb
) ON CONFLICT (id) DO NOTHING;
