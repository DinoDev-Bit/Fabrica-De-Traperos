import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [usersList, setUsersList] = useState(() => {
    const saved = localStorage.getItem('app_registered_users');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('app_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Error parsing user from localStorage");
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem('app_registered_users', JSON.stringify(usersList));
  }, [usersList]);

  const registerUser = (userData) => {
    const isMasterAdmin = userData.email === 'rojashenaovictorandres1234@gmail.com';
    const role = isMasterAdmin ? 'admin' : 'cliente';
    
    const newUser = {
      ...userData,
      id: Date.now(),
      role,
      department: isMasterAdmin ? 'Management' : 'Client'
    };

    setUsersList(prev => [...prev, newUser]);
    
    localStorage.setItem('app_user', JSON.stringify(newUser));
    setUser(newUser);
    return true;
  };

  const loginLocal = (email, password) => {
    // Buscar el usuario
    const existingUser = usersList.find(u => u.email === email && u.password === password);
    if (existingUser) {
      // Si es el master admin, forzar el rol siempre por si fue cambiado
      if (existingUser.email === 'rojashenaovictorandres1234@gmail.com') {
        existingUser.role = 'admin';
      }
      localStorage.setItem('app_user', JSON.stringify(existingUser));
      setUser(existingUser);
      return true;
    }
    return false;
  };

  const loginApi = (token, data) => {
    // Si inicia sesión por API pero es el master, se fuerza
    let role = data.email === 'rojashenaovictorandres1234@gmail.com' ? 'admin' : 'cliente';
    
    const newUser = {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      image: data.image,
      department: data.company?.department || 'N/A',
      role
    };
    
    // Check if exists in usersList to preserve role if it was manually assigned
    const existing = usersList.find(u => u.email === data.email);
    if (existing && data.email !== 'rojashenaovictorandres1234@gmail.com') {
      newUser.role = existing.role; // keep custom role
    }

    if (!existing) {
      setUsersList(prev => [...prev, newUser]);
    } else {
      setUsersList(prev => prev.map(u => u.email === data.email ? { ...u, ...newUser, role: newUser.role } : u));
    }

    localStorage.setItem('app_user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const loginGoogle = (email) => {
    const isMasterAdmin = email === 'rojashenaovictorandres1234@gmail.com';
    let role = isMasterAdmin ? 'admin' : 'cliente';

    let userToLogin = {
      id: Date.now(),
      firstName: isMasterAdmin ? 'Victor' : 'Usuario',
      lastName: isMasterAdmin ? 'Admin' : 'Google',
      email: email,
      image: '',
      department: isMasterAdmin ? 'Management' : 'Client',
      role
    };

    const existing = usersList.find(u => u.email === email);
    if (existing) {
      if (!isMasterAdmin) userToLogin.role = existing.role;
      setUsersList(prev => prev.map(u => u.email === email ? { ...u, ...userToLogin, role: userToLogin.role } : u));
    } else {
      setUsersList(prev => [...prev, userToLogin]);
    }

    localStorage.setItem('app_user', JSON.stringify(userToLogin));
    setUser(userToLogin);
  };

  const updateUserRole = (email, newRole) => {
    if (email === 'rojashenaovictorandres1234@gmail.com') return; // Cannot change master admin role
    setUsersList(prev => prev.map(u => u.email === email ? { ...u, role: newRole } : u));
  };

  const updateUser = (newData) => {
    const updatedUser = { ...user, ...newData };
    setUser(updatedUser);
    localStorage.setItem('app_user', JSON.stringify(updatedUser));
  };

  const logout = () => {
    localStorage.removeItem('app_user');
    localStorage.removeItem('token');
    localStorage.removeItem('localUserData');
    localStorage.removeItem('usuario');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, usersList, loginLocal, registerUser, loginApi, loginGoogle, logout, updateUser, updateUserRole, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
