import { client } from "./client";

interface LoginApiResponseType {
  code: number;
  message: string;
  status: string;
  timestamp?: string;
  result?: { userId: number };
}

const fetchLoginApi = async <T>(request: Promise<Response>): Promise<T> => {
  const response = await request;
  // Authorization token 응답에 포함되면 local storage에 저장
  const authToken = response.headers.get("Authorization");
  if (authToken) {
    localStorage.setItem("Authorization", authToken);
  }
  return response.json();
};

export const loginApi = async (email: string, password: string): Promise<LoginApiResponseType> => {
  const response = await fetchLoginApi<LoginApiResponseType>(
    client.post("user/login", { json: { email, password } }),
  );

  if (response.result?.userId) {
    localStorage.setItem("userId", response.result.userId.toString());
  }
  return response;
};

export const kakaoLoginApi = async (code: string): Promise<LoginApiResponseType> => {
  const response = await fetchLoginApi<LoginApiResponseType>(
    client.get(`oauth/callback/kakao?code=${code}`),
  );

  if (response.result?.userId) {
    localStorage.setItem("userId", response.result.userId.toString());
  }
  return response;
};
