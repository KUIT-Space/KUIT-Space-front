import { StateCreator } from "zustand";

export interface AuthStateType {
  isAuthenticated: boolean;
  isLoading: boolean;
  isError: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

export interface AuthActionsType {
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  load: () => void;
  setError: (error: boolean) => void;
  getAccessToken: () => string | null;
}

export type AuthSliceType = AuthStateType & AuthActionsType;

export const createAuthSlice: StateCreator<AuthSliceType> = (set, get) => ({
  isAuthenticated: false,
  isLoading: true,
  isError: false,
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

  load: () => {
    const { accessToken, refreshToken } = get();
    const hasTokens = !!accessToken && !!refreshToken;
    set((state) => ({
      ...state,
      isLoading: false,
      isAuthenticated: hasTokens,
    }));
  },

  setError: (error: boolean) => {
    set((state) => ({
      ...state,
      isError: error,
    }));
  },

  getAccessToken: () => {
    return get().accessToken;
  },
});
