import React, { createContext, useContext, ReactNode, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // user selalu null atau dummy user kalau mau
  const [user, setUser] = useState<User | null>(null);

  // dummy login/logout fungsi kosong agar tidak error kalau dipanggil
  const login = async (email: string, password: string) => {
    // langsung resolve tanpa login sebenarnya
    return Promise.resolve();
  };

  const logout = async () => {
    // kosong, langsung resolve
    return Promise.resolve();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
