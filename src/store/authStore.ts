import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
  setLoading: (isLoading: boolean) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  isLoading: true,

  login: (accessToken: string, refreshToken: string) => {
    // Store tokens in localStorage
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    // Update state
    set({ isAuthenticated: true, isLoading: false });
  },

  logout: () => {
    // Remove tokens from localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    // Update state
    set({ isAuthenticated: false });
  },

  checkAuth: async () => {
    try {
      set({ isLoading: true });

      // Check if tokens exist in localStorage
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      const hasTokens = !!accessToken && !!refreshToken;

      // TODO: If there's a need to validate token beyond checking existence,
      // implement token validation logic here

      set({ isAuthenticated: hasTokens, isLoading: false });
      return hasTokens;
    } catch (error) {
      console.error("Failed to check authentication status:", error);
      set({ isAuthenticated: false, isLoading: false });
      return false;
    }
  },

  setLoading: (isLoading: boolean) => set({ isLoading }),

  setAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
}));
