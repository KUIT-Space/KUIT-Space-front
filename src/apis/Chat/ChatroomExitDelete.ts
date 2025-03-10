import { ApiResponse, client } from "@/apis/client";

interface ChatRoomExitApiResponse extends ApiResponse {
  result: {
    isSuccess: boolean;
  };
}

/**
 * 채팅방을 나가는 API
 * @param spaceId 스페이스 ID
 * @param chatRoomId 채팅방 ID
 * @returns {Promise<ChatRoomExitApiResponse | null>} 채팅방 나가기 성공 여부 또는 에러 발생 시 null
 */
export const ChatroomExitApi = async (
  spaceId: number,
  chatRoomId: number,
): Promise<ChatRoomExitApiResponse | null> => {
  try {
    const response = await client
      .post(`space/${spaceId}/chat/${chatRoomId}/exit`)
      .json<ChatRoomExitApiResponse>();
    return response;
  } catch (error) {
    console.error("[ChatroomExitApi error]", error);
    return null;
  }
};

interface ChatRoomDeleteApiResponse extends ApiResponse {
  result: {
    isSuccess: boolean;
  };
}

/**
 * 채팅방을 삭제하는 API
 * @param spaceId 스페이스 ID
 * @param chatRoomId 채팅방 ID
 * @returns {Promise<ChatRoomDeleteApiResponse | null>} 채팅방 삭제 성공 여부 또는 에러 발생 시 null
 */
export const ChatroomDeleteApi = async (
  spaceId: number,
  chatRoomId: number,
): Promise<ChatRoomDeleteApiResponse | null> => {
  try {
    const response = await client
      .post(`space/${spaceId}/chat/${chatRoomId}/delete`)
      .json<ChatRoomDeleteApiResponse>();
    return response;
  } catch (error) {
    console.error("[ChatroomDeleteApi error]", error);
    return null;
  }
};
