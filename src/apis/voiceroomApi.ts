import { ApiResponse, client } from "@/apis/client";
import { updateRoom } from "@/pages/VoiceRoomPage/EditVoiceRoomPage";
import { participantInfo, VrList } from "@/pages/VoiceRoomPage/VoiceRoomListPage";

interface VoiceRoomParticipantInfoResponse extends ApiResponse {
  result: {
    participantInfoList: participantInfo[];
  };
}

interface VoiceRoomListResponse extends ApiResponse {
  result: {
    voiceRoomList: VrList[];
  };
}

interface VoiceRoomTokenResponse extends ApiResponse {
  result: {
    token: string;
  };
}

interface VoiceRoomCreateResponse extends ApiResponse {
  result: {
    id: number;
    name: string;
  };
}

interface VoiceRoomEditResponse extends ApiResponse {
  result: {
    isSuccess: boolean;
  };
}

/**
 * 음성 채팅방 참가자 정보를 조회하는 API
 * @param spaceId 스페이스 ID
 * @param vrId 음성 채팅방 ID
 * @returns {Promise<VoiceRoomParticipantInfoResponse | null>} 음성 채팅방 참가자 정보 또는 에러 발생 시 null
 */
export const VrParticipantApi = async (
  spaceId: number,
  vrId: number,
): Promise<VoiceRoomParticipantInfoResponse | null> => {
  try {
    const response = await client
      .get(`space/${spaceId}/voiceRoom/${vrId}/participant`)
      .json<VoiceRoomParticipantInfoResponse>();
    return response;
  } catch (error) {
    console.error("[VrParticipantApi error]", error);
    return null;
  }
};

/**
 * 음성 채팅방 목록을 조회하는 API
 * @param spaceID 스페이스 ID
 * @param setVRList 음성 채팅방 목록을 설정하는 함수
 * @returns {Promise<void>} 음성 채팅방 목록 설정 완료 또는 에러 발생 시 빈 배열 설정
 */
export const VrListApi = async (
  spaceID: number,
  setVRList: React.Dispatch<React.SetStateAction<VrList[] | undefined>>,
): Promise<void> => {
  try {
    const response = await client
      .get(`space/${spaceID}/voiceRoom`, {
        searchParams: { showParticipant: "true" },
      })
      .json<VoiceRoomListResponse>();

    setVRList(response.result.voiceRoomList);
  } catch (error) {
    console.error("[VrListApi error]", error);
    setVRList([]);
  }
};

/**
 * 음성 채팅방 토큰을 조회하는 API
 * @param spaceID 스페이스 ID
 * @param VrID 음성 채팅방 ID
 * @param setJoin 참가 상태를 설정하는 함수
 * @returns {Promise<void>} 토큰 설정 완료 또는 에러 발생 시 null
 */
export const VrTokenApi = async (
  spaceID: number,
  VrID: number,
  setJoin: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<void> => {
  try {
    const response = await client.get(`space/${spaceID}/voiceRoom/${VrID}/token`);

    const authHeader = response.headers.get("Authorization");
    if (authHeader) {
      localStorage.setItem("VrToken", authHeader);
      setJoin(true);
    }
  } catch (error) {
    console.error("[VrTokenApi error]", error);
  }
};

/**
 * 음성 채팅방을 생성하는 API
 * @param spaceID 스페이스 ID
 * @param name 음성 채팅방 이름
 * @returns {Promise<Response | null>} 생성 결과 또는 에러 발생 시 null
 */
export const VrCreateApi = async (spaceID: number, name: string): Promise<Response | null> => {
  try {
    const response = await client.post(`space/${spaceID}/voiceRoom`, {
      json: { name },
    });

    return response;
  } catch (error) {
    console.error("[VrCreateApi error]", error);
    return null;
  }
};

/**
 * 음성 채팅방을 수정하는 API
 * @param spaceID 스페이스 ID
 * @param vrList 수정할 음성 채팅방 목록
 * @returns {Promise<Response | null>} 수정 결과 또는 에러 발생 시 null
 */
export const VrEditApi = async (
  spaceID: number,
  vrList: updateRoom[],
): Promise<Response | null> => {
  try {
    const response = await client.patch(`space/${spaceID}/voiceRoom`, {
      json: { updateRoomList: vrList },
    });

    return response;
  } catch (error) {
    console.error("[VrEditApi error]", error);
    return null;
  }
};
