import { UseSuspenseQueryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { ApiResponse, client } from "../client";

export interface NoticeDetail {
  title: string;
  timePassed: string;
  postId: number;
}
export interface SubscriptionsDetail {
  boardId: number;
  boardName: string;
  boardTitle: string;
  tagName: string;
}
export interface ResponseOfHome {
  spaceName: string;
  memberCnt: number;
  img: string;
  notices: NoticeDetail[];
  subscriptions: SubscriptionsDetail[];
}

const spaceHomeKeys = {
  home: (spaceId: number) => ["home", spaceId] as const,
};

const getHome = async (spaceId: number): Promise<ApiResponse<ResponseOfHome>> => {
  return client.get(`space/${spaceId}/home`).json();
};

export const useHomeQuery = (
  spaceId: number,
  options?: Partial<
    UseSuspenseQueryOptions<
      ApiResponse<ResponseOfHome>,
      Error,
      ApiResponse<ResponseOfHome>,
      ReturnType<typeof spaceHomeKeys.home>
    >
  >,
) => {
  return useSuspenseQuery({
    queryKey: spaceHomeKeys.home(spaceId),
    queryFn: () => getHome(spaceId),
    gcTime: 30 * 1000,
    refetchInterval: 30 * 1000,
    ...options,
  });
};
