import useAuthSpaceStore from "@/stores/authSpaceStore";

/**
 * Zustand store의 메서드와 속성에 접근할 때 항상 최신 상태를 반영하는 Proxy를 생성합니다.
 * @param getState - Zustand store의 getState 함수
 * @returns 최신 상태를 반영하는 Proxy 객체
 * @example
 * const store = createStoreProxy(useAuthStore.getState);
 * store.getAccessToken(); // 항상 최신 상태의 메서드 호출
 */
export const createStoreProxy = <T extends object>(getState: () => T) => {
  return new Proxy({} as T, {
    get: (target, prop: string) => {
      const state = getState();
      const value = state[prop as keyof T];

      if (typeof value === "function") {
        return (...args: unknown[]) => value.apply(state, args);
      }

      return value;
    },
  });
};

export const authService = createStoreProxy(useAuthSpaceStore.getState);
