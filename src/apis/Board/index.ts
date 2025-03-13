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

// Type Definitions
/**
 * Request payload for creating a new board
 */
interface RequestOfCreateBoard {
  spaceId: number;
  discordId: number;
  boardType: string;
  boardName: string;
  webhookUrl: string;
}

/**
 * Response for board creation
 */
interface CreateBoardResponse {
  result: number; // Board ID
}

/**
 * Attachment for post creation
 */
interface AttachmentOfCreate {
  valueOfAttachmentType?: string;
  attachmentUrl: string;
}

/**
 * Request payload for creating a new post
 */
interface RequestOfCreatePost {
  title: string;
  content: string;
  attachments?: AttachmentOfCreate[];
}

/**
 * Response for post creation
 */
interface CreatePostResponse {
  result: number; // Post ID
}

/**
 * Summary information for a post
 */
interface ResponseOfPostSummary {
  postId: number;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  creatorNickname: string;
  postImageUrl: string;
}

/**
 * Response for listing posts in a board
 */
interface ResponseOfReadPostList {
  readPostList: ResponseOfPostSummary[];
}

// API functions and React Query hooks

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

/**
 * React Query mutation hook for creating a board
 * @param spaceId Space ID
 * @returns Mutation function and state
 */
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
