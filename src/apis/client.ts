import ky from "ky";

export interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  status: number;
  timestamp?: string;
  result?: T;
}

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
