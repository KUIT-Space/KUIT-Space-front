import ky, { BeforeErrorHook, HTTPError } from "ky";
import { match } from "ts-pattern";

import { UnauthorizedError } from "@/utils/HttpErrors";

export interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  status: number;
  timestamp?: string;
  result?: T;
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

export const client = ky.create({
  prefixUrl: import.meta.env.VITE_API_BACK_URL,
  hooks: {
    beforeRequest: [
      (request) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
          request.headers.set("Authorization", accessToken);
        }
      },
    ],
    beforeError: [handleHttpError],
    afterResponse: [
      async (request, options, response) => {
        const responseData = (await response.clone().json()) as ApiResponse;
        if (responseData.code === 4001) {
          localStorage.removeItem("accessToken");
        }
      },
    ],
  },
  retry: {
    limit: 2,
    methods: ["get", "put", "head", "delete", "options", "trace"],
  },
});
