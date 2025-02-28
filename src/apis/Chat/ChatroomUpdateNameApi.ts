import { ApiResponse, client } from "@/apis/client";

interface ChatroomNameUpdateApiResponse extends ApiResponse {
  result: {
    isSuccess: boolean;
  };
}

/**
 * 채팅방 이름을 업데이트하는 API
 * @param spaceId 스페이스 ID
 * @param chatRoomId 채팅방 ID
 * @param name 변경할 채팅방 이름
 * @returns {Promise<ChatroomNameUpdateApiResponse | null>} 업데이트 성공 여부 또는 에러 발생 시 null
 */
export const ChatroomUpdateNameApi = async (
  spaceId: number,
  chatRoomId: number,
  name: string,
): Promise<ChatroomNameUpdateApiResponse | null> => {
  try {
    const response = await client
      .post(`space/${spaceId}/chat/${chatRoomId}/setting`, {
        searchParams: { name },
      })
      .json<ChatroomNameUpdateApiResponse>();
    return response;
  } catch (error) {
    console.error("[ChatroomUpdateNameApi error]", error);
    return null;
  }
};
