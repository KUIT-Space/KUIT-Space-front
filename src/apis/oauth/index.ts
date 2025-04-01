import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";

import useAuthSpaceStore from "../../stores/authSpaceStore";
import { SpaceInfo } from "../../stores/slices/spaceSlice";
import { ApiResponse, client } from "../client";

interface OauthLoginResponse {
  isSuccess: boolean;
  spaceInfos: SpaceInfo[];
}

/**
 * Generate a random string for the state parameter to prevent CSRF attacks
 * @returns {string} A random string
 */
export const generateState = (): string => {
  const randomArray = new Uint8Array(32);
  window.crypto.getRandomValues(randomArray);
  return Array.from(randomArray)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
};

/**
 * Store the state parameter in localStorage
 * @param {string} state The state parameter to store
 */
export const storeState = (state: string): void => {
  localStorage.setItem("discordOauthState", state);
};

/**
 * Validate the state parameter from the callback against the stored value
 * @param {string} state The state parameter from the callback
 * @returns {boolean} Whether the state is valid
 */
export const validateState = (state: string): boolean => {
  const storedState = localStorage.getItem("discordOauthState");
  return storedState === state;
};

/**
 * Exchange the authorization code for tokens
 * @param {string} code The authorization code from the callback
 * @returns {Promise<ApiResponse<OauthLoginResponse> & { accessToken?: string, refreshToken?: string }>} The response with tokens
 */
export const exchangeCodeForTokens = async (
  code: string,
): Promise<ApiResponse<OauthLoginResponse> & { accessToken?: string; refreshToken?: string }> => {
  const response = await client.get(`oauth/discord?code=${code}`);

  const accessToken = response.headers.get("Authorization") || undefined;
  const refreshToken =
    response.headers.get("Authorization-refresh") ||
    response.headers.get("authorization-refresh") ||
    response.headers.get("Authorization-Refresh") ||
    undefined;

  const data = await response.json<ApiResponse<OauthLoginResponse>>();

  return {
    ...data,
    accessToken,
    refreshToken,
  };
};

/**
 * Custom hook for exchanging the authorization code for tokens using React Query
 * @param options Configuration options for the mutation
 * @returns React Query mutation object
 */
export const useExchangeCodeForTokens = (options?: {
  onSuccess?: (
    data: ApiResponse<OauthLoginResponse> & { accessToken?: string; refreshToken?: string },
  ) => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();
  const { login } = useAuthSpaceStore();
  return useMutation({
    mutationFn: (code: string) => exchangeCodeForTokens(code),
    onSuccess: (data) => {
      if (data.accessToken && data.refreshToken) {
        login(data.accessToken, data.refreshToken);
        queryClient.invalidateQueries({ queryKey: ["auth"] });
      }
      options?.onSuccess?.(data);
    },
    onError: options?.onError,
  });
};

/**
 * Clear the OAuth state from localStorage
 */
export const clearOAuthState = (): void => {
  localStorage.removeItem("discordOauthState");
};
