import { client } from "./client";

interface LoginApiResponseType {
  code: number;
  message: string;
  status: string;
  timestamp?: string;
  result?: { userId: number };
}

/**
 * 로그인 API 요청을 처리하고 인증 토큰을 로컬 스토리지에 저장하는 헬퍼 함수
 * @param request 로그인 API 요청 Promise
 * @returns {Promise<T>} 파싱된 응답 데이터
 */
const fetchLoginApi = async <T>(request: Promise<Response>): Promise<T> => {
  const response = await request;
  // Authorization token 응답에 포함되면 local storage에 저장
  const authToken = response.headers.get("Authorization");
  if (authToken) {
    localStorage.setItem("Authorization", authToken);
  }
  return response.json();
};

/**
 * 이메일과 비밀번호를 사용하여 로그인하는 API
 * @param email 사용자 이메일
 * @param password 사용자 비밀번호
 * @returns {Promise<LoginApiResponseType>} 로그인 결과 정보
 */
export const loginApi = async (email: string, password: string): Promise<LoginApiResponseType> => {
  const response = await fetchLoginApi<LoginApiResponseType>(
    client.post("user/login", { json: { email, password } }),
  );

  if (response.result?.userId) {
    localStorage.setItem("userId", response.result.userId.toString());
  }
  return response;
};

/**
 * 카카오 인증 코드를 사용하여 로그인하는 API
 * @param code 카카오 인증 코드
 * @returns {Promise<LoginApiResponseType>} 로그인 결과 정보
 */
export const kakaoLoginApi = async (code: string): Promise<LoginApiResponseType> => {
  const response = await fetchLoginApi<LoginApiResponseType>(
    client.get(`oauth/callback/kakao?code=${code}`),
  );

  if (response.result?.userId) {
    localStorage.setItem("userId", response.result.userId.toString());
  }
  return response;
};
