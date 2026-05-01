"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { getToken, getUser, setAuth, clearAuth } from "@/lib/auth";
import type { UserDto, LoginRequest, RegisterRequest, AuthResponse, ApiResponse } from "@/types";

export function useAuth() {
  const [user, setUser] = useState<UserDto | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = getUser();
    const token = getToken();
    if (storedUser && token) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = useCallback(
    async (data: LoginRequest) => {
      const response = await api.post<ApiResponse<AuthResponse>>("/api/auth/login", data);
      if (response.data.success && response.data.data) {
        setAuth(response.data.data);
        setUser(response.data.data.user);
        router.push("/dashboard");
      }
      return response.data;
    },
    [router]
  );

  const register = useCallback(
    async (data: RegisterRequest) => {
      const response = await api.post<ApiResponse<AuthResponse>>("/api/auth/register", data);
      if (response.data.success && response.data.data) {
        setAuth(response.data.data);
        setUser(response.data.data.user);
        router.push("/dashboard");
      }
      return response.data;
    },
    [router]
  );

  const logout = useCallback(() => {
    clearAuth();
    setUser(null);
    router.push("/");
  }, [router]);

  const forgotPassword = useCallback(async (email: string) => {
    const response = await api.post<ApiResponse<boolean>>("/api/auth/forgot-password", { email });
    return response.data;
  }, []);

  return { user, loading, login, register, logout, forgotPassword, isAuthenticated: !!user };
}
