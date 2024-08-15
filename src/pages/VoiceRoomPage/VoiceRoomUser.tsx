import * as s from "@/pages/VoiceRoomPage/VoiceRoomUser.styled";
import micON from "@/assets/VoiceRoom/icon_microphone_ON.svg";
import micOFF from "@/assets/VoiceRoom/icon_microphone_OFF.svg";
import { participantInfo } from "./VoiceRoomListPage";

export const VoiceRoomUser = ({ props }: { props: participantInfo[] }) => {
  return (
    <s.VRuserA>
      <s.VRuserListDiv>
        {/* <s.VRuserImg src={props.profileImage}></s.VRuserImg>
        <div>{props.name}</div>
        <s.MicImg src={props.mute ? micOFF : micON}></s.MicImg> */}
      </s.VRuserListDiv>
    </s.VRuserA>
  );
};
