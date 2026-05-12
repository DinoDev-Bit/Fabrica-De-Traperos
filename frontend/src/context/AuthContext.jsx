import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const loginLocal = (userData) => {
    const newUser = {
      ...userData,
      role: 'admin',
      department: 'Local'
    };
    localStorage.setItem('app_user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const loginApi = (token, data) => {
    const department = data.company?.department || 'N/A';
    let role = 'viewer';
    if (department === 'Engineering') role = 'admin';
    else if (department === 'Marketing') role = 'editor';

    const newUser = {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      image: data.image,
      department,
      role
    };
    localStorage.setItem('app_user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const loginGoogle = (email) => {
    const newUser = {
      id: 999,
      firstName: 'Victor',
      lastName: 'Admin',
      email: email,
      image: '',
      department: 'Management',
      role: 'admin'
    };
    localStorage.setItem('app_user', JSON.stringify(newUser));
    setUser(newUser);
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
    <AuthContext.Provider value={{ user, loginLocal, loginApi, loginGoogle, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
