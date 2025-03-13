import { ApiResponse, client } from "@/apis/client";

export interface UserProfileResult {
  userProfileImg: string; // 프로필 이미지 URL
  userName: string; // 유저 이름
  userAuth: "manager" | "normal"; // 유저 권한 (예: manager, normal)
  userProfileMsg: string; // 유저 상태 메시지
  userId?: number;
}

interface UserProfileResponse extends ApiResponse {
  result: UserProfileResult;
}

/**
 * 스페이스내의 유저 프로필 view를 조회하는 API
 * @param spaceId - 조회할 스페이스 ID
 * @param userId - 조회할 유저 ID (선택적)
 * → userId : 스페이스 멤버 목록 → 스페이스 내의 특정 유저의 프로필 정보 조회를 위해 필요한 request param 입니다!
 * 만약 본인의 프로필 정보 조회일 경우 userId는 빼놓고 request를 구성해주시면 됩니다
 * @returns {Promise<UserProfileResponse | null>} 유저 프로필 정보를 포함한 응답 또는 에러 발생 시 null
 */
export const SpaceSearchUserProfile = async (spaceId: number, userId?: number) => {
  try {
    const searchParams = userId ? { userId: userId.toString() } : "";

    const response = await client
      .get(`space/${spaceId}/member-profile`, { searchParams })
      .json<UserProfileResponse>();

    if (response.status !== 200) {
      console.warn(response.message);
      return null;
    }

    return response;
  } catch (error) {
    console.error("[SpaceSearchUserProfile error]", error);
    return null;
  }
};
