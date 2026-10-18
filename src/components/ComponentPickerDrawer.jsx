import React, { useState, useMemo, useEffect, memo } from 'react';
import { useBuild } from '../context/BuildContext';
import { COMPONENT_CATALOG, FORMAT_INR, calculateComponentEQ } from '../data/mockData';
import { equipmentService } from '../services/equipmentService';
import { X, Search, Check, AlertTriangle, ArrowUpDown, Sparkles, Package, Zap } from 'lucide-react';

export const ComponentPickerDrawer = () => {
  const {
    pickerCategory,
    setPickerCategory,
    build,
    selectComponent,
    currentTotal,
    targetBudget
  } = useBuild();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [sortBy, setSortBy] = useState('recommended');
  const [dbItems, setDbItems] = useState(null);
  const [loadingItems, setLoadingItems] = useState(false);

  // Load from equipmentService (Supabase with instant local fallback)
  useEffect(() => {
    // Reset query, brand, sort, and previous dbItems immediately on category change
    setSearchQuery('');
    setSelectedBrand('All');
    setSortBy('recommended');
    setDbItems(null);

    if (!pickerCategory) return;
    let isMounted = true;
    setLoadingItems(true);

    equipmentService.getEquipment({ category: pickerCategory })
      .then(res => {
        if (isMounted && res && res.length > 0) {
          const normalised = res.map(item => {
            const specsObj = (item.specs && typeof item.specs === 'object') ? item.specs : {};
            return {
              ...specsObj,
              ...item,
              id: item.id || specsObj.id,
              name: item.name || specsObj.name,
              brand: item.brand || specsObj.brand,
              category: item.category || specsObj.category || pickerCategory,
              price: Number(item.price_inr || item.price || specsObj.price || 0),
              price_inr: Number(item.price_inr || item.price || specsObj.price || 0),
              specs: item.short_desc || item.specs || specsObj.specs || `${item.brand} ${pickerCategory.toUpperCase()}`,
              socket: item.socket_type || item.socket || specsObj.socket,
              ramType: item.ram_type || item.ramType || specsObj.ramType || (pickerCategory === 'ram' ? 'DDR5' : undefined),
              type: item.ram_type || item.type || specsObj.type || (pickerCategory === 'ram' ? 'DDR5' : undefined),
              formFactor: item.form_factor || item.formFactor || specsObj.formFactor,
              lengthMm: item.length_mm || item.lengthMm || specsObj.lengthMm,
              maxGpuLength: item.max_gpu_length || item.maxGpuLength || specsObj.maxGpuLength,
              heightMm: item.height_mm || item.heightMm || specsObj.heightMm,
              maxCoolerHeight: item.max_cooler_height || item.maxCoolerHeight || specsObj.maxCoolerHeight,
              tdp: item.wattage || item.tdp || specsObj.tdp || 65,
              wattage: item.wattage || specsObj.wattage,
              rating: item.rating || specsObj.rating || '80+ Bronze',
              vram: item.vram || specsObj.vram,
              perfScore: item.perf_score || item.perfScore || specsObj.perfScore || 85,
              badge: item.badge || specsObj.badge,
              deltaDesc: item.deltaDesc || specsObj.deltaDesc,
              warning: item.warning || specsObj.warning,
              stock_quantity: item.stock_quantity ?? 15,
              availability_status: item.availability_status || (item.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'),
              inStock: item.availability_status !== 'Out of Stock' && (item.stock_quantity === undefined || item.stock_quantity > 0)
            };
          });
          setDbItems(normalised);
        }
      })
      .catch(err => {
        console.warn('Could not query equipmentService:', err);
      })
      .finally(() => {
        if (isMounted) setLoadingItems(false);
      });

    return () => { isMounted = false; };
  }, [pickerCategory]);

  // Handle ESC key and scroll lock
  useEffect(() => {
    if (!pickerCategory) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setPickerCategory(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [pickerCategory, setPickerCategory]);

  if (!pickerCategory) return null;

  const currentPart = build.components[pickerCategory];
  const items = dbItems || COMPONENT_CATALOG[pickerCategory] || [];

  // Title formatting
  const categoryTitles = {
    cpu: 'Choose your Processor (CPU)',
    motherboard: 'Choose your Motherboard',
    gpu: 'Choose your Graphics Card (GPU)',
    ram: 'Choose your System Memory (RAM)',
    storage: 'Choose your Primary Storage (NVMe)',
    psu: 'Choose your Power Supply (PSU)',
    case: 'Choose your PC Chassis (Case)',
    cooler: 'Choose your CPU Cooler',
    os: 'Choose your Operating System'
  };

  // Distinct brands
  const brands = useMemo(() => {
    const set = new Set(items.map(i => i.brand).filter(Boolean));
    return ['All', ...Array.from(set)];
  }, [items]);

  // Filtered & Sorted items
  const filteredItems = useMemo(() => {
    return items
      .filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              (item.socket && item.socket.toLowerCase().includes(searchQuery.toLowerCase())) ||
                              (item.vram && item.vram.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesBrand = selectedBrand === 'All' || item.brand === selectedBrand;
        return matchesSearch && matchesBrand;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'performance') return (b.perfScore || 0) - (a.perfScore || 0);
        return 0; // default order
      });
  }, [items, searchQuery, selectedBrand, sortBy]);

  return (
    <div className="drawer-backdrop" onClick={() => setPickerCategory(null)}>
      <div
        className="drawer-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          background: 'var(--bg-card)',
          borderLeft: '1px solid var(--border-default)'
        }}
      >
        {/* Drawer Header */}
        <div style={{
          padding: '24px 32px',
          borderBottom: '1px solid var(--border-subtle)',
          background: 'var(--bg-surface)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#FFF' }}>
                {categoryTitles[pickerCategory] || `Select ${pickerCategory.toUpperCase()}`}
              </h2>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
                Current Part: <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{currentPart?.name || 'None'}</span> ({FORMAT_INR(currentPart?.price || 0)})
              </p>
            </div>
            <button
              onClick={() => setPickerCategory(null)}
              className="btn-quiet"
              style={{ padding: '8px', borderRadius: '50%' }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative', marginBottom: '16px' }}>
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search components by brand, model, chipset..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field"
              style={{ paddingLeft: '42px' }}
              autoFocus
            />
          </div>

          {/* Filter Chips & Sort Controls */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            {/* Brand Filter Chips */}
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
              {brands.map(brand => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`nav-pill ${selectedBrand === brand ? 'active' : ''}`}
                  style={{
                    fontSize: '12px',
                    padding: '4px 12px',
                    border: '1px solid var(--border-default)'
                  }}
                >
                  {brand}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ArrowUpDown size={14} color="var(--text-muted)" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-default)',
                  color: 'var(--text-primary)',
                  fontSize: '12px',
                  borderRadius: '8px',
                  padding: '6px 10px',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="recommended">Sort: Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="performance">Performance Score</option>
              </select>
            </div>
          </div>
        </div>

        {/* Scrollable Component Cards List */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {filteredItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
              <p>No components found matching "{searchQuery}".</p>
            </div>
          ) : (
            filteredItems.map(item => {
              const isSelected = currentPart?.id === item.id;
              const priceDelta = item.price - (currentPart?.price || 0);
              const newTotalIfSelected = currentTotal + priceDelta;
              const isOverBudget = newTotalIfSelected > targetBudget;
              const eq = calculateComponentEQ(item, pickerCategory);

              return (
                <div
                  key={item.id}
                  onClick={() => !isSelected && selectComponent(pickerCategory, item)}
                  className="component-picker-card"
                  style={{
                    background: isSelected ? 'var(--bg-card)' : 'var(--bg-surface)',
                    border: isSelected ? '2px solid var(--accent-purple)' : '1px solid var(--border-default)',
                    borderRadius: '16px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    boxShadow: isSelected ? 'var(--shadow-purple)' : 'none',
                    cursor: isSelected ? 'default' : 'pointer'
                  }}
                  title={isSelected ? 'Currently active component' : `Click to swap for ${item.name}`}
                >
                  {/* Top Row: Title, Badge, Price */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                        <h4 style={{ fontSize: '16px', fontWeight: 600, color: '#FFFFFF' }}>
                          {item.name}
                        </h4>
                        {item.badge && (
                          <span className="badge badge-purple">
                            <Sparkles size={11} /> {item.badge}
                          </span>
                        )}
                        <span
                          title={`Efficiency Quotient: ${eq.label} (Score: ${eq.score}/10)`}
                          style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: '6px',
                            background: 'rgba(124, 92, 255, 0.1)',
                            color: eq.badgeColor,
                            border: '1px solid rgba(124, 92, 255, 0.25)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '3px'
                          }}
                        >
                          <Zap size={11} /> EQ {eq.score} · {eq.grade}
                        </span>
                        {isSelected && (
                          <span className="badge badge-success">
                            ✓ Currently Active
                          </span>
                        )}
                        <span style={{
                          fontSize: '11px',
                          fontWeight: 600,
                          padding: '2px 8px',
                          borderRadius: '6px',
                          background: item.inStock ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                          color: item.inStock ? '#10B981' : '#EF4444',
                          border: `1px solid ${item.inStock ? 'rgba(16, 185, 129, 0.25)' : 'rgba(239, 68, 68, 0.25)'}`,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: item.inStock ? '#10B981' : '#EF4444' }}></span>
                          {item.availability_status || (item.inStock ? 'In Stock' : 'Out of Stock')}
                          {item.stock_quantity !== undefined && ` (${item.stock_quantity} units)`}
                        </span>
                      </div>

                      {/* Technical Specs String */}
                      <div style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        {item.vram && <span>VRAM: {item.vram}</span>}
                        {item.tdp && <span>TDP: {item.tdp}W</span>}
                        {item.socket && <span>Socket: {item.socket}</span>}
                        {item.cores && <span>{item.cores}</span>}
                        {item.speed && <span>Speed: {item.speed}</span>}
                        {item.readSpeed && <span>Read: {item.readSpeed}</span>}
                        {item.wattage && <span>Rating: {item.wattage}W {item.rating}</span>}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                      <div style={{ fontSize: '18px', fontWeight: 700, color: '#FFF' }} className="tabular-nums">
                        {FORMAT_INR(item.price)}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>GST Included</div>
                    </div>
                  </div>

                  {/* Delta & Advisory Impact Row */}
                  <div style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: 'var(--bg-elevated)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '12px'
                  }}>
                    <span style={{ color: priceDelta > 0 ? 'var(--text-secondary)' : priceDelta < 0 ? 'var(--status-success)' : 'var(--text-muted)' }}>
                      {priceDelta === 0
                        ? 'Current active component'
                        : priceDelta > 0
                        ? `+${FORMAT_INR(priceDelta)} vs current part`
                        : `Saves ${FORMAT_INR(Math.abs(priceDelta))} vs current part`}
                      {item.deltaDesc && ` · ${item.deltaDesc}`}
                    </span>

                    {item.warning ? (
                      <span style={{ color: 'var(--status-warning)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <AlertTriangle size={12} /> {item.warning}
                      </span>
                    ) : isOverBudget ? (
                      <span style={{ color: 'var(--status-danger)' }}>
                        Over target budget by {FORMAT_INR(newTotalIfSelected - targetBudget)}
                      </span>
                    ) : (
                      <span style={{ color: 'var(--status-success)' }}>
                        ✓ Within target budget
                      </span>
                    )}
                  </div>

                  {/* Bottom Action Row */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '4px' }}>
                    {isSelected ? (
                      <button
                        disabled
                        className="btn-secondary"
                        style={{ padding: '8px 18px', fontSize: '13px', opacity: 0.7 }}
                      >
                        <Check size={14} /> Selected & Active
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          selectComponent(pickerCategory, item);
                        }}
                        className="btn-primary"
                        style={{ padding: '8px 20px', fontSize: '13px' }}
                      >
                        Select This Component
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
