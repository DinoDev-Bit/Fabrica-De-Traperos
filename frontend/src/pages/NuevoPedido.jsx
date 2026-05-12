import { useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';
import { useData } from '../context/DataContext';

export const NuevoPedido = () => {
  const { productos, addPedido } = useData();
  const [cliente, setCliente] = useState('');
  const [documento, setDocumento] = useState('');
  const [direccion, setDireccion] = useState('');
  const [fecha, setFecha] = useState('');
  const [cart, setCart] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [success, setSuccess] = useState(false);

  const ivaRate = 0.19;
  const envioRate = 5000;

  const handleAddToCart = () => {
    if (!selectedProductId || cantidad < 1) return;
    
    const prod = productos.find(p => p.id === parseInt(selectedProductId));
    if (!prod) return;

    // Check if already in cart
    const existing = cart.find(item => item.producto.id === prod.id);
    if (existing) {
      setCart(cart.map(item => item.producto.id === prod.id ? { ...item, cantidad: item.cantidad + parseInt(cantidad) } : item));
    } else {
      setCart([...cart, { producto: prod, cantidad: parseInt(cantidad) }]);
    }

    setSelectedProductId('');
    setCantidad(1);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.producto.id !== id));
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.producto.precio * item.cantidad), 0);
  const iva = subtotal * ivaRate;
  const total = subtotal > 0 ? subtotal + iva + envioRate : 0;

  const handleSubmit = () => {
    if (!cliente || cart.length === 0) {
      alert("Por favor ingresa un cliente y al menos un producto.");
      return;
    }

    const nuevoPedido = {
      cliente,
      documento,
      direccion,
      fecha: fecha || new Date().toISOString().split('T')[0],
      total,
      estado: 'Pendiente',
      prioridad: 'Media',
      items: cart
    };

    addPedido(nuevoPedido);
    setSuccess(true);
    
    // Reset form
    setTimeout(() => {
      setSuccess(false);
      setCliente('');
      setDocumento('');
      setDireccion('');
      setFecha('');
      setCart([]);
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Crear Nuevo Pedido</h1>
        <button 
          onClick={handleSubmit}
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 border border-emerald-500/50"
        >
          <Save size={20} /> Guardar Pedido
        </button>
      </div>

      {success && (
        <div className="p-4 bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 font-bold rounded-xl text-center">
          ¡Pedido creado y guardado con éxito!
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Formulario Cliente */}
          <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700/50">
            <h2 className="text-lg font-bold text-white mb-4 border-b border-slate-700/50 pb-2">Datos del Cliente</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-1">Nombre / Razón Social</label>
                <input 
                  type="text" 
                  value={cliente}
                  onChange={e => setCliente(e.target.value)}
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-white placeholder-slate-500" 
                  placeholder="Ej. Juan Pérez" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-1">NIT / CC</label>
                <input 
                  type="text" 
                  value={documento}
                  onChange={e => setDocumento(e.target.value)}
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-white placeholder-slate-500" 
                  placeholder="Documento" 
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-bold text-slate-300 mb-1">Dirección de Entrega</label>
                <input 
                  type="text" 
                  value={direccion}
                  onChange={e => setDireccion(e.target.value)}
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-white placeholder-slate-500" 
                  placeholder="Dirección completa" 
                />
              </div>
            </div>
          </div>

          {/* Selector de Productos */}
          <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700/50">
            <div className="flex justify-between items-center mb-4 border-b border-slate-700/50 pb-2">
              <h2 className="text-lg font-bold text-white">Productos</h2>
            </div>
            
            <div className="flex gap-2 mb-4">
              <select 
                value={selectedProductId}
                onChange={e => setSelectedProductId(e.target.value)}
                className="flex-1 p-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-white text-sm"
              >
                <option value="">Selecciona un producto del catálogo...</option>
                {productos.map(p => (
                  <option key={p.id} value={p.id}>{p.nombre} - ${p.precio.toLocaleString()} (Disp: {p.stock})</option>
                ))}
              </select>
              <input 
                type="number" 
                min="1" 
                value={cantidad}
                onChange={e => setCantidad(e.target.value)}
                className="w-24 p-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-white text-center" 
              />
              <button 
                onClick={handleAddToCart}
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 rounded-lg flex items-center justify-center transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>

            <div className="space-y-3">
              {cart.length === 0 ? (
                <p className="text-sm text-slate-500 text-center py-4">No hay productos en el pedido.</p>
              ) : (
                cart.map(item => (
                  <div key={item.producto.id} className="flex items-center justify-between bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-200">{item.producto.nombre}</p>
                      <p className="text-xs text-slate-500">${item.producto.precio.toLocaleString()} c/u</p>
                    </div>
                    <div className="font-bold text-white mr-4">
                      x{item.cantidad}
                    </div>
                    <div className="font-bold text-emerald-400 mr-4">
                      ${(item.producto.precio * item.cantidad).toLocaleString()}
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.producto.id)}
                      className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Columna Derecha */}
        <div className="space-y-6">
          <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700/50">
            <h2 className="text-lg font-bold text-white mb-4 border-b border-slate-700/50 pb-2">Resumen</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-slate-300">
                <span>Subtotal</span>
                <span className="font-medium">${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>IVA (19%)</span>
                <span className="font-medium">${iva.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Envío</span>
                <span className="font-medium">{subtotal > 0 ? `$${envioRate.toLocaleString()}` : '$0'}</span>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-700/50 flex justify-between items-center">
                <span className="font-bold text-white">Total</span>
                <span className="font-bold text-2xl text-emerald-400">${total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700/50">
            <h2 className="text-lg font-bold text-white mb-4 border-b border-slate-700/50 pb-2">Detalles Adicionales</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-1">Fecha de Pedido</label>
                <input 
                  type="date" 
                  value={fecha}
                  onChange={e => setFecha(e.target.value)}
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-white" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
