import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  PlusSquare, 
  Wallet, 
  Archive, 
  Users, 
  LogOut 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const SECTIONS = [
  { id: 'dashboard', path: '/', label: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'editor', 'viewer'] },
  { id: 'catalogo', path: '/catalogo', label: 'Catálogo de Productos', icon: Package, roles: ['admin', 'editor', 'viewer'] },
  { id: 'pedidos', path: '/pedidos', label: 'Gestión de Pedidos', icon: ShoppingCart, roles: ['admin', 'editor'] },
  { id: 'nuevo-pedido', path: '/nuevo-pedido', label: 'Crear Pedido', icon: PlusSquare, roles: ['admin', 'editor'] },
  { id: 'contabilidad', path: '/contabilidad', label: 'Contabilidad', icon: Wallet, roles: ['admin'] },
  { id: 'inventario', path: '/inventario', label: 'Inventario', icon: Archive, roles: ['admin'] },
  { id: 'clientes', path: '/clientes', label: 'Clientes', icon: Users, roles: ['admin', 'editor'] },
];

export const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) return null;

  return (
    <aside className="w-64 bg-primary text-white flex flex-col min-h-screen shadow-xl">
      <div className="p-6 flex items-center gap-3 border-b border-white/10">
        <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center font-bold text-xl">
          F
        </div>
        <div>
          <h2 className="font-bold text-lg leading-tight">Fábrica de</h2>
          <p className="text-sm text-gray-300">Traperos</p>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-6 px-4 py-3 bg-white/5 rounded-lg border border-white/10">
          <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Mi Perfil</p>
          <div className="flex items-center gap-3 mt-2">
            {user.image ? (
              <img src={user.image} alt="Avatar" className="w-10 h-10 rounded-full border-2 border-secondary" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-sm font-bold">
                {user.firstName?.charAt(0)}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.firstName} {user.lastName}</p>
              <p className="text-xs text-secondary font-bold uppercase truncate">{user.role}</p>
            </div>
          </div>
        </div>

        <nav className="space-y-1">
          {SECTIONS.map((section) => {
            const hasAccess = section.roles.includes(user.role);
            const isActive = location.pathname === section.path;

            if (!hasAccess) return null; // Frontend restriction

            const Icon = section.icon;

            return (
              <Link
                key={section.id}
                to={section.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-secondary text-white font-medium shadow-md' 
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span className="text-sm">{section.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-4 border-t border-white/10">
        <button 
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition-colors"
        >
          <LogOut size={20} />
          <span className="text-sm font-medium">Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
};
