import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import { createAuthSlice } from "./slices/authSlice";
import { createAuthSpaceSlice } from "./slices/authSpaceSlice";
import { createSpaceSlice } from "./slices/spaceSlice";

export type AuthSpaceStore = ReturnType<typeof createAuthSlice> &
  ReturnType<typeof createSpaceSlice> &
  ReturnType<typeof createAuthSpaceSlice>;

const useAuthSpaceStore = create<AuthSpaceStore>()(
  devtools(
    persist(
      (...a) => ({
        ...createAuthSlice(...a),
        ...createSpaceSlice(...a),
        ...createAuthSpaceSlice(...a),
      }),
      {
        name: "auth-space-store",
        partialize: (state) => ({
          accessToken: state.accessToken,
          refreshToken: state.refreshToken,
          managedSpaces: state.managedSpaces,
        }),
        storage: createJSONStorage(() => localStorage),
        onRehydrateStorage: () => {
          return (state) => {
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
