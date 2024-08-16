import BigRoundDiv from "@/components/BigRoundDiv";
import TopBarText, { LeftEnum } from "@/components/TopBarText";
import * as s from "@/pages/VoiceRoomPage/JoinVoiceRoom.styled";
import redo from "@/assets/icon_redo.svg";

//임시로 적용하는 프로필 이미지
import reactLogo from "@/assets/react.svg";
import { BottomBtn } from "@/components/BottomBtn";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import VoiceRoomPage from "@/pages/VoiceRoomPage/VoiceRoomPage";
import { VrList } from "@/pages/VoiceRoomPage/VoiceRoomListPage";
import { VrTokenApi } from "@/apis/voiceroomApi";

const JoinVoiceRoomPage = () => {
  const location = useLocation();
  const data: VrList = location.state;

  const title = data.name;
  const user_num = data.numParticipant;

  // 프로필 수정
  const userProfile = reactLogo;

  // 임시 이름
  const userName = "임시";

  const [isJoined, setJoin] = useState(false);

  const onJoin = () => {
    setJoin(true);
    VrTokenApi(3, data.id);
  };
  const navigate = useNavigate();
  return (
    <div>
      {isJoined ? (
        <>
          <VoiceRoomPage VoiceRoomName={title} setJoin={setJoin}></VoiceRoomPage>
        </>
      ) : (
        <>
          <TopBarText left={LeftEnum.Back} center="보이스룸 참여" right=""></TopBarText>
          <s.ContentDiv>
            <s.InnerDiv>
              <s.TitleDiv>{title}</s.TitleDiv>
              <BigRoundDiv content={`"대화중인 스페이서 ${user_num}명"`} />
            </s.InnerDiv>

            <s.ProfileDiv>
              <img src={userProfile}></img>
              <img src={redo}></img>
            </s.ProfileDiv>
            <div>{userName}</div>
            <BottomBtn
              disabled={false}
              onClick={() => {
                onJoin();
              }}
            >
              참여하기
            </BottomBtn>
          </s.ContentDiv>
        </>
      )}
    </div>
  );
};

export default JoinVoiceRoomPage;
