import { createRequestOptionsFORM_AUTH, fetchApi } from "@/apis/_createRequestOptions";

interface CreateBoardPostApiResponseType {
  code: number;
  status: number;
  message: string;
  result: string;
}

interface CreateBoardPostApiRequestType {
  title: string;
  content: string;
  type: string;
  postImages: File[];
}

const createBoardPostFormData = (body: CreateBoardPostApiRequestType): FormData => {
  const formData = new FormData();
  formData.append("title", body.title);
  formData.append("content", body.content);
  formData.append("type", body.type);

  body.postImages.forEach((img) => {
    formData.append("postImages", img);
  });

  return formData;
};

/* POST: 게시글 등록 */
export const CreateBoardPostApi = async (
  spaceId: number,
  title: string,
  content: string,
  type: string,
  postImages: File[],
) => {
  const formData = createBoardPostFormData({ title, content, type, postImages });
  const requestOptions = createRequestOptionsFORM_AUTH("POST", formData);

  if (!requestOptions) return null;

  const url = `${import.meta.env.VITE_API_BACK_URL}/space/${spaceId}/board/post`;
  return await fetchApi<CreateBoardPostApiResponseType>(url, requestOptions);
};
