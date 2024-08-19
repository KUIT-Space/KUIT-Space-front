import { GetUserProfileApi, UserProfile } from "@/apis";
import TopBarText, { LeftEnum } from "@/components/TopBarText";
import { getUserDefaultImageURL } from "@/utils/getUserDefaultImageURL";
import { profile } from "console";
import { useEffect, useState } from "react";
import { To, useNavigate } from "react-router-dom";
import styled from "styled-components";

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.75rem 1.25rem 0.75rem 1.25rem;
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.BG800};
  border-radius: 0.75rem;
  margin-bottom: 0.75rem;
`;

const ProfileImg = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 6.1875rem;
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
  margin-left: 1rem;
`;

const Manager = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.char_lime};
  margin-left: 0.5rem;
`;

const ProfileManage = () => {
  const [profileList, setProfileList] = useState<UserProfile[] | undefined>();
  useEffect(() => {
    console.log(profileList);
  });
  useEffect(() => {
    GetUserProfileApi().then((data) => {
      setProfileList(data?.result.userProfileList);
    });
  }, []);

  const navigate = useNavigate();

  const handleNavigate = (path: To) => {
    navigate(path);
  };

  return (
    <div>
      <TopBarText left={LeftEnum.Back} center="프로필 관리" right="" />
      <div style={{ height: "1rem" }}></div>
      {profileList !== undefined &&
        profileList.map((profile, index) => (
          <ProfileContainer
            key={index}
            onClick={() => handleNavigate("/space/spaceoption/accountmanage")}
          >
            <span style={{ marginTop: "12px", marginBottom: "8px" }}>{profile.spaceName}</span>
            <ProfileInfo>
              <ProfileImg
                src={
                  profile.userProfileImg === null
                    ? getUserDefaultImageURL(profile.userId!)
                    : profile.userProfileImg
                }
                alt="IMG"
              />
              <span style={{ marginLeft: "12px" }}>{profile.userName}</span>
              {profile.userAuth === "manager" && <Manager>관리자</Manager>}
            </ProfileInfo>
          </ProfileContainer>
        ))}
    </div>
  );
};

export default ProfileManage;
