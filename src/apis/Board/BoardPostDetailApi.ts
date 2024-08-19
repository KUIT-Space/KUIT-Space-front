import { createRequestOptionsJSON_AUTH, fetchApi } from "@/apis/_createRequestOptions";

export interface BoardPostDetail {
  spaceId: number;
  userId: number;
  userProfileImg: string;
  userName: string;
  postId: number;
  title: string;
  content: string;
  postImage: string[];
  postComments: string[];
  time: string;
  type: string;
  postCount: number;
  commentCount: number;
  likeCount: number;
  like: boolean;
}

export interface GetPostDetailResponse {
  code: number;
  status: number;
  message: string;
  result: BoardPostDetail;
}

export const getPostDetailApi = async (spaceId: number, postId: number) => {
  const requestOptions = createRequestOptionsJSON_AUTH("GET");
  if (!requestOptions) return null;

  const url = `${import.meta.env.VITE_API_BACK_URL}/space/${spaceId}/board/post/${postId}`;
  return await fetchApi<GetPostDetailResponse>(url, requestOptions);
};
