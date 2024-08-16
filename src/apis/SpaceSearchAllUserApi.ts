import { createRequestOptionsJSON_AUTH, fetchApi } from "@/apis/_createRequestOptions";

// 인터페이스 정의
export interface UserInfoInSpace {
  userId: number;
  userName: string;
  profileImgUrl: string | null;
  userAuth: "manager" | "normal";
}

interface SpaceSearchAllUserApiResponseType {
  code: number;
  status: number;
  message: string;
  result: {
    userInfoInSpaceList: UserInfoInSpace[];
  };
}

// API 함수 정의
export const spaceSearchAllUserApi = async (spaceId: number) => {
  const requestOptions = createRequestOptionsJSON_AUTH("GET");

  if (!requestOptions) return null;

  const url = `${import.meta.env.VITE_API_BACK_URL}/space/${spaceId}/all-member`;
  return await fetchApi<SpaceSearchAllUserApiResponseType>(url, requestOptions);
};
