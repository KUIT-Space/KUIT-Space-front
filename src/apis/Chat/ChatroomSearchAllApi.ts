import { ChatContent } from "@/apis";
import { ApiResponse, client } from "@/apis/client";

export interface Chatroom {
  id: number;
  name: string;
  imgUrl: string;
  lastMsg: ChatContent;
  lastTime: string;
  unreadMsgCount: number;
}

interface ChatroomSearchApiResponse extends ApiResponse {
  result: {
    chatRoomList: Chatroom[];
  };
}

/**
 * 채팅방 목록을 조회하는 API
 * @param spaceId 스페이스 ID
 * @returns {Promise<ChatroomSearchApiResponse | null>} 채팅방 목록 정보 또는 에러 발생 시 null
 */
export const chatroomSearchAllApi = async (
  spaceId: number,
): Promise<ChatroomSearchApiResponse | null> => {
  try {
    const response = await client
      .get(`space/${spaceId}/chat/chatroom`)
      .json<ChatroomSearchApiResponse>();
    return response;
  } catch (error) {
    console.error("[chatroomSearchAllApi error]", error);
    return null;
  }
};
