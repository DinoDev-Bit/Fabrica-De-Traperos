import { useState, useMemo } from 'react';
import { Search, Mail, Phone, MapPin, Plus, Trash2, X, Save, Edit } from 'lucide-react';
import { useData } from '../context/DataContext';

export const Clientes = () => {
  const { clientes, addCliente, updateCliente, deleteCliente, showConfirm } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCliente, setEditingCliente] = useState(null);

  const [formData, setFormData] = useState({
    nombre: '',
    tipo: 'Mayorista',
    correo: '',
    tel: '',
    ciudad: '',
  });

  const TIPOS = ['Mayorista', 'Distribuidor', 'Institucional', 'Minorista', 'Otro'];

  const handleOpenModal = (cliente = null) => {
    if (cliente) {
      setEditingCliente(cliente);
      setFormData({
        nombre: cliente.nombre,
        tipo: cliente.tipo,
        correo: cliente.correo,
        tel: cliente.tel,
        ciudad: cliente.ciudad,
      });
    } else {
      setEditingCliente(null);
      setFormData({ nombre: '', tipo: 'Mayorista', correo: '', tel: '', ciudad: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCliente) {
      updateCliente(editingCliente.id, { ...editingCliente, ...formData });
    } else {
      addCliente(formData);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    showConfirm(
      'Eliminar Cliente',
      '¿Eliminar este cliente definitivamente?',
      () => deleteCliente(id),
      null,
      'Eliminar',
      'Cancelar'
    );
  };

  const filteredClientes = useMemo(() => {
    return clientes.filter(c => 
      c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
      c.ciudad.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [clientes, searchTerm]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Directorio de Clientes</h1>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-colors border border-blue-500/50 flex items-center gap-2 shadow-lg shadow-blue-500/20"
        >
          <Plus size={20} /> Nuevo Cliente
        </button>
      </div>

      <div className="bg-slate-800 p-4 rounded-xl shadow-lg border border-slate-700/50 mb-6 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar cliente por nombre o ciudad..." 
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none text-white placeholder-slate-500 text-sm transition-all"
          />
        </div>
      </div>

      {filteredClientes.length === 0 ? (
        <div className="p-12 text-center text-slate-500 bg-slate-800 rounded-xl border border-slate-700/50">
          <p className="text-xl font-medium text-slate-300">No hay clientes registrados.</p>
          <p className="text-sm mt-2">Haz clic en "Nuevo Cliente" para agregar uno.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClientes.map(cliente => (
            <div key={cliente.id} className="bg-slate-800 rounded-xl shadow-lg border border-slate-700/50 overflow-hidden hover:border-blue-500/30 transition-colors group flex flex-col">
              <div className="bg-slate-800/80 p-5 border-b border-slate-700/50 relative">
                <div className="absolute top-4 right-4 flex gap-2">
                  <button onClick={() => handleOpenModal(cliente)} className="text-slate-400 hover:text-blue-400"><Edit size={16}/></button>
                  <button onClick={() => handleDelete(cliente.id)} className="text-slate-400 hover:text-red-400"><Trash2 size={16}/></button>
                </div>
                <div className="pr-12">
                  <h3 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors line-clamp-1">{cliente.nombre}</h3>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-wider rounded border border-blue-500/20">
                      {cliente.tipo}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-5 space-y-3 flex-1">
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <Mail size={16} className="text-slate-500" />
                  <span className="truncate">{cliente.correo}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <Phone size={16} className="text-slate-500" />
                  <span>{cliente.tel}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <MapPin size={16} className="text-slate-500" />
                  <span className="truncate">{cliente.ciudad}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal CRUD */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-slate-700/50 bg-slate-800/80">
              <h2 className="text-xl font-bold text-white">{editingCliente ? 'Editar Cliente' : 'Nuevo Cliente'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-1">Nombre / Razón Social</label>
                <input 
                  type="text" 
                  required
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-1">Tipo de Cliente</label>
                <select 
                  value={formData.tipo}
                  onChange={(e) => setFormData({...formData, tipo: e.target.value})}
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-white text-sm"
                >
                  {TIPOS.map(f => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-1">Teléfono</label>
                  <input 
                    type="text" 
                    required
                    value={formData.tel}
                    onChange={(e) => setFormData({...formData, tel: e.target.value})}
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-1">Ciudad</label>
                  <input 
                    type="text" 
                    required
                    value={formData.ciudad}
                    onChange={(e) => setFormData({...formData, ciudad: e.target.value})}
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-white text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-1">Correo Electrónico</label>
                <input 
                  type="email" 
                  required
                  value={formData.correo}
                  onChange={(e) => setFormData({...formData, correo: e.target.value})}
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-white text-sm"
                />
              </div>
              <div className="pt-4 border-t border-slate-700/50 mt-6 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg font-medium transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2 border border-blue-500/50"
                >
                  <Save size={18} /> Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
