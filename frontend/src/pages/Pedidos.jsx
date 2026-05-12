import { CheckCircle2, Clock, AlertCircle, Eye } from 'lucide-react';

const mockPedidos = [
  { id: 'PD-1024', cliente: 'Supermercados Éxito', fecha: '2026-05-11', total: 450000, estado: 'Pendiente', prioridad: 'Alta' },
  { id: 'PD-1023', cliente: 'Limpieza Total S.A.', fecha: '2026-05-11', total: 125000, estado: 'En Proceso', prioridad: 'Media' },
  { id: 'PD-1022', cliente: 'Colegio San Jose', fecha: '2026-05-10', total: 85000, estado: 'Completado', prioridad: 'Baja' },
  { id: 'PD-1021', cliente: 'Conjunto Residencial Sol', fecha: '2026-05-09', total: 320000, estado: 'Completado', prioridad: 'Media' },
];

export const Pedidos = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Gestión de Pedidos</h1>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors">
            Exportar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatusCard title="Pendientes" count={12} icon={AlertCircle} color="text-amber-400" bg="bg-amber-500/10 border-amber-500/20" />
        <StatusCard title="En Proceso" count={8} icon={Clock} color="text-blue-400" bg="bg-blue-500/10 border-blue-500/20" />
        <StatusCard title="Completados Hoy" count={24} icon={CheckCircle2} color="text-emerald-400" bg="bg-emerald-500/10 border-emerald-500/20" />
      </div>

      <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700/50 overflow-hidden">
        <div className="p-4 border-b border-slate-700/50 flex justify-between items-center bg-slate-800/80">
          <h2 className="font-bold text-white">Últimos Pedidos</h2>
          <select className="bg-slate-900 border border-slate-700 text-slate-300 rounded-md text-sm px-3 py-1.5 outline-none focus:ring-2 focus:ring-blue-500/50">
            <option>Todos los estados</option>
            <option>Pendientes</option>
            <option>En Proceso</option>
            <option>Completados</option>
          </select>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/50 text-slate-400 text-xs uppercase tracking-wider">
                <th className="p-4 font-semibold">ID Pedido</th>
                <th className="p-4 font-semibold">Cliente</th>
                <th className="p-4 font-semibold">Fecha</th>
                <th className="p-4 font-semibold">Total</th>
                <th className="p-4 font-semibold">Prioridad</th>
                <th className="p-4 font-semibold">Estado</th>
                <th className="p-4 font-semibold text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {mockPedidos.map(pedido => (
                <tr key={pedido.id} className="hover:bg-slate-700/20 transition-colors">
                  <td className="p-4 font-bold text-blue-400">{pedido.id}</td>
                  <td className="p-4 font-medium text-slate-200">{pedido.cliente}</td>
                  <td className="p-4 text-slate-400 text-sm">{pedido.fecha}</td>
                  <td className="p-4 font-bold text-emerald-400">${pedido.total.toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-[10px] uppercase tracking-wide font-bold rounded border ${
                      pedido.prioridad === 'Alta' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                      pedido.prioridad === 'Media' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                      'bg-slate-700/50 text-slate-300 border-slate-600'
                    }`}>
                      {pedido.prioridad}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-md border ${
                      pedido.estado === 'Completado' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      pedido.estado === 'En Proceso' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                      'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {pedido.estado}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="p-1.5 text-slate-400 hover:text-blue-400 rounded-md hover:bg-blue-500/10 transition-colors">
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatusCard = ({ title, count, icon: Icon, color, bg }) => (
  <div className="bg-slate-800 p-5 rounded-xl shadow-lg border border-slate-700/50 flex items-center justify-between">
    <div>
      <p className="text-slate-400 font-medium text-sm">{title}</p>
      <p className="text-3xl font-bold text-white mt-1">{count}</p>
    </div>
    <div className={`w-12 h-12 border ${bg} ${color} rounded-xl flex items-center justify-center shadow-inner`}>
      <Icon size={24} />
    </div>
  </div>
);
