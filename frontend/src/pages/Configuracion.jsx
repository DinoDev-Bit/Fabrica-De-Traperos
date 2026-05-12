import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Save, User, Mail, Shield, Image as ImageIcon, AlertCircle } from 'lucide-react';

export const Configuracion = () => {
  const { user, updateUser } = useAuth();
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [image, setImage] = useState('');
  const [success, setSuccess] = useState(false);

  // Cargar datos actuales cuando el componente se monta
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setImage(user.image || '');
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(false);

    // Actualizar globalmente
    updateUser({
      firstName,
      lastName,
      image
    });

    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  // Función para enmascarar el correo
  const getMaskedEmail = (email) => {
    if (!email) return 'No registrado';
    const parts = email.split('@');
    if (parts.length !== 2) return email;
    const name = parts[0];
    const domain = parts[1];
    
    // Mostrar solo las primeras 4 letras
    const maskedName = name.length > 4 ? name.substring(0, 4) + '***' : name + '***';
    return `${maskedName}@${domain}`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Configuración</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Columna Izquierda: Info Resumen */}
        <div className="space-y-6">
          <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700/50 p-6 flex flex-col items-center text-center">
            {image ? (
              <img src={image} alt="Avatar" className="w-24 h-24 rounded-full border-4 border-slate-700 object-cover mb-4 shadow-lg shadow-black/50" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-slate-900 flex items-center justify-center border-4 border-slate-700 mb-4 shadow-lg shadow-black/50 text-slate-400">
                <User size={40} />
              </div>
            )}
            <h2 className="text-xl font-bold text-white">{firstName} {lastName}</h2>
            <p className="text-blue-400 font-bold uppercase tracking-wider text-xs mt-1">{user?.role}</p>
          </div>

          <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700/50 p-6">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-700/50 pb-2">Seguridad</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-slate-900 rounded-lg text-slate-400">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Correo Electrónico</p>
                  <p className="text-sm text-slate-200 font-bold">{getMaskedEmail(user?.email)}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-slate-900 rounded-lg text-slate-400">
                  <Shield size={16} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Contraseña</p>
                  <p className="text-sm text-slate-200 font-bold">••••••••</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-start gap-2">
              <AlertCircle size={16} className="text-blue-400 shrink-0 mt-0.5" />
              <p className="text-xs text-blue-300">
                Tu información privada está protegida. La contraseña no es visible y el correo está oculto.
              </p>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Formulario de Edición */}
        <div className="md:col-span-2">
          <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700/50 overflow-hidden">
            <div className="bg-slate-800/80 p-6 border-b border-slate-700/50">
              <h2 className="font-bold text-white text-lg">Editar Perfil</h2>
              <p className="text-slate-400 text-sm mt-1">Actualiza tu información personal y foto de perfil.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              
              {success && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-lg text-sm font-medium flex items-center justify-center">
                  ¡Perfil actualizado con éxito!
                </div>
              )}

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-1.5">Nombre</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full pl-10 pr-3 py-2.5 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-slate-900/50 text-white placeholder-slate-500 text-sm"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-1.5">Apellido</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full pl-10 pr-3 py-2.5 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-slate-900/50 text-white placeholder-slate-500 text-sm"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-1.5">Enlace del Avatar (URL)</label>
                  <div className="relative">
                    <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                      type="url"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-slate-900/50 text-white placeholder-slate-500 text-sm"
                      placeholder="https://ejemplo.com/mifoto.jpg"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1.5">Pega el enlace directo a una imagen (JPG, PNG) para usarla como tu avatar.</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-700/50 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2 border border-blue-500/50"
                >
                  <Save size={18} /> Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};
