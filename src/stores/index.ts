import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { createAuthSlice } from "./slices/authSlice";
import { createAuthSpaceSlice } from "./slices/authSpaceSlice";
import { createSpaceSlice } from "./slices/spaceSlice";

type StoreState = ReturnType<typeof createAuthSlice> &
  ReturnType<typeof createSpaceSlice> &
  ReturnType<typeof createAuthSpaceSlice>;

export const useStore = create<StoreState>()(
  devtools(
    persist(
      (...a) => ({
        ...createAuthSlice(...a),
        ...createSpaceSlice(...a),
        ...createAuthSpaceSlice(...a),
      }),
      {
        name: "space-store",
        partialize: (state) => ({
          isAuthenticated: state.isAuthenticated,
          managedSpaces: state.managedSpaces,
          selectedSpaceId: state.selectedSpaceId,
        }),
      },
    ),
    {
      name: "Space Store",
    },
  ),
);
