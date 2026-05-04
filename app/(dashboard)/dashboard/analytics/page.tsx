"use client";

import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  ReferenceLine,
  ComposedChart,
  Cell,
} from "recharts";
import { generateMiningData } from "@/data/mockMiningData";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import {
  TrendingUp,
  TrendingDown,
  Send,
  RefreshCw,
  ArrowUpCircle,
} from "lucide-react";

interface AIMessage {
  role: "user" | "ai";
  text: string;
  stat?: { value: string; label: string };
}

const sites = [
  { value: "pit3", label: "Pit 3 — Southern Operations" },
  { value: "pit7", label: "Pit 7 — Northern Expansion" },
  { value: "rompad", label: "ROM Pad — Processing Plant" },
];

const dateRanges = ["7d", "30d", "90d"] as const;

const sampleQueries = [
  "Why did Pit 3 underperform on Tuesday?",
  "Which equipment has highest downtime?",
  "What is driving my cost per tonne increase?",
  "Show me safety trend for last 30 days",
  "Compare this week vs last week",
];

function getAIResponse(query: string, data: ReturnType<typeof generateMiningData>): AIMessage {
  const q = query.toLowerCase();
  const weakest = data.equipment.reduce((a, b) => (a.oeePercent < b.oeePercent ? a : b));
  const slowShift = data.shifts.reduce((a, b) => (a.actualTonnes < b.actualTonnes ? a : b));

  if (q.includes("underperform") || q.includes("production")) {
    return {
      role: "ai",
      text: `Based on the shift data, the weakest period was ${slowShift.shift} shift on ${slowShift.date} with ${slowShift.crewName}. The primary driver appears to be equipment availability — ${weakest.name} had only ${weakest.oeePercent}% OEE due to unplanned downtime. Conditions were reported as "${slowShift.conditions}".`,
      stat: { value: `${slowShift.actualTonnes.toLocaleString()}t`, label: "Lowest shift output" },
    };
  }
  if (q.includes("downtime") || q.includes("equipment")) {
    return {
      role: "ai",
      text: `${weakest.name} (${weakest.type}) has the lowest OEE at ${weakest.oeePercent}%. The primary cause is unplanned downtime events during hours 06:00–12:00. Recommend scheduling preventive maintenance during the night shift window.`,
      stat: { value: `${weakest.oeePercent}%`, label: `${weakest.name} OEE` },
    };
  }
  if (q.includes("cost")) {
    const trend = data.costs.costPerTonne > data.costs.target ? "above" : "below";
    return {
      role: "ai",
      text: `Current cost per tonne is $${data.costs.costPerTonne} AUD, which is ${trend} your target of $${data.costs.target}. The largest cost driver this period is fuel consumption linked to haul truck idle time. Reducing average queue time at the ROM pad by 8 minutes could save ~$0.40/t.`,
      stat: { value: `$${data.costs.costPerTonne}`, label: "Cost per tonne" },
    };
  }
  if (q.includes("safety")) {
    return {
      role: "ai",
      text: `TRIFR is currently ${data.safety.trifr}, trending ${data.safety.trifrHistory[11] < data.safety.trifrHistory[6] ? "down (improving)" : "up (deteriorating)"}. ${data.safety.daysSinceLTI} days since last LTI. Near misses this month: ${data.safety.nearMissMTD}. Safety observations are at ${data.safety.observationsCompleted}/${data.safety.observationsTarget} for the period.`,
      stat: { value: `${data.safety.daysSinceLTI}`, label: "Days since LTI" },
    };
  }
  if (q.includes("compare")) {
    const firstHalf = data.shifts.slice(0, Math.floor(data.shifts.length / 2));
    const secondHalf = data.shifts.slice(Math.floor(data.shifts.length / 2));
    const t1 = firstHalf.reduce((s, sh) => s + sh.actualTonnes, 0);
    const t2 = secondHalf.reduce((s, sh) => s + sh.actualTonnes, 0);
    const pct = (((t2 - t1) / t1) * 100).toFixed(1);
    return {
      role: "ai",
      text: `Recent period produced ${t2.toLocaleString()}t vs prior period ${t1.toLocaleString()}t — a ${Number(pct) >= 0 ? "+" : ""}${pct}% change. The improvement is primarily driven by better equipment availability during PM shifts.`,
      stat: { value: `${Number(pct) >= 0 ? "+" : ""}${pct}%`, label: "Period over period" },
    };
  }

  return {
    role: "ai",
    text: `Total production this period: ${data.totalTonnes.toLocaleString()}t across ${data.shifts.length} shifts. Average fleet OEE: ${data.avgOEE}%. Cost per tonne tracking at $${data.costs.costPerTonne}. Safety performance is stable with TRIFR at ${data.safety.trifr}.`,
    stat: { value: `${data.totalTonnes.toLocaleString()}t`, label: "Total tonnes" },
  };
}

export default function AnalyticsPage() {
  const [selectedSite, setSelectedSite] = useState("pit3");
  const [dateRange, setDateRange] = useState<"7d" | "30d" | "90d">("7d");
  const [queryInput, setQueryInput] = useState("");
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [isAITyping, setIsAITyping] = useState(false);
  const [queryCount, setQueryCount] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const data = useMemo(
    () => generateMiningData(selectedSite + refreshKey, dateRange),
    [selectedSite, dateRange, refreshKey]
  );

  const handleQuery = (text: string) => {
    if (!text.trim()) return;
    const userMsg: AIMessage = { role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setQueryInput("");
    setIsAITyping(true);
    setQueryCount((c) => c + 1);

    setTimeout(() => {
      const aiMsg = getAIResponse(text, data);
      setMessages((prev) => [...prev, aiMsg]);
      setIsAITyping(false);
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 1500);
  };

  // Chart data
  const shiftChartData = data.shifts.slice(-21).map((s) => ({
    name: `${s.date.slice(5)} ${s.shift}`,
    target: s.targetTonnes,
    actual: s.actualTonnes,
    fill: s.actualTonnes >= s.targetTonnes ? "#00B050" : s.actualTonnes >= s.targetTonnes * 0.9 ? "#ED7D31" : "#C00000",
  }));

  const prevTonnes = data.shifts.slice(0, Math.floor(data.shifts.length / 2)).reduce((s, sh) => s + sh.actualTonnes, 0);
  const tonnePct = prevTonnes > 0 ? (((data.totalTonnes - prevTonnes) / prevTonnes) * 100).toFixed(1) : "0";

  return (
    <div className="grid h-[calc(100vh-8rem)] grid-cols-1 gap-4 lg:grid-cols-[280px_1fr]">
      {/* Left Sidebar */}
      <aside className="hidden lg:flex flex-col gap-4 overflow-y-auto rounded-xl bg-[#1F3864] p-4 text-white">
        <h2 className="text-lg font-bold">MineView Analytics</h2>

        <div>
          <label className="mb-1 block text-xs text-white/60">Site</label>
          <select
            value={selectedSite}
            onChange={(e) => setSelectedSite(e.target.value)}
            className="w-full rounded-lg border-0 bg-white/10 px-3 py-2 text-sm text-white focus:ring-2 focus:ring-white/30"
          >
            {sites.map((s) => (
              <option key={s.value} value={s.value} className="text-gray-900">
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs text-white/60">Date Range</label>
          <div className="flex gap-1">
            {dateRanges.map((r) => (
              <button
                key={r}
                onClick={() => setDateRange(r)}
                className={cn(
                  "flex-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                  dateRange === r ? "bg-white text-[#1F3864]" : "bg-white/10 hover:bg-white/20"
                )}
              >
                {r === "7d" ? "7 days" : r === "30d" ? "30 days" : "90 days"}
              </button>
            ))}
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setRefreshKey((k) => k + 1)}
          className="text-white/80 hover:text-white hover:bg-white/10"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh Demo
        </Button>

        <div className="mt-auto rounded-lg bg-amber-500/20 p-3">
          <p className="text-sm font-semibold">Connect Your Real Data</p>
          <p className="mt-1 text-xs text-white/70">
            Upgrade to Professional to connect live operational data sources
          </p>
          <Button size="sm" className="mt-2 w-full bg-amber-500 text-white hover:bg-amber-600">
            <ArrowUpCircle className="mr-1 h-3 w-3" />
            Upgrade Now
          </Button>
        </div>

        <p className="text-xs text-white/40">
          Last updated: {new Date().toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit" })}
        </p>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col gap-4 overflow-y-auto">
        {/* Mobile site selector */}
        <div className="flex gap-2 lg:hidden">
          <select
            value={selectedSite}
            onChange={(e) => setSelectedSite(e.target.value)}
            className="flex-1 rounded-lg border px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
          >
            {sites.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
          <div className="flex gap-1">
            {dateRanges.map((r) => (
              <button
                key={r}
                onClick={() => setDateRange(r)}
                className={cn(
                  "rounded-lg px-2 py-1.5 text-xs font-medium border",
                  dateRange === r ? "bg-[#0070C0] text-white border-[#0070C0]" : "border-gray-300 dark:border-gray-700"
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* KPI Metrics Bar */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            {
              label: "Total Tonnes Moved",
              value: data.totalTonnes.toLocaleString(),
              unit: "t",
              change: tonnePct,
              good: Number(tonnePct) >= 0,
            },
            {
              label: "Equipment OEE",
              value: `${data.avgOEE}`,
              unit: "%",
              change: "+2.1",
              good: true,
            },
            {
              label: "Active Incidents",
              value: `${data.activeIncidents}`,
              unit: "",
              change: data.activeIncidents === 0 ? "0" : "+1",
              good: data.activeIncidents === 0,
            },
            {
              label: "Cost Per Tonne",
              value: `$${data.costs.costPerTonne}`,
              unit: "",
              change: data.costs.costPerTonne <= data.costs.target ? "-0.4" : "+0.6",
              good: data.costs.costPerTonne <= data.costs.target,
            },
          ].map((kpi, i) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card>
                <CardContent className="p-4">
                  <p className="text-xs text-gray-500">{kpi.label}</p>
                  <p className="mt-1 text-xl font-bold text-gray-900 dark:text-white">
                    {kpi.value}
                    <span className="text-sm font-normal text-gray-400">{kpi.unit}</span>
                  </p>
                  <div className={cn("mt-1 flex items-center gap-1 text-xs font-medium", kpi.good ? "text-green-600" : "text-red-600")}>
                    {kpi.good ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {kpi.change}%
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid gap-4 lg:grid-cols-2">
          {/* Production Chart */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Production by Shift</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={shiftChartData}>
                  <XAxis dataKey="name" fontSize={10} tickLine={false} />
                  <YAxis fontSize={10} tickLine={false} />
                  <Tooltip />
                  <ReferenceLine y={shiftChartData[0]?.target} stroke="#666" strokeDasharray="3 3" />
                  <Bar dataKey="actual" radius={[4, 4, 0, 0]}>
                    {shiftChartData.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Equipment Heatmap */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Equipment Status (24h)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <div className="min-w-[400px]">
                  <div className="flex gap-3 mb-1 text-[10px] text-gray-400 pl-20">
                    {[0, 3, 6, 9, 12, 15, 18, 21].map((h) => (
                      <span key={h} className="w-8 text-center">{h}:00</span>
                    ))}
                  </div>
                  {data.equipment.map((eq) => (
                    <div key={eq.id} className="flex items-center gap-2 mb-0.5">
                      <span className="w-16 truncate text-[10px] text-gray-600 dark:text-gray-400">{eq.name}</span>
                      <div className="flex gap-[1px]">
                        {eq.hourlyStatus.map((status, h) => (
                          <div
                            key={h}
                            className="h-3.5 w-3.5 rounded-sm"
                            title={`${eq.name} - ${h}:00 - ${status}`}
                            style={{
                              backgroundColor:
                                status === "Operating" ? "#00B050" :
                                status === "Standby" ? "#ED7D31" :
                                status === "UnplannedDown" ? "#C00000" : "#BFBFBF",
                            }}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] text-gray-500 w-8 text-right">{eq.oeePercent}%</span>
                    </div>
                  ))}
                  <div className="flex gap-3 mt-2 text-[10px] text-gray-500">
                    {[
                      { color: "#00B050", label: "Operating" },
                      { color: "#ED7D31", label: "Standby" },
                      { color: "#C00000", label: "Unplanned" },
                      { color: "#BFBFBF", label: "Maintenance" },
                    ].map((l) => (
                      <span key={l.label} className="flex items-center gap-1">
                        <span className="h-2 w-2 rounded-sm" style={{ backgroundColor: l.color }} />
                        {l.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Grade Waterfall */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Ore Grade Tracking (Fe%)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <ComposedChart data={data.grade}>
                  <XAxis dataKey="stage" fontSize={10} tickLine={false} />
                  <YAxis domain={[56, 66]} fontSize={10} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#0070C0" radius={[4, 4, 0, 0]} name="Actual Fe%" />
                  <Line type="monotone" dataKey="target" stroke="#ED7D31" strokeDasharray="5 5" name="Target" dot={false} />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Safety KPI */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Safety KPIs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-900 dark:bg-green-900/20">
                  <p className="text-xs text-gray-500">TRIFR</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{data.safety.trifr}</p>
                  <ResponsiveContainer width="100%" height={30}>
                    <LineChart data={data.safety.trifrHistory.map((v, i) => ({ i, v }))}>
                      <Line type="monotone" dataKey="v" stroke="#00B050" dot={false} strokeWidth={1.5} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-900 dark:bg-green-900/20">
                  <p className="text-xs text-gray-500">Days Since LTI</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{data.safety.daysSinceLTI}</p>
                  <p className="text-[10px] text-gray-400">Since {data.safety.lastIncidentDate}</p>
                </div>
                <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-900 dark:bg-amber-900/20">
                  <p className="text-xs text-gray-500">Near Miss MTD</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{data.safety.nearMissMTD}</p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800">
                  <p className="text-xs text-gray-500">Observations</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    {data.safety.observationsCompleted} / {data.safety.observationsTarget}
                  </p>
                  <div className="mt-1 h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className="h-full rounded-full bg-[#0070C0]"
                      style={{ width: `${(data.safety.observationsCompleted / data.safety.observationsTarget) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Query Panel */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Ask Your Operations AI ✨</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Sample chips */}
            {messages.length === 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {sampleQueries.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleQuery(q)}
                    className="rounded-full border border-gray-200 px-3 py-1.5 text-xs text-gray-600 transition-colors hover:border-[#0070C0] hover:text-[#0070C0] dark:border-gray-700 dark:text-gray-400"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Messages */}
            <div className="max-h-60 space-y-3 overflow-y-auto">
              {messages.map((msg, i) => (
                <div key={i} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[80%] rounded-xl px-4 py-2.5 text-sm",
                      msg.role === "user"
                        ? "bg-[#0070C0] text-white"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                    )}
                  >
                    <p>{msg.text}</p>
                    {msg.stat && (
                      <div className="mt-2 inline-block rounded bg-white/10 px-2 py-1 text-xs font-semibold">
                        <span className="text-base font-bold">{msg.stat.value}</span>{" "}
                        <span className="text-gray-400">{msg.stat.label}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isAITyping && (
                <div className="flex justify-start">
                  <div className="rounded-xl bg-gray-100 px-4 py-3 dark:bg-gray-800">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: "0ms" }} />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: "150ms" }} />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Query limit banner */}
            {queryCount >= 3 && (
              <div className="mt-3 rounded-lg bg-amber-50 p-3 text-center text-xs dark:bg-amber-900/20">
                <p className="text-amber-800 dark:text-amber-300">
                  This is simulated data. Connect your real operational data for live AI insights.
                </p>
                <Button size="sm" className="mt-2 bg-amber-500 hover:bg-amber-600">
                  Upgrade to Professional →
                </Button>
              </div>
            )}

            {/* Input */}
            <div className="mt-3 flex gap-2">
              <input
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleQuery(queryInput)}
                placeholder="Ask about your operations..."
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-[#0070C0] focus:outline-none focus:ring-1 focus:ring-[#0070C0] dark:border-gray-700 dark:bg-gray-900"
              />
              <Button size="icon" onClick={() => handleQuery(queryInput)} disabled={!queryInput.trim() || isAITyping}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
