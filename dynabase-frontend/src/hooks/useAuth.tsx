import React, { createContext, useContext, useState } from 'react';
import { login as loginService } from '../services/AuthService';
import { setAuthToken, clearAuthToken } from '../services/api';
import api from '../services/api';

interface AuthContextType {
  accessToken: string | null;
  roles: string[] | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const [roles, setRoles] = useState<string[] | null>(null);

  const login = async (username: string, password: string) => {
    const token = await loginService(username, password);
    setAccessTokenState(token);
    setAuthToken(token);

    // Fetch user profile to get roles
    const profile = await api.get('/me');
    setRoles(profile.data.roles);
  };

  const logout = () => {
    setAccessTokenState(null);
    setRoles(null);
    clearAuthToken();
    window.location.href = 'http://localhost:8081/logout';
  };

  return (
    <AuthContext.Provider value={{ accessToken, roles, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
