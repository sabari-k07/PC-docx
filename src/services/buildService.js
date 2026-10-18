import { supabase, isSupabaseConfigured } from '../lib/supabase.js';
import { CANONICAL_BUILD } from '../data/mockData.js';

export const buildService = {
  // Fetch all saved builds
  async getSavedBuilds() {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('pc_builds')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data && data.length > 0) return data;
      } catch (err) {
        console.warn('Supabase fetch builds failed, using local fallback:', err.message);
      }
    }

    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = localStorage.getItem('pc_docx_saved_builds');
        if (saved) return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }

    return [
      {
        id: 'build-canonical-1440p',
        name: '1440p Balanced Beast',
        target_budget: 100000,
        actual_total: 98450,
        score: 92,
        health_score: 94,
        health_label: 'Excellent',
        compatibility_rate: '100%',
        power_draw: 438,
        components: CANONICAL_BUILD.components,
        created_at: new Date().toISOString()
      }
    ];
  },

  // Save new build to Supabase and localStorage
  async saveBuild(buildData) {
    const formatted = {
      id: buildData.id || `build-${Date.now()}`,
      name: buildData.name || 'Custom PC Build',
      target_budget: buildData.targetBudget || 100000,
      actual_total: buildData.price || buildData.actual_total || 98450,
      score: buildData.score || 92,
      health_score: buildData.healthScore || buildData.health_score || 94,
      health_label: buildData.healthLabel || buildData.health_label || 'Excellent',
      compatibility_rate: buildData.compatibility || '100%',
      power_draw: buildData.power || buildData.power_draw || 438,
      components: buildData.components || {}
    };

    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('pc_builds')
          .upsert([formatted], { onConflict: 'id' })
          .select()
          .single();

        if (error) throw error;
        return data;
      } catch (err) {
        console.warn('Supabase build save failed, persisted locally:', err.message);
      }
    }

    return formatted;
  },

  // Delete build from Supabase
  async deleteBuild(id) {
    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase
          .from('pc_builds')
          .delete()
          .eq('id', id);

        if (error) throw error;
      } catch (err) {
        console.warn('Supabase delete failed:', err.message);
      }
    }
    return true;
  }
};
