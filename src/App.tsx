/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { 
  Settings2, 
  BarChart3, 
  LineChart as LineChartIcon, 
  AreaChart as AreaChartIcon, 
  Eye, 
  EyeOff,
  ChevronRight,
  LayoutDashboard
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
type ChartType = 'line' | 'bar' | 'area';

interface DataPoint {
  date: string;
  valueA: number;
  valueB: number;
}

// --- Mock Data Generator ---
const generateData = (): DataPoint[] => {
  const data: DataPoint[] = [];
  const now = new Date();
  for (let i = 19; i >= 0; i--) {
    const d = new Date();
    d.setDate(now.getDate() - i);
    data.push({
      date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      valueA: Math.floor(Math.random() * 100) + 20,
      valueB: Math.floor(Math.random() * 80) + 10,
    });
  }
  return data;
};

// --- Components ---

export default function App() {
  const [data] = useState<DataPoint[]>(() => generateData());
  const [chartType, setChartType] = useState<ChartType>('area');
  const [title, setTitle] = useState('Growth Metrics Overview');
  const [xAxisLabel, setXAxisLabel] = useState('Timeline');
  const [yAxisLabel, setYAxisLabel] = useState('Volume');
  const [showValueA, setShowValueA] = useState(true);
  const [showValueB, setShowValueB] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const activeDataCount = (showValueA ? 1 : 0) + (showValueB ? 1 : 0);

  const ChartComponent = useMemo(() => {
    switch (chartType) {
      case 'bar': return BarChart;
      case 'line': return LineChart;
      case 'area': return AreaChart;
      default: return AreaChart;
    }
  }, [chartType]);

  const DataElement = useMemo(() => {
    switch (chartType) {
      case 'bar': return Bar;
      case 'line': return Line;
      case 'area': return Area;
      default: return Area;
    }
  }, [chartType]);

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 font-sans selection:bg-indigo-500/30 overflow-hidden flex">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-teal-500/20 rounded-full blur-[120px]" />
      </div>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? '320px' : '0px', opacity: isSidebarOpen ? 1 : 0 }}
        className="relative z-20 border-r border-white/10 bg-slate-900/40 backdrop-blur-2xl flex flex-col overflow-hidden"
      >
        <div className="p-8 flex flex-col gap-8 w-[320px]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white">
              <BarChart3 size={18} />
            </div>
            <h1 className="text-xl font-bold tracking-tight">VizStudio</h1>
          </div>

          {/* Form Groups */}
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold pl-1">Visualization Type</label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { id: 'area', icon: AreaChartIcon, label: 'Area Chart' },
                  { id: 'bar', icon: BarChart3, label: 'Bar Chart' },
                  { id: 'line', icon: LineChartIcon, label: 'Line Chart' },
                ].map((type) => (
                  <button
                    key={type.id}
                    id={`chart-type-${type.id}`}
                    onClick={() => setChartType(type.id as ChartType)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg border text-sm transition-all duration-300 ${
                      chartType === type.id 
                        ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.2)]' 
                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${chartType === type.id ? 'bg-indigo-400' : 'bg-slate-500'}`} />
                    <span>{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold pl-1">Configuration</label>
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <span className="text-xs text-slate-300 ml-1">Chart Title</span>
                  <input 
                    id="input-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-all"
                    placeholder="Enter title..."
                  />
                </div>
                <div className="space-y-1.5">
                  <span className="text-xs text-slate-300 ml-1">X-Axis Label</span>
                  <input 
                    id="input-xaxis"
                    value={xAxisLabel}
                    onChange={(e) => setXAxisLabel(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-all"
                    placeholder="X label..."
                  />
                </div>
                <div className="space-y-1.5">
                  <span className="text-xs text-slate-300 ml-1">Y-Axis Label</span>
                  <input 
                    id="input-yaxis"
                    value={yAxisLabel}
                    onChange={(e) => setYAxisLabel(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-all"
                    placeholder="Y label..."
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold pl-1">Data Series</label>
              <div className="space-y-2">
                <button 
                  id="toggle-value-a"
                  onClick={() => setShowValueA(!showValueA)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg border transition-all ${
                    showValueA ? 'bg-indigo-500/20 border-indigo-500/30' : 'bg-white/5 border-white/10 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded flex items-center justify-center border border-white/20 ${showValueA ? 'bg-indigo-500' : ''}`}>
                      {showValueA && <div className="w-1.5 h-1.5 bg-white rounded-sm" />}
                    </div>
                    <span className="text-sm text-slate-200">Value A (Actual)</span>
                  </div>
                  {showValueA ? <Eye size={12} className="text-indigo-400" /> : <EyeOff size={12} />}
                </button>
                <button 
                  id="toggle-value-b"
                  onClick={() => setShowValueB(!showValueB)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg border transition-all ${
                    showValueB ? 'bg-teal-500/10 border-teal-500/30' : 'bg-white/5 border-white/10 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded flex items-center justify-center border border-white/20 ${showValueB ? 'bg-teal-500' : ''}`}>
                      {showValueB && <div className="w-1.5 h-1.5 bg-white rounded-sm" />}
                    </div>
                    <span className="text-sm text-slate-200">Value B (Target)</span>
                  </div>
                  {showValueB ? <Eye size={12} className="text-teal-400" /> : <EyeOff size={12} />}
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-auto p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-[11px] text-slate-400 leading-relaxed italic text-center">"Data visualizer expert mode enabled. Component scales fluidly to grid constraints."</p>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 relative z-10 p-8 md:p-10 flex flex-col gap-8 h-full overflow-y-auto">
        {/* Top Header */}
        <header className="flex items-end justify-between">
          <div className="flex items-center gap-6">
            <button 
              id="sidebar-toggle"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-indigo-500/20 hover:border-indigo-500/30 transition-all text-slate-300"
            >
              <ChevronRight className={`transition-transform duration-300 ${isSidebarOpen ? 'rotate-180' : ''}`} size={20} />
            </button>
            <div>
              <h2 className="text-3xl font-bold text-white tracking-tight">{title}</h2>
              <p className="text-slate-400 text-sm">Real-time performance tracking and metric aggregation</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <div className="text-right">
              <p className="text-[10px] uppercase text-slate-500 font-bold tracking-wider mb-1">Global Avg</p>
              <p className="text-xl font-mono text-teal-400">$84,292</p>
            </div>
            <div className="w-[1px] h-10 bg-white/10" />
            <div className="text-right">
              <p className="text-[10px] uppercase text-slate-500 font-bold tracking-wider mb-1">Peak Value</p>
              <p className="text-xl font-mono text-indigo-400">$124,000</p>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 flex flex-col gap-8">
          {/* Main Chart Section */}
          <section 
            id="chart-container"
            className="flex-1 min-h-[450px] backdrop-blur-md bg-white/5 border border-white/10 rounded-[32px] p-8 md:p-10 flex flex-col shadow-2xl relative overflow-hidden group"
          >
            {/* Chart Decoration */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] -mr-48 -mt-48 pointer-events-none group-hover:bg-indigo-500/10 transition-colors" />

            <div className="flex-1 w-full relative z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={chartType + showValueA + showValueB}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full flex flex-col"
                >
                  <div className="flex justify-between items-start mb-8">
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/5 text-[11px]">
                         <span className="text-slate-500 font-bold uppercase tracking-wider">Scale</span>
                         <span className="text-indigo-300 font-mono italic">{yAxisLabel}</span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/5 text-[11px]">
                         <span className="text-slate-500 font-bold uppercase tracking-wider">Domain</span>
                         <span className="text-teal-300 font-mono italic">{xAxisLabel}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <ChartComponent data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorA" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#6366f1" stopOpacity={0.4}/>
                            <stop offset="100%" stopColor="#6366f1" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorB" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.3}/>
                            <stop offset="100%" stopColor="#14b8a6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                        <XAxis 
                          dataKey="date" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: '#64748b', fontSize: 10, fontStyle: 'italic' }}
                          dy={15}
                        />
                        <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: '#64748b', fontSize: 10, fontStyle: 'italic' }}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '16px',
                            backdropFilter: 'blur(20px)',
                            padding: '16px',
                            boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.3)'
                          }}
                          itemStyle={{ color: '#f8fafc', fontSize: '13px' }}
                          cursor={{ stroke: 'rgba(99,102,241,0.2)', strokeWidth: 2 }}
                        />
                        {showValueA && (
                           <DataElement 
                             type="monotone" 
                             dataKey="valueA" 
                             stroke="#818cf8" 
                             fill="url(#colorA)" 
                             strokeWidth={4}
                             name="Actual Revenue"
                             animationDuration={2000}
                             dot={{ fill: '#818cf8', stroke: '#0f172a', strokeWidth: 2, r: 4 }}
                             activeDot={{ r: 6, strokeWidth: 0 }}
                           />
                        )}
                        {showValueB && (
                           <DataElement 
                             type="monotone" 
                             dataKey="valueB" 
                             stroke="#14b8a6" 
                             fill="url(#colorB)" 
                             strokeWidth={4}
                             name="Projected Goal"
                             animationDuration={2000}
                             dot={{ fill: '#2dd4bf', stroke: '#0f172a', strokeWidth: 2, r: 4 }}
                           />
                        )}
                      </ChartComponent>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Chart Legend */}
            <div className="mt-8 flex items-center justify-center gap-10">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.5)]"></div>
                <span className="text-xs text-slate-300 font-medium tracking-wide">Actual Revenue (Value A)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full border border-teal-500 bg-teal-500/20"></div>
                <span className="text-xs text-slate-400 font-medium tracking-wide">Projected Goal (Value B)</span>
              </div>
            </div>
          </section>

          {/* Key Metrics Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-4">
             <MetricCard label="Conversion" value="12.4%" trend="+1.2%" id="metric-conversion" />
             <MetricCard label="Retention" value="88.2%" trend="+3.4%" id="metric-retention" />
             <MetricCard label="Churn Rate" value="1.8%" trend="-0.5%" id="metric-churn" />
             <MetricCard label="Net Growth" value="+24.5%" trend="+5.1%" id="metric-growth" isHighlighted />
          </div>
        </div>
      </main>
    </div>
  );
}

function MetricCard({ 
  label, 
  value, 
  trend, 
  id, 
  isHighlighted = false 
}: { 
  label: string, 
  value: string, 
  trend: string, 
  id: string,
  isHighlighted?: boolean
}) {
  return (
    <motion.div 
      id={id}
      whileHover={{ y: -2 }}
      className={`p-5 p-6 md:p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 ${
        isHighlighted 
          ? 'bg-indigo-500/10 border-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.05)]' 
          : 'bg-white/5 border-white/10 hover:border-white/20'
      }`}
    >
      <p className={`text-[10px] uppercase font-bold tracking-[0.1em] mb-2 ${isHighlighted ? 'text-indigo-400' : 'text-slate-500'}`}>
        {label}
      </p>
      <div className="flex items-end justify-between">
        <p className={`text-2xl font-bold tracking-tight ${isHighlighted ? 'text-indigo-300' : 'text-white'}`}>
          {value}
        </p>
        <div className={`text-[10px] font-mono font-bold ${trend.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
          {trend}
        </div>
      </div>
    </motion.div>
  );
}
