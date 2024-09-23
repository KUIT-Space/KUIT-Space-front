import * as s from "@/pages/VoiceRoomPage/ControlBar.styled";

import micEnableIcon from "@/assets/VoiceRoom/icon_microphone.svg";
import micDisableIcon from "@/assets/VoiceRoom/icon_microphone_OFF_red.svg";
import shareScreenIcon from "@/assets/VoiceRoom/icon_screen_share.svg";
import emojiReactIcon from "@/assets/VoiceRoom/icon_react_emoji.svg";
import cameraEnableIcon from "@/assets/VoiceRoom/icon_camera_ON.svg";

const SpaceControlBar = () => {
  return (
    <s.ControlBarContainer>
      <s.ControlBarDiv>
        <img src={micEnableIcon}></img>
        <img src={cameraEnableIcon}></img>
        <img src={shareScreenIcon}></img>
        <img src={emojiReactIcon}></img>
      </s.ControlBarDiv>
    </s.ControlBarContainer>
  );
};

export default SpaceControlBar;
