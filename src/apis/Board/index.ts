import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";

import { ApiResponse, client } from "../client";

export const boardKeys = {
  all: (spaceId: number) => ["boards", spaceId] as const,
  lists: (spaceId: number) => [...boardKeys.all(spaceId), "list"] as const,
  list: (spaceId: number, filters: string) => [...boardKeys.lists(spaceId), { filters }] as const,
  details: (spaceId: number) => [...boardKeys.all(spaceId), "detail"] as const,
  detail: (spaceId: number, boardId: number) => [...boardKeys.details(spaceId), boardId] as const,
  posts: (spaceId: number, boardId: number) =>
    [...boardKeys.detail(spaceId, boardId), "posts"] as const,
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
    queryKey: boardKeys.posts(spaceId, boardId),
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
        queryKey: boardKeys.posts(spaceId, boardId),
      });
    },
  });
};
