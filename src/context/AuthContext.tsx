import React, { createContext, useState, useContext, useEffect } from "react";

export type AuthContextType = {
  isAuthenticated: boolean;
  login: (
    username: string,
    type: string,
    password?: string
  ) => Promise<boolean>;
  // loginMock: () => void;
  logout: () => Promise<void>;
  user: { username: string; type: string } | null;
  loadingAuth: boolean;
  authError: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ username: string; type: string } | null>(
    null
  );
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    const storedUser = localStorage.getItem("user");
    if (storedAuth === "true" && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
    setLoadingAuth(false);
  }, []);

  const login = async (username: string, type: string): Promise<boolean> => {
    setLoadingAuth(true);
    setAuthError(null);

    return new Promise((resolve) => {
      setTimeout(() => {
        setIsAuthenticated(true);
        setUser({ username, type });
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user", JSON.stringify({ username, type }));
        resolve(true);
        setLoadingAuth(false);
      }, 1500);
    });
  };

  // const loginMock = () => {
  //   setIsAuthenticated(true);
  //   setUser({ username: "mockUser", type: "user" });
  //   localStorage.setItem("isAuthenticated", "true");
  //   localStorage.setItem("user", JSON.stringify({ username: "mockUser" }));
  // };

  const logout = async (): Promise<void> => {
    setLoadingAuth(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("user");
        setLoadingAuth(false);
        resolve();
      }, 500);
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        // loginMock,
        logout,
        user,
        loadingAuth,
        authError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
