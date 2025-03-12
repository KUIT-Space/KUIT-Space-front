import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";

import { BankInfo, ChatUserInfoInSpace } from "@/pages/PayPage/CreateRequestPage";
import { DetailPayData, PayReceiveInfo, PayRequestInfo } from "@/pages/PayPage/PayPage";

import { ApiResponse, client } from "../client";
import { UserInfoInSpace } from "../Space/SpaceSearchAllUserApi";

// Define query keys for Pay API
export const payKeys = {
  all: (spaceId: number) => ["pay", spaceId] as const,
  home: (spaceId: number) => [...payKeys.all(spaceId), "home"] as const,
  requests: (spaceId: number) => [...payKeys.all(spaceId), "requests"] as const,
  receives: (spaceId: number) => [...payKeys.all(spaceId), "receives"] as const,
  detail: (spaceId: number, payRequestId: number) =>
    [...payKeys.all(spaceId), "detail", payRequestId] as const,
  recentAccounts: () => ["pay", "recent-accounts"] as const,
  allMembers: (spaceId: number) => ["space", spaceId, "all-members"] as const,
  chatMembers: (spaceId: number) => ["space", spaceId, "chat-members"] as const,
};

// Type definitions
export interface TargetInfoList {
  targetUserId: number;
  requestAmount: number;
}

interface PayHomeResponse {
  payRequestInfoDtoList: PayRequestInfo[];
  payReceiveInfoDtoList: PayReceiveInfo[];
}

interface PayRequestListResponse {
  payRequestInfoDtoListInComplete: PayRequestInfo[];
  payRequestInfoDtoListComplete: PayRequestInfo[];
}

interface PayReceiveListResponse {
  payReceiveInfoDtoListIncomplete: PayReceiveInfo[];
  payReceiveInfoDtoListComplete: PayReceiveInfo[];
}

interface RecentBankInfoResponse {
  recentPayRequestBankInfoDtoList: BankInfo[];
}

interface AllMembersResponse {
  userInfoInSpaceList: UserInfoInSpace[];
}

interface ChatRoomMemberResponse {
  userList: UserInfoInSpace[];
}

interface ChatRoomListResponse {
  chatRoomList: {
    id: number;
    name: string;
    imgUrl: string;
    lastMsg: string;
    lastTime: string;
    unreadMsgCount: number;
  }[];
}

/**
 * Complete a payment request
 * @param spaceId Space ID
 * @param payRequestTargetId Payment request target ID
 * @returns Success response
 */
export const completePayment = async (
  spaceId: number,
  payRequestTargetId: number,
): Promise<ApiResponse<{ success: boolean }>> => {
  return client
    .post(`space/${spaceId}/pay/complete`, {
      json: { payRequestTargetId },
    })
    .json();
};

export const useCompletePayment = (spaceId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payRequestTargetId: number) => completePayment(spaceId, payRequestTargetId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: payKeys.receives(spaceId),
      });
      queryClient.invalidateQueries({
        queryKey: payKeys.home(spaceId),
      });
    },
  });
};

/**
 * Get payment receive information
 * @param spaceId Space ID
 * @returns Payment receive information
 */
export const getPayReceives = async (
  spaceId: number,
): Promise<ApiResponse<PayReceiveListResponse>> => {
  return client.get(`space/${spaceId}/pay/receive`).json();
};

export const usePayReceivesQuery = (spaceId: number) => {
  return useSuspenseQuery({
    queryKey: payKeys.receives(spaceId),
    queryFn: () => getPayReceives(spaceId),
  });
};

/**
 * Get payment request information
 * @param spaceId Space ID
 * @returns Payment request information
 */
export const getPayRequests = async (
  spaceId: number,
): Promise<ApiResponse<PayRequestListResponse>> => {
  return client.get(`space/${spaceId}/pay/request`).json();
};

export const usePayRequestsQuery = (spaceId: number) => {
  return useSuspenseQuery({
    queryKey: payKeys.requests(spaceId),
    queryFn: () => getPayRequests(spaceId),
  });
};

/**
 * Get payment home information
 * @param spaceId Space ID
 * @returns Payment home information
 */
export const getPayHome = async (spaceId: number): Promise<ApiResponse<PayHomeResponse>> => {
  return client.get(`space/${spaceId}/pay`).json();
};

export const usePayHomeQuery = (spaceId: number) => {
  return useSuspenseQuery({
    queryKey: payKeys.home(spaceId),
    queryFn: () => getPayHome(spaceId),
  });
};

/**
 * Get recent bank account information
 * @returns Recent bank account information
 */
export const getRecentAccounts = async (): Promise<ApiResponse<RecentBankInfoResponse>> => {
  return client.get(`space/pay/recent-bank-info`).json();
};

export const useRecentAccountsQuery = () => {
  return useSuspenseQuery({
    queryKey: payKeys.recentAccounts(),
    queryFn: () => getRecentAccounts(),
  });
};

/**
 * Get payment detail information
 * @param spaceId Space ID
 * @param payRequestId Payment request ID
 * @returns Payment detail information
 */
export const getPayDetail = async (
  spaceId: number,
  payRequestId: number,
): Promise<ApiResponse<DetailPayData>> => {
  return client.get(`space/${spaceId}/pay/${payRequestId}`).json();
};

export const usePayDetailQuery = (spaceId: number, payRequestId: number) => {
  return useSuspenseQuery({
    queryKey: payKeys.detail(spaceId, payRequestId),
    queryFn: () => getPayDetail(spaceId, payRequestId),
  });
};

/**
 * Get all members in a space
 * @param spaceId Space ID
 * @returns All members in the space
 */
export const getAllMembers = async (spaceId: number): Promise<ApiResponse<AllMembersResponse>> => {
  return client.get(`space/${spaceId}/all-member`).json();
};

export const useAllMembersQuery = (spaceId: number) => {
  return useSuspenseQuery({
    queryKey: payKeys.allMembers(spaceId),
    queryFn: () => getAllMembers(spaceId),
  });
};

/**
 * Get chat room members
 * @param spaceId Space ID
 * @param chatRoomId Chat room ID
 * @returns Chat room members
 */
export const getChatRoomMembers = async (
  spaceId: number,
  chatRoomId: number,
): Promise<ApiResponse<ChatRoomMemberResponse>> => {
  return client.get(`space/${spaceId}/chat/${chatRoomId}/member`).json();
};

/**
 * Get all chat rooms and their members
 * @param spaceId Space ID
 * @returns All chat rooms and their members
 */
export const getAllChatRooms = async (
  spaceId: number,
): Promise<ApiResponse<ChatRoomListResponse>> => {
  return client.get(`space/${spaceId}/chat/chatroom`).json();
};

export const useAllChatRoomsWithMembersQuery = (spaceId: number) => {
  return useSuspenseQuery({
    queryKey: payKeys.chatMembers(spaceId),
    queryFn: async () => {
      const chatRoomsResponse = await getAllChatRooms(spaceId);
      const chatRooms = chatRoomsResponse.result?.chatRoomList || [];

      const chatRoomsWithMembers: ChatUserInfoInSpace[] = [];

      // Fetch members for each chat room
      await Promise.all(
        chatRooms.map(async (room) => {
          const membersResponse = await getChatRoomMembers(spaceId, room.id);
          const members = membersResponse.result?.userList || [];

          chatRoomsWithMembers.push({
            chatRoomId: room.id,
            chatRoomName: room.name,
            userList: members,
            imgUrl: room.imgUrl,
          });
        }),
      );

      return { chatRooms: chatRoomsWithMembers };
    },
  });
};

/**
 * Create a payment request
 * @param spaceId Space ID
 * @param totalAmount Total amount
 * @param bankName Bank name
 * @param bankAccountNum Bank account number
 * @param targetInfoList Target information list
 * @returns Created payment request ID
 */
export const createPayRequest = async (
  spaceId: number,
  totalAmount: number,
  bankName: string,
  bankAccountNum: string,
  targetInfoList: TargetInfoList[],
): Promise<ApiResponse<{ payRequestId: number }>> => {
  return client
    .post(`space/${spaceId}/pay`, {
      json: {
        totalAmount,
        bankName,
        bankAccountNum,
        targetInfoList,
      },
    })
    .json();
};

export const useCreatePayRequest = (spaceId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: {
      totalAmount: number;
      bankName: string;
      bankAccountNum: string;
      targetInfoList: TargetInfoList[];
    }) =>
      createPayRequest(
        spaceId,
        params.totalAmount,
        params.bankName,
        params.bankAccountNum,
        params.targetInfoList,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: payKeys.requests(spaceId),
      });
      queryClient.invalidateQueries({
        queryKey: payKeys.home(spaceId),
      });
    },
  });
};
