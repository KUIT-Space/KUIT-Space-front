import useAuthSpaceStore from "@/stores/authSpaceStore";
import { createStoreProxy } from "@/utils/store/proxy";

export const authService = createStoreProxy(useAuthSpaceStore.getState);
