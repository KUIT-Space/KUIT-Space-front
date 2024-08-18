import { createRequestOptionsFORM_AUTH, fetchApi } from "@/apis/_createRequestOptions";

interface SpaceUserJoinResponse {
  code: number;
  status: string;
  message: string;
  result?: string;
  timestamp?: string;
}

/**
 * 초대받은 유저가 입력한 스페이스 프로필 정보를 바탕으로 해당 유저의 스페이스 가입을 처리하는 API
 * @param spaceId - 가입할 스페이스의 ID
 * @param userProfileImg - 유저 프로필 사진 파일 / 인자가 없다면 null, 사진을 없앨 수 있다
 * @param userName - 유저 이름
 * @param userProfileMsg - 유저 프로필 상태 메시지
 * @returns 성공 메시지
 */
export const SpaceUserJoinApi = async (
  spaceId: number,
  userProfileImg: File,
  userName: string,
  userProfileMsg: string,
) => {
  const formData = new FormData();

  formData.append("userProfileImg", userProfileImg);
  formData.append("userName", userName);
  formData.append("userProfileMsg", userProfileMsg);

  const requestOptions = createRequestOptionsFORM_AUTH("POST", formData);

  const url = `${import.meta.env.VITE_API_BACK_URL}/space/${spaceId}/join`;

  return await fetchApi<SpaceUserJoinResponse>(url, requestOptions);
};
