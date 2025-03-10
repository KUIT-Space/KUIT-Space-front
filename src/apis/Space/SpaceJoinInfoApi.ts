import { ApiResponse, client } from "@/apis/client";

export interface SpaceJoinInfo {
  spaceProfileImg: string | null; // 스페이스 썸네일 이미지 url
  spaceName: string; // 스페이스 이름
  createdAt: string; // 스페이스 개설일 (yyyy년 mm월 dd일 형식)
  memberNum: number; // 스페이스 멤버 수
}

interface SpaceJoinInfoResponse extends ApiResponse {
  result: SpaceJoinInfo;
}

/**
 * 초대링크를 받은 유저에게 스페이스 정보를 보여주는 API
 * @param spaceId - 유저를 초대할 스페이스의 ID
 * @returns {Promise<SpaceJoinInfoResponse | null>} 스페이스 정보 또는 이미 가입된 유저 메시지, 에러 발생 시 null
 */
export const SpaceJoinInfoApi = async (spaceId: number) => {
  try {
    const response = await client.get(`space/${spaceId}/join`).json<SpaceJoinInfoResponse>();

    if (response.status !== 200) {
      console.warn(response.message);
      return null;
    }

    return response;
  } catch (error) {
    console.error("[SpaceJoinInfoApi error]", error);
    return null;
  }
};
