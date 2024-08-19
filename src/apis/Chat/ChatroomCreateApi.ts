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
  img: File;
  name: string;
  memberList: number[];
}

const createChatroomFormData = (body: CreateChatroomApiRequestType): FormData => {
  const formData = new FormData();
  formData.append("name", body.name);

  formData.append("img", body.img);

  // formData.append("memberList[]", `[${body.memberList.toString()}]`);
  // formData.append("memberList", JSON.stringify(body.memberList));

  body.memberList.forEach((memberId) => {
    formData.append("memberList", JSON.stringify(memberId));
  });

  return formData;
};

export const ChatroomCreateApi = async (
  spaceId: number,
  name: string,
  memberList: number[],
  img: File,
) => {
  const formData = createChatroomFormData({ name, memberList, img: img });
  const requestOptions = createRequestOptionsFORM_AUTH("POST", formData);

  if (!requestOptions) return null;

  const url = `${import.meta.env.VITE_API_BACK_URL}/space/${spaceId}/chat/chatroom`;
  return await fetchApi<CreateChatroomApiResponseType>(url, requestOptions);
};
