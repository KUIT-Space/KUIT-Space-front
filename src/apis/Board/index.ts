import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";

import { ApiResponse, client, SuccessResponse } from "../client";

export const boardKeys = {
  all: (spaceId: number) => ["boards", spaceId] as const,
  lists: (spaceId: number) => [...boardKeys.all(spaceId), "list"] as const,
  list: (spaceId: number, filters: string) => [...boardKeys.lists(spaceId), { filters }] as const,
  details: (spaceId: number) => [...boardKeys.all(spaceId), "detail"] as const,
  detail: (spaceId: number, boardId: number) => [...boardKeys.details(spaceId), boardId] as const,
  posts: (spaceId: number, boardId: number) =>
    [...boardKeys.detail(spaceId, boardId), "posts"] as const,
};

export const postKeys = {
  all: (spaceId: number, boardId: number) => ["posts", spaceId, boardId] as const,
  lists: (spaceId: number, boardId: number) => [...postKeys.all(spaceId, boardId), "list"] as const,
  list: (spaceId: number, boardId: number, filters: string) =>
    [...postKeys.lists(spaceId, boardId), { filters }] as const,
  details: (spaceId: number, boardId: number) =>
    [...postKeys.all(spaceId, boardId), "detail"] as const,
  detail: (spaceId: number, boardId: number, postId: number) =>
    [...postKeys.details(spaceId, boardId), postId] as const,
};

// Board-related interfaces
export interface BoardInfo {
  boardId: number;
  boardName: string;
  tagId: number;
  tagName: string;
  isSubscribed: boolean;
}

export interface CreateBoardRequest {
  boardName: string;
  boardType: string;
  discordId: number;
  webhookUrl: string;
}

export interface SubscribeBoardRequest {
  boardId: number;
  tagId?: number;
}

export interface ReadBoardListResponse {
  readBoardList: BoardInfo[];
}

export type CreateBoardResponse = number; // Board ID

// Post-related interfaces
export interface PostSummary {
  postId: number;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  creatorNickname: string;
  postImageUrl: string;
}

export interface PostDetail {
  creatorName: string;
  creatorProfileImageUrl: string;
  createdAt: string;
  lastModifiedAt: string;
  title: string;
  content: string;
  attachmentUrls: string[];
  likeCount: number;
  isLiked: boolean;
  responseOfCommentDetails: CommentDetail[];
}

export interface CreatePostRequest {
  title: string;
  content: string;
  isAnonymous: boolean;
  tagIds?: number[];
  attachments?: File[];
}

export interface ReadPostListResponse {
  readPostList: PostSummary[];
}

export type CreatePostResponse = number; // Post ID

// Comment-related interfaces
export interface CommentDetail {
  creatorName: string;
  creatorProfileImageUrl: string;
  isPostOwner: boolean;
  content: string;
  createdAt: string;
  lastModifiedAt: string;
  likeCount: number;
  isLiked: boolean;
  isActiveComment: boolean;
}

export interface CreateCommentRequest {
  content: string;
}

export interface UpdateCommentRequest {
  content: string;
}

export type CreateCommentResponse = number; // Comment ID

// Like-related interfaces
export interface LikeStateRequest {
  changeTo: boolean;
}

// =============== Board API ===============

/**
 * Create a new board in a space
 * @param spaceId Space ID
 * @param boardData Board creation data
 * @returns Created board ID
 */
const createBoard = async (
  spaceId: number,
  boardData: Omit<CreateBoardRequest, "spaceId">,
): Promise<ApiResponse<CreateBoardResponse>> => {
  return client
    .post(`space/${spaceId}/board/create`, {
      json: {
        spaceId,
        ...boardData,
      },
    })
    .json();
};

export const useCreateBoard = (spaceId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (boardData: Omit<CreateBoardRequest, "spaceId">) => createBoard(spaceId, boardData),
    onSuccess: () => {
      // Invalidate boards list query to refresh data
      queryClient.invalidateQueries({
        queryKey: boardKeys.lists(spaceId),
      });
    },
  });
};

/**
 * Get list of boards in a space
 * @param spaceId Space ID
 * @returns List of boards
 */
const getBoardList = async (spaceId: number): Promise<ApiResponse<ReadBoardListResponse>> => {
  return client.get(`space/${spaceId}/board/list`).json();
};

export const useBoardListQuery = (spaceId: number) => {
  return useSuspenseQuery({
    queryKey: boardKeys.lists(spaceId),
    queryFn: () => getBoardList(spaceId),
  });
};

/**
 * Subscribe to a board
 * @param spaceId Space ID
 * @param data Subscription data
 * @returns Success response
 */
const subscribeBoard = async (
  spaceId: number,
  data: SubscribeBoardRequest,
): Promise<ApiResponse<SuccessResponse>> => {
  return client.post(`space/${spaceId}/board/subscribe`, { json: data }).json();
};

export const useSubscribeBoard = (spaceId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SubscribeBoardRequest) => subscribeBoard(spaceId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: boardKeys.lists(spaceId),
      });
    },
  });
};

/**
 * Unsubscribe from a board
 * @param spaceId Space ID
 * @param data Unsubscription data
 * @returns Success response
 */
const unsubscribeBoard = async (
  spaceId: number,
  data: SubscribeBoardRequest,
): Promise<ApiResponse<SuccessResponse>> => {
  return client.post(`space/${spaceId}/board/unsubscribe`, { json: data }).json();
};

export const useUnsubscribeBoard = (spaceId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SubscribeBoardRequest) => unsubscribeBoard(spaceId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: boardKeys.lists(spaceId),
      });
    },
  });
};

// =============== Post API ===============

/**
 * Get posts from a board
 * @param spaceId Space ID
 * @param boardId Board ID
 * @returns List of posts
 */
const getPosts = async (
  spaceId: number,
  boardId: number,
): Promise<ApiResponse<ReadPostListResponse>> => {
  return client.get(`space/${spaceId}/board/${boardId}/post`).json();
};

export const usePostsQuery = (spaceId: number, boardId: number) => {
  return useSuspenseQuery({
    queryKey: postKeys.lists(spaceId, boardId),
    queryFn: () => getPosts(spaceId, boardId),
  });
};

/**
 * Create a new post in a board
 * @param spaceId Space ID
 * @param boardId Board ID
 * @param postData Post creation data
 * @returns Created post ID
 */
const createPost = async (
  spaceId: number,
  boardId: number,
  postData: CreatePostRequest,
): Promise<ApiResponse<CreatePostResponse>> => {
  return client
    .post(`space/${spaceId}/board/${boardId}/post`, {
      json: postData,
    })
    .json();
};

export const useCreatePost = (spaceId: number, boardId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postData: CreatePostRequest) => createPost(spaceId, boardId, postData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: postKeys.lists(spaceId, boardId),
      });
    },
  });
};

/**
 * Get details of a specific post
 * @param spaceId Space ID
 * @param boardId Board ID
 * @param postId Post ID
 * @returns Post details
 */
const getPostDetail = async (
  spaceId: number,
  boardId: number,
  postId: number,
): Promise<ApiResponse<PostDetail>> => {
  return client.get(`space/${spaceId}/board/${boardId}/post/${postId}`).json();
};

export const usePostDetailQuery = (spaceId: number, boardId: number, postId: number) => {
  return useSuspenseQuery({
    queryKey: postKeys.detail(spaceId, boardId, postId),
    queryFn: () => getPostDetail(spaceId, boardId, postId),
  });
};

/**
 * Update a post
 * @param spaceId Space ID
 * @param boardId Board ID
 * @param postId Post ID
 * @param data Updated post data
 * @returns Success response
 */
const updatePost = async (
  spaceId: number,
  boardId: number,
  postId: number,
  data: CreatePostRequest,
): Promise<ApiResponse<SuccessResponse>> => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("content", data.content);
  formData.append("isAnonymous", data.isAnonymous.toString());
  if (data.tagIds) {
    data.tagIds.forEach((tagId) => formData.append("tagIds", tagId.toString()));
  }
  if (data.attachments) {
    data.attachments.forEach((file) => formData.append("attachments", file));
  }

  return client
    .put(`space/${spaceId}/board/${boardId}/post/${postId}`, {
      body: formData,
    })
    .json();
};

export const useUpdatePost = (spaceId: number, boardId: number, postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePostRequest) => updatePost(spaceId, boardId, postId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: postKeys.lists(spaceId, boardId),
      });
      queryClient.invalidateQueries({
        queryKey: postKeys.detail(spaceId, boardId, postId),
      });
    },
  });
};

/**
 * Delete a post
 * @param spaceId Space ID
 * @param boardId Board ID
 * @param postId Post ID
 * @returns Success response
 */
const deletePost = async (
  spaceId: number,
  boardId: number,
  postId: number,
): Promise<ApiResponse<SuccessResponse>> => {
  return client.delete(`space/${spaceId}/board/${boardId}/post/${postId}`).json();
};

export const useDeletePost = (spaceId: number, boardId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) => deletePost(spaceId, boardId, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: postKeys.lists(spaceId, boardId),
      });
    },
  });
};

// =============== Comment API ===============

/**
 * Create a comment on a post
 * @param spaceId Space ID
 * @param boardId Board ID
 * @param postId Post ID
 * @param data Comment data
 * @returns Created comment ID
 */
const createComment = async (
  spaceId: number,
  boardId: number,
  postId: number,
  data: CreateCommentRequest,
): Promise<ApiResponse<CreateCommentResponse>> => {
  return client
    .post(`space/${spaceId}/board/${boardId}/post/${postId}/comment`, {
      json: data,
    })
    .json();
};

export const useCreateComment = (spaceId: number, boardId: number, postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCommentRequest) => createComment(spaceId, boardId, postId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: boardKeys.detail(spaceId, boardId),
      });
    },
  });
};

/**
 * Update a comment
 * @param spaceId Space ID
 * @param boardId Board ID
 * @param postId Post ID
 * @param commentId Comment ID
 * @param data Updated comment data
 * @returns Success response
 */
const updateComment = async (
  spaceId: number,
  boardId: number,
  postId: number,
  commentId: number,
  data: UpdateCommentRequest,
): Promise<ApiResponse<SuccessResponse>> => {
  return client
    .put(`space/${spaceId}/board/${boardId}/post/${postId}/comment/${commentId}`, {
      json: data,
    })
    .json();
};

export const useUpdateComment = (
  spaceId: number,
  boardId: number,
  postId: number,
  commentId: number,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateCommentRequest) =>
      updateComment(spaceId, boardId, postId, commentId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: boardKeys.detail(spaceId, boardId),
      });
    },
  });
};

/**
 * Delete a comment
 * @param spaceId Space ID
 * @param boardId Board ID
 * @param postId Post ID
 * @param commentId Comment ID
 * @returns Success response
 */
const deleteComment = async (
  spaceId: number,
  boardId: number,
  postId: number,
  commentId: number,
): Promise<ApiResponse<SuccessResponse>> => {
  return client
    .delete(`space/${spaceId}/board/${boardId}/post/${postId}/comment/${commentId}`)
    .json();
};

export const useDeleteComment = (spaceId: number, boardId: number, postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: number) => deleteComment(spaceId, boardId, postId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: boardKeys.detail(spaceId, boardId),
      });
    },
  });
};

// =============== Like API ===============

/**
 * Toggle like state on a target (post or comment)
 * @param spaceId Space ID
 * @param boardId Board ID
 * @param targetId Target ID (post or comment)
 * @param data Like state data
 * @returns Success response
 */
const toggleLike = async (
  spaceId: number,
  boardId: number,
  targetId: number,
  data: LikeStateRequest,
): Promise<ApiResponse<SuccessResponse>> => {
  return client
    .patch(`space/${spaceId}/board/${boardId}/target/${targetId}/like-state`, {
      json: data,
    })
    .json();
};

export const useToggleLike = (spaceId: number, boardId: number, targetId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LikeStateRequest) => toggleLike(spaceId, boardId, targetId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: boardKeys.detail(spaceId, boardId),
      });
    },
  });
};
