import { useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';

export const NuevoPedido = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Crear Nuevo Pedido</h1>
        <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 border border-emerald-500/50">
          <Save size={20} /> Guardar Pedido
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700/50">
            <h2 className="text-lg font-bold text-white mb-4 border-b border-slate-700/50 pb-2">Datos del Cliente</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-bold text-slate-300 mb-1">Buscar Cliente Registrado</label>
                <select className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-white">
                  <option>Seleccionar...</option>
                  <option>Supermercados Éxito</option>
                  <option>Limpieza Total S.A.</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-1">Nombre / Razón Social</label>
                <input type="text" className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-white placeholder-slate-500" placeholder="Ej. Juan Pérez" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-1">NIT / CC</label>
                <input type="text" className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-white placeholder-slate-500" placeholder="Documento" />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-bold text-slate-300 mb-1">Dirección de Entrega</label>
                <input type="text" className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-white placeholder-slate-500" placeholder="Dirección completa" />
              </div>
            </div>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700/50">
            <div className="flex justify-between items-center mb-4 border-b border-slate-700/50 pb-2">
              <h2 className="text-lg font-bold text-white">Productos</h2>
              <button className="text-sm text-blue-400 font-bold hover:text-blue-300 flex items-center gap-1 transition-colors">
                <Plus size={16} /> Añadir Producto
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
                <select className="flex-1 p-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-white text-sm">
                  <option>Trapero Microfibra Pro - $12,500</option>
                  <option>Trapero Industrial X - $18,000</option>
                </select>
                <input type="number" defaultValue="1" min="1" className="w-20 p-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-white text-center" />
                <button className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700/50">
            <h2 className="text-lg font-bold text-white mb-4 border-b border-slate-700/50 pb-2">Resumen</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-slate-300">
                <span>Subtotal</span>
                <span className="font-medium">$12,500</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>IVA (19%)</span>
                <span className="font-medium">$2,375</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Envío</span>
                <span className="font-medium">$5,000</span>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-700/50 flex justify-between items-center">
                <span className="font-bold text-white">Total</span>
                <span className="font-bold text-2xl text-emerald-400">$19,875</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700/50">
            <h2 className="text-lg font-bold text-white mb-4 border-b border-slate-700/50 pb-2">Detalles Adicionales</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-1">Fecha de Entrega</label>
                <input type="date" className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-white" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-1">Notas</label>
                <textarea className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-white placeholder-slate-500" rows="3" placeholder="Instrucciones especiales..."></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
