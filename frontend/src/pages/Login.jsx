import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, AlertCircle, Eye, EyeOff } from 'lucide-react';

export const Login = () => {
  const [username, setUsername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const { loginApi, loginGoogle, loginLocal } = useAuth();
  const navigate = useNavigate();

  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');
  const [showCustomEmailInput, setShowCustomEmailInput] = useState(false);

  const handleGoogleClick = () => {
    setShowGoogleModal(true);
  };

  const handleGoogleSelect = (email) => {
    setLoadingGoogle(true);
    setShowGoogleModal(false);
    setTimeout(() => {
      loginGoogle(email);
      navigate('/');
    }, 1500);
  };

  const handleCustomGoogleSubmit = (e) => {
    e.preventDefault();
    if (customGoogleEmail) {
      handleGoogleSelect(customGoogleEmail);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Intentar login local primero
      const localSuccess = loginLocal(username, password);
      if (localSuccess) {
        navigate('/');
        return;
      }

      // Si falla local, intentar API
      const res = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
          expiresInMins: 60,
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error('Credenciales inválidas (Local y API)');
      }

      loginApi(data.token, data);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Fondos animados (Blobs) */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="relative glass-panel rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-700/50 z-10">
        <div className="p-8 text-white text-center border-b border-white/10">
          <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
            <Lock size={32} className="text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            Fábrica de Traperos
          </h1>
          <p className="text-slate-400 text-sm">Portal Administrativo Seguro</p>
        </div>

        <div className="p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-900/30 border border-red-500/50 text-red-300 flex items-start gap-3 rounded-xl">
              <AlertCircle size={20} className="shrink-0 mt-0.5" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-1.5">Usuario</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-slate-900/50 text-white placeholder-slate-500"
                  placeholder="ej. emilys"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-300 mb-1.5">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-slate-900/50 text-white placeholder-slate-500"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors p-1"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-3.5 px-4 rounded-xl transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2 shadow-lg shadow-blue-500/25"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </form>

          <div className="relative flex items-center py-6">
            <div className="flex-grow border-t border-slate-700/50"></div>
            <span className="flex-shrink-0 mx-4 text-slate-500 text-sm font-medium">O inicia sesión con API</span>
            <div className="flex-grow border-t border-slate-700/50"></div>
          </div>

          <button
            type="button"
            onClick={handleGoogleClick}
            disabled={loadingGoogle || loading}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-3 border border-slate-600 shadow-lg"
          >
            {loadingGoogle ? (
              <div className="w-5 h-5 border-2 border-slate-400 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continuar con Google
              </>
            )}
          </button>
          
          <div className="mt-8 text-center pt-6 border-t border-slate-700/50">
            <p className="text-sm text-slate-400">
              ¿No tienes una cuenta?{' '}
              <Link to="/register" className="font-bold text-blue-400 hover:text-blue-300 transition-colors">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Google Account Selector Modal */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-[400px] overflow-hidden text-slate-800">
            <div className="p-8 pb-4 text-center">
              <svg className="w-10 h-10 mx-auto mb-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <h2 className="text-2xl font-normal mb-1">Elige una cuenta</h2>
              <p className="text-sm text-slate-600 mb-2">para ir a Fábrica de Traperos</p>
            </div>

            <div className="border-t border-slate-200">
              <button 
                onClick={() => handleGoogleSelect('rojashenaovictorandres1234@gmail.com')}
                className="w-full p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors border-b border-slate-200 text-left"
              >
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                  V
                </div>
                <div>
                  <p className="font-medium text-slate-900">Victor Rojas</p>
                  <p className="text-sm text-slate-500">rojashenaovictorandres1234@gmail.com</p>
                </div>
              </button>

              <button 
                onClick={() => handleGoogleSelect('vendedor@gmail.com')}
                className="w-full p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors border-b border-slate-200 text-left"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-lg">
                  V
                </div>
                <div>
                  <p className="font-medium text-slate-900">Vendedor</p>
                  <p className="text-sm text-slate-500">vendedor@gmail.com</p>
                </div>
              </button>

              {!showCustomEmailInput ? (
                <button 
                  onClick={() => setShowCustomEmailInput(true)}
                  className="w-full p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors text-left"
                >
                  <div className="w-10 h-10 flex items-center justify-center text-slate-500">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
                  </div>
                  <p className="font-medium text-slate-700">Usar otra cuenta</p>
                </button>
              ) : (
                <form onSubmit={handleCustomGoogleSubmit} className="p-4 bg-slate-50">
                  <p className="text-sm font-medium text-slate-700 mb-2">Ingresa correo de Google:</p>
                  <input 
                    type="email" 
                    value={customGoogleEmail}
                    onChange={(e) => setCustomGoogleEmail(e.target.value)}
                    placeholder="correo@gmail.com"
                    className="w-full p-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white mb-3 text-slate-800"
                    autoFocus
                    required
                  />
                  <div className="flex justify-end gap-2">
                    <button type="button" onClick={() => setShowCustomEmailInput(false)} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-200 rounded-md">Cancelar</button>
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 rounded-md">Siguiente</button>
                  </div>
                </form>
              )}
            </div>
            
            <div className="p-4 flex justify-end">
               <button onClick={() => {setShowGoogleModal(false); setShowCustomEmailInput(false);}} className="text-sm font-medium text-slate-500 hover:text-slate-700 px-3 py-1">Cerrar</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
