/* POST /space
 * @summary Create a Space
 * @body json이 아닌 form-data로 전송해야 함
 * * spaceName	Text(String)	1~10 자 이내의 문자열
 * * spaceProfileImg	File	nullable / 이미지 파일 확장자 형식을 지키는 이미지 파일
 * @return status OK - success response
 */
import { ApiResponse, client } from "@/apis/client";

interface CreateSpaceApiResponseType extends ApiResponse {
  result: {
    spaceId: number;
  };
}

interface CreateSpaceApiRequestType {
  spaceName: string;
  spaceProfileImg?: File | null; // 이미지 파일은 선택적
}

/**
 * 새로운 스페이스를 생성하는 API
 * @param spaceName - 생성할 스페이스 이름
 * @param spaceProfileImg - 스페이스 프로필 이미지 (선택적)
 * @returns {Promise<CreateSpaceApiResponseType | null>} 생성된 스페이스 정보를 포함한 응답 또는 에러 발생 시 null
 */
export const createSpaceApi = async (spaceName: string, spaceProfileImg?: File | null) => {
  const formData = new FormData();
  formData.append("spaceName", spaceName);
  if (spaceProfileImg) formData.append("spaceProfileImg", spaceProfileImg);

  try {
    const response = await client
      .post("space", {
        body: formData,
      })
      .json<CreateSpaceApiResponseType>();

    if (response.status !== 200) {
      console.warn(response.message);
      return null;
    }

    return response;
  } catch (error) {
    console.error("[createSpaceApi error]", error);
    throw error;
  }
};
