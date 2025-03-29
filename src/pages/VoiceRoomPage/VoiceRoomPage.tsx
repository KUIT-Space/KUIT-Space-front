import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ControlBar,
  GridLayout,
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  useTracks,
} from "@livekit/components-react";
import { Room, Track } from "livekit-client";

import back from "@/assets/icon_back.svg";
import setting from "@/assets/VoiceRoom/icon_setting.svg";
import * as sty from "@/components/TopBarText.styled";

import "@livekit/components-styles";

const VoiceRoomPage = ({
  VoiceRoomName,
  setJoin,
}: {
  VoiceRoomName: string;
  setJoin: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const [room] = useState(new Room());
  const [token, setToken] = useState<string | undefined>("");
  const [isConnected, setIsConnected] = useState(false);
  const [, setConnect] = useState(false);

  const handleDisconnect = () => {
    setIsConnected(false);
    setConnect(false);
    navigate("/voiceroom");
  };

  useEffect(() => {
    const temp = localStorage.getItem("VrToken");
    if (temp) {
      const temp2 = temp.substring(7);
      setToken(temp2);
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
          <img src={back} alt="back" />
        </sty.StyledLeftDiv>
        <sty.StyledCenterDiv>
          <sty.StyledCenterP>{VoiceRoomName}</sty.StyledCenterP>
        </sty.StyledCenterDiv>
        <sty.StyledRightDiv>
          <img src={setting} alt="setting" />
        </sty.StyledRightDiv>
      </sty.StyledTopBarDiv>
      <LiveKitRoom
        video={true}
        audio={true}
        token={token}
        room={room}
        serverUrl={"wss://space-biwhq7u2.livekit.cloud"}
        onConnected={() => {
          setIsConnected(true);
          console.log("connect!");
        }}
        onDisconnected={handleDisconnect}
      >
        {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
        <RoomAudioRenderer />

        {isConnected && <MyVideoConference />}
        <ControlBar />
        {/* Controls for the user to start/stop audio, video, and screen
      share tracks and to leave the room. */}
      </LiveKitRoom>
    </div>
  );
};
function MyVideoConference() {
  // `useTracks` returns all camera and screen share tracks. If a user
  // joins without a published camera track, a placeholder track is returned.
  const [mode] = useState(true);
  const navigator = useNavigate();

  const nextMode = () => {
    navigator("/specialvoiceroom");
  };
  useEffect(() => {
    // let track2 = tracks.find((trackRef) => trackRef.source === "screen_share");
  }, [mode]);
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false },
  );
  return (
    <GridLayout tracks={tracks} style={{ height: "90vh" }}>
      {/* The GridLayout accepts zero or one child. The child is used
      as a template to render all passed in tracks. */}
      <ParticipantTile onPaste={nextMode}></ParticipantTile>
    </GridLayout>
  );
}
export default VoiceRoomPage;
