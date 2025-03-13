import { ApiResponse, client } from "@/apis/client";

export interface User {
  userId: number;
  userName: string;
  profileImgUrl: string | null;
  userAuth: "manager" | "normal"; //응답이 "local" 인 경우가 있다?
}

interface ChatroomMemberApiResponse extends ApiResponse {
  result: {
    userList: User[];
  };
}

/**
 * 채팅방의 모든 사용자를 조회하는 API
 * @param spaceId 스페이스 ID
 * @param chatRoomId 채팅방 ID
 * @returns {Promise<ChatroomMemberApiResponse | null>} 채팅방 사용자 목록 정보 또는 에러 발생 시 null
 */
export const ChatroomSearchAllUserApi = async (
  spaceId: number,
  chatRoomId: number,
): Promise<ChatroomMemberApiResponse | null> => {
  try {
    const response = await client
      .get(`space/${spaceId}/chat/${chatRoomId}/member`)
      .json<ChatroomMemberApiResponse>();
    return response;
  } catch (error) {
    console.error("[ChatroomSearchAllUserApi error]", error);
    return null;
  }
};

interface ChatroomInviteUserResponse extends ApiResponse {
  result: {
    isSuccess: boolean;
  };
}

/**
 * 채팅방에 사용자를 초대하는 API
 * 주의! memberListParam에 기존 채팅방 포함 user가 들어있으면 false 리턴되고 채팅방 초대가 안됨
 * @param spaceId 스페이스 ID
 * @param chatRoomId 채팅방 ID
 * @param memberListParam 초대할 사용자 ID 목록
 * @returns {Promise<ChatroomInviteUserResponse | null>} 초대 성공 여부 또는 에러 발생 시 null
 */
export const ChatroomInviteUserApi = async (
  spaceId: number,
  chatRoomId: number,
  memberListParam: number[],
): Promise<ChatroomInviteUserResponse | null> => {
  try {
    const response = await client
      .post(`space/${spaceId}/chat/${chatRoomId}/member`, {
        json: { memberList: memberListParam },
      })
      .json<ChatroomInviteUserResponse>();
    return response;
  } catch (error) {
    console.error("[ChatroomInviteUserApi error]", error);
    return null;
  }
};
