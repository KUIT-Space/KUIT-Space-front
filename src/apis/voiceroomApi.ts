import { VrList } from "@/pages/VoiceRoomPage/VoiceRoomListPage";
import {
  createRequestOptionsJSON,
  RequestOptions,
  createRequestOptionsJSON_AUTH,
} from "@/apis/_createRequestOptions";

const fetchVrApi = async (url: string, options: RequestOptions) => {
  const response = await fetch(url, options).catch((err) => console.error(err));
  return response;
};

export const VrListApi = async (
  spaceID: number,
  setVRList: React.Dispatch<React.SetStateAction<VrList[] | undefined>>,
) => {
  const requestOptions = createRequestOptionsJSON_AUTH("GET");
  if (!requestOptions) {
    return null;
  }
  const response = await fetchVrApi(`/api/space/${spaceID}/voiceRoom`, requestOptions);
  if (response) {
    response.json().then((data) => {
      setVRList(data.result.voiceRoomList);
    });
  } else {
    setVRList([]);
  }
};

export const VrTokenApi = async (spaceID: number, VrID: number) => {
  const requestOptions = createRequestOptionsJSON_AUTH("GET");
  if (!requestOptions) {
    return null;
  }
  const response = await fetchVrApi(
    `https://project-space.xyz/space/${spaceID}/voiceRoom/${VrID}/token`,
    requestOptions,
  );
  if (response) {
    response.json().then((data) => {
      const tmp = response.headers.get("Authorization");
      if (tmp) {
        localStorage.setItem("VrToken", tmp);
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
    `https://project-space.xyz/space/${spaceID}/voiceRoom`,
    requestOptions,
  );

  return response;
};
