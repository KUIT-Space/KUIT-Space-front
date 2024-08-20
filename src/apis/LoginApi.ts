import { createRequestOptionsJSON, RequestOptions } from "@/apis/_createRequestOptions";

interface LoginApiResponseType {
  code: number;
  message: string;
  status: string;
  timestamp?: string;
  result?: { userId: number };
}

const fetchLoginApi = async (url: string, options: RequestOptions) => {
  const response: LoginApiResponseType = await fetch(url, options)
    .then((res) => {
      // Authorization token 응답에 포함되면 local storage에 저장
      localStorage.setItem("Authorization", res.headers.get("Authorization") ?? "");
      return res.json();
    })
    .catch((err) => console.error("[fetch error]", err));

  return response;
};

export const loginApi = async (email: string, password: string) => {
  const body = {
    email: email,
    password: password,
  };
  const requestOptions = createRequestOptionsJSON("POST", JSON.stringify(body));

  return await fetchLoginApi(
    `${import.meta.env.VITE_API_BACK_URL}/user/login`,
    requestOptions,
  ).then((res) => {
    if (res.result?.userId) {
      localStorage.setItem("userId", res.result.userId.toString());
    }
    return res;
  });
};

export const kakaoLoginApi = async (code: string) => {
  const requestOptions = createRequestOptionsJSON("GET");

  return await fetchLoginApi(
    `${import.meta.env.VITE_API_BACK_URL}/oauth/callback/kakao?code=${code}`,
    requestOptions,
  ).then((res) => {
    if (res.result?.userId) {
      localStorage.setItem("userId", res.result.userId.toString());
    }
    return res;
  });
};
