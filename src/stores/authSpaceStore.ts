import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import { createAuthSlice } from "./slices/authSlice";
import { createSpaceSlice, SpaceInfo } from "./slices/spaceSlice";

interface AuthSpaceActions {
  loginWithSpaces: (accessToken: string, refreshToken: string, managedSpaces: SpaceInfo[]) => void;
  logoutWithSpaces: () => void;
}

export type AuthSpaceStore = ReturnType<typeof createAuthSlice> &
  ReturnType<typeof createSpaceSlice> &
  AuthSpaceActions;

const useAuthSpaceStore = create<AuthSpaceStore>()(
  devtools(
    persist(
      (...props) => {
        const [, get] = props;

        const loginWithSpaces = (
          accessToken: string,
          refreshToken: string,
          managedSpaces: SpaceInfo[],
        ) => {
          get().login(accessToken, refreshToken);
          get().setManagedSpaces(managedSpaces);
        };

        const logoutWithSpaces = () => {
          get().logout();
          get().setManagedSpaces([]);
        };

        return {
          ...createAuthSlice(...props),
          ...createSpaceSlice(...props),
          loginWithSpaces,
          logoutWithSpaces,
        };
      },
      {
        name: "auth-space-store",
        partialize: (state) => ({
          accessToken: state.accessToken,
          refreshToken: state.refreshToken,
          managedSpaces: state.managedSpaces,
        }),
        storage: createJSONStorage(() => localStorage),
        onRehydrateStorage: () => {
          return (state, error) => {
            if (error) {
              state?.setError(true);
            }
            if (state) {
              state.load();
            }
          };
        },
      },
    ),
    {
      name: "auth-space-store",
    },
  ),
);

export default useAuthSpaceStore;
