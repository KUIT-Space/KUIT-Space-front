import { User } from "@/apis/Chat/ChatroomSearchAllUserApi";
import { ApiResponse, client } from "@/apis/client";

// 인터페이스 정의
export interface UserInfoInSpace extends User {
  userId: number;
  userName: string;
  profileImgUrl: string | null;
  userAuth: "manager" | "normal";
}

interface SpaceSearchAllUserApiResponseType extends ApiResponse {
  result: {
    userInfoInSpaceList: UserInfoInSpace[];
  };
}

/**
 * 스페이스 내 모든 사용자 정보를 조회하는 API
 * @param spaceId - 조회할 스페이스 ID
 * @returns {Promise<SpaceSearchAllUserApiResponseType | null>} 스페이스 내 사용자 목록을 포함한 응답 또는 에러 발생 시 null
 */
export const spaceSearchAllUserApi = async (spaceId: number) => {
  try {
    const response = await client
      .get(`space/${spaceId}/all-member`)
      .json<SpaceSearchAllUserApiResponseType>();

    if (response.status !== 200) {
      console.warn(response.message);
      return null;
    }

    return response;
  } catch (error) {
    console.error("[spaceSearchAllUserApi error]", error);
    return null;
  }
};
