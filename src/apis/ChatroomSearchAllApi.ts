import { createRequestOptionsJSON_AUTH, RequestOptions } from "@/apis/_createRequestOptions";

interface Chatroom {
  id: number;
  name: string;
  imgUrl: string;
  lastMsg: string;
  lastTime: string;
  unreadMsgCount: number;
}

interface ChatroomSearchApiResponse {
  code: number;
  status: number;
  message: string;
  result: Chatroom[];
}

const fetchChatRoomApi = async (url: string, options: RequestOptions) => {
  const response: ChatroomSearchApiResponse = await fetch(url, options)
    .then((res) => res.json())
    .catch((err) => {
      console.error("[fetch error]", err);
      throw err;
    });

  return response.result;
};

export const chatroomSearchAllApi = async (spaceId: number) => {
  const requestOptions = createRequestOptionsJSON_AUTH("GET");
  const result = requestOptions
    ? await fetchChatRoomApi(
        `${import.meta.env.VITE_API_BACK_URL}/space/${spaceId}/chat/chatroom`,
        requestOptions,
      )
    : null;

  return result;
};
