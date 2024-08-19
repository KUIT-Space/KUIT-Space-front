import { createRequestOptionsJSON_AUTH, fetchApi } from "@/apis/_createRequestOptions";

export interface BoardPost {
  spaceId: number;
  userId: number;
  userProfileImg: string;
  userName: string;
  postId: number;
  title: string;
  content: string;
  postImage: string[];
  time: string;
  type: string;
  post_count: number;
  comment_count: number;
  like_count: number;
  isLike: boolean;
}

export interface GetAllPostsResponse {
  code: number;
  status: number;
  message: string;
  result: BoardPost[];
}

export const getAllPosts = async (spaceId: number, filter: string) => {
  const requestOptions = createRequestOptionsJSON_AUTH("GET");
  if (!requestOptions) return null;

  const url = `${import.meta.env.VITE_API_BACK_URL}/space/${spaceId}/board?filter=${filter}`;
  return await fetchApi<GetAllPostsResponse>(url, requestOptions);
};
