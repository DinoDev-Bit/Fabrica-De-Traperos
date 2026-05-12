import { useState, useMemo } from 'react';
import { Search, ShieldAlert, ShieldCheck, Shield, User, Filter, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Roles = () => {
  const { user, usersList, updateUserRole } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todos');

  // Si no es admin, no debería ver esto, pero por si acaso renderizamos algo bloqueado.
  if (user?.role !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <ShieldAlert size={64} className="text-red-500 mb-4 opacity-50" />
        <h1 className="text-2xl font-bold text-white mb-2">Acceso Denegado</h1>
        <p className="text-slate-400">No tienes permisos de administrador para gestionar los roles.</p>
      </div>
    );
  }

  const FILTROS = ['Todos', 'admin', 'cliente', 'viewer', 'editor'];

  const filteredUsers = useMemo(() => {
    return usersList.filter(u => {
      const matchesSearch = u.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            (u.firstName && u.firstName.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesFilter = activeFilter === 'Todos' || u.role === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [usersList, searchTerm, activeFilter]);

  const handleRoleChange = (email, newRole) => {
    if (email === 'rojashenaovictorandres1234@gmail.com') {
      alert("No puedes cambiar el rol del Administrador Maestro.");
      return;
    }
    updateUserRole(email, newRole);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Gestión de Roles</h1>
        <p className="text-slate-400 text-sm">Asigna o revoca etiquetas y permisos a los usuarios de la plataforma.</p>
      </div>

      {user.email === 'rojashenaovictorandres1234@gmail.com' && (
        <div className="bg-blue-500/10 border border-blue-500/20 text-blue-400 px-4 py-3 rounded-xl flex items-start gap-3">
          <ShieldCheck className="shrink-0 mt-0.5" size={20} />
          <div>
            <p className="font-bold text-sm">Administrador Maestro</p>
            <p className="text-xs text-blue-400/80">Has iniciado sesión con la cuenta principal. Tienes control total sobre los roles del sistema.</p>
          </div>
        </div>
      )}

      <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700/50 overflow-hidden">
        <div className="p-4 border-b border-slate-700/50 flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-800/80">
          <div className="relative flex-1 w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por correo o nombre..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500/50 outline-none text-sm text-white"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-400 text-sm font-medium flex items-center gap-1 mr-2"><Filter size={16}/> Filtros:</span>
            {FILTROS.map(f => (
              <button 
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-colors border ${
                  activeFilter === f ? 'bg-blue-500/20 text-blue-400 border-blue-500/50' : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          {filteredUsers.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              <User size={48} className="mx-auto mb-4 opacity-20" />
              <p className="text-lg font-medium">No se encontraron usuarios.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/50 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="p-4 font-semibold">Usuario</th>
                  <th className="p-4 font-semibold">Correo Electrónico</th>
                  <th className="p-4 font-semibold">Departamento</th>
                  <th className="p-4 font-semibold">Etiqueta (Rol)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {filteredUsers.map(u => (
                  <tr key={u.id || u.email} className="hover:bg-slate-700/20 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-slate-300 font-bold uppercase">
                        {(u.firstName?.[0] || u.email[0])}
                      </div>
                      <span className="font-bold text-slate-200 capitalize">{u.firstName || 'Usuario'} {u.lastName || ''}</span>
                    </td>
                    <td className="p-4 text-slate-300">{u.email}</td>
                    <td className="p-4 text-slate-400 text-sm">{u.department || 'N/A'}</td>
                    <td className="p-4">
                      {u.email === 'rojashenaovictorandres1234@gmail.com' ? (
                        <div className="flex items-center gap-2">
                          <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-md text-xs font-bold uppercase flex items-center gap-1">
                            <Shield size={14} /> Admin Maestro
                          </span>
                        </div>
                      ) : (
                        <select 
                          value={u.role}
                          onChange={(e) => handleRoleChange(u.email, e.target.value)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase border outline-none cursor-pointer transition-colors ${
                            u.role === 'admin' ? 'bg-amber-500/10 text-amber-500 border-amber-500/30 hover:bg-amber-500/20' :
                            u.role === 'editor' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20' :
                            u.role === 'viewer' ? 'bg-purple-500/10 text-purple-400 border-purple-500/30 hover:bg-purple-500/20' :
                            'bg-slate-800 text-slate-300 border-slate-600 hover:bg-slate-700'
                          }`}
                        >
                          <option value="admin">Admin</option>
                          <option value="editor">Editor</option>
                          <option value="viewer">Viewer</option>
                          <option value="cliente">Cliente</option>
                        </select>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
