import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Trash2, Lock, ShieldAlert, RefreshCcw, AlertTriangle } from 'lucide-react';

export const Papelera = () => {
  const { user } = useAuth();
  const { pedidosEliminados, restaurarDePapelera, eliminarDefinitivamente } = useData();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleAuth = (e) => {
    e.preventDefault();
    // La contraseña esperada ahora es fija según petición del usuario
    if (password === 'Diosesbueno') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Contraseña incorrecta. Acceso denegado.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl border border-red-500/30 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/30">
            <Lock size={40} className="text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Papelera de Reciclaje</h2>
          <p className="text-slate-400 mb-8 text-sm">Esta es un área protegida. Por favor, ingresa tu contraseña de cuenta para acceder a los pedidos eliminados.</p>
          
          <form onSubmit={handleAuth} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm flex items-center gap-2 text-left">
                <ShieldAlert size={16} />
                {error}
              </div>
            )}
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none text-white text-center tracking-widest"
              required
            />
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-red-500/20"
            >
              Desbloquear Papelera
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Trash2 size={28} className="text-red-400" />
          <h1 className="text-2xl font-bold text-white">Papelera de Pedidos</h1>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl shadow-lg border border-red-500/30 overflow-hidden">
        <div className="p-4 border-b border-slate-700/50 flex justify-between items-center bg-slate-800/80">
          <h2 className="font-bold text-red-400 flex items-center gap-2">
            <AlertTriangle size={18} /> Respaldo Aislado (No afecta el dashboard)
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          {pedidosEliminados.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              <Trash2 size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">La papelera está vacía.</p>
              <p className="text-sm mt-1">Los pedidos que elimines aparecerán aquí.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/50 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="p-4 font-semibold">ID Pedido</th>
                  <th className="p-4 font-semibold">Cliente</th>
                  <th className="p-4 font-semibold">Total</th>
                  <th className="p-4 font-semibold">Fecha Eliminación</th>
                  <th className="p-4 font-semibold text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {pedidosEliminados.map(pedido => (
                  <tr key={pedido.id} className="hover:bg-slate-700/20 transition-colors opacity-80 hover:opacity-100">
                    <td className="p-4 font-bold text-slate-400 line-through">{pedido.id}</td>
                    <td className="p-4 font-medium text-slate-300">{pedido.cliente}</td>
                    <td className="p-4 font-bold text-slate-400">${pedido.total.toLocaleString()}</td>
                    <td className="p-4 text-slate-500 text-sm">{pedido.fechaEliminacion}</td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => {
                            if(window.confirm('¿Deseas restaurar este pedido? Volverá a la lista activa.')) {
                              restaurarDePapelera(pedido.id);
                            }
                          }}
                          className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all"
                        >
                          <RefreshCcw size={16} /> Restaurar
                        </button>
                        <button 
                          onClick={() => {
                            if(window.confirm('¿Estás SEGURO de eliminar este pedido para siempre? Esta acción no se puede deshacer.')) {
                              eliminarDefinitivamente(pedido.id);
                            }
                          }}
                          className="bg-red-500/10 text-red-400 hover:bg-red-600 hover:text-white px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all"
                        >
                          <Trash2 size={16} /> Eliminar
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
