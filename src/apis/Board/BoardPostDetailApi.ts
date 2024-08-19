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

export interface GetPostCommentResponse {
  code: number;
  status: number;
  message: string;
  result: BoardPostDetail[]; // 거의 동일한 타입이므로 재사용
}

export interface CreatePostCommentResponse {
  code: number;
  status: number;
  message: string;
  result: { commentId: string };
}

/* GET: 게시글 상세 조회 */
export const getPostDetailApi = async (spaceId: number, postId: number) => {
  const requestOptions = createRequestOptionsJSON_AUTH("GET");
  if (!requestOptions) return null;

  const url = `${import.meta.env.VITE_API_BACK_URL}/space/${spaceId}/board/post/${postId}`;
  return await fetchApi<GetPostDetailResponse>(url, requestOptions);
};

/* GET: 댓글 조회 */
export const getPostCommentApi = async (spaceId: number, postId: number) => {
  const requestOptions = createRequestOptionsJSON_AUTH("GET");
  if (!requestOptions) return null;

  const url = `${import.meta.env.VITE_API_BACK_URL}/space/${spaceId}/board/post/${postId}/comment`;
  return await fetchApi<GetPostCommentResponse>(url, requestOptions);
};

/* POST: 댓글 등록 */
export const createPostCommentApi = async (
  spaceId: number,
  postId: number,
  comment: string,
  targetId?: number,
) => {
  let body = {};
  if (targetId !== undefined) {
    body = { content: comment, targetId: targetId || "" };
  } else {
    body = { content: comment };
  }

  const requestOptions = createRequestOptionsJSON_AUTH("POST", JSON.stringify(body));
  if (!requestOptions) return null;

  const url = `${import.meta.env.VITE_API_BACK_URL}/space/${spaceId}/board/post/${postId}/comment`;
  return await fetchApi<CreatePostCommentResponse>(url, requestOptions);
};
