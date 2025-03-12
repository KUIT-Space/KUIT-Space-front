import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";

import { BankInfo, ChatUserInfoInSpace } from "@/pages/PayPage/CreateRequestPage";
import { DetailPayData, PayReceiveInfo, PayRequestInfo } from "@/pages/PayPage/PayPage";

import { ApiResponse, client } from "../client";
import { UserInfoInSpace } from "../Space/SpaceSearchAllUserApi";

export const payKeys = {
  all: (spaceId: number) => ["pay", spaceId] as const,
  home: (spaceId: number) => [...payKeys.all(spaceId), "home"] as const,
  requests: (spaceId: number) => [...payKeys.all(spaceId), "requests"] as const,
  receives: (spaceId: number) => [...payKeys.all(spaceId), "receives"] as const,
  detail: (spaceId: number, payRequestId: number) =>
    [...payKeys.all(spaceId), "detail", payRequestId] as const,
  recentAccounts: (spaceId: number) => [...payKeys.all(spaceId), "bank"] as const,
  allMembers: (spaceId: number) => ["space", spaceId, "all-members"] as const,
  chatMembers: (spaceId: number) => ["space", spaceId, "chat-members"] as const,
};

export interface TargetInfoList {
  targetMemberId: number;
  requestedAmount: number;
}
export interface CreatePayRequest {
  totalAmount: number;
  bankName: string;
  bankAccountNum: string;
  targets: TargetInfoList[];
  valueOfPayType?: string;
}

interface ResponseOfPayRequestInfo {
  payRequestId: number;
  totalAmount: number;
  receivedAmount: number;
  totalTargetNum: number;
  sendCompleteTargetNum: number;
}

interface ResponseOfRequestedPayInfo {
  payRequestTargetId: number;
  payCreatorName: string;
  payCreatorProfileImageUrl: string;
  requestedAmount: number;
  bankName: string;
  bankAccountNum: string;
}

interface PayRequestInfoInHome {
  payRequestId: number;
  totalAmount: number;
  receivedAmount: number;
  totalTargetNum: number;
  sendCompleteTargetNum: number;
}

interface RequestedPayInfoInHome {
  payRequestTargetId: number;
  payCreatorName: string;
  payCreatorProfileImgUrl: string;
  requestedAmount: number;
}

interface PayRequestListResponse {
  inCompletePayRequestList: ResponseOfPayRequestInfo[];
  completePayRequestList: ResponseOfPayRequestInfo[];
}

interface PayReceiveListResponse {
  inCompleteRequestedPayList: ResponseOfRequestedPayInfo[];
  completeRequestedPayList: ResponseOfRequestedPayInfo[];
}

interface PayHomeResponse {
  requestInfoInHome: PayRequestInfoInHome[];
  requestedPayInfoInHome: RequestedPayInfoInHome[];
}

interface RecentBankInfoResponse {
  bankInfos: BankInfo[];
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
  return client.patch(`space/${spaceId}/pay/${payRequestTargetId}/complete`).json();
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
  return client.get(`space/${spaceId}/pay/requested`).json();
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
 * @param spaceId Space ID
 * @returns Recent bank account information
 */
export const getRecentAccounts = async (
  spaceId: number,
): Promise<ApiResponse<RecentBankInfoResponse>> => {
  return client.get(`space/${spaceId}/pay/bank`).json();
};

export const useRecentAccountsQuery = (spaceId: number) => {
  return useSuspenseQuery({
    queryKey: payKeys.recentAccounts(spaceId),
    queryFn: () => getRecentAccounts(spaceId),
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
 * Delete a payment request
 * @param spaceId Space ID
 * @param payRequestId Payment request ID
 * @returns Success response
 */
export const deletePayRequest = async (
  spaceId: number,
  payRequestId: number,
): Promise<ApiResponse<{ success: boolean }>> => {
  return client.delete(`space/${spaceId}/pay/${payRequestId}`).json();
};

export const useDeletePayRequest = (spaceId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payRequestId: number) => deletePayRequest(spaceId, payRequestId),
    onSuccess: (_, payRequestId) => {
      queryClient.invalidateQueries({
        queryKey: payKeys.requests(spaceId),
      });
      queryClient.invalidateQueries({
        queryKey: payKeys.home(spaceId),
      });
      queryClient.invalidateQueries({
        queryKey: payKeys.detail(spaceId, payRequestId),
      });
    },
  });
};

/**
 * Create a payment request
 * @param spaceId Space ID
 * @param payRequest Payment request data
 * @returns Created payment request ID
 */
export const createPayRequest = async (
  spaceId: number,
  payRequest: CreatePayRequest,
): Promise<ApiResponse<{ payRequestId: number }>> => {
  return client
    .post(`space/${spaceId}/pay/create`, {
      json: payRequest,
    })
    .json();
};

export const useCreatePayRequest = (spaceId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payRequest: CreatePayRequest) => createPayRequest(spaceId, payRequest),
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

      await Promise.all(
        chatRooms.map(async (chatRoom) => {
          const membersResponse = await getChatRoomMembers(spaceId, chatRoom.id);
          const members = membersResponse.result?.userList || [];

          chatRoomsWithMembers.push({
            chatRoomId: chatRoom.id,
            chatRoomName: chatRoom.name,
            userList: members,
            imgUrl: chatRoom.imgUrl,
          });
        }),
      );

      return { chatRooms: chatRoomsWithMembers };
    },
  });
};
