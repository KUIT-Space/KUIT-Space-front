import { StateCreator } from "zustand";

export interface SpaceInfo {
  id: number;
  name: string;
}

export interface SpaceState {
  managedSpaces: SpaceInfo[];
  selectedSpaceId: number | null;
  canManageSelectedSpace: boolean;
}

export interface SpaceActions {
  setManagedSpaces: (spaces: SpaceInfo[]) => void;
  selectSpace: (spaceId: number | null) => void;
}

type SpaceSlice = SpaceState & SpaceActions;

export const createSpaceSlice: StateCreator<SpaceSlice, [], [], SpaceSlice> = (set, get) => ({
  managedSpaces: [],
  selectedSpaceId: null,
  canManageSelectedSpace: false,

  setManagedSpaces: (spaces: SpaceInfo[]) => {
    set({ managedSpaces: spaces });
    const { selectedSpaceId } = get();
    if (selectedSpaceId !== null) {
      const canManage = spaces.some((space) => space.id === selectedSpaceId);
      set({ canManageSelectedSpace: canManage });
    }
  },

  selectSpace: (spaceId: number | null) => {
    const { managedSpaces } = get();
    const canManage = spaceId !== null && managedSpaces.some((space) => space.id === spaceId);
    set({ selectedSpaceId: spaceId, canManageSelectedSpace: canManage });
  },
});
