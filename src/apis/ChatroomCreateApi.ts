import { createRequestOptionsFORM_AUTH, fetchApi } from "@/apis/_createRequestOptions";

interface CreateChatroomApiResponseType {
  code: number;
  status: number;
  message: string;
  result: {
    chatRoomId: number;
  };
}

interface CreateChatroomApiRequestType {
  img?: File | null; // 이미지 파일은 선택적
  name: string;
  memberList: number[];
}

const createChatroomFormData = (body: CreateChatroomApiRequestType): FormData => {
  const formData = new FormData();
  formData.append("name", body.name);

  if (body.img) {
    formData.append("img", body.img);
  }

  body.memberList.forEach((memberId) => {
    formData.append("memberList", memberId.toString());
  });

  return formData;
};

export const createChatroomApi = async (
  spaceId: number,
  name: string,
  memberList: number[],
  img?: File | null,
) => {
  const formData = createChatroomFormData({ name, memberList, img: img || null });
  const requestOptions = createRequestOptionsFORM_AUTH("POST", formData);

  if (!requestOptions) return null;

  const url = `${import.meta.env.VITE_API_BACK_URL}/space/${spaceId}/chat/chatroom`;
  return await fetchApi<CreateChatroomApiResponseType>(url, requestOptions);
};
