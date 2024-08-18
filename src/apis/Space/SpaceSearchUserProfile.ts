import { createRequestOptionsJSON_AUTH, fetchApi } from "@/apis/_createRequestOptions";

interface UserProfileResult {
  userProfileImg: string; // 프로필 이미지 URL
  userName: string; // 유저 이름
  userAuth: "manager" | "normal"; // 유저 권한 (예: manager, normal)
  userProfileMsg: string; // 유저 상태 메시지
}

interface UserProfileResponse {
  code: number;
  status: string;
  message: string;
  result: UserProfileResult;
}

/** 스페이스내의 유저 프로필 view를 조회하는 api
 * @param spaceId
 * @param userId
 * → userId : 스페이스 멤버 목록 → 스페이스 내의 특정 유저의 프로필 정보 조회를 위해 필요한 request param 입니다!
 * 만약 본인의 프로필 정보 조회일 경우 userId는 빼놓고 request를 구성해주시면 됩니다
 * @returns if null, 재로그인 필요
 */
export const SpaceSearchUserProfile = async (spaceId: number, userId?: number) => {
  const requestOptions = createRequestOptionsJSON_AUTH("GET");
  if (!requestOptions) return null;

  let url = `${import.meta.env.VITE_API_BACK_URL}/space/${spaceId}/member-profile`;

  // userId가 제공된 경우 특정 유저의 프로필을 조회
  if (userId) {
    url += `?userId=${userId}`;
  }

  return await fetchApi<UserProfileResponse>(url, requestOptions);
};
