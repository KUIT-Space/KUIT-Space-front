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

export interface SuccessResponse {
  isSuccess: boolean;
}

const handleHttpError: BeforeErrorHook = async (error) => {
  if (error instanceof HTTPError) {
    const { response } = error;

    return match(response.status)
      .with(401, () => {
        throw new UnauthorizedError(response, error.request, error.options);
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
        if (response.status === 401) {
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
