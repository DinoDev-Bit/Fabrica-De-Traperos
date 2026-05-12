import { useState, useMemo } from 'react';
import { Search, Plus, Edit, Trash2, Filter, X, Save, PlusCircle, AlertTriangle, Clock } from 'lucide-react';
import { useData } from '../context/DataContext';

export const Inventario = () => {
  const { productos, addProducto, updateProducto, deleteProducto } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    nombre: '',
    tipo: 'Trapero',
    material: '',
    precio: '',
    stock: '',
    imagen: ''
  });

  const FILTROS = ['Todos', 'Trapero', 'Escoba', 'Rastrillo', 'Recogedor', 'Otro'];

  const getEstado = (stock) => {
    const s = parseInt(stock);
    if (s <= 10) return 'Crítico';
    if (s <= 50) return 'Stock Bajo';
    return 'En Stock';
  };

  const handleOpenModal = (prod = null) => {
    if (prod) {
      setEditingProduct(prod);
      setFormData({
        nombre: prod.nombre,
        tipo: prod.tipo,
        material: prod.material,
        precio: prod.precio,
        stock: prod.stock,
        imagen: prod.imagen || ''
      });
    } else {
      setEditingProduct(null);
      setFormData({ nombre: '', tipo: 'Trapero', material: '', precio: '', stock: '', imagen: '' });
    }
    setIsModalOpen(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imagen: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      ...formData,
      precio: parseFloat(formData.precio),
      stock: parseInt(formData.stock),
      estado: getEstado(formData.stock)
    };

    if (editingProduct) {
      updateProducto(editingProduct.id, productData);
    } else {
      addProducto(productData);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      deleteProducto(id);
    }
  };

  const handleAddStock = (prod) => {
    const amount = window.prompt(`¿Cuántas unidades adicionales de "${prod.nombre}" llegaron?`, "0");
    const val = parseInt(amount);
    if (!isNaN(val) && val > 0) {
      const nuevoStock = prod.stock + val;
      const productData = { ...prod, stock: nuevoStock, estado: getEstado(nuevoStock) };
      updateProducto(prod.id, productData);
    }
  };

  const filteredProducts = useMemo(() => {
    return productos.filter(p => {
      const matchesSearch = p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            p.tipo.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = activeFilter === 'Todos' || p.tipo === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [productos, searchTerm, activeFilter]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Gestión de Inventario</h1>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors flex items-center gap-2 border border-blue-500/50"
        >
          <Plus size={20} /> Nuevo Producto
        </button>
      </div>

      <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700/50 overflow-hidden">
        <div className="p-4 border-b border-slate-700/50 flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-800/80">
          <div className="relative flex-1 w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por nombre..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500/50 outline-none text-sm text-white"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-400 text-sm font-medium flex items-center gap-1 mr-2"><Filter size={16}/> Filtros:</span>
            {FILTROS.map(f => (
              <button 
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                  activeFilter === f ? 'bg-blue-500/20 text-blue-400 border-blue-500/50' : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          {filteredProducts.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              <p className="text-lg font-medium">No hay productos en inventario.</p>
            </div>
          ) : (
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
                {filteredProducts.map(prod => (
                  <tr key={prod.id} className="hover:bg-slate-700/20 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      {prod.imagen ? (
                        <img src={prod.imagen} alt={prod.nombre} className="w-10 h-10 rounded-md object-cover border border-slate-700" />
                      ) : (
                        <div className="w-10 h-10 rounded-md bg-slate-700/50 border border-slate-600 flex items-center justify-center text-slate-400 text-xs">Sin Img</div>
                      )}
                      <span className="font-bold text-slate-200">{prod.nombre}</span>
                    </td>
                    <td className="p-4">
                      <p className="text-sm font-medium text-slate-300">{prod.tipo}</p>
                      <p className="text-xs text-slate-500">{prod.material || 'N/A'}</p>
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
                        <button onClick={() => handleAddStock(prod)} title="Añadir Stock" className="p-1.5 text-slate-400 hover:text-emerald-400 rounded-md hover:bg-emerald-500/10 transition-colors"><PlusCircle size={18} /></button>
                        <button onClick={() => handleOpenModal(prod)} title="Editar" className="p-1.5 text-slate-400 hover:text-blue-400 rounded-md hover:bg-blue-500/10 transition-colors"><Edit size={18} /></button>
                        <button onClick={() => handleDelete(prod.id)} title="Eliminar" className="p-1.5 text-slate-400 hover:text-red-400 rounded-md hover:bg-red-500/10 transition-colors"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 w-full max-w-md overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-5 border-b border-slate-700/50 bg-slate-800/80 sticky top-0 z-10">
              <h2 className="text-xl font-bold text-white">{editingProduct ? 'Editar Producto' : 'Nuevo Producto'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  {formData.imagen ? (
                    <img src={formData.imagen} alt="Preview" className="w-24 h-24 rounded-xl object-cover border-2 border-blue-500/50" />
                  ) : (
                    <div className="w-24 h-24 rounded-xl bg-slate-900 border-2 border-dashed border-slate-700 flex flex-col items-center justify-center text-slate-500">
                      <span className="text-xs">Sin Imagen</span>
                    </div>
                  )}
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" title="Subir Imagen" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-1">Nombre del Producto</label>
                <input type="text" required value={formData.nombre} onChange={(e) => setFormData({...formData, nombre: e.target.value})} className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-white text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-1">Tipo</label>
                  <select value={formData.tipo} onChange={(e) => setFormData({...formData, tipo: e.target.value})} className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-white text-sm">
                    {FILTROS.filter(f => f !== 'Todos').map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-1">Material (Opcional)</label>
                  <input type="text" value={formData.material} onChange={(e) => setFormData({...formData, material: e.target.value})} className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-white text-sm" placeholder="Ej: Madera" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-1">Precio Unitario ($)</label>
                  <input type="number" required min="0" step="100" value={formData.precio} onChange={(e) => setFormData({...formData, precio: e.target.value})} className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-white text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-1">Stock Inicial</label>
                  <input type="number" required min="0" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-white text-sm" />
                </div>
              </div>
              <div className="pt-4 border-t border-slate-700/50 mt-6 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg font-medium transition-colors">Cancelar</button>
                <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2 border border-blue-500/50"><Save size={18} /> Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
