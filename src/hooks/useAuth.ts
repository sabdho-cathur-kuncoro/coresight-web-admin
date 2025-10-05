/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import type { AuthState, User } from "../types/auth";

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("fmcg_user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch (error: any) {
        console.log(error);
        localStorage.removeItem("fmcg_user");
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    } else {
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  }, []);

  const login = (user: User) => {
    localStorage.setItem("fmcg_user", JSON.stringify(user));
    setAuthState({
      user,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const logout = () => {
    localStorage.removeItem("fmcg_user");
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const updateUser = (updates: Partial<User>) => {
    if (authState.user) {
      const updatedUser = { ...authState.user, ...updates };
      localStorage.setItem("fmcg_user", JSON.stringify(updatedUser));
      setAuthState({
        ...authState,
        user: updatedUser,
      });
    }
  };

  return {
    ...authState,
    login,
    logout,
    updateUser,
  };
};
