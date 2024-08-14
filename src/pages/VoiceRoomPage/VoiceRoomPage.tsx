import TopBarText from "@/components/TopBarText";
import { LeftEnum } from "@/components/TopBarText";
import plus from "@/assets/VoiceRoom/icon_plus.svg";
import back from "@/assets/icon_back.svg";
import setting from "@/assets/VoiceRoom/icon_setting.svg";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as s from "@/pages/VoiceRoomPage/VoiceRoomListPage.styled";
import * as sty from "@/components/TopBarText.styled";

import {
  ControlBar,
  GridLayout,
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  useTracks,
} from "@livekit/components-react";
import "@livekit/components-styles";
import { Track } from "livekit-client";

const VoiceRoomPage = ({
  VoiceRoomName,
  setJoin,
}: {
  VoiceRoomName: string;
  setJoin: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | undefined>("");
  useEffect(() => {
    const temp = localStorage.getItem("VrToken");
    if (temp) {
      const temp2 = temp.substring(7);
      setToken(temp2);
      console.log(temp2);
    } else {
      setToken("");
    }
  }, []);
  return (
    <div>
      <sty.StyledTopBarDiv>
        <sty.StyledLeftDiv
          onClick={() => {
            setJoin(false);
          }}
        >
          <img src={back}></img>
        </sty.StyledLeftDiv>
        <sty.StyledCenterDiv>
          <sty.StyledCenterP>{VoiceRoomName}</sty.StyledCenterP>
        </sty.StyledCenterDiv>
        <sty.StyledRightDiv>
          <img src={setting} />
        </sty.StyledRightDiv>
      </sty.StyledTopBarDiv>
      <div>
        <LiveKitRoom
          video={true}
          audio={true}
          token={token}
          serverUrl={"wss://space-biwhq7u2.livekit.cloud"}
          // Use the default LiveKit theme for nice styles.
          data-lk-theme="default"
          style={{ height: "100vh" }}
        >
          {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
          <RoomAudioRenderer />
          {/* Controls for the user to start/stop audio, video, and screen
      share tracks and to leave the room. */}
          <ControlBar />
        </LiveKitRoom>
      </div>
    </div>
  );
};

export default VoiceRoomPage;
