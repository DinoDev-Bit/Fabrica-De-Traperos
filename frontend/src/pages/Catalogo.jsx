import { useState, useMemo } from 'react';
import { Search, Filter, ShoppingBag, ArrowRight } from 'lucide-react';
import { useData } from '../context/DataContext';

export const Catalogo = () => {
  const { productos } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todos');

  const FILTROS = ['Todos', 'Trapero', 'Escoba', 'Rastrillo', 'Recogedor', 'Otro'];

  const filteredProducts = useMemo(() => {
    return productos.filter(p => {
      const matchesSearch = p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            p.tipo.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = activeFilter === 'Todos' || p.tipo === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [productos, searchTerm, activeFilter]);

  const getIcon = (tipo) => {
    switch(tipo) {
      case 'Trapero': return '🧹';
      case 'Escoba': return '🧹';
      case 'Recogedor': return '🗑️';
      default: return '📦';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Catálogo de Productos</h1>
          <p className="text-slate-400">Vitrina oficial de nuestros productos y herramientas de aseo.</p>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700/50 p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por nombre o tipo..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none text-sm text-white placeholder-slate-500 transition-all"
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-slate-400 text-sm font-medium flex items-center gap-1 mr-2"><Filter size={16}/> Filtros:</span>
          {FILTROS.map(f => (
            <button 
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                activeFilter === f 
                  ? 'bg-blue-500/20 text-blue-400 border-blue-500/50' 
                  : 'bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="p-12 text-center text-slate-500 bg-slate-800 rounded-xl border border-slate-700/50">
          <ShoppingBag size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-xl font-medium text-slate-300">No encontramos productos.</p>
          <p className="text-sm mt-2">Intenta buscar con otros términos o ve a Inventario para añadir productos.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(prod => (
            <div key={prod.id} className="bg-slate-800 rounded-2xl overflow-hidden shadow-lg border border-slate-700/50 hover:border-blue-500/50 hover:shadow-blue-500/10 transition-all group">
              <div className="h-40 bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center relative overflow-hidden">
                {prod.imagen ? (
                  <img src={prod.imagen} alt={prod.nombre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
                    {getIcon(prod.tipo)}
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <span className={`px-2.5 py-1 text-[10px] uppercase font-bold rounded-full border backdrop-blur-md ${
                    prod.estado === 'En Stock' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                    prod.estado === 'Stock Bajo' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                    'bg-red-500/20 text-red-400 border-red-500/30'
                  }`}>
                    {prod.estado}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-white text-lg line-clamp-1" title={prod.nombre}>{prod.nombre}</h3>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-medium bg-slate-700 text-slate-300 px-2 py-0.5 rounded border border-slate-600">{prod.tipo}</span>
                  <span className="text-xs text-slate-400 truncate">{prod.material}</span>
                </div>
                
                <div className="flex items-end justify-between mt-6">
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">Precio Unidad</p>
                    <p className="font-bold text-emerald-400 text-xl">${prod.precio.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400 mb-0.5">Disponibles</p>
                    <p className="font-bold text-white">{prod.stock} und.</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
