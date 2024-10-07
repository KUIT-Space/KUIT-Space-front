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
  ParticipantLoop,
  ParticipantName,
  ParticipantTile,
  RoomAudioRenderer,
  useParticipants,
  useTracks,
} from "@livekit/components-react";
import { Participant, RemoteParticipant, Room, RoomEvent, Track } from "livekit-client";

import back from "@/assets/icon_back.svg";
import plus from "@/assets/VoiceRoom/icon_plus.svg";
import setting from "@/assets/VoiceRoom/icon_setting.svg";
import TopBarText from "@/components/TopBarText";
import { LeftEnum } from "@/components/TopBarText";
import * as sty from "@/components/TopBarText.styled";
import * as s from "@/pages/VoiceRoomPage/VoiceRoomListPage.styled";

import "@livekit/components-styles";
import SpaceControlBar from "@/pages/VoiceRoomPage/ControlBar";
import { UserInfoInSpace, VrParticipantApi } from "@/apis";
import { MainVoiceRoomUser, VoiceRoomUser } from "./VoiceRoomUser";
import { participantInfo } from "./VoiceRoomListPage";

export type VoiceRoomUserInfo = {
  x: number;
  y: number;
  userInfo: participantInfo;
  isSpeaking: boolean;
};

const VoiceRoomPage = ({
  vrId,
  VoiceRoomName,
  setJoin,
}: {
  vrId: number;
  VoiceRoomName: string;
  setJoin: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const [userList, setUserList] = useState<VoiceRoomUserInfo[]>([]);
  const [isCamera, setIsCamera] = useState<boolean>(false);
  const [room] = useState(new Room());
  const [token, setToken] = useState<string | undefined>("");
  const [isConnected, setIsConnected] = useState(false);
  const [connect, setConnect] = useState(false);
  const [parList, setParList] = useState<participantInfo[]>();
  const [vrUserList, setVrUserList] = useState<VoiceRoomUserInfo[]>();
  const [speakerList, setSpeakerList] = useState<string[]>();

  // const participants = useParticipants();

  const handleSpeaking = (id: number) => {
    setUserList(
      userList.map((value) =>
        value.userInfo.userId === id
          ? { ...value, isSpeaking: true }
          : { ...value, isSpeaking: false },
      ),
    );
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setConnect(false);
    navigate("/voiceroom");
  };
  room.on(RoomEvent.Connected, () => {
    console.log("hello!");
  });

  room.on(RoomEvent.ActiveSpeakersChanged, (speakers: Participant[]) => {
    // Speakers contain all of the current active speakers
    setSpeakerList(
      speakers.map((value) => {
        return value.identity;
      }),
    );
    // console.log("speakers", speakers);
  });
  useEffect(() => {
    speakerList?.forEach((value) => {
      handleSpeaking(parseInt(value));
    });
  }, [speakerList]);

  useEffect(() => {
    console.log("user", userList);
  }, [userList]);

  const handleParticipantSpeaking = () => {};
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
      <>
        <VoiceRoomContainer />
        <SpaceControlBar />
      </>
    );
  }

  useEffect(() => {
    // setUserList(
    const a = parList?.map((value) => {
      return {
        userInfo: value,
        x: 80, //0~80
        y: 84, //0~84
        isSpeaking: false,
      } as VoiceRoomUserInfo;
    });
    setUserList(a!);
  }, [parList]);

  useEffect(() => {
    const spaceId = localStorage.getItem("spaceId");
    const temp = localStorage.getItem("VrToken");
    if (temp) {
      const temp2 = temp.substring(7);
      setToken(temp2);
    } else {
      setToken("");
    }
    if (spaceId !== null) {
      VrParticipantApi(parseInt(spaceId), vrId).then((res) => {
        setParList(res?.result.participantInfoList);
      });
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
      {isCamera ? <div>dd</div> : <></>}

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
        <RoomAudioRenderer />

        {isConnected && <MyVideoConference />}
        <ControlBar />
      </LiveKitRoom>
    </div>
  );
};

export default VoiceRoomPage;
