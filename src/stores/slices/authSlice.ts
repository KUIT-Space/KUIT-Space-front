import { StateCreator } from "zustand";

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthActions {
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
}

type AuthSlice = AuthState & AuthActions;

export const createAuthSlice: StateCreator<AuthSlice, [], [], AuthSlice> = (set) => ({
  isAuthenticated: false,
  isLoading: true,

  login: (accessToken: string, refreshToken: string) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    set((state) => ({
      ...state,
      isAuthenticated: true,
      isLoading: false,
    }));
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    set((state) => ({
      ...state,
      isAuthenticated: false,
      isLoading: false,
    }));
  },

  checkAuth: async () => {
    set((state) => ({ ...state, isLoading: true }));
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const hasTokens = !!accessToken && !!refreshToken;
    set((state) => ({ ...state, isAuthenticated: hasTokens, isLoading: false }));
    return hasTokens;
  },
});
