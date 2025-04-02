import { StateCreator } from "zustand";

export interface SpaceInfoType {
  id: number;
  name: string;
}

export interface SpaceStateType {
  managedSpaces: SpaceInfoType[];
}

export interface SpaceActionsType {
  setManagedSpaces: (spaces: SpaceInfoType[]) => void;
  canManageSpace: (spaceId: number) => boolean;
}

export type SpaceSliceType = SpaceStateType & SpaceActionsType;

export const createSpaceSlice: StateCreator<SpaceSliceType, [], [], SpaceSliceType> = (
  set,
  get,
) => ({
  managedSpaces: [],
  setManagedSpaces: (spaces: SpaceInfoType[]) => {
    set({ managedSpaces: spaces });
  },
  canManageSpace: (spaceId: number) => {
    const { managedSpaces } = get();
    return managedSpaces.some((space) => space.id === spaceId);
  },
});
