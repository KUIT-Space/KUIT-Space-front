import {
  createRequestOptionsFORM_AUTH,
  createRequestOptionsJSON_AUTH,
  fetchApi,
} from "@/apis/_createRequestOptions";

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

interface ChatroomInviteUserResponse {
  code: number;
  status: number;
  message: string;
  result: { isSuccess: boolean };
}

/**
 * 주의! memberListParam에 기존 채팅방 포함 user가 들어있으면 false 리턴되고 채팅방 초대가 안됨
 * @param spaceId
 * @param chatRoomId
 * @param memberListParam
 * @returns
 */
export const ChatroomInviteUserApi = async (
  spaceId: number,
  chatRoomId: number,
  memberListParam: number[],
) => {
  const requestOptions = createRequestOptionsJSON_AUTH(
    "POST",
    JSON.stringify({ memberList: memberListParam }),
  );
  if (!requestOptions) return null;

  const url = `${import.meta.env.VITE_API_BACK_URL}/space/${spaceId}/chat/${chatRoomId}/member`;

  return await fetchApi<ChatroomInviteUserResponse>(url, requestOptions);
};
