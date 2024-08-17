import { ChatContent } from "@/apis";
import { createRequestOptionsJSON_AUTH, fetchApi } from "@/apis/_createRequestOptions";

export interface Chatroom {
  id: number;
  name: string;
  imgUrl: string;
  lastMsg: ChatContent;
  lastTime: string;
  unreadMsgCount: number;
}

interface ChatroomSearchApiResponse {
  code: number;
  status: number;
  message: string;
  result: { chatRoomList: Chatroom[] };
}

export const chatroomSearchAllApi = async (spaceId: number) => {
  const requestOptions = createRequestOptionsJSON_AUTH("GET");
  if (!requestOptions) return null;

  const url = `${import.meta.env.VITE_API_BACK_URL}/space/${spaceId}/chat/chatroom`;
  return await fetchApi<ChatroomSearchApiResponse>(url, requestOptions);
};
