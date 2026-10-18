import React, { useState, useEffect } from 'react';
import { useBuild } from '../context/BuildContext';
import { equipmentService } from '../services/equipmentService';
import {
  testDatabaseConnection,
  isSupabaseConfigured,
  uploadEquipmentImage,
  getSupabaseAnonKey,
  saveSupabaseAnonKey,
  SUPABASE_HOST,
  SUPABASE_PORT,
  SUPABASE_USER,
  SUPABASE_DB,
  SUPABASE_URL
} from '../lib/supabase';
import { FORMAT_INR } from '../data/mockData';
import {
  Database,
  Search,
  Plus,
  RefreshCw,
  Upload,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Package,
  Boxes,
  DollarSign,
  Cpu,
  Layers,
  Edit2,
  Trash2,
  ExternalLink,
  X,
  Sparkles,
  Check,
  Key,
  Copy,
  Code2,
  Terminal,
  ShieldCheck
} from 'lucide-react';

export const AdminInventoryView = () => {
  const { showToast } = useBuild();

  // Inventory state
  const [equipmentList, setEquipmentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Supabase connection state & credentials
  const [connStatus, setConnStatus] = useState({ checked: false, connected: false, message: '' });
  const [testingConn, setTestingConn] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [anonKeyInput, setAnonKeyInput] = useState(getSupabaseAnonKey() || '');
  const [copiedUri, setCopiedUri] = useState(false);
  const [savingKey, setSavingKey] = useState(false);

  // Add/Edit modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: 'cpu',
    model_number: '',
    sku: '',
    price_inr: 0,
    stock_quantity: 15,
    availability_status: 'In Stock',
    socket_type: '',
    vram: '',
    wattage: 65,
    image_url: '',
    short_desc: ''
  });

  // Load equipment
  const loadEquipment = async () => {
    setLoading(true);
    try {
      const data = await equipmentService.getEquipment({
        category: categoryFilter,
        search: searchQuery,
        availability: statusFilter
      });
      setEquipmentList(data);
    } catch (err) {
      console.error(err);
      showToast('Error loading inventory data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEquipment();
  }, [categoryFilter, statusFilter]);

  // Check connection on mount
  useEffect(() => {
    const check = async () => {
      const res = await testDatabaseConnection();
      setConnStatus({ checked: true, ...res });
    };
    check();
  }, []);

  const handleSaveAnonKey = async () => {
    if (!anonKeyInput || !anonKeyInput.trim()) {
      showToast('Please enter a valid Supabase anon key');
      return;
    }
    setSavingKey(true);
    saveSupabaseAnonKey(anonKeyInput.trim());
    showToast('Saved Supabase configuration. Testing connection...');
    const res = await testDatabaseConnection();
    setConnStatus({ checked: true, ...res });
    setSavingKey(false);
    if (res.connected) {
      showToast('Successfully connected to Supabase PostgreSQL database!');
      loadEquipment();
    } else {
      showToast(`Notice: ${res.message || res.error}`);
    }
  };

  const handleClearAnonKey = async () => {
    saveSupabaseAnonKey('');
    setAnonKeyInput('');
    setConnStatus({ checked: true, connected: false, message: 'Anon key cleared. Reverted to local fallback.' });
    showToast('Cleared Supabase key. Switched to local catalog.');
    loadEquipment();
  };

  const handleCopyUri = () => {
    const uri = `postgresql://${SUPABASE_USER}:[YOUR-PASSWORD]@${SUPABASE_HOST}:${SUPABASE_PORT}/${SUPABASE_DB}`;
    navigator.clipboard.writeText(uri);
    setCopiedUri(true);
    showToast('PostgreSQL URI copied to clipboard!');
    setTimeout(() => setCopiedUri(false), 2500);
  };

  const handleTestConnection = async () => {
    setTestingConn(true);
    const res = await testDatabaseConnection();
    setConnStatus({ checked: true, ...res });
    setTestingConn(false);
    showToast(res.message || (res.connected ? 'Connected to Supabase!' : 'Connection check finished.'));
  };

  const handleSeedDatabase = async () => {
    setSeeding(true);
    try {
      const count = await equipmentService.seedCatalogToSupabase();
      showToast(`Successfully seeded ${count} hardware items to db.nuxmpdleqpqunkhbpqjj.supabase.co!`);
      loadEquipment();
    } catch (err) {
      showToast(`Seed failed: ${err.message}`);
    } finally {
      setSeeding(false);
    }
  };

  const handleQuickStockChange = async (item, delta) => {
    const newQty = Math.max(0, Number(item.stock_quantity || 0) + delta);
    const newStatus = newQty === 0 ? 'Out of Stock' : newQty <= 5 ? 'Low Stock' : 'In Stock';

    setEquipmentList(prev => prev.map(e => e.id === item.id ? { ...e, stock_quantity: newQty, availability_status: newStatus } : e));

    try {
      await equipmentService.updateStockAndPrice(item.id, {
        stock_quantity: newQty,
        availability_status: newStatus
      });
      showToast(`Updated ${item.name} stock to ${newQty}`);
    } catch (err) {
      showToast(`Stock update error: ${err.message}`);
    }
  };

  const handleOpenAddModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name || '',
        brand: item.brand || '',
        category: item.category || 'cpu',
        model_number: item.model_number || '',
        sku: item.sku || '',
        price_inr: item.price_inr || item.price || 0,
        stock_quantity: item.stock_quantity || 10,
        availability_status: item.availability_status || 'In Stock',
        socket_type: item.socket_type || item.socket || '',
        vram: item.vram || '',
        wattage: item.wattage || item.tdp || 65,
        image_url: item.image_url || '',
        short_desc: item.short_desc || item.specs || ''
      });
    } else {
      setEditingItem(null);
      setFormData({
        name: '',
        brand: '',
        category: 'cpu',
        model_number: '',
        sku: `SKU-${Date.now().toString().slice(-6)}`,
        price_inr: 9999,
        stock_quantity: 15,
        availability_status: 'In Stock',
        socket_type: 'AM5',
        vram: '',
        wattage: 65,
        image_url: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&auto=format&fit=crop&q=80',
        short_desc: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast('Product name is required');
      return;
    }

    try {
      const payload = {
        id: editingItem ? editingItem.id : `custom-${formData.category}-${Date.now()}`,
        name: formData.name.trim(),
        brand: formData.brand.trim() || 'Generic',
        category: formData.category,
        model_number: formData.model_number || null,
        sku: formData.sku || null,
        price_inr: Number(formData.price_inr) || 0,
        stock_quantity: Number(formData.stock_quantity) || 0,
        availability_status: formData.availability_status,
        socket_type: formData.socket_type || null,
        vram: formData.vram || null,
        wattage: Number(formData.wattage) || null,
        image_url: formData.image_url || null,
        short_desc: formData.short_desc || null,
        is_featured: false
      };

      if (editingItem) {
        await equipmentService.updateStockAndPrice(editingItem.id, payload);
        setEquipmentList(prev => prev.map(e => e.id === editingItem.id ? { ...e, ...payload } : e));
        showToast(`Updated product ${payload.name}`);
      } else {
        await equipmentService.createEquipment(payload);
        setEquipmentList(prev => [payload, ...prev]);
        showToast(`Added product ${payload.name} to database`);
      }

      setIsModalOpen(false);
    } catch (err) {
      showToast(`Error saving product: ${err.message}`);
    }
  };

  const handleDeleteProduct = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete ${name}?`)) return;
    try {
      await equipmentService.deleteEquipment(id);
      setEquipmentList(prev => prev.filter(e => e.id !== id));
      showToast(`Deleted ${name}`);
    } catch (err) {
      showToast(`Delete failed: ${err.message}`);
    }
  };

  // Inventory stats
  const totalItems = equipmentList.length;
  const inStockCount = equipmentList.filter(e => e.availability_status === 'In Stock').length;
  const lowStockCount = equipmentList.filter(e => e.availability_status === 'Low Stock').length;
  const totalValue = equipmentList.reduce((acc, cur) => acc + (Number(cur.price_inr || cur.price || 0) * Number(cur.stock_quantity || 1)), 0);

  return (
    <div className="animate-fade-in" style={{ padding: '36px 0 80px 0' }}>
      <div className="page-container" style={{ maxWidth: '1360px' }}>
        
        {/* TOP HEADER */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px',
          marginBottom: '28px'
        }}>
          <div>
            <div className="badge badge-purple" style={{ marginBottom: '10px' }}>
              <Database size={13} /> SUPABASE HARDWARE & INVENTORY REGISTRY
            </div>
            <h1 style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.03em' }}>
              Equipment Stock & Price Manager
            </h1>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '68ch' }}>
              Connected to PostgreSQL instance at <code style={{ color: 'var(--accent-purple-text)' }}>db.nuxmpdleqpqunkhbpqjj.supabase.co:5432</code>. Manage real-time pricing in ₹, inventory counts, and product visual assets.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => handleOpenAddModal()}
              className="btn-primary"
              style={{ padding: '12px 20px', fontSize: '14px' }}
            >
              <Plus size={16} /> Add Equipment
            </button>
            <button
              onClick={handleSeedDatabase}
              disabled={seeding}
              className="btn-secondary"
              title="Populates Supabase with all canonical equipment and stock"
              style={{ padding: '12px 18px', fontSize: '14px' }}
            >
              <Sparkles size={15} color="var(--accent-purple)" />
              <span>{seeding ? 'Seeding...' : 'Seed to Supabase'}</span>
            </button>
          </div>
        </div>

        {/* SUPABASE CONTROL CENTER CARD */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-default)',
          borderRadius: '18px',
          padding: '24px',
          marginBottom: '32px',
          boxShadow: 'var(--shadow-md)'
        }}>
          {/* Top Row: DB Host, Status, and Action Buttons */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            paddingBottom: '20px',
            borderBottom: '1px solid var(--border-subtle)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-default)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-purple)',
                boxShadow: '0 0 16px rgba(124, 92, 255, 0.15)'
              }}>
                <Database size={22} />
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '16px', fontWeight: 700, color: '#FFF' }}>
                    Supabase PostgreSQL Database
                  </span>
                  <span className={`badge ${connStatus.connected ? 'badge-success' : 'badge-neutral'}`} style={{ fontSize: '11px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    {connStatus.connected ? (
                      <><Check size={12} /> Connected & Live</>
                    ) : (
                      <><AlertTriangle size={12} /> Local Catalog Mode</>
                    )}
                  </span>
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '3px' }}>
                  Host: <code style={{ color: '#FFF', fontWeight: 600 }}>{SUPABASE_HOST}</code> · Port: <code>{SUPABASE_PORT}</code> · User: <code>{SUPABASE_USER}</code> · DB: <code>{SUPABASE_DB}</code>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <button
                onClick={handleTestConnection}
                disabled={testingConn}
                className="btn-quiet"
                style={{ fontSize: '13px', padding: '8px 14px', border: '1px solid var(--border-default)', borderRadius: '8px' }}
              >
                <RefreshCw size={14} className={testingConn ? 'animate-spin' : ''} />
                <span>{testingConn ? 'Testing...' : 'Test Connection'}</span>
              </button>
              <a
                href="https://supabase.com/dashboard/project/nuxmpdleqpqunkhbpqjj/sql/new"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-quiet"
                style={{ fontSize: '13px', color: 'var(--accent-purple)', display: 'flex', alignItems: 'center', gap: '5px' }}
                title="Open Supabase SQL Editor to run schema.sql"
              >
                <Code2 size={14} />
                <span>Run Schema in SQL Editor</span>
                <ExternalLink size={12} />
              </a>
              <a
                href="https://supabase.com/dashboard/project/nuxmpdleqpqunkhbpqjj"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-quiet"
                style={{ fontSize: '13px', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                <span>Supabase Dashboard</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>

          {/* Connection URI & Anon Key Inputs */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '20px',
            marginTop: '20px'
          }}>
            {/* Direct PostgreSQL Connection URI */}
            <div style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-default)',
              borderRadius: '12px',
              padding: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Terminal size={13} color="var(--accent-blue)" /> PostgreSQL Direct URI
                </span>
                <button
                  onClick={handleCopyUri}
                  className="btn-quiet"
                  style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}
                >
                  {copiedUri ? <><Check size={11} color="var(--status-success)" /> Copied</> : <><Copy size={11} /> Copy URI</>}
                </button>
              </div>
              <div style={{
                fontFamily: 'monospace',
                fontSize: '12px',
                color: 'var(--text-muted)',
                background: 'var(--bg-base)',
                padding: '8px 12px',
                borderRadius: '8px',
                wordBreak: 'break-all',
                border: '1px solid var(--border-subtle)'
              }}>
                postgresql://postgres:[YOUR-PASSWORD]@{SUPABASE_HOST}:{SUPABASE_PORT}/{SUPABASE_DB}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px' }}>
                For database GUI tools (DBeaver, TablePlus, psql) or backend scripts.
              </div>
            </div>

            {/* Supabase Anon Public Key Configuration */}
            <div style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-default)',
              borderRadius: '12px',
              padding: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Key size={13} color="var(--accent-purple)" /> Frontend Supabase Anon Key
                </span>
                <span style={{ fontSize: '11px', color: isSupabaseConfigured() ? 'var(--status-success)' : 'var(--status-warning)' }}>
                  {isSupabaseConfigured() ? '✓ Key Configured' : 'Key Missing'}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="password"
                  placeholder="Paste Supabase anon public key (eyJhbGciOi...)"
                  value={anonKeyInput}
                  onChange={(e) => setAnonKeyInput(e.target.value)}
                  style={{
                    flex: 1,
                    background: 'var(--bg-base)',
                    border: '1px solid var(--border-default)',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    fontSize: '12px',
                    color: '#FFF',
                    fontFamily: 'monospace'
                  }}
                />
                <button
                  onClick={handleSaveAnonKey}
                  disabled={savingKey}
                  className="btn-primary"
                  style={{ fontSize: '12px', padding: '8px 14px', whiteSpace: 'nowrap' }}
                >
                  {savingKey ? 'Connecting...' : 'Save & Sync'}
                </button>
                {anonKeyInput && (
                  <button
                    onClick={handleClearAnonKey}
                    className="btn-quiet"
                    title="Clear key and revert to local fallback"
                    style={{ fontSize: '12px', padding: '8px 10px', border: '1px solid var(--border-subtle)' }}
                  >
                    Clear
                  </button>
                )}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px', display: 'flex', justifyContent: 'space-between' }}>
                <span>Found in: Supabase Dashboard &gt; Project Settings &gt; API &gt; anon public</span>
                <a
                  href="https://supabase.com/dashboard/project/nuxmpdleqpqunkhbpqjj/settings/api"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--accent-purple-text)' }}
                >
                  Get API Key →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* INVENTORY METRIC TILES (4 Stats) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '18px',
          marginBottom: '32px'
        }}>
          <div className="card-surface" style={{ padding: '20px' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Total Products in Catalog
            </div>
            <div style={{ fontSize: '32px', fontWeight: 800, color: '#FFF', margin: '4px 0' }} className="tabular-nums">
              {totalItems}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Spanning 9 hardware categories
            </div>
          </div>

          <div className="card-surface" style={{ padding: '20px' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              In-Stock Availability
            </div>
            <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--status-success)', margin: '4px 0' }} className="tabular-nums">
              {inStockCount}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Verified ready for instant dispatch
            </div>
          </div>

          <div className="card-surface" style={{ padding: '20px' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Low Stock Warnings
            </div>
            <div style={{ fontSize: '32px', fontWeight: 800, color: lowStockCount > 0 ? 'var(--status-warning)' : 'var(--text-muted)', margin: '4px 0' }} className="tabular-nums">
              {lowStockCount}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Fewer than 5 units remaining
            </div>
          </div>

          <div className="card-surface" style={{ padding: '20px' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Estimated Inventory Value
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--accent-purple-text)', margin: '4px 0' }} className="tabular-nums">
              {FORMAT_INR(totalValue)}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Indian retail inventory valuation
            </div>
          </div>
        </div>

        {/* SEARCH & FILTERS BAR */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-default)',
          borderRadius: '16px',
          padding: '16px 20px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '14px'
        }}>
          {/* Search box */}
          <div style={{ position: 'relative', flex: '1 1 300px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search by product name, brand, SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field"
              style={{ paddingLeft: '38px', height: '42px' }}
            />
          </div>

          {/* Category Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-default)',
                color: '#FFF',
                padding: '8px 12px',
                borderRadius: '8px',
                fontSize: '13px',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="all">All Categories</option>
              <option value="cpu">CPU Processors</option>
              <option value="gpu">Graphics Cards (GPU)</option>
              <option value="motherboard">Motherboards</option>
              <option value="ram">System Memory (RAM)</option>
              <option value="storage">Storage (NVMe SSD)</option>
              <option value="psu">Power Supplies (PSU)</option>
              <option value="case">Chassis (PC Case)</option>
              <option value="cooler">Coolers</option>
              <option value="os">Operating Systems</option>
            </select>
          </div>

          {/* Availability Status Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-default)',
                color: '#FFF',
                padding: '8px 12px',
                borderRadius: '8px',
                fontSize: '13px',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="all">All Availability</option>
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
        </div>

        {/* INVENTORY TABLE */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-default)',
          borderRadius: '18px',
          overflow: 'hidden'
        }}>
          {/* Table Header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '70px 1.8fr 110px 140px 160px 130px 100px',
            padding: '16px 24px',
            borderBottom: '1px solid var(--border-default)',
            background: 'var(--bg-surface)',
            fontSize: '11px',
            fontWeight: 700,
            color: 'var(--text-faint)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            alignItems: 'center'
          }} className="inventory-table-header">
            <div>Image</div>
            <div>Equipment & Specs</div>
            <div>Category</div>
            <div>Price (INR)</div>
            <div>Stock Count</div>
            <div>Status</div>
            <div style={{ textAlign: 'right' }}>Actions</div>
          </div>

          {/* Table Body */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
              Loading equipment records from Supabase...
            </div>
          ) : equipmentList.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
              No products found matching your search.
            </div>
          ) : (
            equipmentList.map((item, idx) => {
              const price = item.price_inr || item.price || 0;
              const isLow = item.stock_quantity <= 5 && item.stock_quantity > 0;
              const isOut = item.stock_quantity === 0;

              return (
                <div
                  key={item.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '70px 1.8fr 110px 140px 160px 130px 100px',
                    padding: '16px 24px',
                    borderBottom: idx === equipmentList.length - 1 ? 'none' : '1px solid var(--border-subtle)',
                    background: idx % 2 === 0 ? 'transparent' : 'rgba(16, 18, 24, 0.35)',
                    alignItems: 'center',
                    fontSize: '13px'
                  }}
                  className="inventory-table-row"
                >
                  {/* Thumbnail */}
                  <div>
                    <img
                      src={item.image_url || 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=120&auto=format&fit=crop&q=80'}
                      alt={item.name}
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '8px',
                        objectFit: 'cover',
                        border: '1px solid var(--border-default)'
                      }}
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=120&auto=format&fit=crop&q=80';
                      }}
                    />
                  </div>

                  {/* Name & Model */}
                  <div style={{ paddingRight: '16px' }}>
                    <div style={{ fontWeight: 600, color: '#FFF', fontSize: '14px' }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <span>Brand: <strong style={{ color: 'var(--text-secondary)' }}>{item.brand}</strong></span>
                      {item.socket_type && <span>Socket: {item.socket_type}</span>}
                      {item.vram && <span>VRAM: {item.vram}</span>}
                      {item.wattage && <span>{item.wattage}W</span>}
                    </div>
                  </div>

                  {/* Category Pill */}
                  <div>
                    <span className="badge badge-neutral" style={{ textTransform: 'uppercase', fontSize: '10px' }}>
                      {item.category}
                    </span>
                  </div>

                  {/* Price in INR */}
                  <div style={{ fontWeight: 700, color: '#FFF' }} className="tabular-nums">
                    {FORMAT_INR(price)}
                  </div>

                  {/* Stock Quantity Stepper */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      onClick={() => handleQuickStockChange(item, -1)}
                      className="btn-quiet"
                      style={{ padding: '4px 8px', border: '1px solid var(--border-default)', borderRadius: '6px' }}
                      title="Decrease stock"
                    >
                      -
                    </button>
                    <span style={{ minWidth: '32px', textAlign: 'center', fontWeight: 700, color: '#FFF' }} className="tabular-nums">
                      {item.stock_quantity}
                    </span>
                    <button
                      onClick={() => handleQuickStockChange(item, +1)}
                      className="btn-quiet"
                      style={{ padding: '4px 8px', border: '1px solid var(--border-default)', borderRadius: '6px' }}
                      title="Increase stock"
                    >
                      +
                    </button>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>units</span>
                  </div>

                  {/* Status */}
                  <div>
                    <span className={`badge ${isOut ? 'badge-danger' : isLow ? 'badge-warning' : 'badge-success'}`}>
                      {item.availability_status}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                    <button
                      onClick={() => handleOpenAddModal(item)}
                      className="btn-quiet"
                      style={{ padding: '6px' }}
                      title="Edit Item"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(item.id, item.name)}
                      className="btn-quiet"
                      style={{ padding: '6px', color: 'var(--status-danger)' }}
                      title="Delete Item"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* ADD / EDIT EQUIPMENT MODAL */}
        {isModalOpen && (
          <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
            <div
              className="card-surface"
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '720px',
                maxHeight: '90vh',
                overflowY: 'auto',
                background: 'var(--bg-card)',
                padding: '32px',
                border: '1px solid var(--border-default)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#FFF' }}>
                  {editingItem ? 'Edit Equipment Details' : 'Add New Hardware Equipment'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="btn-quiet">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                      Product Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input-field"
                      placeholder="e.g. AMD Ryzen 9 7900X"
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                      Brand *
                    </label>
                    <input
                      type="text"
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      className="input-field"
                      placeholder="e.g. AMD / Corsair / MSI"
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                      Hardware Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="input-field"
                    >
                      <option value="cpu">CPU Processor</option>
                      <option value="gpu">Graphics Card (GPU)</option>
                      <option value="motherboard">Motherboard</option>
                      <option value="ram">System Memory (RAM)</option>
                      <option value="storage">Storage (NVMe SSD)</option>
                      <option value="psu">Power Supply (PSU)</option>
                      <option value="case">Chassis (Case)</option>
                      <option value="cooler">Cooler</option>
                      <option value="os">Operating System</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                      Price (INR ₹) *
                    </label>
                    <input
                      type="number"
                      value={formData.price_inr}
                      onChange={(e) => setFormData({ ...formData, price_inr: e.target.value })}
                      className="input-field"
                      min="0"
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      value={formData.stock_quantity}
                      onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
                      className="input-field"
                      min="0"
                      required
                    />
                  </div>
                </div>

                {/* Compatibility Specific Fields */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                      Socket (CPUs/Boards)
                    </label>
                    <input
                      type="text"
                      value={formData.socket_type}
                      onChange={(e) => setFormData({ ...formData, socket_type: e.target.value })}
                      className="input-field"
                      placeholder="e.g. AM5, LGA1700"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                      VRAM (GPUs)
                    </label>
                    <input
                      type="text"
                      value={formData.vram}
                      onChange={(e) => setFormData({ ...formData, vram: e.target.value })}
                      className="input-field"
                      placeholder="e.g. 12GB GDDR7"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                      TDP / Power (Watts)
                    </label>
                    <input
                      type="number"
                      value={formData.wattage}
                      onChange={(e) => setFormData({ ...formData, wattage: e.target.value })}
                      className="input-field"
                      placeholder="e.g. 65 or 650"
                    />
                  </div>
                </div>

                {/* Product Picture URL */}
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    Product Picture URL (Supabase Bucket: `equipment-images`)
                  </label>
                  <input
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    className="input-field"
                    placeholder="https://... or Supabase storage public URL"
                  />
                </div>

                {/* Short Description */}
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    Specification Summary / Description
                  </label>
                  <textarea
                    value={formData.short_desc}
                    onChange={(e) => setFormData({ ...formData, short_desc: e.target.value })}
                    className="input-field"
                    rows={2}
                    placeholder="Key specifications, clock speeds, clearance allowance..."
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary" style={{ padding: '12px 28px' }}>
                    <Check size={16} /> Save to Supabase
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>

      <style>{`
        @media (max-width: 900px) {
          .inventory-table-header {
            display: none !important;
          }
          .inventory-table-row {
            grid-template-columns: 1fr !important;
            gap: 12px;
          }
        }
      `}</style>
    </div>
  );
};
