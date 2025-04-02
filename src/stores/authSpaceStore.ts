import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import { createAuthSlice } from "./slices/authSlice";
import { createSpaceSlice, SpaceInfoType } from "./slices/spaceSlice";

interface AuthSpaceActionsType {
  loginWithSpaces: (
    accessToken: string,
    refreshToken: string,
    managedSpaces: SpaceInfoType[],
  ) => void;
  logoutWithSpaces: () => void;
}

export type AuthSpaceStoreType = ReturnType<typeof createAuthSlice> &
  ReturnType<typeof createSpaceSlice> &
  AuthSpaceActionsType;

const useAuthSpaceStore = create<AuthSpaceStoreType>()(
  devtools(
    persist(
      (...props) => {
        const [, get] = props;

        const loginWithSpaces = (
          accessToken: string,
          refreshToken: string,
          managedSpaces: SpaceInfoType[],
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
