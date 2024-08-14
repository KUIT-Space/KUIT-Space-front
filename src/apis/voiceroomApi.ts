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
  }
  //   const body = {
  //     name: "야호호호",
  //   };
  //   const requestOptions = createRequestOptionsJSON_AUTH("POST", JSON.stringify(body));
  //   if (!requestOptions) {
  //     return null;
  //   }
  //   console.log(JSON.stringify(body));
  //   const response = await fetchVrApi(`https://project-space.xyz/space/3/voiceRoom`, requestOptions);
};
