import React, { createContext, useContext, useState, useEffect } from 'react';
import { CANONICAL_BUILD, FEATURED_BUILDS, COMPONENT_CATALOG } from '../data/mockData';

const BuildContext = createContext();

const LOCAL_STORAGE_BUILDS_KEY = 'pc_docx_saved_builds';
const LOCAL_STORAGE_ACTIVE_BUILD_KEY = 'pc_docx_active_build';

export const BuildProvider = ({ children }) => {
  // Active Navigation View:
  // 'landing' | 'wizard' | 'recommended' | 'builder' | 'health' | 'performance' | 'compare' | 'roadmap' | 'explore' | 'saved' | 'guides' | 'review'
  const [currentView, setCurrentView] = useState('landing');
  
  // Wizard state (Steps 1, 2, 3)
  const [wizardStep, setWizardStep] = useState(1);
  const [selectedPurpose, setSelectedPurpose] = useState('gaming');
  const [targetBudget, setTargetBudget] = useState(100000);
  const [selectedPriority, setSelectedPriority] = useState('Balanced');
  const [platformPref, setPlatformPref] = useState('AMD');
  const [haveExistingParts, setHaveExistingParts] = useState(false);

  // Active Build State
  const [build, setBuild] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_ACTIVE_BUILD_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return JSON.parse(JSON.stringify(CANONICAL_BUILD));
  });

  // Saved Builds State (persisted in localStorage)
  const [savedBuilds, setSavedBuilds] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_BUILDS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: "saved-1",
        name: "1440p Balanced Beast",
        date: "Today, 14:30",
        price: 98450,
        score: 92,
        healthScore: 94,
        compatibility: "100%",
        power: 438,
        components: JSON.parse(JSON.stringify(CANONICAL_BUILD.components))
      },
      {
        id: "saved-2",
        name: "1080p Esports Budget Rig",
        date: "Yesterday",
        price: 59900,
        score: 81,
        healthScore: 96,
        compatibility: "100%",
        power: 310,
        components: JSON.parse(JSON.stringify(CANONICAL_BUILD.components))
      },
      {
        id: "saved-3",
        name: "AI & ML Workstation",
        date: "3 days ago",
        price: 148900,
        score: 96,
        healthScore: 98,
        compatibility: "100%",
        power: 512,
        components: JSON.parse(JSON.stringify(CANONICAL_BUILD.components))
      }
    ];
  });

  // Drawer & Modal States
  const [pickerCategory, setPickerCategory] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOptimizerOpen, setIsOptimizerOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);

  // Dynamic calculations
  const calculateTotal = () => {
    if (!build || !build.components) return 0;
    return Object.values(build.components).reduce((sum, item) => sum + (item ? item.price : 0), 0);
  };

  const calculatePowerDraw = () => {
    if (!build || !build.components) return 0;
    const cpuTdp = build.components.cpu?.tdp || 65;
    const gpuTdp = build.components.gpu?.tdp || 200;
    const moboPower = 50;
    const ramPower = 15;
    const storagePower = 10;
    const fansCoolerPower = 25;
    return cpuTdp + gpuTdp + moboPower + ramPower + storagePower + fansCoolerPower;
  };

  const currentTotal = calculateTotal();
  const currentPower = calculatePowerDraw();
  const remainingBudget = (build?.targetBudget || targetBudget) - currentTotal;

  // Live health and compatibility engine
  const getCompatibilityReport = () => {
    const checks = [];
    let health = 100;

    const cpu = build.components.cpu;
    const mobo = build.components.motherboard;
    const gpu = build.components.gpu;
    const ram = build.components.ram;
    const psu = build.components.psu;
    const pcCase = build.components.case;
    const cooler = build.components.cooler;

    // 1. CPU & Motherboard socket
    if (cpu && mobo) {
      if (cpu.socket === mobo.socket) {
        checks.push({
          id: 'cpu-mobo',
          title: 'CPU / Motherboard Socket',
          status: 'Compatible',
          type: 'success',
          detail: `Socket ${cpu.socket} is natively supported by ${mobo.name}. No BIOS update required.`
        });
      } else {
        health -= 35;
        checks.push({
          id: 'cpu-mobo',
          title: 'CPU / Motherboard Socket Incompatibility',
          status: 'Incompatible',
          type: 'danger',
          detail: `CPU uses socket ${cpu.socket} but Motherboard is socket ${mobo.socket}. They cannot physically connect.`
        });
      }
    }

    // 2. RAM & Motherboard type
    if (ram && mobo) {
      if (ram.type === mobo.ramType) {
        checks.push({
          id: 'ram-mobo',
          title: 'RAM / Motherboard Memory Generation',
          status: 'Compatible',
          type: 'success',
          detail: `${ram.name} matches ${mobo.name}'s ${mobo.ramType} slots with AMD EXPO / Intel XMP support.`
        });
      } else {
        health -= 25;
        checks.push({
          id: 'ram-mobo',
          title: 'RAM / Motherboard Mismatch',
          status: 'Incompatible',
          type: 'danger',
          detail: `Selected RAM is ${ram.type} while Motherboard only supports ${mobo.ramType}.`
        });
      }
    }

    // 3. GPU Length & Case Clearance
    if (gpu && pcCase) {
      const gpuLen = gpu.lengthMm || 242;
      const maxLen = pcCase.maxGpuLength || 370;
      if (gpuLen <= maxLen) {
        checks.push({
          id: 'gpu-case',
          title: 'GPU / Chassis Physical Clearance',
          status: 'Fits with Generous Clearance',
          type: 'success',
          detail: `${gpu.name} length (${gpuLen}mm) fits well inside ${pcCase.name} (Max allowance: ${maxLen}mm).`
        });
      } else {
        health -= 25;
        checks.push({
          id: 'gpu-case',
          title: 'GPU Too Long for Case',
          status: 'Does Not Fit',
          type: 'danger',
          detail: `GPU length (${gpuLen}mm) exceeds the chassis maximum allowance of ${maxLen}mm.`
        });
      }
    }

    // 4. PSU Wattage vs System Load
    if (psu) {
      const psuWatt = psu.wattage || 650;
      const loadPct = Math.round((currentPower / psuWatt) * 100);
      if (psuWatt >= currentPower + 150) {
        checks.push({
          id: 'psu-power',
          title: 'PSU / System Power Headroom',
          status: 'Optimal Headroom',
          type: 'success',
          detail: `Total power draw is ${currentPower}W on a ${psuWatt}W unit (${loadPct}% load). Excellent efficiency curve.`
        });
      } else if (psuWatt >= currentPower) {
        health -= 8;
        checks.push({
          id: 'psu-power',
          title: 'PSU / Limited Power Headroom',
          status: 'Limited Headroom',
          type: 'warning',
          detail: `System draw is ${currentPower}W on a ${psuWatt}W unit (${loadPct}% load). Operates fine today, but recommend 750W for heavy transients or future upgrades.`
        });
      } else {
        health -= 40;
        checks.push({
          id: 'psu-power',
          title: 'PSU Insufficient',
          status: 'Underpowered',
          type: 'danger',
          detail: `Power supply (${psuWatt}W) cannot handle the estimated system peak draw of ${currentPower}W!`
        });
      }
    }

    // 5. Cooler & Thermal Dissipation
    if (cooler && cpu) {
      checks.push({
        id: 'cooler-thermal',
        title: 'CPU Cooler / Thermal Envelope',
        status: 'Compatible & Quiet',
        type: 'success',
        detail: `${cooler.name} dissipates up to ${cooler.tdpSupport || 220}W, keeping the 65W ${cpu.name} well under 68°C under load.`
      });
    }

    // 6. BIOS Readiness
    checks.push({
      id: 'bios-ready',
      title: 'BIOS Firmware Readiness',
      status: 'Ready Out-of-Box',
      type: 'success',
      detail: 'Motherboard shipping with latest AGESA/firmware with native support for the selected processor.'
    });

    // 7. CPU ↔ GPU Bottleneck Balance Engine
    if (cpu && gpu) {
      const cpuPrice = cpu.price || 1;
      const gpuPrice = gpu.price || 1;
      const cpuPerf = cpu.perfScore || 80;
      const gpuPerf = gpu.perfScore || 85;
      const priceRatio = gpuPrice / cpuPrice;

      if (priceRatio > 4.2 || (gpuPerf - cpuPerf > 24)) {
        health -= 8;
        checks.push({
          id: 'cpu-gpu-bottleneck',
          title: 'CPU ↔ GPU Bottleneck Imbalance',
          status: 'CPU Bottleneck Risk',
          type: 'warning',
          detail: `Your ${gpu.name} (${FORMAT_INR(gpuPrice)}) is paired with an entry CPU (${cpu.name}). At 1080p/1440p high refresh, the CPU may limit frame pacing. Consider stepping up processor tier or balancing GPU funds.`
        });
      } else if (priceRatio < 0.85 && gpuPrice < 35000 && cpuPrice > 35000) {
        health -= 6;
        checks.push({
          id: 'cpu-gpu-bottleneck',
          title: 'GPU Underpowered for CPU Tier',
          status: 'GPU Allocation Warning',
          type: 'warning',
          detail: `High-end processor (${cpu.name}) is paired with an entry GPU (${gpu.name}). For gaming priorities, reallocating ~₹10,000 from CPU to GPU yields 35%+ more gaming FPS.`
        });
      } else {
        checks.push({
          id: 'cpu-gpu-bottleneck',
          title: 'CPU ↔ GPU Architectural Balance',
          status: 'Zero Bottleneck (< 3%)',
          type: 'success',
          detail: `${cpu.name} and ${gpu.name} form an optimal tier partnership with balanced frame delivery and minimal thermal waste.`
        });
      }
    }

    return {
      checks,
      healthScore: Math.max(health, 20),
      healthLabel: health >= 90 ? 'Excellent' : health >= 75 ? 'Good' : 'Needs Attention'
    };
  };

  const compReport = getCompatibilityReport();

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_ACTIVE_BUILD_KEY, JSON.stringify(build));
    } catch (e) {
      console.error(e);
    }
  }, [build]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_BUILDS_KEY, JSON.stringify(savedBuilds));
    } catch (e) {
      console.error(e);
    }
  }, [savedBuilds]);

  // Actions
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const selectComponent = (categoryKey, newPart) => {
    setBuild(prev => {
      const updated = {
        ...prev,
        components: {
          ...prev.components,
          [categoryKey]: {
            ...newPart,
            category: categoryKey,
            categoryName: categoryKey.toUpperCase(),
            status: "Compatible"
          }
        }
      };
      return updated;
    });
    setPickerCategory(null);
    showToast(`Updated ${categoryKey.toUpperCase()} to ${newPart.name}`);
  };

  const removeComponent = (categoryKey) => {
    setBuild(prev => ({
      ...prev,
      components: {
        ...prev.components,
        [categoryKey]: null
      }
    }));
    showToast(`Removed ${categoryKey.toUpperCase()} from build`);
  };

  const resetToCanonical = () => {
    setBuild(JSON.parse(JSON.stringify(CANONICAL_BUILD)));
    showToast("Restored Canonical ₹1,00,000 build");
  };

  const saveCurrentBuild = () => {
    const newEntry = {
      id: `saved-${Date.now()}`,
      name: build.name || "Custom Configuration",
      date: "Just now",
      price: currentTotal,
      score: build.score || 92,
      healthScore: compReport.healthScore,
      compatibility: compReport.healthScore >= 90 ? "100%" : "Review",
      power: currentPower,
      components: JSON.parse(JSON.stringify(build.components))
    };
    setSavedBuilds(prev => [newEntry, ...prev]);
    showToast("Build saved to your personal library!");
  };

  const deleteSavedBuild = (id) => {
    setSavedBuilds(prev => prev.filter(b => b.id !== id));
    showToast("Build removed from library");
  };

  const loadSavedBuild = (saved) => {
    setBuild({
      ...CANONICAL_BUILD,
      id: saved.id,
      name: saved.name,
      components: JSON.parse(JSON.stringify(saved.components)),
      targetBudget: saved.price + 5000
    });
    setCurrentView('builder');
    showToast(`Loaded ${saved.name}`);
  };

  const applyOptimization = (optKey) => {
    if (optKey === 'ssd') {
      const cheapSsd = COMPONENT_CATALOG.storage[0]; // Kingston NV2 ₹4100
      selectComponent('storage', cheapSsd);
    } else if (optKey === 'ram') {
      const ramStick = COMPONENT_CATALOG.ram[1]; // 16GB Corsair ₹4200
      selectComponent('ram', ramStick);
    } else if (optKey === 'case') {
      const cheapCase = COMPONENT_CATALOG.case[0]; // Deepcool CC560 ₹2450
      selectComponent('case', cheapCase);
    }
    setIsOptimizerOpen(false);
  };

  return (
    <BuildContext.Provider
      value={{
        currentView,
        setCurrentView,
        wizardStep,
        setWizardStep,
        selectedPurpose,
        setSelectedPurpose,
        targetBudget,
        setTargetBudget,
        selectedPriority,
        setSelectedPriority,
        platformPref,
        setPlatformPref,
        haveExistingParts,
        setHaveExistingParts,
        build,
        setBuild,
        savedBuilds,
        currentTotal,
        currentPower,
        remainingBudget,
        compReport,
        pickerCategory,
        setPickerCategory,
        isSearchOpen,
        setIsSearchOpen,
        isOptimizerOpen,
        setIsOptimizerOpen,
        isChatOpen,
        setIsChatOpen,
        toastMessage,
        showToast,
        isAdvancedMode,
        setIsAdvancedMode,
        selectComponent,
        removeComponent,
        resetToCanonical,
        saveCurrentBuild,
        deleteSavedBuild,
        loadSavedBuild,
        applyOptimization
      }}
    >
      {children}
    </BuildContext.Provider>
  );
};

export const useBuild = () => useContext(BuildContext);
