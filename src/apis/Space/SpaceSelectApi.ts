import { ApiResponse, client } from "@/apis/client";

export interface SpaceInfo {
  spaceId: number; // 스페이스 id 값
  spaceName: string; // 스페이스 이름
  profileImgUrl: string | null; // 스페이스 썸네일 URL
  isInvited?: boolean; //[프론트 판별용] 초대된 스페이스인지 여부
  createdAt?: string; // 스페이스 개설일 (yyyy년 mm월 dd일 형식)
  memberNum?: number; // 스페이스 멤버 수
}

export interface UserSpaceListResult {
  userName: string; // 유저의 이름
  lastUserSpaceId: number; // 응답으로 보낸 제일 마지막 userSpaceId
  spaceInfoList: SpaceInfo[]; // 유저가 속한 스페이스 정보의 목록
}

interface UserSpaceListResponse extends ApiResponse {
  result: UserSpaceListResult;
}

/** 유저가 속한 스페이스 목록을 조회하는 API
 * @param size 요청할 스페이스 정보 개수
 * @param lastUserSpaceId 마지막으로 얻은 userSpaceId 값 (초기 요청 시 0)
 * @returns UserSpaceListResponse | null - 스페이스 목록과 lastUserSpaceId 정보를 포함한 응답 또는 null
 */
export const SpaceSelectApi = async (size: number, lastUserSpaceId: number) => {
  try {
    const response = await client
      .get("user/space-choice", {
        searchParams: { size, lastUserSpaceId },
      })
      .json<UserSpaceListResponse>();

    if (response.status !== 200) {
      console.warn(response.message);
      return null;
    }

    return response;
  } catch (error) {
    console.error("[SpaceSelectApi error]", error);
    return null;
  }
};
