import { StateCreator } from "zustand";

import { AuthActions } from "./authSlice";
import { SpaceActions } from "./spaceSlice";
import { SpaceInfo } from "./spaceSlice";

interface AuthSpaceActions {
  loginWithSpaces: (accessToken: string, refreshToken: string, managedSpaces: SpaceInfo[]) => void;
  logoutWithSpaces: () => void;
}

type AuthSpaceState = AuthSpaceActions & AuthActions & SpaceActions;

export const createAuthSpaceSlice: StateCreator<AuthSpaceState, [], [], AuthSpaceActions> = (
  set,
  get,
) => ({
  loginWithSpaces: (accessToken: string, refreshToken: string, managedSpaces: SpaceInfo[]) => {
    get().login(accessToken, refreshToken);
    get().setManagedSpaces(managedSpaces);
  },

  logoutWithSpaces: () => {
    get().logout();
    get().setManagedSpaces([]);
    get().selectSpace(null);
  },
});
