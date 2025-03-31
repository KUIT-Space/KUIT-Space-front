import { StateCreator } from "zustand";

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

export interface AuthActions {
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
  getAccessToken: () => string | null;
}

export type AuthSlice = AuthState & AuthActions;

export const createAuthSlice: StateCreator<AuthSlice> = (set, get) => ({
  isAuthenticated: false,
  isLoading: true,
  accessToken: null,
  refreshToken: null,

  login: (accessToken: string, refreshToken: string) => {
    set({
      isAuthenticated: true,
      isLoading: false,
      accessToken,
      refreshToken,
    });
  },

  logout: () => {
    set({
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
    });
  },

  checkAuth: async () => {
    set({ isLoading: true });
    const { accessToken, refreshToken } = get();
    const hasTokens = !!accessToken && !!refreshToken;
    set({ isAuthenticated: hasTokens, isLoading: false });
    return hasTokens;
  },

  getAccessToken: () => {
    return get().accessToken;
  },
});
