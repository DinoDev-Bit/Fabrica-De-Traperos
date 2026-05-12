import { Search, Mail, Phone, MapPin } from 'lucide-react';

const mockClientes = [
  { id: 1, nombre: 'Supermercados Éxito', tipo: 'Mayorista', correo: 'compras@exito.com', tel: '300 123 4567', pedidos: 45, ciudad: 'Bogotá' },
  { id: 2, nombre: 'Limpieza Total S.A.', tipo: 'Distribuidor', correo: 'contacto@limpiezatotal.co', tel: '315 987 6543', pedidos: 12, ciudad: 'Medellín' },
  { id: 3, nombre: 'Colegio San Jose', tipo: 'Institucional', correo: 'admin@sanjose.edu', tel: '320 456 7890', pedidos: 8, ciudad: 'Cali' },
];

export const Clientes = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Directorio de Clientes</h1>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-colors border border-blue-500/50">
          Nuevo Cliente
        </button>
      </div>

      <div className="bg-slate-800 p-4 rounded-xl shadow-lg border border-slate-700/50 mb-6 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar cliente por nombre o ciudad..." 
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none text-white placeholder-slate-500 text-sm transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockClientes.map(cliente => (
          <div key={cliente.id} className="bg-slate-800 rounded-xl shadow-lg border border-slate-700/50 overflow-hidden hover:border-blue-500/30 transition-colors group">
            <div className="bg-slate-800/80 p-5 border-b border-slate-700/50">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors">{cliente.nombre}</h3>
                <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-wider rounded border border-blue-500/20">
                  {cliente.tipo}
                </span>
              </div>
              <p className="text-sm font-medium text-slate-400">Total Pedidos: <span className="text-white font-bold">{cliente.pedidos}</span></p>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <Mail size={16} className="text-slate-500" />
                <span>{cliente.correo}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <Phone size={16} className="text-slate-500" />
                <span>{cliente.tel}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <MapPin size={16} className="text-slate-500" />
                <span>{cliente.ciudad}</span>
              </div>
            </div>
            <div className="p-4 border-t border-slate-700/50 bg-slate-900/30 flex justify-end">
              <button className="text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors">
                Ver Detalles &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
