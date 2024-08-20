import { createRequestOptionsJSON_AUTH, fetchApi } from "@/apis/_createRequestOptions";

interface PostLikeOnPostApiResponseType {
  code: number;
  status: string;
  message: string;
  result: string;
}

/* POST: 좋아요 등록 */
export const postLikeOnPostApi = async (spaceId: number, postId: number) => {
  const requestOptions = createRequestOptionsJSON_AUTH("POST");

  if (!requestOptions) return null;

  const url = `${import.meta.env.VITE_API_BACK_URL}/space/${spaceId}/board/post/${postId}/like`;
  return await fetchApi<PostLikeOnPostApiResponseType>(url, requestOptions);
};

/* DELETE: 좋아요 삭제 */
export const deleteLikeOnPostApi = async (spaceId: number, postId: number) => {
  const requestOptions = createRequestOptionsJSON_AUTH("DELETE");

  if (!requestOptions) return null;

  const url = `${import.meta.env.VITE_API_BACK_URL}/space/${spaceId}/board/post/${postId}/like`;
  return await fetchApi<PostLikeOnPostApiResponseType>(url, requestOptions);
};
