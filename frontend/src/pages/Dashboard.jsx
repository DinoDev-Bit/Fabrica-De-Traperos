import { ShoppingBag, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useData } from '../context/DataContext';

export const Dashboard = () => {
  const { pedidos, productos } = useData();

  // Cálculos reales
  const pedidosTotales = pedidos.length;
  
  // Ingresos totales (sumando solo los completados)
  const pedidosCompletados = pedidos.filter(p => p.estado === 'Completado');
  const ingresosTotales = pedidosCompletados.reduce((acc, p) => acc + p.total, 0);

  const pendientes = pedidos.filter(p => p.estado === 'Pendiente').length;
  const completados = pedidosCompletados.length;

  // Productos Top (simulados basados en el stock, o simplemente los primeros 5)
  // En un sistema real, esto se calcularía en base a los items de los pedidos.
  const topProducts = [...productos]
    .sort((a, b) => a.stock - b.stock) // Ordenar por menos stock primero (más vendidos)
    .slice(0, 5);

  // Gráfica de ventas dinámica básica
  // Si no hay pedidos, mostramos datos en 0
  const chartData = pedidosTotales > 0 
    ? [
        { name: 'Lun', ventas: ingresosTotales * 0.1 },
        { name: 'Mar', ventas: ingresosTotales * 0.15 },
        { name: 'Mie', ventas: ingresosTotales * 0.2 },
        { name: 'Jue', ventas: ingresosTotales * 0.1 },
        { name: 'Vie', ventas: ingresosTotales * 0.15 },
        { name: 'Sab', ventas: ingresosTotales * 0.2 },
        { name: 'Hoy', ventas: ingresosTotales * 0.1 },
      ]
    : [
        { name: 'Lun', ventas: 0 },
        { name: 'Mar', ventas: 0 },
        { name: 'Mie', ventas: 0 },
        { name: 'Jue', ventas: 0 },
        { name: 'Vie', ventas: 0 },
        { name: 'Sab', ventas: 0 },
        { name: 'Hoy', ventas: 0 },
      ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Dashboard General</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Pedidos Totales" 
          value={pedidosTotales.toString()} 
          icon={ShoppingBag} 
          color="bg-blue-500/20 text-blue-400 border-blue-500/30" 
        />
        <StatCard 
          title="Ingresos Registrados" 
          value={`$${ingresosTotales.toLocaleString()}`} 
          icon={TrendingUp} 
          color="bg-emerald-500/20 text-emerald-400 border-emerald-500/30" 
        />
        <StatCard 
          title="Pedidos Pendientes" 
          value={pendientes.toString()} 
          icon={Clock} 
          color="bg-amber-500/20 text-amber-400 border-amber-500/30" 
        />
        <StatCard 
          title="Completados" 
          value={completados.toString()} 
          icon={CheckCircle} 
          color="bg-purple-500/20 text-purple-400 border-purple-500/30" 
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700/50 lg:col-span-2">
          <h2 className="text-lg font-bold text-white mb-4">Ventas Recientes</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
          <h2 className="text-lg font-bold text-white mb-4">Catálogo Activo</h2>
          <div className="space-y-4">
            {productos.length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-4">No hay productos registrados en el catálogo.</p>
            ) : (
              topProducts.map(prod => (
                <TopProduct 
                  key={prod.id}
                  name={prod.nombre} 
                  stock={prod.stock} 
                  warning={prod.stock <= 10} 
                  tipo={prod.tipo}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700/50 flex items-start justify-between">
    <div>
      <p className="text-sm font-medium text-slate-400 mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-white mb-2">{value}</h3>
    </div>
    <div className={`p-3 rounded-xl border ${color}`}>
      <Icon size={24} />
    </div>
  </div>
);

const TopProduct = ({ name, stock, warning, tipo }) => (
  <div className="flex items-center justify-between p-3 hover:bg-slate-700/50 rounded-lg transition-colors border border-transparent hover:border-slate-600/50">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-xl border border-slate-700">
        {tipo === 'Trapero' ? '🧹' : tipo === 'Escoba' ? '🧹' : tipo === 'Recogedor' ? '🗑️' : '📦'}
      </div>
      <div>
        <p className="text-sm font-bold text-slate-200">{name}</p>
        <p className="text-xs text-blue-400 font-medium">{tipo}</p>
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
