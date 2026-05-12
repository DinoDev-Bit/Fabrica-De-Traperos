import { Bell, Search, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-slate-900/80 backdrop-blur-md shadow-sm border-b border-slate-800 h-16 flex items-center justify-between px-8 z-10 relative">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            type="text" 
            placeholder="Buscar..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700/50 focus:bg-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg text-sm text-white transition-all outline-none placeholder-slate-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-slate-800">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-900"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-6 border-l border-slate-700/50">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-slate-200">{user?.firstName}</p>
            <p className="text-xs text-blue-400 font-medium uppercase tracking-wide">{user?.department}</p>
          </div>
          {user?.image ? (
            <img src={user.image} alt="Avatar" className="w-9 h-9 rounded-full border-2 border-slate-700" />
          ) : (
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold border border-blue-500">
              {user?.firstName?.charAt(0)}
            </div>
          )}
        </div>

        <button 
          onClick={logout}
          className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 rounded-lg text-sm font-bold transition-colors ml-2"
          title="Cerrar Sesión"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Salir</span>
        </button>
      </div>
    </header>
  );
};
