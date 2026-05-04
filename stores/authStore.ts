import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserDto } from "@/types";

interface AuthState {
  user: UserDto | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

interface AuthActions {
  login: (token: string, refreshToken: string, user: UserDto) => void;
  logout: () => void;
  setUser: (user: UserDto) => void;
  updateTokens: (token: string, refreshToken: string) => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,

      login: (token, refreshToken, user) =>
        set({ token, refreshToken, user, isAuthenticated: true }),

      logout: () => {
        set({ token: null, refreshToken: null, user: null, isAuthenticated: false });
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      },

      setUser: (user) => set({ user }),

      updateTokens: (token, refreshToken) => set({ token, refreshToken }),
    }),
    {
      name: "appilico-auth",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
