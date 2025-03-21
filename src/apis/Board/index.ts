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

export interface RequestOfCreateBoard {
  spaceId: number;
  discordId: number;
  boardType: string;
  boardName: string;
  webhookUrl: string;
}

export interface CreateBoardResponse {
  result: number; // Board ID
}

export interface AttachmentOfCreate {
  valueOfAttachmentType?: string;
  attachmentUrl: string;
}

export interface RequestOfCreatePost {
  title: string;
  content: string;
  attachments?: AttachmentOfCreate[];
}

export interface CreatePostResponse {
  result: number; // Post ID
}

export interface ResponseOfPostSummary {
  postId: number;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  creatorNickname: string;
  postImageUrl: string;
}

export interface ResponseOfReadPostList {
  readPostList: ResponseOfPostSummary[];
}

/**
 * Create a new board in a space
 * @param spaceId Space ID
 * @param boardData Board creation data
 * @returns Created board ID
 */
const createBoard = async (
  spaceId: number,
  boardData: Omit<RequestOfCreateBoard, "spaceId">,
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
    mutationFn: (boardData: Omit<RequestOfCreateBoard, "spaceId">) =>
      createBoard(spaceId, boardData),
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
): Promise<ApiResponse<ResponseOfReadPostList>> => {
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
  postData: RequestOfCreatePost,
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
    mutationFn: (postData: RequestOfCreatePost) => createPost(spaceId, boardId, postData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: boardKeys.posts(spaceId, boardId),
      });
    },
  });
};
