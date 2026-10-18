-- ==============================================================================
-- PC_DOCx SUPABASE DATABASE SCHEMA MIGRATION
-- Project: PC_DOCx Hardware Registry & PC Configurator
-- Host: db.nuxmpdleqpqunkhbpqjj.supabase.co
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. EQUIPMENT TABLE (Primary Hardware Catalog & Stock Registry)
CREATE TABLE IF NOT EXISTS public.equipment (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    brand TEXT NOT NULL,
    category TEXT NOT NULL, -- 'cpu', 'gpu', 'motherboard', 'ram', 'storage', 'psu', 'case', 'cooler', 'monitor', 'peripherals', 'os'
    model_number TEXT,
    sku TEXT UNIQUE,
    image_url TEXT,
    price_inr NUMERIC NOT NULL CHECK (price_inr >= 0),
    short_desc TEXT,
    detailed_desc TEXT,
    specs JSONB DEFAULT '{}'::jsonb,
    
    -- Category-specific compatibility attributes
    socket_type TEXT,       -- e.g. 'AM5', 'LGA1700', 'AM4'
    chipset TEXT,           -- e.g. 'B650', 'Z790', 'B760'
    ram_type TEXT,          -- e.g. 'DDR5', 'DDR4'
    form_factor TEXT,       -- e.g. 'ATX', 'Micro-ATX', 'Mini-ITX'
    wattage INTEGER,        -- Power draw TDP or PSU capacity
    vram TEXT,              -- e.g. '12GB GDDR7', '16GB GDDR6'
    
    -- Inventory & Stock Tracking
    stock_quantity INTEGER NOT NULL DEFAULT 15 CHECK (stock_quantity >= 0),
    availability_status TEXT NOT NULL DEFAULT 'In Stock', -- 'In Stock', 'Low Stock', 'Out of Stock', 'Pre-Order'
    
    -- Performance & Showcase
    perf_score INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    badge TEXT,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. EQUIPMENT IMAGES TABLE (Multiple Product Visuals & Thumbnails)
CREATE TABLE IF NOT EXISTS public.equipment_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    equipment_id TEXT NOT NULL REFERENCES public.equipment(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text TEXT,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PC BUILDS TABLE (Saved Configurations & Community Builds)
CREATE TABLE IF NOT EXISTS public.pc_builds (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    target_budget NUMERIC NOT NULL,
    actual_total NUMERIC NOT NULL,
    score INTEGER DEFAULT 90,
    health_score INTEGER DEFAULT 94,
    health_label TEXT DEFAULT 'Excellent',
    compatibility_rate TEXT DEFAULT '100%',
    power_draw INTEGER DEFAULT 400,
    components JSONB NOT NULL DEFAULT '{}'::jsonb,
    is_public BOOLEAN DEFAULT true,
    user_id UUID, -- For future auth if enabled
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. PERFORMANCE INDEXES
CREATE INDEX IF NOT EXISTS idx_equipment_category ON public.equipment(category);
CREATE INDEX IF NOT EXISTS idx_equipment_brand ON public.equipment(brand);
CREATE INDEX IF NOT EXISTS idx_equipment_price ON public.equipment(price_inr);
CREATE INDEX IF NOT EXISTS idx_equipment_stock ON public.equipment(availability_status);
CREATE INDEX IF NOT EXISTS idx_equipment_socket ON public.equipment(socket_type);
CREATE INDEX IF NOT EXISTS idx_equipment_images_eq_id ON public.equipment_images(equipment_id);
CREATE INDEX IF NOT EXISTS idx_pc_builds_created ON public.pc_builds(created_at DESC);

-- 5. AUTOMATIC UPDATED_AT TRIGGER
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_equipment_updated_at ON public.equipment;
CREATE TRIGGER trigger_equipment_updated_at
BEFORE UPDATE ON public.equipment
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trigger_pc_builds_updated_at ON public.pc_builds;
CREATE TRIGGER trigger_pc_builds_updated_at
BEFORE UPDATE ON public.pc_builds
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 6. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.equipment_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pc_builds ENABLE ROW LEVEL SECURITY;

-- Equipment: Public can read all in-stock and published equipment
CREATE POLICY "Allow public read access to equipment"
    ON public.equipment FOR SELECT
    USING (true);

-- Equipment: Allow insert/update/delete for authenticated admin or public demo
CREATE POLICY "Allow write access to equipment"
    ON public.equipment FOR ALL
    USING (true)
    WITH CHECK (true);

-- Equipment Images: Public read access
CREATE POLICY "Allow public read access to equipment_images"
    ON public.equipment_images FOR SELECT
    USING (true);

CREATE POLICY "Allow write access to equipment_images"
    ON public.equipment_images FOR ALL
    USING (true)
    WITH CHECK (true);

-- PC Builds: Public read access for shared builds
CREATE POLICY "Allow public read access to pc_builds"
    ON public.pc_builds FOR SELECT
    USING (true);

CREATE POLICY "Allow public insert and update on pc_builds"
    ON public.pc_builds FOR ALL
    USING (true)
    WITH CHECK (true);

-- 7. SUPABASE STORAGE BUCKET FOR EQUIPMENT PICTURES
-- Create the 'equipment-images' storage bucket if it does not already exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('equipment-images', 'equipment-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage Policy: Public read access for equipment images
CREATE POLICY "Public Read Access for Equipment Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'equipment-images');

-- Storage Policy: Insert access for equipment images
CREATE POLICY "Allow Image Uploads to Equipment Images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'equipment-images');
