/**
 * PC_DOCx Hardware Compatibility Engine
 * Live 6-layer compatibility health checks (Socket, RAM type, GPU physical clearance, PSU headroom).
 */

export function evaluateBuildCompatibility(build) {
  const checks = [];
  const { cpu, motherboard, ram, gpu, case: pcCase, psu } = build;

  // 1. CPU <-> Motherboard Socket Check
  if (cpu && motherboard) {
    const cpuSocket = cpu.specs?.socket || cpu.socket;
    const moboSocket = motherboard.specs?.socket || motherboard.socket;
    const match = cpuSocket && moboSocket && cpuSocket.toUpperCase() === moboSocket.toUpperCase();
    checks.push({
      layer: 'Socket Alignment',
      status: match ? 'ok' : 'error',
      detail: match
        ? `${cpuSocket} verified`
        : `Mismatch: CPU is ${cpuSocket}, Board is ${moboSocket}`,
    });
  } else {
    checks.push({ layer: 'Socket Alignment', status: 'pending', detail: 'Select CPU & Motherboard' });
  }

  // 2. RAM Type Check
  if (ram && motherboard) {
    const ramType = ram.specs?.ram_type || ram.type || ram.ram_type;
    const moboRamType = motherboard.specs?.ram_type || motherboard.ramType || motherboard.ram_type;
    const match = ramType && moboRamType && ramType.toUpperCase() === moboRamType.toUpperCase();
    checks.push({
      layer: 'Memory Standard',
      status: match ? 'ok' : 'error',
      detail: match
        ? `${ramType} supported`
        : `Mismatch: RAM is ${ramType}, Board requires ${moboRamType}`,
    });
  } else {
    checks.push({ layer: 'Memory Standard', status: 'pending', detail: 'Select Motherboard & RAM' });
  }

  // 3. GPU Physical Clearance Check
  if (gpu && pcCase) {
    const gpuLength = gpu.specs?.length_mm || gpu.lengthMm || 280;
    const maxGpu = pcCase.specs?.max_gpu_mm || pcCase.maxGpuLengthMm || 350;
    const fits = gpuLength <= maxGpu;
    checks.push({
      layer: 'GPU Clearance',
      status: fits ? 'ok' : 'error',
      detail: `${gpuLength}mm GPU / ${maxGpu}mm Case Max`,
    });
  } else {
    checks.push({ layer: 'GPU Clearance', status: 'pending', detail: 'Select GPU & Chassis' });
  }

  // 4. Total Wattage & PSU Headroom (Ideal load 50-75% for 80+ efficiency peak)
  const estimatedDraw =
    (cpu?.wattage || cpu?.tdp || 0) +
    (motherboard?.wattage || 35) +
    (ram?.wattage || 10) +
    (gpu?.wattage || gpu?.tdp || 0) +
    45; // Storage + fans baseline

  if (psu) {
    const capacity = psu.specs?.capacity_w || psu.wattage || 750;
    const loadPct = Math.round((estimatedDraw / capacity) * 100);
    let status = 'ok';
    if (loadPct > 85) status = 'error';
    else if (loadPct > 75) status = 'warn';

    checks.push({
      layer: 'PSU Headroom',
      status,
      detail: `${estimatedDraw}W Est. / ${capacity}W (${loadPct}% Peak Load)`,
    });
  } else {
    checks.push({
      layer: 'PSU Headroom',
      status: 'pending',
      detail: `${estimatedDraw}W Est. Draw (Select PSU)`,
    });
  }

  const totalCost = Object.values(build).reduce((sum, part) => sum + (part?.price_inr || part?.price || 0), 0);

  return { checks, estimatedDraw, totalCost };
}

// Backwards compatibility alias for components using auditCompatibility
export function auditCompatibility(components = {}) {
  const result = evaluateBuildCompatibility(components);
  const hasErrors = result.checks.some(c => c.status === 'error');
  const hasWarnings = result.checks.some(c => c.status === 'warn');
  const healthScore = hasErrors ? 65 : hasWarnings ? 85 : 98;

  return {
    isCompatible: !hasErrors,
    healthScore,
    healthLabel: healthScore >= 90 ? 'Excellent' : healthScore >= 75 ? 'Good' : 'Needs Attention',
    checks: result.checks.map((c, i) => ({
      id: `check-${i}`,
      title: c.layer,
      status: c.status === 'ok' ? 'Verified' : c.status === 'warn' ? 'Warning' : c.status === 'error' ? 'Conflict' : 'Pending',
      type: c.status === 'ok' ? 'success' : c.status === 'warn' ? 'warning' : c.status === 'error' ? 'error' : 'neutral',
      detail: c.detail
    })),
    totalPower: result.estimatedDraw,
    recommendedPsuWatts: Math.ceil((result.estimatedDraw * 1.35) / 50) * 50
  };
}

export function calculateSystemPower(components = {}) {
  return evaluateBuildCompatibility(components).estimatedDraw;
}

export default evaluateBuildCompatibility;
