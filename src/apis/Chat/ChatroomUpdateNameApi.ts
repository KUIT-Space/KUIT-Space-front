import { createRequestOptionsJSON_AUTH, fetchApi } from "@/apis/_createRequestOptions";

interface ChatroomNameUpdateApiResponse {
  code: number;
  status: string;
  message: string;
  result: { isSuccess: boolean };
}

export const ChatroomUpdateNameApi = async (spaceId: number, chatRoomId: number, name: string) => {
  const requestOptions = createRequestOptionsJSON_AUTH("POST");
  if (!requestOptions) return null;

  const url = `${import.meta.env.VITE_API_BACK_URL}/space/${spaceId}/chat/${chatRoomId}/setting?name=${name}`;

  return await fetchApi<ChatroomNameUpdateApiResponse>(url, requestOptions);
};
