import * as s from "@/pages/VoiceRoomPage/VoiceRoomUser.styled";
import micON from "@/assets/VoiceRoom/icon_microphone_ON.svg";
import micOFF from "@/assets/VoiceRoom/icon_microphone_OFF.svg";
import { participantInfo } from "@/pages/VoiceRoomPage/VoiceRoomListPage";
import { getUserDefaultImageURL } from "@/utils/getUserDefaultImageURL";

export const VoiceRoomUser = ({ props }: { props: participantInfo }) => {
  const userId = Number.parseInt(localStorage.getItem("userId")!);
  console.log(props);
  return (
    <s.VRuserA>
      <s.VRuserListDiv>
        <s.VRuserImg
          src={props.profileImage ? props.profileImage : getUserDefaultImageURL(userId)}
        ></s.VRuserImg>
        <div>{props.name}</div>
        <s.MicImg src={props.mute ? micOFF : micON}></s.MicImg>
      </s.VRuserListDiv>
    </s.VRuserA>
  );
};
