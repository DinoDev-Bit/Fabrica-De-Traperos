import { Package, AlertTriangle, ArrowDownToLine, ArrowUpToLine } from 'lucide-react';

const mockInventario = [
  { id: 'MAT-001', material: 'Hilo de Algodón', stock: 500, unidad: 'kg', estado: 'Suficiente' },
  { id: 'MAT-002', material: 'Palo de Madera 1.2m', stock: 1200, unidad: 'und', estado: 'Suficiente' },
  { id: 'MAT-003', material: 'Base Plástica', stock: 150, unidad: 'und', estado: 'Crítico' },
  { id: 'MAT-004', material: 'Tela Microfibra', stock: 300, unidad: 'metros', estado: 'Suficiente' },
  { id: 'MAT-005', material: 'Etiquetas', stock: 85, unidad: 'und', estado: 'Bajo' },
];

export const Inventario = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Control de Inventario</h1>
        <div className="flex gap-2">
          <button className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
            <ArrowUpToLine size={18} /> Registrar Salida
          </button>
          <button className="bg-emerald-50 hover:bg-emerald-100 text-emerald-600 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
            <ArrowDownToLine size={18} /> Registrar Entrada
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-gray-500 font-medium text-sm">Materiales en Alerta</p>
            <p className="text-3xl font-bold text-gray-800 mt-1">2</p>
          </div>
          <div className="w-12 h-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center">
            <AlertTriangle size={24} />
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-gray-500 font-medium text-sm">Total Materiales Diferentes</p>
            <p className="text-3xl font-bold text-gray-800 mt-1">45</p>
          </div>
          <div className="w-12 h-12 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center">
            <Package size={24} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <h2 className="font-bold text-gray-800">Materia Prima</h2>
        </div>
        
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
              <th className="p-4 font-semibold">ID</th>
              <th className="p-4 font-semibold">Material</th>
              <th className="p-4 font-semibold">Stock</th>
              <th className="p-4 font-semibold">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mockInventario.map(item => (
              <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="p-4 font-medium text-gray-500">{item.id}</td>
                <td className="p-4 font-bold text-gray-800">{item.material}</td>
                <td className="p-4 font-medium">{item.stock} {item.unidad}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                    item.estado === 'Suficiente' ? 'bg-emerald-100 text-emerald-700' :
                    item.estado === 'Bajo' ? 'bg-amber-100 text-amber-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {item.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
