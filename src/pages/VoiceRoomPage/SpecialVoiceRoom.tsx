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
  CarouselLayout,
  ControlBar,
  FocusLayout,
  FocusLayoutContainer,
  FocusToggle,
  GridLayout,
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  useTracks,
} from "@livekit/components-react";
import "@livekit/components-styles";
import { Room, Track } from "livekit-client";
import { sleep } from "livekit-client/dist/src/room/utils";

const SpecialVoiceRoom = () => {
  const navigate = useNavigate();
  const [room] = useState(new Room());
  const [token, setToken] = useState<string | undefined>("");
  const [isConnected, setIsConnected] = useState(false);
  const [connect, setConnect] = useState(false);

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
    <>
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
        {/* Controls for the user to start/stop audio, video, and screen
      share tracks and to leave the room. */}
      </LiveKitRoom>
    </>
  );
};
function MyVideoConference() {
  // `useTracks` returns all camera and screen share tracks. If a user
  // joins without a published camera track, a placeholder track is returned.

  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: false },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false },
  );
  const track2 = tracks.find((trackRef) => trackRef.source === "screen_share");
  return track2 ? (
    <CarouselLayout
      tracks={[track2]}
      style={{ width: "100vw", height: "100vh", marginLeft: " calc(-50vw + 50%)" }}
    >
      {/* The GridLayout accepts zero or one child. The child is used
      as a template to render all passed in tracks. */}
      <ParticipantTile
        style={{ width: "100vw", height: "100vh", marginLeft: " calc(-50vw + 50%)" }}
      ></ParticipantTile>
    </CarouselLayout>
  ) : (
    <></>
  );
}
export default SpecialVoiceRoom;
