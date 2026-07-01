import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  const login = (user) => {
    console.log('AuthContext - login llamado con:', user);
    setUsuario(user);
  };

  const logout = () => {
    console.log('AuthContext - logout llamado');
    setUsuario(null);
  };

  useEffect(() => {
    console.log('AuthContext - usuario cambió:', usuario);
  }, [usuario]);

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
