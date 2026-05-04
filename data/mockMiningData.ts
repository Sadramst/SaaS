function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export interface ShiftData {
  id: string;
  date: string;
  shift: "AM" | "PM" | "Night";
  targetTonnes: number;
  actualTonnes: number;
  crewName: string;
  equipmentList: string[];
  conditions: string;
  notes: string;
}

export interface EquipmentData {
  id: string;
  name: string;
  type: string;
  hourlyStatus: ("Operating" | "Standby" | "UnplannedDown" | "Maintenance")[];
  oeePercent: number;
}

export interface GradeData {
  stage: string;
  value: number;
  target: number;
}

export interface SafetyData {
  trifr: number;
  daysSinceLTI: number;
  lastIncidentDate: string;
  nearMissMTD: number;
  observationsCompleted: number;
  observationsTarget: number;
  trifrHistory: number[];
}

export interface CostData {
  costPerTonne: number;
  target: number;
  history: { period: string; value: number }[];
}

export interface MiningData {
  shifts: ShiftData[];
  equipment: EquipmentData[];
  grade: GradeData[];
  safety: SafetyData;
  costs: CostData;
  totalTonnes: number;
  avgOEE: number;
  activeIncidents: number;
}

const crewNames = ["Alpha Crew", "Bravo Crew", "Charlie Crew", "Delta Crew"];
const equipmentNames = ["D11-001", "D11-002", "CAT 994K", "PC8000-01", "PC8000-02", "HD785-01", "HD785-02", "HD785-03"];
const conditions = ["Clear", "Dusty", "Light Rain", "Hot (>38°C)", "Windy"];

export function generateMiningData(site: string, dateRange: string): MiningData {
  const seed = site.charCodeAt(0) * 1000 + (dateRange === "7d" ? 7 : dateRange === "30d" ? 30 : 90);
  const rand = seededRandom(seed);

  const days = dateRange === "7d" ? 7 : dateRange === "30d" ? 30 : 90;
  const shiftsPerDay = 3;

  // Generate shifts
  const shifts: ShiftData[] = [];
  const shiftLabels: ("AM" | "PM" | "Night")[] = ["AM", "PM", "Night"];

  for (let d = 0; d < Math.min(days, 14); d++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - d));
    for (let s = 0; s < shiftsPerDay; s++) {
      const target = 2000 + Math.floor(rand() * 500);
      const variance = 0.7 + rand() * 0.45;
      shifts.push({
        id: `shift-${d}-${s}`,
        date: date.toISOString().split("T")[0],
        shift: shiftLabels[s],
        targetTonnes: target,
        actualTonnes: Math.round(target * variance),
        crewName: crewNames[Math.floor(rand() * crewNames.length)],
        equipmentList: equipmentNames.slice(0, 3 + Math.floor(rand() * 3)),
        conditions: conditions[Math.floor(rand() * conditions.length)],
        notes: rand() > 0.7 ? "Equipment delay noted" : "",
      });
    }
  }

  // Generate equipment
  const statuses: ("Operating" | "Standby" | "UnplannedDown" | "Maintenance")[] = ["Operating", "Standby", "UnplannedDown", "Maintenance"];
  const equipment: EquipmentData[] = equipmentNames.map((name, i) => {
    const hourly = Array.from({ length: 24 }, () => {
      const r = rand();
      if (r < 0.65) return "Operating" as const;
      if (r < 0.8) return "Standby" as const;
      if (r < 0.9) return "UnplannedDown" as const;
      return "Maintenance" as const;
    });
    const operating = hourly.filter((s) => s === "Operating").length;
    return {
      id: `eq-${i}`,
      name,
      type: name.includes("D11") ? "Dozer" : name.includes("CAT") ? "Loader" : name.includes("PC") ? "Excavator" : "Haul Truck",
      hourlyStatus: hourly,
      oeePercent: Math.round((operating / 24) * 100),
    };
  });

  // Grade data
  const baseFe = 59 + rand() * 4;
  const grade: GradeData[] = [
    { stage: "Bench Sample", value: Math.round((baseFe + rand() * 2) * 10) / 10, target: 62.0 },
    { stage: "ROM Stockpile", value: Math.round((baseFe + rand() * 1.5) * 10) / 10, target: 61.5 },
    { stage: "Mill Feed", value: Math.round((baseFe + rand() * 1) * 10) / 10, target: 61.0 },
    { stage: "Concentrate", value: Math.round((baseFe + 2 + rand() * 1) * 10) / 10, target: 63.0 },
    { stage: "Final Product", value: Math.round((baseFe + 2.5 + rand() * 0.5) * 10) / 10, target: 63.5 },
  ];

  // Safety
  const safety: SafetyData = {
    trifr: Math.round((2 + rand() * 4) * 10) / 10,
    daysSinceLTI: Math.floor(50 + rand() * 200),
    lastIncidentDate: new Date(Date.now() - (50 + Math.floor(rand() * 200)) * 86400000).toISOString().split("T")[0],
    nearMissMTD: Math.floor(2 + rand() * 8),
    observationsCompleted: Math.floor(40 + rand() * 50),
    observationsTarget: 80,
    trifrHistory: Array.from({ length: 12 }, () => Math.round((2 + rand() * 5) * 10) / 10),
  };

  // Costs
  const baseCost = 10 + rand() * 5;
  const costs: CostData = {
    costPerTonne: Math.round(baseCost * 100) / 100,
    target: 12.5,
    history: Array.from({ length: Math.min(days, 12) }, (_, i) => ({
      period: `W${i + 1}`,
      value: Math.round((baseCost + (rand() - 0.5) * 3) * 100) / 100,
    })),
  };

  const totalTonnes = shifts.reduce((sum, s) => sum + s.actualTonnes, 0);
  const avgOEE = Math.round(equipment.reduce((sum, e) => sum + e.oeePercent, 0) / equipment.length);

  return {
    shifts,
    equipment,
    grade,
    safety,
    costs,
    totalTonnes,
    avgOEE,
    activeIncidents: rand() > 0.85 ? 1 : 0,
  };
}
