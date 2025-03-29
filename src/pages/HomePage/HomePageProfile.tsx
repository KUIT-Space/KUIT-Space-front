import TopBarText, { LeftEnum } from "@/components/TopBarText";
import ReactLogo from "@/assets/VoiceRoom/purple_gradient.svg";
import * as s from "@/pages/HomePage/HomePage.styled";
import { useEffect, useState } from "react";
import { GetUserProfileApi, SpaceSearchUserProfile, UserProfile, UserProfileResult } from "@/apis";
import { useParams } from "react-router-dom";
import { UserInfo } from "@livekit/components-react";
import { getUserDefaultImageURL } from "@/utils/getUserDefaultImageURL";

const HomePageProfile = () => {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState<UserProfileResult>();

  const spaceId = localStorage.getItem("spaceId");

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);
  useEffect(() => {
    if (spaceId !== null && id !== undefined) {
      SpaceSearchUserProfile(Number.parseInt(spaceId), Number.parseInt(id)).then((data) => {
        setUserInfo(data?.result);
      });
    }
  }, []);
  return (
    <>
      <TopBarText left={LeftEnum.Back} center="" right=""></TopBarText>
      <s.ProfileContainer>
        <s.ProfileImgDiv>
          <s.ProfileImg
            src={
              userInfo?.userProfileImg === null
                ? getUserDefaultImageURL(Number.parseInt(spaceId!))
                : userInfo?.userProfileImg
            }
          ></s.ProfileImg>

          <s.ProfileDiv>
            <s.ProfileName>{userInfo?.userName}</s.ProfileName>
            <s.ProfileAuth>{userInfo?.userAuth === "manager" && "관리자"}</s.ProfileAuth>
          </s.ProfileDiv>
        </s.ProfileImgDiv>
        <s.ProfileMsgDiv>
          {userInfo?.userProfileMsg !== null
            ? userInfo?.userProfileMsg
            : "등록한 상태 메세지가 없어요!"}
        </s.ProfileMsgDiv>
      </s.ProfileContainer>
    </>
  );
};

export default HomePageProfile;
