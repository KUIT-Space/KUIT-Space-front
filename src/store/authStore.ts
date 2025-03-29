import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthActions {
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: true,
};

export const useAuthStore = create<AuthState & AuthActions>((set, get) => ({
  ...initialState,

  login: (accessToken: string, refreshToken: string) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    set((state) => ({ ...state, isAuthenticated: true, isLoading: false }));
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    set((state) => ({ ...state, isAuthenticated: false }));
  },

  checkAuth: async () => {
    set((state) => ({ ...state, isLoading: true }));
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const hasTokens = !!accessToken && !!refreshToken;
    set((state) => ({ ...state, isAuthenticated: hasTokens, isLoading: false }));
    return hasTokens;
  },
}));
