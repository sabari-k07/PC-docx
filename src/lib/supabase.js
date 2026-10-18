import { createClient } from '@supabase/supabase-js';

const env = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env : (typeof process !== 'undefined' ? process.env : {});

export const SUPABASE_URL = env.VITE_SUPABASE_URL || 'https://nuxmpdleqpqunkhbpqjj.supabase.co';
export const SUPABASE_HOST = 'db.nuxmpdleqpqunkhbpqjj.supabase.co';
export const SUPABASE_PORT = 5432;
export const SUPABASE_USER = 'postgres';
export const SUPABASE_DB = 'postgres';

// Storage keys
const KEY_STORAGE = 'pc_docx_supabase_anon_key';

export const getSupabaseAnonKey = () => {
  if (typeof window !== 'undefined') {
    const local = localStorage.getItem(KEY_STORAGE);
    if (local && local.trim()) return local.trim();
  }
  const envKey = env.VITE_SUPABASE_ANON_KEY || '';
  return envKey.trim();
};

export const saveSupabaseAnonKey = (key) => {
  if (typeof window !== 'undefined') {
    if (key && key.trim()) {
      localStorage.setItem(KEY_STORAGE, key.trim());
    } else {
      localStorage.removeItem(KEY_STORAGE);
    }
    clientInstance = null; // force re-create
  }
};

// Detect if real Supabase credentials have been configured
export const isSupabaseConfigured = () => {
  const key = getSupabaseAnonKey();
  return Boolean(
    key &&
    key !== 'your_supabase_anon_public_key_here' &&
    !key.includes('dummy') &&
    key.length > 20
  );
};

let clientInstance = null;
let currentKeyUsed = null;

export const getSupabase = () => {
  const currentKey = getSupabaseAnonKey();
  if (!clientInstance || currentKeyUsed !== currentKey) {
    clientInstance = createClient(
      SUPABASE_URL,
      currentKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy_anon_key_for_setup',
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true
        }
      }
    );
    currentKeyUsed = currentKey;
  }
  return clientInstance;
};

// Transparent proxy for backward-compatible `supabase.from(...)` calls
export const supabase = new Proxy({}, {
  get(target, prop) {
    const client = getSupabase();
    const value = client[prop];
    if (typeof value === 'function') {
      return value.bind(client);
    }
    return value;
  }
});

// Health check function to test database connectivity
export const testDatabaseConnection = async () => {
  if (!isSupabaseConfigured()) {
    return {
      connected: false,
      message: 'Supabase Anon Key not set yet. Paste your anon key or add to .env.'
    };
  }

  try {
    const client = getSupabase();
    const { data, error, count } = await client
      .from('equipment')
      .select('id', { count: 'exact', head: true });

    if (error) {
      return { connected: false, error: error.message };
    }

    return {
      connected: true,
      equipmentCount: count || 0,
      message: `Successfully connected to ${SUPABASE_HOST}! (${count || 0} items found)`
    };
  } catch (err) {
    return { connected: false, error: err.message };
  }
};

// Upload an image to 'equipment-images' storage bucket
export const uploadEquipmentImage = async (file, pathPrefix = 'products') => {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase not configured with anon key.');
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `${pathPrefix}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

  const client = getSupabase();
  const { data, error } = await client.storage
    .from('equipment-images')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) throw error;

  const { data: publicUrlData } = client.storage
    .from('equipment-images')
    .getPublicUrl(fileName);

  return publicUrlData.publicUrl;
};
