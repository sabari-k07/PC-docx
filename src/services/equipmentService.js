import { supabase, isSupabaseConfigured } from '../lib/supabase.js';
import { COMPONENT_CATALOG } from '../data/mockData.js';

// Convert catalog object format to flat array
const getFallbackEquipmentList = () => {
  const list = [];
  Object.entries(COMPONENT_CATALOG).forEach(([catKey, items]) => {
    items.forEach(item => {
      list.push({
        id: item.id,
        name: item.name,
        brand: item.brand,
        category: catKey,
        price_inr: item.price,
        short_desc: item.specs || item.whyThisPart || `${item.brand} ${catKey.toUpperCase()}`,
        detailed_desc: item.whyThisPart || '',
        specs: item,
        socket_type: item.socket || null,
        ram_type: item.type || (catKey === 'ram' ? 'DDR5' : null),
        form_factor: item.formFactor || null,
        wattage: item.wattage || item.tdp || null,
        vram: item.vram || null,
        stock_quantity: 15,
        availability_status: item.inStock ? 'In Stock' : 'Out of Stock',
        perf_score: item.perfScore || 85,
        is_featured: Boolean(item.badge),
        badge: item.badge || null,
        image_url: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&auto=format&fit=crop&q=80'
      });
    });
  });
  return list;
};

export const equipmentService = {
  // Fetch equipment with flexible search, category and brand filters
  async getEquipment({ category = 'all', brand = 'all', search = '', availability = 'all' } = {}) {
    if (isSupabaseConfigured()) {
      try {
        let query = supabase
          .from('equipment')
          .select('*')
          .order('category', { ascending: true })
          .order('price_inr', { ascending: true });

        if (category && category !== 'all') {
          query = query.eq('category', category.toLowerCase());
        }

        if (brand && brand !== 'all') {
          query = query.eq('brand', brand);
        }

        if (availability && availability !== 'all') {
          query = query.eq('availability_status', availability);
        }

        if (search.trim()) {
          query = query.ilike('name', `%${search.trim()}%`);
        }

        const { data, error } = await query;
        if (error) throw error;
        if (data && data.length > 0) return data;
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to local registry:', err.message);
      }
    }

    // Fallback to local catalog
    let local = getFallbackEquipmentList();
    if (category && category !== 'all') {
      local = local.filter(e => e.category.toLowerCase() === category.toLowerCase());
    }
    if (brand && brand !== 'all') {
      local = local.filter(e => e.brand === brand);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      local = local.filter(e => e.name.toLowerCase().includes(q) || e.brand.toLowerCase().includes(q));
    }
    return local;
  },

  // Update product price or stock quantity
  async updateStockAndPrice(id, { stock_quantity, price_inr, availability_status }) {
    if (isSupabaseConfigured()) {
      const updates = {};
      if (stock_quantity !== undefined) updates.stock_quantity = Number(stock_quantity);
      if (price_inr !== undefined) updates.price_inr = Number(price_inr);
      if (availability_status !== undefined) updates.availability_status = availability_status;

      const { data, error } = await supabase
        .from('equipment')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    }

    return { id, stock_quantity, price_inr, availability_status };
  },

  // Create new equipment item
  async createEquipment(itemData) {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('equipment')
        .insert([itemData])
        .select()
        .single();

      if (error) throw error;
      return data;
    }

    return itemData;
  },

  // Delete equipment item
  async deleteEquipment(id) {
    if (isSupabaseConfigured()) {
      const { error } = await supabase
        .from('equipment')
        .delete()
        .eq('id', id);

      if (error) throw error;
    }
    return true;
  },

  // 1-Click Seed to Supabase from the Admin UI
  async seedCatalogToSupabase() {
    if (!isSupabaseConfigured()) {
      throw new Error('Please configure VITE_SUPABASE_ANON_KEY in your .env file first.');
    }

    const items = getFallbackEquipmentList();
    const { data, error } = await supabase
      .from('equipment')
      .upsert(items, { onConflict: 'id' });

    if (error) throw error;
    return items.length;
  }
};
