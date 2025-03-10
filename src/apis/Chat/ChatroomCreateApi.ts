import { ApiResponse, client } from "@/apis/client";

interface CreateChatroomApiResponse extends ApiResponse {
  result: {
    chatRoomId: number;
  };
}

interface CreateChatroomApiRequestType {
  img: File;
  name: string;
  memberList: number[];
}

const createChatroomFormData = (body: CreateChatroomApiRequestType): FormData => {
  const formData = new FormData();
  formData.append("name", body.name);
  formData.append("img", body.img);

  body.memberList.forEach((memberId) => {
    formData.append("memberList", String(memberId));
  });

  return formData;
};

/**
 * 채팅방을 생성하는 API
 * @param spaceId 스페이스 ID
 * @param name 채팅방 이름
 * @param memberList 초대할 멤버 ID 목록
 * @param img 채팅방 이미지 파일
 * @returns {Promise<CreateChatroomApiResponse | null>} 생성된 채팅방 ID 또는 에러 발생 시 null
 */
export const ChatroomCreateApi = async (
  spaceId: number,
  name: string,
  memberList: number[],
  img: File,
): Promise<CreateChatroomApiResponse | null> => {
  try {
    const formData = createChatroomFormData({ name, memberList, img });

    const response = await client
      .post(`space/${spaceId}/chat/chatroom`, {
        body: formData,
      })
      .json<CreateChatroomApiResponse>();

    return response;
  } catch (error) {
    console.error("[ChatroomCreateApi error]", error);
    return null;
  }
};
