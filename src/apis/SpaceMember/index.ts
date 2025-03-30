import { useSuspenseQuery, UseSuspenseQueryOptions } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiResponse, client } from "../client";

export interface SpaceMemberDetail {
  spaceMemberId: number;
  nickname: string;
  profileImageUrl: string;
  isManager: boolean;
}
export interface ResponseOfAllMembers {
  spaceMemberDetails: SpaceMemberDetail[];
}

const getAllMembers = async (spaceId: number): Promise<ApiResponse<ResponseOfAllMembers>> => {
  return client.get(`space/${spaceId}/all-member`).json();
};

const spaceMemberKeys = {
  all: (spaceId: number) => ["members", spaceId] as const,
};
export const useAllMembersQuery = (
  spaceId: number,
  options?: Partial<
    UseSuspenseQueryOptions<
      ApiResponse<ResponseOfAllMembers>,
      Error,
      ApiResponse<ResponseOfAllMembers>,
      ReturnType<typeof spaceMemberKeys.all>
    >
  >,
) => {
  return useSuspenseQuery({
    queryKey: spaceMemberKeys.all(spaceId),
    queryFn: () => getAllMembers(spaceId),
    ...options,
  });
};
