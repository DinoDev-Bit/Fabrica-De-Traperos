import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  PlusSquare, 
  Wallet, 
  Archive, 
  Users, 
  LogOut,
  Settings,
  ClipboardList,
  ListTodo
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const SECTIONS = [
  { id: 'dashboard', path: '/', label: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'editor', 'viewer'] },
  { id: 'catalogo', path: '/catalogo', label: 'Catálogo', icon: Package, roles: ['admin', 'editor', 'viewer'] },
  { id: 'preventa', path: '/preventa', label: 'Preventa', icon: ClipboardList, roles: ['admin', 'editor'] },
  { id: 'pedidos', path: '/pedidos', label: 'Lista de Pedidos', icon: ListTodo, roles: ['admin', 'editor'] },
  { id: 'nuevo-pedido', path: '/nuevo-pedido', label: 'Crear Pedido', icon: PlusSquare, roles: ['admin', 'editor'] },
  { id: 'contabilidad', path: '/contabilidad', label: 'Contabilidad', icon: Wallet, roles: ['admin'] },
  { id: 'inventario', path: '/inventario', label: 'Inventario', icon: Archive, roles: ['admin'] },
  { id: 'clientes', path: '/clientes', label: 'Clientes', icon: Users, roles: ['admin', 'editor'] },
  { id: 'config', path: '/configuracion', label: 'Configuración', icon: Settings, roles: ['admin', 'editor', 'viewer'] },
];

export const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) return null;

  return (
    <aside className="w-64 bg-[#0b1120] text-slate-300 flex flex-col min-h-screen border-r border-slate-800">
      <div className="p-6 flex items-center gap-3 border-b border-slate-800/50">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-blue-500/20">
          F
        </div>
        <div>
          <h2 className="font-bold text-lg leading-tight text-white">Fábrica de</h2>
          <p className="text-xs text-blue-400 uppercase tracking-widest font-semibold mt-0.5">Traperos</p>
        </div>
      </div>

      <div className="p-4 flex-1 overflow-y-auto">
        <div className="mb-6 px-4 py-3 bg-slate-800/30 rounded-xl border border-slate-700/50">
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Mi Perfil</p>
          <div className="flex items-center gap-3 mt-2">
            {user.image ? (
              <img src={user.image} alt="Avatar" className="w-10 h-10 rounded-full border-2 border-blue-500/50" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-sm font-bold border border-slate-700 text-slate-300">
                {user.firstName?.charAt(0)}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user.firstName} {user.lastName}</p>
              <p className="text-xs text-emerald-400 font-bold uppercase truncate">{user.role}</p>
            </div>
          </div>
        </div>

        <nav className="space-y-1">
          {SECTIONS.map((section) => {
            const hasAccess = section.roles.includes(user.role);
            const isActive = location.pathname === section.path;

            if (!hasAccess) return null;

            const Icon = section.icon;

            return (
              <Link
                key={section.id}
                to={section.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-blue-600/10 text-blue-400 font-medium border border-blue-500/20 shadow-sm' 
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border border-transparent'
                }`}
              >
                <Icon size={20} className={isActive ? 'text-blue-500' : 'text-slate-500'} />
                <span className="text-sm">{section.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-4 border-t border-slate-800/50 bg-[#0b1120]">
        <button 
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 border border-transparent transition-all"
        >
          <LogOut size={20} />
          <span className="text-sm font-medium">Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
};
