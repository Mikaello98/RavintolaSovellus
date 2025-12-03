import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();
const AuthDispatchContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const login = (userData) => {
    localStorage.getItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthDispatchContext.Provider value={{ login, logout }}>
      <AuthContext.Provider value={user}>
        {children}
      </AuthContext.Provider>
    </AuthDispatchContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
export const useAuthActions = () => useContext(AuthDispatchContext);