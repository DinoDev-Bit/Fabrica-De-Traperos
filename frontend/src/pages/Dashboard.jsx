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
        <h1 className="text-2xl font-bold text-gray-800">Dashboard General</h1>
        <button className="bg-secondary hover:bg-secondary/90 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors">
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
          color="bg-blue-500" 
        />
        <StatCard 
          title="Ingresos del Día" 
          value="$4,320" 
          trend="+8.2%" 
          isPositive={true}
          icon={TrendingUp} 
          color="bg-emerald-500" 
        />
        <StatCard 
          title="Pedidos Pendientes" 
          value="45" 
          trend="-2.4%" 
          isPositive={false}
          icon={Clock} 
          color="bg-amber-500" 
        />
        <StatCard 
          title="Completados Hoy" 
          value="112" 
          trend="+18.1%" 
          isPositive={true}
          icon={CheckCircle} 
          color="bg-purple-500" 
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Ventas de la Semana</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#e94560" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#e94560" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#8884d8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#8884d8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                  formatter={(value) => [`$${value}`, 'Ventas']}
                />
                <Area type="monotone" dataKey="ventas" stroke="#e94560" strokeWidth={3} fillOpacity={1} fill="url(#colorVentas)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Productos Top</h2>
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
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start justify-between">
    <div>
      <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-gray-800 mb-2">{value}</h3>
      <p className={`text-xs font-bold flex items-center gap-1 ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
        {trend} <span className="text-gray-400 font-normal">vs semana anterior</span>
      </p>
    </div>
    <div className={`p-3 rounded-lg ${color} text-white`}>
      <Icon size={24} />
    </div>
  </div>
);

const TopProduct = ({ name, sales, stock, warning }) => (
  <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-xl">
        🧹
      </div>
      <div>
        <p className="text-sm font-bold text-gray-800">{name}</p>
        <p className="text-xs text-gray-500">{sales} ventas</p>
      </div>
    </div>
    <div className="text-right">
      <p className={`text-sm font-bold ${warning ? 'text-red-500' : 'text-gray-700'}`}>
        {stock} und.
      </p>
      <p className="text-xs text-gray-400">Stock</p>
    </div>
  </div>
);
