import { useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';

export const NuevoPedido = () => {
  const [productos, setProductos] = useState([{ id: 1, prod: '', cant: 1, precio: 0 }]);

  const addRow = () => {
    setProductos([...productos, { id: Date.now(), prod: '', cant: 1, precio: 0 }]);
  };

  const removeRow = (id) => {
    if (productos.length > 1) {
      setProductos(productos.filter(p => p.id !== id));
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Crear Nuevo Pedido</h1>
        <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors flex items-center gap-2">
          <Save size={18} /> Guardar Pedido
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Información del Cliente</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
            <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/20 outline-none">
              <option value="">Seleccione un cliente...</option>
              <option value="1">Supermercados Éxito</option>
              <option value="2">Limpieza Total S.A.</option>
              <option value="nuevo">+ Agregar nuevo cliente</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Entrega Estimada</label>
            <input type="date" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/20 outline-none" />
          </div>
        </div>

        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-lg font-bold text-gray-800">Productos</h2>
          <button onClick={addRow} className="text-sm font-medium text-primary flex items-center gap-1 hover:underline">
            <Plus size={16} /> Agregar Fila
          </button>
        </div>

        <div className="space-y-3">
          {productos.map((p, index) => (
            <div key={p.id} className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
              <span className="text-gray-400 font-bold w-6">{index + 1}.</span>
              <div className="flex-1">
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none">
                  <option value="">Seleccione producto...</option>
                  <option value="1">Trapero Microfibra Pro ($12,500)</option>
                  <option value="2">Trapero Industrial X ($18,000)</option>
                </select>
              </div>
              <div className="w-24">
                <input type="number" min="1" defaultValue="1" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none text-center" />
              </div>
              <div className="w-32 font-medium text-gray-800 text-right">
                $0
              </div>
              <button onClick={() => removeRow(p.id)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t pt-4 flex justify-end">
          <div className="w-64">
            <div className="flex justify-between py-2 text-sm text-gray-600">
              <span>Subtotal:</span>
              <span>$0</span>
            </div>
            <div className="flex justify-between py-2 text-sm text-gray-600">
              <span>Impuestos (19%):</span>
              <span>$0</span>
            </div>
            <div className="flex justify-between py-3 text-lg font-bold text-gray-800 border-t mt-2">
              <span>Total:</span>
              <span>$0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
