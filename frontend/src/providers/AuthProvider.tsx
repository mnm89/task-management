import React, { createContext, useState } from "react";
import * as authService from "../services/authService";

interface IAuthContext {
  authToken?: string | null;
  login?: (u: string, p: string) => Promise<void>;
  logout?: () => Promise<void>;
}

export const AuthContext = createContext<IAuthContext>({});

export const AuthProvider = ({ children }: any) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("token"));

  const login = async (username: string, password: string) => {
    const token = await authService.login(username, password);
    setAuthToken(token);
  };

  const logout = async () => {
    await authService.logout();
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
