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
          accessToken: state.accessToken,
          refreshToken: state.refreshToken,
          managedSpaces: state.managedSpaces,
        }),
      },
    ),
    {
      name: "auth-space-store",
    },
  ),
);

export default authSpaceStore;
