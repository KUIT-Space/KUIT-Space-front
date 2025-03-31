import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { createAuthSlice } from "./slices/authSlice";
import { createAuthSpaceSlice } from "./slices/authSpaceSlice";
import { createSpaceSlice } from "./slices/spaceSlice";

type StoreState = ReturnType<typeof createAuthSlice> &
  ReturnType<typeof createSpaceSlice> &
  ReturnType<typeof createAuthSpaceSlice>;

const authSpaceStore = create<StoreState>()(
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
          isAuthenticated: state.isAuthenticated,
          managedSpaces: state.managedSpaces,
          selectedSpaceId: state.selectedSpaceId,
        }),
      },
    ),
    {
      name: "auth-space-store",
    },
  ),
);

export default authSpaceStore;
