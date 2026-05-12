import { DollarSign, FileText, Download } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Ene', ingresos: 4000, gastos: 2400 },
  { name: 'Feb', ingresos: 3000, gastos: 1398 },
  { name: 'Mar', ingresos: 2000, gastos: 9800 },
  { name: 'Abr', ingresos: 2780, gastos: 3908 },
  { name: 'May', ingresos: 1890, gastos: 4800 },
  { name: 'Jun', ingresos: 2390, gastos: 3800 },
  { name: 'Jul', ingresos: 3490, gastos: 4300 },
];

export const Contabilidad = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Contabilidad y Finanzas</h1>
        <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
          <Download size={18} /> Exportar Reporte
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2 text-gray-500 font-medium">
            <DollarSign size={20} className="text-emerald-500" /> Ingresos (Mes)
          </div>
          <p className="text-3xl font-bold text-gray-800">$12,450,000</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2 text-gray-500 font-medium">
            <FileText size={20} className="text-red-500" /> Gastos (Mes)
          </div>
          <p className="text-3xl font-bold text-gray-800">$4,120,000</p>
        </div>
        <div className="bg-primary text-white p-5 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-2 font-medium opacity-80">
            <DollarSign size={20} /> Balance Neto
          </div>
          <p className="text-3xl font-bold">$8,330,000</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Ingresos vs Gastos</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorGastos" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#8884d8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#8884d8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                formatter={(value) => [`$${value}`, 'Monto']}
              />
              <Area type="monotone" dataKey="ingresos" stroke="#10b981" fillOpacity={1} fill="url(#colorIngresos)" />
              <Area type="monotone" dataKey="gastos" stroke="#ef4444" fillOpacity={1} fill="url(#colorGastos)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
