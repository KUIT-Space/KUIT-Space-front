import { VrList, participantInfo } from "@/pages/VoiceRoomPage/VoiceRoomListPage";
import {
  createRequestOptionsJSON,
  RequestOptions,
  createRequestOptionsJSON_AUTH,
  fetchApi,
} from "@/apis/_createRequestOptions";
import { updateRoom } from "@/pages/VoiceRoomPage/EditVoiceRoomPage";
import { UserInfo } from "@livekit/components-react";

interface VoiceRoomParticipantInfoResponseType {
  code: number;
  status: number;
  message: string;
  result: {
    participantInfoList: participantInfo[];
  };
}

const fetchVrApi = async (url: string, options: RequestOptions) => {
  const response = await fetch(url, options).catch((err) => console.error(err));
  return response;
};

// API 함수 정의
export const VrParticipantApi = async (spaceId: number, vrId: number) => {
  const requestOptions = createRequestOptionsJSON_AUTH("GET");

  if (!requestOptions) return null;

  const url = `${import.meta.env.VITE_API_BACK_URL}/space/${spaceId}/voiceRoom/${vrId}/participant`;
  return await fetchApi<VoiceRoomParticipantInfoResponseType>(url, requestOptions);
};

export const VrListApi = async (
  spaceID: number,
  setVRList: React.Dispatch<React.SetStateAction<VrList[] | undefined>>,
) => {
  const requestOptions = createRequestOptionsJSON_AUTH("GET");
  if (!requestOptions) {
    return null;
  }
  const response = await fetchVrApi(
    `${import.meta.env.VITE_API_BACK_URL}/space/${spaceID}/voiceRoom?showParticipant=true`,
    requestOptions,
  );
  if (response) {
    response.json().then((data) => {
      const _temp: VrList[] = data.result.voiceRoomList;
      // _temp.participantInfoList =
      // _temp.map((value, index) =>
      //   VrParticipantApi(spaceID, value.id).then((res) => {
      //     if (res?.result.participantInfoList !== undefined) {
      //       value.participantInfoList = res?.result.participantInfoList;
      //     }
      //   }),
      // );
      setVRList(_temp);
    });
  } else {
    setVRList([]);
  }
};

export const VrTokenApi = async (
  spaceID: number,
  VrID: number,
  setJoin: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const requestOptions = createRequestOptionsJSON_AUTH("GET");
  if (!requestOptions) {
    return null;
  }
  const response = await fetchVrApi(
    `${import.meta.env.VITE_API_BACK_URL}/space/${spaceID}/voiceRoom/${VrID}/token`,
    requestOptions,
  );
  if (response) {
    response.json().then((data) => {
      const tmp = response.headers.get("Authorization");
      if (tmp) {
        localStorage.setItem("VrToken", tmp);
        setJoin(true);
      }
    });
  }
};

export const VrCreateApi = async (spaceID: number, name: string) => {
  const body = {
    name: name,
  };

  const requestOptions = createRequestOptionsJSON_AUTH("POST", JSON.stringify(body));
  if (!requestOptions) {
    return null;
  }
  const response = await fetchVrApi(
    `${import.meta.env.VITE_API_BACK_URL}/space/${spaceID}/voiceRoom`,
    requestOptions,
  );

  return response;
};

export const VrEditApi = async (spaceID: number, vrList: updateRoom[]) => {
  const body = {
    updateRoomList: vrList,
  };

  const requestOptions = createRequestOptionsJSON_AUTH("PATCH", JSON.stringify(body));
  if (!requestOptions) {
    return null;
  }
  const response = await fetchVrApi(
    `${import.meta.env.VITE_API_BACK_URL}/space/${spaceID}/voiceRoom`,
    requestOptions,
  );

  return response;
};
