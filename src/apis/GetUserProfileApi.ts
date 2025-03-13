import { client } from "./client";

// 응답 타입 정의
export interface UserProfile {
  spaceId: number; // 스페이스 ID
  spaceName: string; // 스페이스 이름
  userName: string; // 해당 스페이스에서의 유저 이름
  userProfileImg: string | null; // 유저 프로필 이미지 URL (없으면 null)
  userAuth: "manager" | "normal"; // 유저 권한 정보 (관리자 또는 일반 멤버)
  userId?: number; // 유저 ID
}

interface UserProfileResponse {
  code: number;
  status: string;
  message: string;
  result: {
    userProfileList: UserProfile[];
  };
  timestamp?: string;
}

/**
 * 스페이스 전체설정 중 스페이스 프로필 관리 view를 위한 API
 * @returns {Promise<UserProfileResponse | null>} 유저의 프로필 리스트 정보 또는 에러 발생 시 null
 */
export const GetUserProfileApi = async (): Promise<UserProfileResponse | null> => {
  try {
    return await client.get("user/profile").json<UserProfileResponse>();
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};
