import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [email, setUserEmail] = useState('');

  return (
    <AuthContext.Provider value={{ email, setUserEmail }}>
      {children}
    </AuthContext.Provider>
  );
};