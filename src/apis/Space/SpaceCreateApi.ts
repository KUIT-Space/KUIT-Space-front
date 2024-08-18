/* POST /space
 * @summary Create a Space
 * @body json이 아닌 form-data로 전송해야 함
 * * spaceName	Text(String)	1~10 자 이내의 문자열
 * * spaceProfileImg	File	nullable / 이미지 파일 확장자 형식을 지키는 이미지 파일
 * @return status OK - success response
 */
import { createRequestOptionsFORM_AUTH, RequestOptions } from "@/apis/_createRequestOptions";

interface CreateSpaceApiResponseType {
  code: number;
  message: string;
  status: string;
  timestamp?: string;
}

interface CreateSpaceApiRequestType {
  spaceName: string;
  spaceProfileImg?: File | null; // 이미지 파일은 선택적
}

const fetchCreateSpaceApi = async (url: string, options: RequestOptions) => {
  const response: CreateSpaceApiResponseType = await fetch(url, options)
    .then((res) => res.json())
    .catch((err) => {
      console.error("[fetch error]", err);
      throw err;
    });

  return response;
};

export const createSpaceApi = async (spaceName: string, spaceProfileImg?: File | null) => {
  const body: CreateSpaceApiRequestType = {
    spaceName: spaceName,
    spaceProfileImg: spaceProfileImg || null,
  };

  const formData = new FormData();
  formData.append("spaceName", body.spaceName);
  if (body.spaceProfileImg) {
    formData.append("spaceProfileImg", body.spaceProfileImg);
  }

  const requestOptions = createRequestOptionsFORM_AUTH("POST", formData);
  const result = requestOptions
    ? await fetchCreateSpaceApi(`${import.meta.env.VITE_API_BACK_URL}/space`, requestOptions)
    : null;

  return result;
};
