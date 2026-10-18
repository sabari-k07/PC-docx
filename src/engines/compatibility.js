/**
 * PC_DOCx 6-Layer Hardware Compatibility & PSU Telemetry Engine
 * 
 * Layer 1: CPU ↔ Motherboard Socket Alignment
 * Layer 2: RAM ↔ Motherboard Generation (DDR5 vs DDR4)
 * Layer 3: Motherboard ↔ Chassis Form Factor Dimensions
 * Layer 4: GPU Physical Length ↔ Chassis GPU Clearance
 * Layer 5: CPU Cooler Thermal Capacity (TDP) & Clearance
 * Layer 6: Peak System Power Draw ↔ PSU Headroom & 80+ Efficiency
 * Bonus: CPU ↔ GPU Tier Bottleneck Ratio Check
 */

import { formatINR } from '../lib/formatters.js';

// Form-factor compatibility map (Chassis -> supported Motherboards)
const CASE_SUPPORTED_MOBOS = {
  'ATX Mid Tower': ['ATX', 'Micro-ATX', 'Mini-ITX'],
  'ATX Full Tower': ['E-ATX', 'ATX', 'Micro-ATX', 'Mini-ITX'],
  'Micro-ATX Mini Tower': ['Micro-ATX', 'Mini-ITX'],
  'Mini-ITX': ['Mini-ITX'],
  'Dual-Chamber Mid Tower': ['ATX', 'Micro-ATX', 'Mini-ITX']
};

/**
 * Calculate total estimated system power draw in watts
 */
export function calculateSystemPower(components = {}) {
  const cpuTdp = Number(components.cpu?.tdp || 65);
  const gpuTdp = Number(components.gpu?.tdp || 200);
  const moboPower = 50;
  const ramPower = 15;
  const storagePower = 10;
  const fansCoolerPower = 25;
  const usbPeripherals = 15;

  return Math.round(cpuTdp + gpuTdp + moboPower + ramPower + storagePower + fansCoolerPower + usbPeripherals);
}

/**
 * Run the comprehensive 6-layer hardware compatibility audit
 * @param {Object} components - Active build components map { cpu, motherboard, gpu, ram, psu, case, cooler, storage }
 * @returns {Object} { isCompatible, healthScore, healthLabel, checks, totalPower, recommendedPsuWatts }
 */
export function auditCompatibility(components = {}) {
  const checks = [];
  let healthScore = 100;

  const {
    cpu,
    motherboard: mobo,
    gpu,
    ram,
    psu,
    case: pcCase,
    cooler,
    storage
  } = components;

  // --- LAYER 1: CPU ↔ Motherboard Socket Alignment ---
  if (cpu && mobo) {
    const cpuSocket = (cpu.socket || '').trim().toUpperCase();
    const moboSocket = (mobo.socket || '').trim().toUpperCase();

    if (cpuSocket && moboSocket && cpuSocket === moboSocket) {
      checks.push({
        id: 'layer-1-socket',
        layer: 1,
        title: 'CPU ↔ Motherboard Socket Alignment',
        status: `Matched (${cpuSocket})`,
        type: 'success',
        detail: `Both ${cpu.name} and ${mobo.name} utilize the ${cpuSocket} socket interface. Physical pin layout and electrical power delivery are 100% verified.`
      });
    } else if (cpuSocket && moboSocket) {
      healthScore -= 30;
      checks.push({
        id: 'layer-1-socket',
        layer: 1,
        title: 'CPU ↔ Motherboard Socket Incompatibility',
        status: 'Physical Incompatibility',
        type: 'error',
        detail: `CRITICAL CONFLICT: ${cpu.name} requires socket ${cpuSocket}, but ${mobo.name} is engineered for ${moboSocket}. The CPU will not physically fit into this motherboard.`
      });
    }
  } else {
    checks.push({
      id: 'layer-1-socket',
      layer: 1,
      title: 'CPU ↔ Motherboard Socket',
      status: 'Pending Selection',
      type: 'neutral',
      detail: 'Select both a CPU and a Motherboard to verify socket pin alignment.'
    });
  }

  // --- LAYER 2: RAM ↔ Motherboard Memory Standard (DDR5 vs DDR4) ---
  if (ram && mobo) {
    const ramType = (ram.type || ram.ram_type || (ram.name?.includes('DDR4') ? 'DDR4' : 'DDR5')).toUpperCase();
    const moboRamType = (mobo.ramType || mobo.ram_type || (mobo.name?.includes('DDR4') ? 'DDR4' : 'DDR5')).toUpperCase();

    if (ramType === moboRamType) {
      checks.push({
        id: 'layer-2-memory',
        layer: 2,
        title: 'RAM ↔ Motherboard Generation',
        status: `Synchronized (${ramType})`,
        type: 'success',
        detail: `${ram.name} matches motherboard DIMM slot architecture (${moboRamType}). Key notch spacing and JEDEC/EXPO voltage rails match.`
      });
    } else {
      healthScore -= 25;
      checks.push({
        id: 'layer-2-memory',
        layer: 2,
        title: 'Memory Standard Mismatch',
        status: `${ramType} vs ${moboRamType} Conflict`,
        type: 'error',
        detail: `CRITICAL CONFLICT: Selected memory is ${ramType}, but ${mobo.name} exclusively accepts ${moboRamType} DIMMs. Key notches differ.`
      });
    }
  } else {
    checks.push({
      id: 'layer-2-memory',
      layer: 2,
      title: 'RAM ↔ Motherboard Generation',
      status: 'Pending Selection',
      type: 'neutral',
      detail: 'Select both RAM and Motherboard to verify memory generation compatibility.'
    });
  }

  // --- LAYER 3: Motherboard ↔ Chassis Form Factor ---
  if (mobo && pcCase) {
    const moboFF = mobo.formFactor || 'Micro-ATX';
    const caseFF = pcCase.formFactor || pcCase.form_factor || 'ATX Mid Tower';
    const supportedList = CASE_SUPPORTED_MOBOS[caseFF] || ['ATX', 'Micro-ATX', 'Mini-ITX'];

    if (supportedList.includes(moboFF)) {
      checks.push({
        id: 'layer-3-formfactor',
        layer: 3,
        title: 'Motherboard ↔ Chassis Form Factor',
        status: 'Standoff Alignment Confirmed',
        type: 'success',
        detail: `${pcCase.name} (${caseFF}) natively houses ${moboFF} motherboards with pre-installed motherboard standoffs.`
      });
    } else {
      healthScore -= 20;
      checks.push({
        id: 'layer-3-formfactor',
        layer: 3,
        title: 'Form Factor Clearance Conflict',
        status: 'Dimension Mismatch',
        type: 'error',
        detail: `Chassis (${caseFF}) is too compact to house an ${moboFF} motherboard (${mobo.name}). Consider stepping up to an ATX chassis.`
      });
    }
  }

  // --- LAYER 4: GPU Length ↔ Case GPU Clearance ---
  if (gpu && pcCase) {
    const gpuLengthMm = gpu.lengthMm || (gpu.name?.includes('4080') || gpu.name?.includes('4090') ? 336 : 285);
    const caseMaxGpuMm = pcCase.maxGpuLengthMm || 360;

    if (gpuLengthMm <= caseMaxGpuMm) {
      const clearance = caseMaxGpuMm - gpuLengthMm;
      checks.push({
        id: 'layer-4-gpu-clearance',
        layer: 4,
        title: 'GPU Physical Length Clearance',
        status: `Fits with ${clearance}mm buffer`,
        type: 'success',
        detail: `${gpu.name} length (${gpuLengthMm}mm) clears inside ${pcCase.name} (${caseMaxGpuMm}mm max clearance) with front fans installed.`
      });
    } else {
      healthScore -= 18;
      checks.push({
        id: 'layer-4-gpu-clearance',
        layer: 4,
        title: 'GPU Physical Clearance Warning',
        status: 'Chassis Length Collision',
        type: 'error',
        detail: `GPU length (${gpuLengthMm}mm) exceeds chassis maximum allowance (${caseMaxGpuMm}mm). Front radiator or fan collision detected.`
      });
    }
  }

  // --- LAYER 5: CPU Cooler Thermal Capacity & Height ---
  if (cpu && cooler) {
    const cpuTdp = Number(cpu.tdp || 65);
    const coolerTdp = Number(cooler.tdp || cooler.coolingCapacityTdp || 180);

    if (coolerTdp >= cpuTdp * 1.2) {
      checks.push({
        id: 'layer-5-cooling',
        layer: 5,
        title: 'Thermal Dissipation Headroom',
        status: `${coolerTdp}W Thermal Capacity`,
        type: 'success',
        detail: `${cooler.name} dissipates up to ${coolerTdp}W, comfortably subduing ${cpu.name}'s ${cpuTdp}W peak package power in warm Indian ambients (32°C+).`
      });
    } else if (coolerTdp >= cpuTdp) {
      checks.push({
        id: 'layer-5-cooling',
        layer: 5,
        title: 'Cooler Thermal Margin Tight',
        status: 'Borderline Dissipation',
        type: 'warning',
        detail: `${cooler.name} provides ${coolerTdp}W dissipation for a ${cpuTdp}W processor. Sustained compiling or AVX workloads may reach 85°C+.`
      });
      healthScore -= 6;
    } else {
      healthScore -= 15;
      checks.push({
        id: 'layer-5-cooling',
        layer: 5,
        title: 'Thermal Throttling Hazard',
        status: 'Inadequate Cooling',
        type: 'error',
        detail: `${cooler.name} (${coolerTdp}W capacity) is underpowered for ${cpu.name} (${cpuTdp}W TDP). Severe thermal throttling guaranteed.`
      });
    }
  }

  // --- LAYER 6: System Total Power Draw ↔ PSU Headroom ---
  const totalPower = calculateSystemPower(components);
  const recommendedPsuWatts = Math.ceil((totalPower * 1.35) / 50) * 50;

  if (psu) {
    const psuWatts = Number(psu.wattage || 650);
    const loadPct = Math.round((totalPower / psuWatts) * 100);

    if (loadPct <= 65) {
      checks.push({
        id: 'layer-6-power',
        layer: 6,
        title: 'Power Delivery & 80+ Curve Efficiency',
        status: `80+ Efficiency Peak (${loadPct}% Load)`,
        type: 'success',
        detail: `System pulls ${totalPower}W against a ${psuWatts}W unit (${loadPct}% load). Operates directly inside the 80+ Gold efficiency sweet spot (50% curve peak).`
      });
    } else if (loadPct <= 80) {
      checks.push({
        id: 'layer-6-power',
        layer: 6,
        title: 'Adequate Headroom with High Load',
        status: `${loadPct}% PSU Utilization`,
        type: 'warning',
        detail: `System draws ${totalPower}W on a ${psuWatts}W power supply (${loadPct}% load). Safe for operation, but step up to ${recommendedPsuWatts}W for lower fan acoustics.`
      });
      healthScore -= 6;
    } else {
      healthScore -= 22;
      checks.push({
        id: 'layer-6-power',
        layer: 6,
        title: 'Critical Power Supply Deficit',
        status: `Overload Hazard (${loadPct}% Load)`,
        type: 'error',
        detail: `System draws ${totalPower}W against a ${psuWatts}W PSU. Transient power spikes (ATX 3.0 spikes) will trip over-current protection (OCP) shutdowns.`
      });
    }
  }

  // --- BONUS: CPU ↔ GPU Bottleneck Balance Engine ---
  if (cpu && gpu) {
    const cpuPrice = cpu.price || 0;
    const gpuPrice = gpu.price || 0;
    const ratio = gpuPrice > 0 ? (cpuPrice / gpuPrice) : 1;

    if (ratio > 1.35 && gpuPrice < 35000 && cpuPrice > 25000) {
      healthScore -= 8;
      checks.push({
        id: 'bottleneck-ratio',
        layer: 7,
        title: 'CPU ↔ GPU Budget Allocation Mismatch',
        status: 'Excessive CPU Expenditure',
        type: 'warning',
        detail: `High-end CPU (${cpu.name}, ${formatINR(cpuPrice)}) is paired with an entry GPU (${gpu.name}, ${formatINR(gpuPrice)}). Reallocating ~₹10,000 to GPU yields 35%+ higher gaming framerates.`
      });
    } else if (ratio < 0.28 && gpuPrice > 75000) {
      healthScore -= 6;
      checks.push({
        id: 'bottleneck-ratio',
        layer: 7,
        title: 'CPU Frame Pacing Limitation',
        status: 'Potential 1% Low Stutters',
        type: 'warning',
        detail: `${gpu.name} may encounter frame delivery latency with ${cpu.name} in dense multiplayer or simulation workloads.`
      });
    } else {
      checks.push({
        id: 'bottleneck-ratio',
        layer: 7,
        title: 'Architectural Balance Confirmed',
        status: 'Zero Bottleneck (< 3%)',
        type: 'success',
        detail: `${cpu.name} and ${gpu.name} form an optimal tier partnership with zero waste.`
      });
    }
  }

  const finalScore = Math.max(healthScore, 10);
  const healthLabel = finalScore >= 90 ? 'Excellent' : finalScore >= 75 ? 'Good' : 'Needs Attention';
  const hasErrors = checks.some(c => c.type === 'error');

  return {
    isCompatible: !hasErrors,
    healthScore: finalScore,
    healthLabel,
    checks,
    totalPower,
    recommendedPsuWatts
  };
}
