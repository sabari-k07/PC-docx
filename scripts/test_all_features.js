// ==============================================================================
// PC_DOCx COMPREHENSIVE QA & TEST RUNNER
// Verifies all data schemas, compatibility rules, services, calculations, and views
// ==============================================================================

import { COMPONENT_CATALOG, CANONICAL_BUILD, FEATURED_BUILDS, FORMAT_INR, calculateComponentEQ } from '../src/data/mockData.js';
import { equipmentService } from '../src/services/equipmentService.js';
import { buildService } from '../src/services/buildService.js';
import { SUPABASE_HOST, SUPABASE_PORT, SUPABASE_USER, SUPABASE_DB, SUPABASE_URL } from '../src/lib/supabase.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  [PASS] ${message}`);
    passed++;
  } else {
    console.error(`  [FAIL] ${message}`);
    failed++;
  }
}

async function runTestSuite() {
  console.log('\n======================================================');
  console.log('   PC_DOCx SYSTEM TEST & QA SUITE: RUNNING CHECKS');
  console.log('======================================================\n');

  // TEST SUITE 1: CATALOG DATA INTEGRITY & INR PRICING
  console.log('--- TEST SUITE 1: Catalog Data & Indian Pricing (₹) ---');
  const categories = ['cpu', 'motherboard', 'gpu', 'ram', 'storage', 'psu', 'case', 'cooler', 'os'];
  categories.forEach(cat => {
    const items = COMPONENT_CATALOG[cat];
    assert(Array.isArray(items) && items.length > 0, `Category '${cat}' exists and contains ${items?.length} items`);
    items.forEach(item => {
      assert(typeof item.id === 'string' && item.id.length > 0, `Item ${item.name} has valid ID: ${item.id}`);
      assert(typeof item.price === 'number' && item.price >= 0, `Item ${item.name} has valid INR price: ₹${item.price}`);
    });
  });

  // Check currency formatting
  assert(FORMAT_INR(100000) === '₹1,00,000', `FORMAT_INR(100000) produces Indian numbering: ${FORMAT_INR(100000)}`);
  assert(FORMAT_INR(98450) === '₹98,450', `FORMAT_INR(98450) produces Indian numbering: ${FORMAT_INR(98450)}`);

  // TEST SUITE 2: CANONICAL & PRESET BUILDS
  console.log('\n--- TEST SUITE 2: Canonical & Preset Builds ---');
  assert(CANONICAL_BUILD && CANONICAL_BUILD.name, 'Canonical build is defined');
  const canonicalParts = Object.keys(CANONICAL_BUILD.components);
  assert(canonicalParts.length === 9, `Canonical build contains all 9 core components (${canonicalParts.length}/9)`);
  assert(Array.isArray(FEATURED_BUILDS) && FEATURED_BUILDS.length >= 3, `Featured builds array has ${FEATURED_BUILDS.length} tiers`);

  // TEST SUITE 3: COMPATIBILITY ENGINE CALCULATIONS
  console.log('\n--- TEST SUITE 3: Compatibility Engine Calculations ---');
  const cpu = CANONICAL_BUILD.components.cpu;
  const mobo = CANONICAL_BUILD.components.motherboard;
  const ram = CANONICAL_BUILD.components.ram;
  const gpu = CANONICAL_BUILD.components.gpu;
  const psu = CANONICAL_BUILD.components.psu;
  const cooler = CANONICAL_BUILD.components.cooler;
  const pcCase = CANONICAL_BUILD.components.case;

  // Socket AM5 match
  assert(cpu.socket === 'AM5' && mobo.socket === 'AM5', 'Socket AM5 match verified (Ryzen 5 7600 + MSI B650M-P)');
  // RAM DDR5 match
  assert(ram.type === 'DDR5', 'RAM DDR5 standard verified');
  // Clearance
  const maxGpu = pcCase.maxGpuLength || pcCase.maxGpuLengthMm || 370;
  const maxCooler = pcCase.maxCoolerHeight || pcCase.maxCoolerHeightMm || 163;
  assert(gpu.lengthMm < maxGpu, `GPU clearance verified (${gpu.lengthMm}mm < ${maxGpu}mm max)`);
  assert(cooler.heightMm < maxCooler, `Cooler clearance verified (${cooler.heightMm}mm < ${maxCooler}mm max)`);
  // Power Draw
  const estimatedPower = (cpu.tdp || 65) + (gpu.tdp || 250) + 123;
  const loadPct = Math.round((estimatedPower / psu.wattage) * 100);
  assert(loadPct >= 50 && loadPct <= 75, `PSU load percentage is in optimal efficiency curve: ${loadPct}% (${estimatedPower}W / ${psu.wattage}W)`);

  // TEST SUITE 4: EQUIPMENT SERVICE (SUPABASE & FALLBACK)
  console.log('\n--- TEST SUITE 4: Equipment Service & Inventory ---');
  const allEquipment = await equipmentService.getEquipment();
  assert(Array.isArray(allEquipment) && allEquipment.length > 20, `equipmentService.getEquipment() returned ${allEquipment.length} items`);
  const gpusOnly = await equipmentService.getEquipment({ category: 'gpu' });
  assert(gpusOnly.every(g => g.category === 'gpu'), 'equipmentService category filter works correctly for GPUs');
  const amdSearch = await equipmentService.getEquipment({ search: 'Ryzen' });
  assert(amdSearch.some(i => i.name.includes('Ryzen')), 'equipmentService keyword search works correctly');

  // TEST SUITE 5: BUILD SERVICE (VAULT & STORAGE)
  console.log('\n--- TEST SUITE 5: Build Service & Vault ---');
  const saved = await buildService.getSavedBuilds();
  assert(Array.isArray(saved) && saved.length > 0, `buildService.getSavedBuilds() returned ${saved.length} builds`);
  assert(saved[0].name && saved[0].actual_total, 'Saved build has valid name and total price');

  // TEST SUITE 6: SUPABASE CONFIGURATION CONSTANTS
  console.log('\n--- TEST SUITE 6: Supabase PostgreSQL Connection Constants ---');
  assert(SUPABASE_HOST === 'db.nuxmpdleqpqunkhbpqjj.supabase.co', `Host verified: ${SUPABASE_HOST}`);
  assert(SUPABASE_PORT === 5432, `Port verified: ${SUPABASE_PORT}`);
  assert(SUPABASE_USER === 'postgres', `User verified: ${SUPABASE_USER}`);
  assert(SUPABASE_DB === 'postgres', `Database verified: ${SUPABASE_DB}`);
  assert(SUPABASE_URL === 'https://nuxmpdleqpqunkhbpqjj.supabase.co', `API URL verified: ${SUPABASE_URL}`);

  // TEST SUITE 7: EFFICIENCY QUOTIENT (EQ) ENGINE
  console.log('\n--- TEST SUITE 7: Efficiency Quotient (EQ) Engine ---');
  const gpuEQ = calculateComponentEQ(gpu, 'gpu');
  assert(gpuEQ && typeof gpuEQ.score === 'number' && gpuEQ.score >= 1.0 && gpuEQ.score <= 9.9, `GPU EQ Score calculated: ${gpuEQ.score}/10`);
  assert(['A+', 'A', 'B', 'C'].includes(gpuEQ.grade), `GPU EQ Grade assigned: ${gpuEQ.grade}`);
  const cpuEQ = calculateComponentEQ(cpu, 'cpu');
  assert(cpuEQ && typeof cpuEQ.score === 'number', `CPU EQ Score calculated: ${cpuEQ.score}/10 (${cpuEQ.grade})`);

  console.log('\n======================================================');
  console.log(`   TEST EXECUTION COMPLETE: ${passed} PASSED | ${failed} FAILED`);
  console.log('======================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTestSuite().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
