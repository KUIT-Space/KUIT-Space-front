import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Room, Track } from "livekit-client";

import back from "@/assets/icon_back.svg";
import plus from "@/assets/VoiceRoom/icon_plus.svg";
import setting from "@/assets/VoiceRoom/icon_setting.svg";
import TopBarText from "@/components/TopBarText";
import { LeftEnum } from "@/components/TopBarText";
import * as sty from "@/components/TopBarText.styled";
import * as s from "@/pages/VoiceRoomPage/VoiceRoomListPage.styled";

import "@livekit/components-styles";
import SpaceControlBar from "@/pages/VoiceRoomPage/ControlBar";
import { UserInfoInSpace } from "@/apis";
import { MainVoiceRoomUser, VoiceRoomUser } from "./VoiceRoomUser";

export interface VoiceRoomUserInfo {
  x: number;
  y: number;
  userInfo: UserInfoInSpace;
  isSpeaking: boolean;
}

const VoiceRoomPage = ({
  VoiceRoomName,
  setJoin,
}: {
  VoiceRoomName: string;
  setJoin: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const [userList, setUserList] = useState<VoiceRoomUserInfo[]>([
    {
      x: 3,
      y: 5,
      userInfo: {
        userId: 179,
        userName: "양석준",
        profileImgUrl: null,
        userAuth: "normal",
      },
      isSpeaking: false,
    },
    {
      x: 10,
      y: 10,
      userInfo: {
        userId: 224,
        userName: "양석준",
        profileImgUrl: null,
        userAuth: "normal",
      },
      isSpeaking: false,
    },
  ]);
  const [isCamera, setIsCamera] = useState<boolean>(false);
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

  const VoiceRoomContainer = () => {
    return (
      <s.VoiceRoomDiv>
        {userList?.map((value) => {
          return <MainVoiceRoomUser props={value}></MainVoiceRoomUser>;
        })}
      </s.VoiceRoomDiv>
    );
  };

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
      {isCamera ? (
        <div>dd</div>
      ) : (
        <>
          <VoiceRoomContainer />
          <SpaceControlBar />
        </>
      )}

      {/* <LiveKitRoom
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
        <RoomAudioRenderer />

        {isConnected && <MyVideoConference />}
        <ControlBar />
      </LiveKitRoom> */}
    </div>
  );
};
function MyVideoConference() {
  // `useTracks` returns all camera and screen share tracks. If a user
  // joins without a published camera track, a placeholder track is returned.
  const [mode, setMode] = useState(true);
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
