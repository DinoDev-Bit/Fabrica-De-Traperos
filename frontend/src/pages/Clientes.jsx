import { Users, Mail, Phone, Plus } from 'lucide-react';

const mockClientes = [
  { id: 1, nombre: 'Supermercados Éxito', contacto: 'Carlos Rendón', email: 'compras@exito.com', telefono: '300 123 4567', tipo: 'Mayorista' },
  { id: 2, nombre: 'Limpieza Total S.A.', contacto: 'María Gómez', email: 'gerencia@limpiezatotal.co', telefono: '312 987 6543', tipo: 'Distribuidor' },
  { id: 3, nombre: 'Colegio San Jose', contacto: 'Rectoría', email: 'admin@sanjose.edu.co', telefono: '604 444 5555', tipo: 'Institucional' },
  { id: 4, nombre: 'Juan Pérez', contacto: 'Juan Pérez', email: 'juan.p@email.com', telefono: '315 222 3333', tipo: 'Minorista' },
];

export const Clientes = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Directorio de Clientes</h1>
        <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors flex items-center gap-2">
          <Plus size={20} /> Nuevo Cliente
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockClientes.map(cliente => (
          <div key={cliente.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center">
                <Users size={24} />
              </div>
              <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded-full ${
                cliente.tipo === 'Mayorista' ? 'bg-purple-100 text-purple-700' :
                cliente.tipo === 'Distribuidor' ? 'bg-blue-100 text-blue-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {cliente.tipo}
              </span>
            </div>
            <h3 className="font-bold text-gray-800 text-lg mb-1">{cliente.nombre}</h3>
            <p className="text-sm text-gray-500 mb-4">{cliente.contacto}</p>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail size={14} className="text-gray-400" />
                <span className="truncate">{cliente.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone size={14} className="text-gray-400" />
                <span>{cliente.telefono}</span>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-100">
              <button className="text-sm font-bold text-primary hover:text-secondary transition-colors w-full text-center">
                Ver Historial
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
