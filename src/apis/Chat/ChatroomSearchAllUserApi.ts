import { createRequestOptionsJSON_AUTH, fetchApi } from "@/apis/_createRequestOptions";

export interface User {
  userId: number;
  userName: string;
  profileImgUrl: string | null;
  userAuth: "manager" | "normal"; //응답이 "local" 인 경우가 있다?
}

interface ChatroomMemberApiResponse {
  code: number;
  status: number;
  message: string;
  result: { userList: User[] };
}

export const ChatroomSearchAllUserApi = async (spaceId: number, chatRoomId: number) => {
  const requestOptions = createRequestOptionsJSON_AUTH("GET");
  if (!requestOptions) return null;

  const url = `${import.meta.env.VITE_API_BACK_URL}/space/${spaceId}/chat/${chatRoomId}/member`;

  return await fetchApi<ChatroomMemberApiResponse>(url, requestOptions);
};
