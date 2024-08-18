import { createRequestOptionsJSON_AUTH, fetchApi } from "@/apis/_createRequestOptions";

// 응답 타입 정의
interface UserProfile {
  spaceId: number; // 스페이스 ID
  spaceName: string; // 스페이스 이름
  userName: string; // 해당 스페이스에서의 유저 이름
  userProfileImg: string | null; // 유저 프로필 이미지 URL (없으면 null)
  userAuth: "manager" | "normal"; // 유저 권한 정보 (관리자 또는 일반 멤버)
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

/** 스페이스 전체설정 중 스페이스 프로필 관리 view 를 위한 api
 * @returns UserProfileResponse
 * - 유저의 프로필 리스트를 반환합니다.
 */
export const GetUserProfileApi = async () => {
  const requestOptions = createRequestOptionsJSON_AUTH("GET");
  if (!requestOptions) return null;

  const url = `${import.meta.env.VITE_API_BACK_URL}/user/profile`;

  try {
    const response = await fetchApi<UserProfileResponse>(url, requestOptions);
    return response;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};
