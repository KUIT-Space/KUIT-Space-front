import { createRequestOptionsJSON_AUTH, fetchApi } from "@/apis/_createRequestOptions";

interface PostLikeOnPostApiResponseType {
  code: number;
  status: number;
  message: string;
  result: string;
}

export const postLikeOnPostApi = async (spaceId: number, postId: number) => {
  const requestOptions = createRequestOptionsJSON_AUTH("POST");

  if (!requestOptions) return null;

  const url = `${import.meta.env.VITE_API_BACK_URL}/space/${spaceId}/board/post/${postId}/like`;
  return await fetchApi<PostLikeOnPostApiResponseType>(url, requestOptions);
};

export const deleteLikeOnPostApi = async (spaceId: number, postId: number) => {
  const requestOptions = createRequestOptionsJSON_AUTH("DELETE");

  if (!requestOptions) return null;

  const url = `${import.meta.env.VITE_API_BACK_URL}/space/${spaceId}/board/post/${postId}/like`;
  return await fetchApi<PostLikeOnPostApiResponseType>(url, requestOptions);
};
