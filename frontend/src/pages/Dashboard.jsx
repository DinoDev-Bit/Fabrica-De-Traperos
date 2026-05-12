import { ShoppingBag, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Lun', ventas: 4000 },
  { name: 'Mar', ventas: 3000 },
  { name: 'Mie', ventas: 2000 },
  { name: 'Jue', ventas: 2780 },
  { name: 'Vie', ventas: 1890 },
  { name: 'Sab', ventas: 2390 },
  { name: 'Dom', ventas: 3490 },
];

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Dashboard General</h1>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors border border-blue-500/50">
          Generar Reporte
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Pedidos Totales" 
          value="1,284" 
          trend="+12.5%" 
          isPositive={true}
          icon={ShoppingBag} 
          color="bg-blue-500/20 text-blue-400 border-blue-500/30" 
        />
        <StatCard 
          title="Ingresos del Día" 
          value="$4,320" 
          trend="+8.2%" 
          isPositive={true}
          icon={TrendingUp} 
          color="bg-emerald-500/20 text-emerald-400 border-emerald-500/30" 
        />
        <StatCard 
          title="Pedidos Pendientes" 
          value="45" 
          trend="-2.4%" 
          isPositive={false}
          icon={Clock} 
          color="bg-amber-500/20 text-amber-400 border-amber-500/30" 
        />
        <StatCard 
          title="Completados Hoy" 
          value="112" 
          trend="+18.1%" 
          isPositive={true}
          icon={CheckCircle} 
          color="bg-purple-500/20 text-purple-400 border-purple-500/30" 
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700/50 lg:col-span-2">
          <h2 className="text-lg font-bold text-white mb-4">Ventas de la Semana</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderRadius: '8px', border: '1px solid #334155', boxShadow: '0 4px 6px rgba(0,0,0,0.3)', color: '#f8fafc' }}
                  itemStyle={{ color: '#60a5fa' }}
                  formatter={(value) => [`$${value}`, 'Ventas']}
                />
                <Area type="monotone" dataKey="ventas" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorVentas)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700/50">
          <h2 className="text-lg font-bold text-white mb-4">Productos Top</h2>
          <div className="space-y-4">
            <TopProduct name="Trapero Microfibra Pro" sales={342} stock={120} />
            <TopProduct name="Trapero Industrial X" sales={215} stock={45} />
            <TopProduct name="Mopa Atrapapolvo" sales={189} stock={200} />
            <TopProduct name="Repuesto Algodón 500g" sales={156} stock={12} warning={true} />
            <TopProduct name="Kit Limpieza Hogar" sales={124} stock={80} />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, trend, isPositive, icon: Icon, color }) => (
  <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700/50 flex items-start justify-between">
    <div>
      <p className="text-sm font-medium text-slate-400 mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-white mb-2">{value}</h3>
      <p className={`text-xs font-bold flex items-center gap-1 ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
        {trend} <span className="text-slate-500 font-normal">vs semana anterior</span>
      </p>
    </div>
    <div className={`p-3 rounded-xl border ${color}`}>
      <Icon size={24} />
    </div>
  </div>
);

const TopProduct = ({ name, sales, stock, warning }) => (
  <div className="flex items-center justify-between p-3 hover:bg-slate-700/50 rounded-lg transition-colors border border-transparent hover:border-slate-600/50 cursor-pointer">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-xl border border-slate-700">
        🧹
      </div>
      <div>
        <p className="text-sm font-bold text-slate-200">{name}</p>
        <p className="text-xs text-blue-400 font-medium">{sales} ventas</p>
      </div>
    </div>
    <div className="text-right">
      <p className={`text-sm font-bold ${warning ? 'text-red-400' : 'text-slate-300'}`}>
        {stock} und.
      </p>
      <p className="text-[10px] text-slate-500 uppercase tracking-wide">Stock</p>
    </div>
  </div>
);
