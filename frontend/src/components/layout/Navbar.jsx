import { useState, useRef, useEffect } from 'react';
import { Bell, Search, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const Navbar = () => {
  const { user } = useAuth();
  const { notificaciones, limpiarNotificaciones } = useData();
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getIconForType = (type) => {
    switch (type) {
      case 'success': return <CheckCircle2 size={16} className="text-emerald-400" />;
      case 'warning': return <AlertCircle size={16} className="text-amber-400" />;
      default: return <Info size={16} className="text-blue-400" />;
    }
  };

  return (
    <header className="bg-slate-900/80 backdrop-blur-md shadow-sm border-b border-slate-800 h-16 flex items-center justify-between px-8 z-50 relative">
      <div className="flex items-center gap-4 flex-1">
        {/* Espacio reservado si se quiere agregar el título o logo de forma responsive */}
      </div>

      <div className="flex items-center gap-6">
        {/* Notifications Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-slate-800"
          >
            <Bell size={20} />
            {notificaciones.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-900"></span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-slate-800 border border-slate-700 rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-800/90">
                <h3 className="font-bold text-white text-sm">Notificaciones</h3>
                {notificaciones.length > 0 && (
                  <button 
                    onClick={limpiarNotificaciones}
                    className="text-xs text-blue-400 hover:text-blue-300 font-medium"
                  >
                    Marcar leídas
                  </button>
                )}
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {notificaciones.length === 0 ? (
                  <div className="p-6 text-center text-slate-500 text-sm">
                    No hay notificaciones recientes
                  </div>
                ) : (
                  <div className="divide-y divide-slate-700/50">
                    {notificaciones.map(notif => (
                      <div key={notif.id} className="p-4 hover:bg-slate-700/30 transition-colors flex gap-3">
                        <div className="mt-0.5 shrink-0">
                          {getIconForType(notif.tipo)}
                        </div>
                        <div>
                          <p className="text-sm text-slate-200">{notif.mensaje}</p>
                          <p className="text-xs text-slate-500 mt-1">{notif.fecha}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-3 pl-6 border-l border-slate-700/50">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-slate-200">{user?.firstName}</p>
            <p className="text-xs text-blue-400 font-medium uppercase tracking-wide">{user?.department}</p>
          </div>
          {user?.image ? (
            <img src={user.image} alt="Avatar" className="w-9 h-9 rounded-full border-2 border-slate-700 object-cover" />
          ) : (
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold border border-blue-500">
              {user?.firstName?.charAt(0)}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
