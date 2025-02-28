import { ApiResponse, client } from "@/apis/client";

interface SpaceUserJoinResult {
  message?: string;
}

interface SpaceUserJoinResponse extends ApiResponse {
  result?: SpaceUserJoinResult;
}

/**
 * 초대받은 유저가 입력한 스페이스 프로필 정보를 바탕으로 해당 유저의 스페이스 가입을 처리하는 API
 * @param spaceId - 가입할 스페이스의 ID
 * @param userProfileImg - 유저 프로필 사진 파일 / 인자가 없다면 null, 사진을 없앨 수 있다
 * @param userName - 유저 이름
 * @param userProfileMsg - 유저 프로필 상태 메시지
 * @returns SpaceUserJoinResponse | null - 성공 메시지 또는 null
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

  try {
    const response = await client
      .post(`space/${spaceId}/join`, {
        body: formData,
      })
      .json<SpaceUserJoinResponse>();

    if (response.status !== 200) {
      console.warn(response.message);
      return null;
    }

    return response;
  } catch (error) {
    console.error("[SpaceUserJoinApi error]", error);
    return null;
  }
};
