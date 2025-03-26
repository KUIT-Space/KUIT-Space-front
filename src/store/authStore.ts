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
    set({ isAuthenticated: true, isLoading: false });
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    set({ isAuthenticated: false });
  },

  checkAuth: async () => {
    try {
      set({ isLoading: true });
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      const hasTokens = !!accessToken && !!refreshToken;
      set({ isAuthenticated: hasTokens, isLoading: false });
      return hasTokens;
    } catch (error) {
      console.error("Failed to check authentication status:", error);
      set({ isAuthenticated: false, isLoading: false });
      return false;
    }
  },
}));
