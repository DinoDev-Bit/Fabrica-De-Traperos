import { Bell, Search, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-8">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-100 border-transparent focus:bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 rounded-lg text-sm transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-gray-500 hover:text-primary transition-colors rounded-full hover:bg-gray-100">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-secondary rounded-full border-2 border-white"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-gray-700">{user?.firstName}</p>
            <p className="text-xs text-gray-500">{user?.department}</p>
          </div>
          {user?.image ? (
            <img src={user.image} alt="Avatar" className="w-9 h-9 rounded-full border border-gray-200" />
          ) : (
            <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
              {user?.firstName?.charAt(0)}
            </div>
          )}
        </div>

        <button 
          onClick={logout}
          className="flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-sm font-bold transition-colors ml-2"
          title="Cerrar Sesión"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Salir</span>
        </button>
      </div>
    </header>
  );
};
