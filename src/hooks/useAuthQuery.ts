import authSpaceStore, { AuthSpaceStore } from "@/stores/authSpaceStore";

export interface AuthQueryData {
  data: AuthSpaceStore;
  isLoading: boolean;
}

export default function useAuthQuery(): AuthQueryData {
  const state = authSpaceStore();

  if (state.isLoading) {
    throw new Promise<void>((resolve) => {
      const unsubscribe = authSpaceStore.subscribe((state) => {
        if (!state.isLoading) {
          unsubscribe();
          resolve();
        }
      });
    });
  }

  return { data: state, isLoading: state.isLoading };
}
