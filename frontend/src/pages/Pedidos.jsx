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
        <h1 className="text-2xl font-bold text-gray-800">Gestión de Pedidos</h1>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50">
            Exportar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatusCard title="Pendientes" count={12} icon={AlertCircle} color="text-amber-500" bg="bg-amber-100" />
        <StatusCard title="En Proceso" count={8} icon={Clock} color="text-blue-500" bg="bg-blue-100" />
        <StatusCard title="Completados Hoy" count={24} icon={CheckCircle2} color="text-emerald-500" bg="bg-emerald-100" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="font-bold text-gray-800">Últimos Pedidos</h2>
          <select className="border border-gray-300 rounded-md text-sm px-3 py-1.5 outline-none">
            <option>Todos los estados</option>
            <option>Pendientes</option>
            <option>En Proceso</option>
            <option>Completados</option>
          </select>
        </div>
        
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
              <th className="p-4 font-semibold">ID Pedido</th>
              <th className="p-4 font-semibold">Cliente</th>
              <th className="p-4 font-semibold">Fecha</th>
              <th className="p-4 font-semibold">Total</th>
              <th className="p-4 font-semibold">Prioridad</th>
              <th className="p-4 font-semibold">Estado</th>
              <th className="p-4 font-semibold text-right">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mockPedidos.map(pedido => (
              <tr key={pedido.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="p-4 font-bold text-primary">{pedido.id}</td>
                <td className="p-4 font-medium text-gray-800">{pedido.cliente}</td>
                <td className="p-4 text-gray-500 text-sm">{pedido.fecha}</td>
                <td className="p-4 font-bold">${pedido.total.toLocaleString()}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs font-bold rounded ${
                    pedido.prioridad === 'Alta' ? 'bg-red-100 text-red-700' :
                    pedido.prioridad === 'Media' ? 'bg-amber-100 text-amber-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {pedido.prioridad}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                    pedido.estado === 'Completado' ? 'bg-emerald-100 text-emerald-700' :
                    pedido.estado === 'En Proceso' ? 'bg-blue-100 text-blue-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {pedido.estado}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="p-1.5 text-gray-400 hover:text-primary rounded-md hover:bg-gray-100 transition-colors">
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StatusCard = ({ title, count, icon: Icon, color, bg }) => (
  <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
    <div>
      <p className="text-gray-500 font-medium text-sm">{title}</p>
      <p className="text-3xl font-bold text-gray-800 mt-1">{count}</p>
    </div>
    <div className={`w-12 h-12 ${bg} ${color} rounded-full flex items-center justify-center`}>
      <Icon size={24} />
    </div>
  </div>
);
