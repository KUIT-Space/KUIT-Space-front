import { createRequestOptionsJSON_AUTH, fetchApi } from "@/apis/_createRequestOptions";

export interface SpaceInfo {
  spaceId: number; // 스페이스 id 값
  spaceName: string; // 스페이스 이름
  profileImgUrl: string | null; // 스페이스 썸네일 URL
  isInvited?: boolean; //[프론트 판별용] 초대된 스페이스인지 여부
}

export interface UserSpaceListResult {
  userName: string; // 유저의 이름
  lastUserSpaceId: number; // 응답으로 보낸 제일 마지막 userSpaceId
  spaceInfoList: SpaceInfo[]; // 유저가 속한 스페이스 정보의 목록
}

interface UserSpaceListResponse {
  code: number;
  status: string;
  message: string;
  result: UserSpaceListResult;
}

/** 유저가 속한 스페이스 목록을 조회하는 API
 * @param size 요청할 스페이스 정보 개수
 * @param lastUserSpaceId 마지막으로 얻은 userSpaceId 값 (초기 요청 시 0)
 * @returns 스페이스 목록과 lastUserSpaceId 정보, 없으면 null 반환 (재로그인 필요)
 */
export const SpaceSelectApi = async (size: number, lastUserSpaceId: number) => {
  const requestOptions = createRequestOptionsJSON_AUTH("GET");
  if (!requestOptions) return null;

  const url = `${import.meta.env.VITE_API_BACK_URL}/user/space-choice?size=${size}&lastUserSpaceId=${lastUserSpaceId}`;

  return await fetchApi<UserSpaceListResponse>(url, requestOptions);
};
