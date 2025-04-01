import authSpaceStore, { AuthSpaceStore } from "@/stores/authSpaceStore";

export interface AuthQueryData {
  data: Omit<AuthSpaceStore, "isLoading" | "isError">;
  isLoading: boolean;
  isError: boolean;
}

export default function useAuthQuery(): AuthQueryData {
  const { isLoading, isError, ...state } = authSpaceStore();

  if (isLoading) {
    throw new Promise<void>((resolve) => {
      const unsubscribe = authSpaceStore.subscribe((state) => {
        if (!state.isLoading) {
          unsubscribe();
          resolve();
        }
      });
    });
  }

  return { data: state, isLoading: isLoading, isError: isError };
}
