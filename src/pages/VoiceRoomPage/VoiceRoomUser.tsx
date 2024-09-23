import * as s from "@/pages/VoiceRoomPage/VoiceRoomUser.styled";
import micON from "@/assets/VoiceRoom/icon_microphone_ON.svg";
import micOFF from "@/assets/VoiceRoom/icon_microphone_OFF.svg";
import { participantInfo } from "@/pages/VoiceRoomPage/VoiceRoomListPage";
import { getUserDefaultImageURL } from "@/utils/getUserDefaultImageURL";
import { UserProfile } from "@/apis";
import { VoiceRoomUserInfo } from "./VoiceRoomPage";

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

export const MainVoiceRoomUser = ({ props }: { props: VoiceRoomUserInfo | undefined }) => {
  const userId = Number.parseInt(localStorage.getItem("userId")!);
  console.log(props?.x, props?.y);
  return (
    <s.MyDiv x={props?.x!} y={props?.y!}>
      <s.MainVRuserImg
        src={
          props?.userInfo.profileImgUrl
            ? props.userInfo.profileImgUrl
            : getUserDefaultImageURL(userId)
        }
      ></s.MainVRuserImg>
    </s.MyDiv>
  );
};
