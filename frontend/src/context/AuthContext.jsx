import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setLoading(false);
      return;
    }

    if (token.startsWith('local_token_')) {
      // Logic for local user
      try {
        const localUserData = JSON.parse(localStorage.getItem('localUserData'));
        if (localUserData) {
          setUser({
            ...localUserData,
            role: 'admin', // Simulated role for local user
            department: 'Local'
          });
        }
      } catch (e) {
        console.error("Error parsing local user data", e);
        localStorage.removeItem('token');
        localStorage.removeItem('localUserData');
      } finally {
        setLoading(false);
      }
    } else {
      // Logic for DummyJSON API
      fetch('https://dummyjson.com/auth/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      })
      .then(res => {
        if (!res.ok) throw new Error('Token inválido');
        return res.json();
      })
      .then(data => {
        const department = data.company?.department || 'N/A';
        let role = 'viewer';
        if (department === 'Engineering') role = 'admin';
        else if (department === 'Marketing') role = 'editor';

        setUser({
          id: data.id,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          image: data.image,
          department,
          role
        });
      })
      .catch(() => {
        logout();
      })
      .finally(() => {
        setLoading(false);
      });
    }
  }, []);

  const loginLocal = (userData) => {
    localStorage.setItem('token', `local_token_${Date.now()}`);
    localStorage.setItem('localUserData', JSON.stringify(userData));
    setUser({
      ...userData,
      role: 'admin',
      department: 'Local'
    });
  };

  const loginApi = (token, data) => {
    localStorage.setItem('token', token);
    
    const department = data.company?.department || 'N/A';
    let role = 'viewer';
    if (department === 'Engineering') role = 'admin';
    else if (department === 'Marketing') role = 'editor';

    setUser({
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      image: data.image,
      department,
      role
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('localUserData');
    localStorage.removeItem('usuario');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginLocal, loginApi, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
