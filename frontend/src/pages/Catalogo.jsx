import { useState } from 'react';
import { Search, Plus, Edit, Trash2, Filter } from 'lucide-react';

const mockProductos = [
  { id: 1, nombre: 'Trapero Microfibra Pro', tipo: 'Microfibra', material: 'Poliéster 80%', precio: 12500, stock: 120, estado: 'En Stock' },
  { id: 2, nombre: 'Trapero Industrial X', tipo: 'Industrial', material: 'Algodón 100%', precio: 18000, stock: 45, estado: 'Stock Bajo' },
  { id: 3, nombre: 'Mopa Atrapapolvo', tipo: 'Seco', material: 'Microfibra', precio: 15000, stock: 200, estado: 'En Stock' },
  { id: 4, nombre: 'Repuesto Algodón 500g', tipo: 'Repuesto', material: 'Algodón 100%', precio: 8500, stock: 12, estado: 'Crítico' },
  { id: 5, nombre: 'Kit Limpieza Hogar', tipo: 'Combo', material: 'Mixto', precio: 25000, stock: 80, estado: 'En Stock' },
];

export const Catalogo = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Catálogo de Productos</h1>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors flex items-center gap-2 border border-blue-500/50">
          <Plus size={20} /> Nuevo Producto
        </button>
      </div>

      <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700/50 overflow-hidden">
        <div className="p-4 border-b border-slate-700/50 flex gap-4 items-center bg-slate-800/80">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por nombre o tipo..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none text-sm text-white placeholder-slate-500 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-700 hover:text-white text-sm font-medium transition-colors">
            <Filter size={18} /> Filtros
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/50 text-slate-400 text-xs uppercase tracking-wider">
                <th className="p-4 font-semibold">Producto</th>
                <th className="p-4 font-semibold">Tipo / Material</th>
                <th className="p-4 font-semibold">Precio</th>
                <th className="p-4 font-semibold">Stock</th>
                <th className="p-4 font-semibold">Estado</th>
                <th className="p-4 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {mockProductos.map(prod => (
                <tr key={prod.id} className="hover:bg-slate-700/20 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-900 border border-slate-700 rounded-lg flex items-center justify-center">🧹</div>
                      <span className="font-bold text-slate-200">{prod.nombre}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-sm font-medium text-slate-300">{prod.tipo}</p>
                    <p className="text-xs text-slate-500">{prod.material}</p>
                  </td>
                  <td className="p-4 font-bold text-emerald-400">${prod.precio.toLocaleString()}</td>
                  <td className="p-4 text-slate-300 font-medium">{prod.stock} und.</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-md border ${
                      prod.estado === 'En Stock' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      prod.estado === 'Stock Bajo' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                      'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                      {prod.estado}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-1.5 text-slate-400 hover:text-blue-400 rounded-md hover:bg-blue-500/10 transition-colors">
                        <Edit size={18} />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-red-400 rounded-md hover:bg-red-500/10 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
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
