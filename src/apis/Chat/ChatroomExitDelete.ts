import { createRequestOptionsJSON_AUTH, fetchApi } from "@/apis/_createRequestOptions";

interface ChatRoomExitApiResponse {
  code: number;
  status: number;
  message: string;
  result: {
    isSuccess: boolean;
  };
}

export const ChatroomExitApi = async (spaceId: number, chatRoomId: number) => {
  const requestOptions = createRequestOptionsJSON_AUTH("POST");
  if (!requestOptions) return null;

  const url = `${import.meta.env.VITE_API_BACK_URL}/space/${spaceId}/chat/${chatRoomId}/exit`;
  return await fetchApi<ChatRoomExitApiResponse>(url, requestOptions);
};

//
//
//
interface ChatRoomDeleteApiResponse {
  code: number;
  status: number;
  message: string;
  result: {
    isSuccess: boolean;
  };
}

export const ChatroomDeleteApi = async (spaceId: number, chatRoomId: number) => {
  const requestOptions = createRequestOptionsJSON_AUTH("POST");
  if (!requestOptions) return null;

  const url = `${import.meta.env.VITE_API_BACK_URL}/space/${spaceId}/chat/${chatRoomId}/delete`;
  return await fetchApi<ChatRoomDeleteApiResponse>(url, requestOptions);
};
