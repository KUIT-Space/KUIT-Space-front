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

// Type Definitions will go here

// API functions and React Query hooks will go here
