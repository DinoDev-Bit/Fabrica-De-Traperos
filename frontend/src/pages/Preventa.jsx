import { useState } from 'react';
import { ArrowRight, Save, Plus, Trash2, Store, Package } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';

export const Preventa = () => {
  const { productos, addPedido } = useData();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [tienda, setTienda] = useState('');
  const [cart, setCart] = useState([]);
  
  // Para la selección de productos en el paso 2
  const [selectedProductId, setSelectedProductId] = useState('');
  const [cantidad, setCantidad] = useState(1);

  const handleNextStep = (e) => {
    e.preventDefault();
    if (tienda.trim() === '') {
      alert("Por favor ingresa el nombre de la tienda.");
      return;
    }
    setStep(2);
  };

  const handleAddToCart = () => {
    if (!selectedProductId || cantidad < 1) return;
    
    const prod = productos.find(p => p.id === parseInt(selectedProductId));
    if (!prod) return;

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
  const total = subtotal; // En preventa tal vez no aplicamos IVA o envío de momento, o sí. Asumimos total = subtotal.

  const handleEnviar = () => {
    if (cart.length === 0) {
      alert("Debes seleccionar al menos un producto.");
      return;
    }

    const nuevoPedido = {
      cliente: tienda,
      documento: 'N/A',
      direccion: 'Preventa',
      fecha: new Date().toISOString().split('T')[0],
      total,
      estado: 'Pendiente',
      prioridad: 'Media',
      items: cart
    };

    addPedido(nuevoPedido);
    navigate('/pedidos'); // Redirigir a pedidos después de enviarla
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Módulo de Preventa</h1>
      </div>

      <div className="bg-slate-800 rounded-2xl shadow-xl border border-slate-700/50 overflow-hidden">
        {/* Progress Bar */}
        <div className="flex bg-slate-800/80 border-b border-slate-700/50">
          <div className={`flex-1 p-4 text-center text-sm font-bold flex justify-center items-center gap-2 ${step === 1 ? 'text-blue-400 bg-blue-500/10 border-b-2 border-blue-500' : 'text-slate-500'}`}>
            <span className="w-6 h-6 rounded-full bg-current text-slate-900 flex items-center justify-center text-xs">1</span>
            Datos del Cliente
          </div>
          <div className={`flex-1 p-4 text-center text-sm font-bold flex justify-center items-center gap-2 ${step === 2 ? 'text-blue-400 bg-blue-500/10 border-b-2 border-blue-500' : 'text-slate-500'}`}>
            <span className="w-6 h-6 rounded-full bg-current text-slate-900 flex items-center justify-center text-xs">2</span>
            Selección de Productos
          </div>
        </div>

        <div className="p-8">
          {step === 1 && (
            <form onSubmit={handleNextStep} className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
                  <Store size={32} className="text-blue-400" />
                </div>
                <h2 className="text-xl font-bold text-white">Información de la Tienda</h2>
                <p className="text-slate-400 text-sm mt-1">Ingresa el nombre del cliente o establecimiento para iniciar la preventa.</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">Nombre de la Tienda / Cliente</label>
                <input 
                  type="text" 
                  value={tienda}
                  onChange={e => setTienda(e.target.value)}
                  className="w-full p-4 bg-slate-900 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-white text-lg text-center" 
                  placeholder="Ej. Comercializadora del Norte" 
                  required
                  autoFocus
                />
              </div>

              <div className="flex justify-end pt-4">
                <button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2 border border-blue-500/50"
                >
                  Siguiente <ArrowRight size={20} />
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">Catálogo de Productos</h2>
                  <p className="text-slate-400 text-sm">Añadiendo a la preventa de: <strong className="text-blue-400">{tienda}</strong></p>
                </div>
                <button 
                  onClick={() => setStep(1)}
                  className="text-slate-400 hover:text-white text-sm font-medium transition-colors"
                >
                  Volver
                </button>
              </div>

              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 flex flex-col md:flex-row gap-3">
                <select 
                  value={selectedProductId}
                  onChange={e => setSelectedProductId(e.target.value)}
                  className="flex-1 p-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-white"
                >
                  <option value="">Selecciona un producto...</option>
                  {productos.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.nombre} - ${p.precio.toLocaleString()} (Stock: {p.stock})
                    </option>
                  ))}
                </select>
                <div className="flex gap-2">
                  <input 
                    type="number" 
                    min="1" 
                    value={cantidad}
                    onChange={e => setCantidad(e.target.value)}
                    className="w-24 p-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-white text-center" 
                  />
                  <button 
                    onClick={handleAddToCart}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 rounded-lg flex items-center justify-center transition-colors font-bold shadow-lg shadow-emerald-500/20"
                  >
                    Añadir
                  </button>
                </div>
              </div>

              <div className="space-y-3 mt-6">
                <h3 className="font-bold text-slate-300 border-b border-slate-700/50 pb-2">Resumen del Pedido</h3>
                {cart.length === 0 ? (
                  <div className="text-center py-8 text-slate-500 border-2 border-dashed border-slate-700 rounded-xl">
                    <Package size={32} className="mx-auto mb-2 opacity-50" />
                    <p>No hay productos seleccionados.</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      {cart.map(item => (
                        <div key={item.producto.id} className="flex items-center justify-between bg-slate-800 p-3 rounded-lg border border-slate-700">
                          <div className="flex-1">
                            <p className="font-bold text-slate-200">{item.producto.nombre}</p>
                            <p className="text-xs text-slate-500">${item.producto.precio.toLocaleString()} x {item.cantidad}</p>
                          </div>
                          <div className="font-bold text-blue-400 mr-4">
                            ${(item.producto.precio * item.cantidad).toLocaleString()}
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.producto.id)}
                            className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-slate-700/50">
                      <span className="text-slate-300 font-bold">Total Estimado:</span>
                      <span className="text-2xl font-bold text-emerald-400">${total.toLocaleString()}</span>
                    </div>
                  </>
                )}
              </div>

              <div className="pt-6 flex justify-end">
                <button 
                  onClick={handleEnviar}
                  disabled={cart.length === 0}
                  className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2 border border-blue-500/50"
                >
                  <Save size={20} /> Enviar Preventa
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
