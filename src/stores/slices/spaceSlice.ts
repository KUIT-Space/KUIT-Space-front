import { StateCreator } from "zustand";

export interface SpaceInfo {
  id: number;
  name: string;
}

export interface SpaceState {
  managedSpaces: SpaceInfo[];
}

export interface SpaceActions {
  setManagedSpaces: (spaces: SpaceInfo[]) => void;
  canManageSpace: (spaceId: number) => boolean;
}

type SpaceSlice = SpaceState & SpaceActions;

export const createSpaceSlice: StateCreator<SpaceSlice, [], [], SpaceSlice> = (set, get) => ({
  managedSpaces: [],
  setManagedSpaces: (spaces: SpaceInfo[]) => {
    set({ managedSpaces: spaces });
  },
  canManageSpace: (spaceId: number) => {
    const { managedSpaces } = get();
    return managedSpaces.some((space) => space.id === spaceId);
  },
});
