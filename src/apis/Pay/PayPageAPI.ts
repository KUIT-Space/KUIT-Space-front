import { DetailPayData, PayReceiveInfo, PayRequestInfo } from "@/pages/PayPage/PayPage";
import {
  createRequestOptionsJSON,
  RequestOptions,
  createRequestOptionsJSON_AUTH,
  fetchApi,
} from "@/apis/_createRequestOptions";
import { BankInfo, ChatUserInfoInSpace } from "@/pages/PayPage/CreateRequestPage";
import { useNavigate } from "react-router-dom";
import { UserInfoInSpace } from "@/apis/Space/SpaceSearchAllUserApi";

interface SpaceSearchAllUserApiResponseType {
  code: number;
  status: number;
  message: string;
  result: {
    userList: UserInfoInSpace[];
  };
}

export interface targetInfoList {
  targetUserId: number;
  requestAmount: number;
}

const fetchPayApi = async (url: string, options: RequestOptions) => {
  const response = await fetch(url, options).catch((err) => {
    console.error(err);
  });
  return response;
};

export const payCompleteApi = async (TargetId: number) => {
  const body = {
    payRequestTargetId: TargetId,
  };
  const requestOptions = createRequestOptionsJSON_AUTH("POST", JSON.stringify(body));
  if (!requestOptions) {
    return null;
  }
  const response = await fetchPayApi(
    `${import.meta.env.VITE_API_BACK_URL}/space/3/pay/complete`,
    requestOptions,
  );
};

export const payReceiveApi = async (
  spaceID: number,
  setCurrentData: React.Dispatch<React.SetStateAction<PayReceiveInfo[] | undefined>>,
  setCompleteData: React.Dispatch<React.SetStateAction<PayReceiveInfo[] | undefined>>,
) => {
  const requestOptions = createRequestOptionsJSON_AUTH("GET");
  if (!requestOptions) {
    return null;
  }
  const response = await fetchPayApi(
    `${import.meta.env.VITE_API_BACK_URL}/space/${spaceID}/pay/receive`,
    requestOptions,
  );

  if (response) {
    response.json().then((data) => {
      setCurrentData(data.result.payReceiveInfoDtoListIncomplete);
      setCompleteData(data.result.payReceiveInfoDtoListComplete);
    });
  }
};

export const payRequestApi = async (
  spaceID: number,
  setCurrentData: React.Dispatch<React.SetStateAction<PayRequestInfo[] | undefined>>,
  setCompleteData: React.Dispatch<React.SetStateAction<PayRequestInfo[] | undefined>>,
) => {
  const requestOptions = createRequestOptionsJSON_AUTH("GET");
  if (!requestOptions) {
    return null;
  }
  const response = await fetchPayApi(
    `${import.meta.env.VITE_API_BACK_URL}/space/${spaceID}/pay/request`,
    requestOptions,
  );

  if (response) {
    response.json().then((data) => {
      setCurrentData(data.result.payRequestInfoDtoListInComplete);
      setCompleteData(data.result.payRequestInfoDtoListComplete);
    });
  }
};

export const payHomeApi = async (
  spaceID: number,
  setReqData: React.Dispatch<React.SetStateAction<PayRequestInfo[] | undefined>>,
  setRecData: React.Dispatch<React.SetStateAction<PayReceiveInfo[] | undefined>>,
) => {
  const requestOptions = createRequestOptionsJSON_AUTH("GET");
  if (!requestOptions) {
    return null;
  }
  const response = await fetchPayApi(
    `${import.meta.env.VITE_API_BACK_URL}/space/${spaceID}/pay`,
    requestOptions,
  ).then((res) =>
    res?.json?.().then((data) => {
      setReqData(data.result.payRequestInfoDtoList);
      setRecData(data.result.payReceiveInfoDtoList);
    }),
  );
};

export const recentAccountApi = async (
  spaceID: number,
  setBankData: React.Dispatch<React.SetStateAction<BankInfo[] | undefined>>,
) => {
  const requestOptions = createRequestOptionsJSON_AUTH("GET");
  if (!requestOptions) {
    return null;
  }
  const response = await fetchPayApi(
    `${import.meta.env.VITE_API_BACK_URL}/space/pay/recent-bank-info`,
    requestOptions,
  );

  if (response) {
    response.json().then((data) => {
      setBankData(data.result.recentPayRequestBankInfoDtoList);
    });
  }
};

export const payDetailApi = async (
  spaceID: number,
  payRequestId: number,
  setDetailPayData: React.Dispatch<React.SetStateAction<DetailPayData | undefined>>,
) => {
  const requestOptions = createRequestOptionsJSON_AUTH("GET");
  if (!requestOptions) {
    return null;
  }
  const response = await fetchPayApi(
    `${import.meta.env.VITE_API_BACK_URL}/space/${spaceID}/pay/${payRequestId}`,
    requestOptions,
  );

  if (response) {
    response.json().then((data) => {
      setDetailPayData(data.result);
    });
  }
};

export const getAllMemberApi = async (
  spaceID: number,
  setUserInfoData: React.Dispatch<React.SetStateAction<UserInfoInSpace[] | undefined>>,
) => {
  const requestOptions = createRequestOptionsJSON_AUTH("GET");
  if (!requestOptions) {
    return null;
  }
  const response = await fetchPayApi(
    `${import.meta.env.VITE_API_BACK_URL}/space/${spaceID}/all-member`,
    requestOptions,
  );

  if (response) {
    response.json().then((data) => {
      setUserInfoData(data.result.userInfoInSpaceList);
    });
  }
};

export const getChatRoomMemberApi = async (spaceId: number, chatRoomId: number) => {
  const requestOptions = createRequestOptionsJSON_AUTH("GET");
  if (!requestOptions) {
    return null;
  }
  return fetchApi<SpaceSearchAllUserApiResponseType>(
    `${import.meta.env.VITE_API_BACK_URL}/space/${spaceId}/chat/${chatRoomId}/member`,
    requestOptions,
  );
};

export const getAllChatMemberApi = async (
  spaceID: number,
  setChatUserInfoData: React.Dispatch<React.SetStateAction<ChatUserInfoInSpace[] | undefined>>,
) => {
  type chatRoomList = {
    id: number;
    name: string;
    imgUrl: string;
    lastMsg: string;
    lastTime: string;
    unreadMsgCount: number;
  };
  const requestOptions = createRequestOptionsJSON_AUTH("GET");
  if (!requestOptions) {
    return null;
  }
  const response = await fetchPayApi(
    `${import.meta.env.VITE_API_BACK_URL}/space/${spaceID}/chat/chatroom`,
    requestOptions,
  );
  if (response) {
    response.json().then((data) => {
      const _temp: chatRoomList[] = data.result.chatRoomList;
      let _temp2: ChatUserInfoInSpace[] = new Array();
      _temp.map(async (value, index) => {
        let _temp3: ChatUserInfoInSpace = {
          chatRoomId: -1,
          chatRoomName: "",
          userList: [],
          imgUrl: "",
        };
        _temp3.chatRoomId = value.id;
        _temp3.chatRoomName = value.name;
        _temp3.imgUrl = value.imgUrl;
        getChatRoomMemberApi(spaceID, value.id).then((res) => {
          res ? (_temp3.userList = res.result.userList) : (_temp3.userList = []);
          _temp2.push(_temp3);
        });
      });

      setChatUserInfoData(_temp2);
    });
  }
};

export const payCreateApi = async (
  totalAmount: number,
  bankName: string,
  bankAccountNum: string,
  targetInfoList: targetInfoList[],
  spaceId: number,
) => {
  const body = {
    totalAmount: totalAmount,
    bankName: bankName,
    bankAccountNum: bankAccountNum,
    targetInfoList: targetInfoList,
  };
  const requestOptions = createRequestOptionsJSON_AUTH("POST", JSON.stringify(body));

  if (!requestOptions) {
    return null;
  }
  const response = await fetchPayApi(
    `${import.meta.env.VITE_API_BACK_URL}/space/${spaceId}/pay`,
    requestOptions,
  );
};
