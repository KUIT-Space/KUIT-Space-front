import ky, { BeforeErrorHook, HTTPError } from "ky";
import { match } from "ts-pattern";

import authSpaceStore from "@/stores/authSpaceStore";
import { UnauthorizedError } from "@/utils/HttpErrors";

export interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  status: number;
  timestamp?: string;
  result?: T;
}

export interface SuccessResponse {
  isSuccess: boolean;
}

const handleHttpError: BeforeErrorHook = async (error) => {
  if (error instanceof HTTPError) {
    const { request, response, options } = error;

    if (response.status === 401) {
      throw new UnauthorizedError(response, request, options);
    }

    const apiResponse = (await response.clone().json()) as ApiResponse;

    return match(apiResponse.code)
      .with(4001, () => {
        throw new UnauthorizedError(response, request, options);
      })
      .otherwise(() => error);
  }
  return error;
};

const getAccessToken = () => authSpaceStore.getState().getAccessToken();
const logout = () => authSpaceStore.getState().logout();

export const client = ky.create({
  prefixUrl: import.meta.env.VITE_API_BACK_URL,
  hooks: {
    beforeRequest: [
      (request) => {
        const accessToken = getAccessToken();
        if (accessToken) {
          request.headers.set("Authorization", accessToken);
        }
      },
    ],
    beforeError: [handleHttpError],
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 401) {
          logout();
          return;
        }

        const apiResponse = (await response.clone().json()) as ApiResponse;
        if (apiResponse.code === 4001) {
          logout();
        }
      },
    ],
  },
  retry: {
    limit: 2,
    methods: ["get", "put", "head", "delete", "options", "trace"],
  },
});
