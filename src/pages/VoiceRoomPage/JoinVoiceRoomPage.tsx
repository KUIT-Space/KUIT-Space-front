import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { GetUserProfileApi } from "@/apis/GetUserProfileApi";
import { UserProfile } from "@/apis/GetUserProfileApi";
import { VrTokenApi } from "@/apis/voiceroomApi";
import redo from "@/assets/icon_redo.svg";
import BigRoundDiv from "@/components/BigRoundDiv";
//임시로 적용하는 프로필 이미지
import { BottomBtn } from "@/components/BottomBtn";
import TopBarText, { LeftEnum } from "@/components/TopBarText";
import * as s from "@/pages/VoiceRoomPage/JoinVoiceRoom.styled";
import { VrList } from "@/pages/VoiceRoomPage/VoiceRoomListPage";
import VoiceRoomPage from "@/pages/VoiceRoomPage/VoiceRoomPage";
import { getUserDefaultImageURL } from "@/utils/getUserDefaultImageURL";

const JoinVoiceRoomPage = () => {
  const location = useLocation();
  const data: VrList = location.state;

  const title = data.name;
  const user_num = data.numParticipant;

  const [isJoined, setJoin] = useState(false);
  const [userData, setUserData] = useState<UserProfile>();
  const [userName, setUserName] = useState<string>();
  const [userImg, setUserImg] = useState<string | null>();
  const [userId, setUserId] = useState<number>();

  const onJoin = () => {
    const spaceId = localStorage.getItem("spaceId");
    if (spaceId !== null) {
      VrTokenApi(Number.parseInt(spaceId), data.id, setJoin);
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (userData !== undefined) {
      setUserName(userData.userName);
      console.log(userData.userName);
      setUserImg(userData.userProfileImg);
      if (userData.userId !== undefined) {
        setUserId(userData.userId);
      }
    }
  }, [userData]);

  useEffect(() => {
    const spaceId = localStorage.getItem("spaceId");
    const userId = localStorage.getItem("userId");
    if (spaceId !== null) {
      GetUserProfileApi().then((data) => {
        console.log(data);
        //
        const _temp: UserProfile | undefined = data?.result.userProfileList.find((e) => {
          return e.spaceId === Number.parseInt(spaceId);
        });
        if (_temp !== undefined) {
          if (userId != null) {
            _temp.userId = Number.parseInt(userId);
          }
          console.log(_temp);
          setUserData(_temp);
        }
      });
    }
  }, []);

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
              <BigRoundDiv content={`대화중인 스페이서 ${user_num}명`} />
            </s.InnerDiv>

            <s.ProfileDiv>
              <img
                src={userImg !== null ? userImg : getUserDefaultImageURL(userId!)}
                alt="user img"
              />
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
