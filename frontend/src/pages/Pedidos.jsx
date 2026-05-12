import { CheckCircle2, Clock, AlertCircle, Eye, Check, Trash2 } from 'lucide-react';
import { useData } from '../context/DataContext';

export const Pedidos = () => {
  const { pedidos, marcarPedidoCompletado, moverAPapelera } = useData();

  // Calcular métricas
  const pendientes = pedidos.filter(p => p.estado === 'Pendiente').length;
  const enProceso = pedidos.filter(p => p.estado === 'En Proceso').length;
  const completados = pedidos.filter(p => p.estado === 'Completado').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Gestión de Pedidos</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatusCard title="Pendientes" count={pendientes} icon={AlertCircle} color="text-amber-400" bg="bg-amber-500/10 border-amber-500/20" />
        <StatusCard title="En Proceso" count={enProceso} icon={Clock} color="text-blue-400" bg="bg-blue-500/10 border-blue-500/20" />
        <StatusCard title="Completados" count={completados} icon={CheckCircle2} color="text-emerald-400" bg="bg-emerald-500/10 border-emerald-500/20" />
      </div>

      <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700/50 overflow-hidden">
        <div className="p-4 border-b border-slate-700/50 flex justify-between items-center bg-slate-800/80">
          <h2 className="font-bold text-white">Listado de Pedidos</h2>
        </div>
        
        <div className="overflow-x-auto">
          {pedidos.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              <p className="text-lg font-medium">Aún no hay pedidos registrados.</p>
              <p className="text-sm mt-1">Crea uno en la sección "Crear Pedido".</p>
            </div>
          ) : (
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
                {pedidos.map(pedido => (
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
                      <div className="flex justify-end gap-2">
                        {pedido.estado !== 'Completado' && (
                          <button 
                            onClick={() => marcarPedidoCompletado(pedido.id)}
                            title="Completar Pedido"
                            className="p-1.5 text-slate-400 hover:text-emerald-400 rounded-md hover:bg-emerald-500/10 transition-colors"
                          >
                            <Check size={18} />
                          </button>
                        )}
                        <button className="p-1.5 text-slate-400 hover:text-blue-400 rounded-md hover:bg-blue-500/10 transition-colors">
                          <Eye size={18} />
                        </button>
                        <button 
                          onClick={() => {
                            if(window.confirm('¿Enviar pedido a la papelera?')) moverAPapelera(pedido.id);
                          }}
                          title="Eliminar Pedido"
                          className="p-1.5 text-slate-400 hover:text-red-400 rounded-md hover:bg-red-500/10 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
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
