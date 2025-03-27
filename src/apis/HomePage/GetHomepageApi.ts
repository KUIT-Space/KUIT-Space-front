import { createRequestOptionsJSON_AUTH, RequestOptions } from "@/apis/_createRequestOptions";
import { PayReceiveInfo, PayRequestInfo } from "@/pages/PayPage/PayPage";
import { VrList } from "@/pages/VoiceRoomPage/VoiceRoomListPage";

export type HomeApiResponse = {
  spaceName: string;
  spaceProfileImg: null;
  payRequestInfoDtoList: PayRequestInfo[];
  payReceiveInfoDtoList: PayReceiveInfo[];
  noticeList: noticeInfo[];
  memberNum: number;
  userAuth: string;
};
export type VoiceRoomApiResponse = {
  voiceRoomList: VrList[];
};
export type noticeInfo = {
  postId: number;
  title: string;
};

const fetchHomeApi = async (url: string, options: RequestOptions) => {
  const response = await fetch(url, options).catch((err) => {
    console.error(err);
  });
  return response;
};

export const getHomeApi = async (
  spaceID: number,
  setHomeData: React.Dispatch<React.SetStateAction<HomeApiResponse | undefined>>,
) => {
  const requestOptions = createRequestOptionsJSON_AUTH("GET");
  if (!requestOptions) {
    return null;
  }
  const response = await fetchHomeApi(
    `${import.meta.env.VITE_API_BACK_URL}/space/${spaceID}`,
    requestOptions,
  ).then((res) =>
    res?.json?.().then((data: any) => {
      setHomeData(data.result);
    }),
  );
};

export const getVrApi = async (
  spaceID: number,
  setVrData: React.Dispatch<React.SetStateAction<VoiceRoomApiResponse | undefined>>,
) => {
  const requestOptions = createRequestOptionsJSON_AUTH("GET");
  if (!requestOptions) {
    return null;
  }
  const response = await fetchHomeApi(
    `${import.meta.env.VITE_API_BACK_URL}/space/${spaceID}/voiceRoom`,
    requestOptions,
  ).then((res) =>
    res?.json?.().then((data: any) => {
      setVrData(data.result);
    }),
  );
};
