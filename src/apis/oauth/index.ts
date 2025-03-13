import { useMutation } from "@tanstack/react-query";

import { ApiResponse, client } from "../client";

// Response type for the OAuth token exchange
interface TokenResult {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
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
 * @returns {Promise<ApiResponse<TokenResult>>} The response from the token exchange
 */
export const exchangeCodeForTokens = async (code: string): Promise<ApiResponse<TokenResult>> => {
  return client.get(`oauth/discord?code=${code}`).json();
};

/**
 * Custom hook for exchanging the authorization code for tokens using React Query
 * @param options Configuration options for the mutation
 * @returns React Query mutation object
 */
export const useExchangeCodeForTokens = (options?: {
  onSuccess?: (data: ApiResponse<TokenResult>) => void;
  onError?: (error: Error) => void;
}) => {
  return useMutation({
    mutationFn: (code: string) => exchangeCodeForTokens(code),
    onSuccess: (data) => {
      if (data.result?.access_token && data.result?.refresh_token) {
        storeTokens(data.result.access_token, data.result.refresh_token);
      }
      options?.onSuccess?.(data);
    },
    onError: options?.onError,
  });
};

/**
 * Store the tokens in localStorage
 * @param {string} accessToken The access token
 * @param {string} refreshToken The refresh token
 */
export const storeTokens = (accessToken: string, refreshToken: string): void => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

/**
 * Clear the OAuth state from localStorage
 */
export const clearOAuthState = (): void => {
  localStorage.removeItem("discordOauthState");
};
