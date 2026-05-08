import {
  BarChart3,
  Cpu,
  FlaskConical,
  DollarSign,
  Shield,
  Leaf,
  Users,
  Truck,
  type LucideIcon,
} from "lucide-react";

export interface ModuleDefinition {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: LucideIcon;
  color: string;
  features: string[];
  requiredPlan: "Starter" | "Professional" | "Enterprise";
}

export const platformModules: ModuleDefinition[] = [
  {
    id: "production",
    name: "Mine Production Intelligence",
    shortName: "Production",
    description:
      "Real-time tonnage tracking, shift-level Gantt charts, crew performance, and production reconciliation across pits and underground stopes.",
    icon: BarChart3,
    color: "#0070C0",
    features: [
      "Shift-level production Gantt with crew & equipment",
      "Tonnage vs plan reconciliation",
      "Load-haul-dump cycle analysis",
      "Drill & blast performance tracking",
      "Material movement dashboards",
    ],
    requiredPlan: "Starter",
  },
  {
    id: "equipment",
    name: "Equipment & Asset Management",
    shortName: "Equipment",
    description:
      "Fleet-wide OEE heatmaps, predictive maintenance alerts, IoT sensor integration, and utilisation tracking for haul trucks, excavators, and drills.",
    icon: Cpu,
    color: "#00B050",
    features: [
      "OEE heatmap across entire fleet",
      "Predictive maintenance alerts",
      "IoT sensor data integration",
      "Availability / Performance / Quality breakdown",
      "Maintenance scheduling dashboard",
    ],
    requiredPlan: "Starter",
  },
  {
    id: "grade",
    name: "Ore Grade & Material Flow",
    shortName: "Grade",
    description:
      "Track ore grade from bench to plant with waterfall variance charts. Compare geological models against actual recovery and optimise blending strategies.",
    icon: FlaskConical,
    color: "#7030A0",
    features: [
      "Bench-to-plant grade waterfall",
      "Planned vs actual grade variance",
      "Resource model validation",
      "Blending optimisation",
      "Multi-element tracking",
    ],
    requiredPlan: "Professional",
  },
  {
    id: "cost",
    name: "Cost & Budget Intelligence",
    shortName: "Cost",
    description:
      "Activity-based cost per tonne breakdown, budget vs actual variance analysis, anomaly flagging, and drill-through from site totals to individual cost centres.",
    icon: DollarSign,
    color: "#FFC000",
    features: [
      "Cost per tonne trending",
      "Budget vs actual variance drill-through",
      "Activity-based costing (drill, blast, load, haul)",
      "Fuel, labour, and consumables split",
      "AI anomaly detection on cost spikes",
    ],
    requiredPlan: "Professional",
  },
  {
    id: "safety",
    name: "Safety & Compliance",
    shortName: "Safety",
    description:
      "TRIFR, LTIFR, and leading indicators with trend alerts. Incident reporting, WHS audit tracking, and regulatory compliance dashboards aligned with DMIRS requirements.",
    icon: Shield,
    color: "#FF0000",
    features: [
      "TRIFR / LTIFR / AIFR calculations (DMIRS-compliant)",
      "Leading vs lagging indicator split",
      "Incident type & location heatmap",
      "WHS audit tracking",
      "Regulatory reporting export",
    ],
    requiredPlan: "Starter",
  },
  {
    id: "energy",
    name: "Energy & Emissions",
    shortName: "Energy",
    description:
      "Scope 1, 2, and 3 emissions tracking, NGER-ready reporting, energy consumption dashboards, and ESG reporting aligned with Australian regulatory frameworks.",
    icon: Leaf,
    color: "#00B050",
    features: [
      "Scope 1/2/3 emissions tracking",
      "NGER-ready regulatory reporting",
      "Energy consumption per tonne",
      "Carbon intensity benchmarking",
      "ESG dashboard for board reporting",
    ],
    requiredPlan: "Enterprise",
  },
  {
    id: "workforce",
    name: "Workforce & Roster",
    shortName: "Workforce",
    description:
      "FIFO/DIDO roster management, fatigue risk scoring, certification tracking, and workforce utilisation analytics for remote mining operations.",
    icon: Users,
    color: "#0070C0",
    features: [
      "FIFO/DIDO roster visualisation",
      "Fatigue risk scoring",
      "Certification & competency tracking",
      "Workforce utilisation analytics",
      "Training compliance dashboards",
    ],
    requiredPlan: "Enterprise",
  },
  {
    id: "supplychain",
    name: "Supply Chain & Logistics",
    shortName: "Logistics",
    description:
      "Haulage route optimisation, port & rail scheduling, inventory tracking, and end-to-end supply chain visibility from pit to port.",
    icon: Truck,
    color: "#FF6600",
    features: [
      "Haulage route optimisation",
      "Port & rail scheduling",
      "Inventory & stockpile tracking",
      "Pit-to-port supply chain visibility",
      "Contractor management dashboards",
    ],
    requiredPlan: "Enterprise",
  },
];
