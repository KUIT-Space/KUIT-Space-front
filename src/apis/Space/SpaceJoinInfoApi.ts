import { createRequestOptionsJSON_AUTH, fetchApi } from "@/apis/_createRequestOptions";

interface SpaceJoinInfo {
  spaceProfileImg: string | null; // 스페이스 썸네일 이미지 url
  spaceName: string; // 스페이스 이름
  createdAt: string; // 스페이스 개설일 (yyyy년 mm월 dd일 형식)
  memberNum: number; // 스페이스 멤버 수
}

interface SpaceJoinInfoResponse {
  code: number;
  status: string;
  message: string;
  timestamp?: string;
  result: SpaceJoinInfo;
}

/**
 * 초대링크를 받은 유저에게 스페이스 정보를 보여주는 API
 * @param spaceId - 유저를 초대할 스페이스의 ID
 * @returns SpaceInfoResponse | null - 스페이스 정보 또는 이미 가입된 유저 메시지
 */
export const SpaceJoinInfoApi = async (spaceId: number) => {
  const requestOptions = createRequestOptionsJSON_AUTH("GET");
  if (!requestOptions) return null;

  const url = `${import.meta.env.VITE_API_BACK_URL}/space/${spaceId}/join`;

  const response = await fetchApi<SpaceJoinInfoResponse>(url, requestOptions);

  if (response.status !== "OK") {
    console.warn(response.message);
    return null;
  }

  return response;
};
