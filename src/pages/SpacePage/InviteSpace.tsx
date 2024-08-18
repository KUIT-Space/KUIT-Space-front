import { ChangeEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { SpaceInfo as SpaceInfoType } from "@/apis/Space/SpaceSelectApi";
import { SpaceUserJoinApi } from "@/apis/Space/SpaceUserJoinApi";
import { CharacterImgs } from "@/assets/Characters";
import ChatroomImg from "@/assets/ChatPage/btn_chatroom_img.svg";
import back from "@/assets/icon_back.svg";
import { BottomBtn } from "@/components/BottomBtn";
import { Input } from "@/components/Input";
import { getUserDefaultImageURL } from "@/utils/getUserDefaultImageURL";
import { svgComponentToFile } from "@/utils/svgComponentToFile";

import { ChatroomAddImgBtn } from "../ChatPage/ChatCreatePage/ChatCreatePage.styled";

const TopBarContainer = styled.div`
  display: flex;
  height: 52px;
  align-items: center;
`;

const BackBtn = styled.img`
  width: 36px;
  height: 36px;
  cursor: pointer;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 132px;
`;

const SpaceImage = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 12px;
  margin-bottom: 20px;
`;

const SpaceTitle = styled.span`
  font-size: 24px;
  font-weight: semi-bold;
  margin-bottom: 20px;
`;
const SpaceInfo = styled.span`
  height: 22px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.BG500};
`;

const Count = styled.span`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: ${({ theme }) => theme.colors.BG500};
`;

const NameInput = styled(Input)`
  padding-right: 4rem; /* Count를 위한 여유 공간 */
  margin-top: 8px;
`;

const SpaceJoinBottomBtn = styled(BottomBtn)`
  display: fixed;
  width: 320px;
  bottom: 0;
  margin: 0;
`;

const InviteSpace = () => {
  const navigate = useNavigate();
  const {
    state: { spaceInfo },
  }: { state: { spaceInfo: SpaceInfoType } } = useLocation();

  const [currentStep, setCurrentStep] = useState(1);
  const [spacename, setSpacename] = useState("");
  const [spaceUserMsg, setSpaceUserMsg] = useState("");
  const maxChars = 12;

  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const defaultImage: File = svgComponentToFile(
    CharacterImgs[Math.floor(Math.random() * CharacterImgs.length)],
  );

  useEffect(() => {
    //TODO: spaceInfo가 없을 때의 더미 데이터
    if (!spaceInfo) {
      const tempJson = {
        image: "https://placehold.co/160x160",
        title: "작업 안하면 죽는 방",
        created: "2024년 06월 20일",
        members: 20,
      };
    }
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= maxChars) {
      setSpacename(value);
    }
  };

  const handleNextButtonClick = () => {
    if (currentStep === 2) {
      //TODO: 가입하기 API 호출 / userImg, userName
      SpaceUserJoinApi(
        spaceInfo.spaceId,
        uploadedImage ?? defaultImage,
        spacename,
        spaceUserMsg,
      ).then((res) => {
        if (res) navigate("/");
      });
    }
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePreviousButtonClick = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleImageImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    image && setUploadedImage(image);
  };

  return (
    <div style={{ width: "320px", margin: "auto" }}>
      {currentStep === 1 && (
        <InfoContainer>
          <SpaceImage src={spaceInfo.profileImgUrl ?? getUserDefaultImageURL(spaceInfo.spaceId)} />
          <SpaceTitle>{spaceInfo.spaceName}</SpaceTitle>
          <div>
            <div style={{ marginBottom: "0.5rem" }}>
              <SpaceInfo style={{ marginRight: "0.75rem" }}>개설일</SpaceInfo>
              <SpaceInfo>
                {isNaN(Date.parse(spaceInfo.createdAt ?? ""))
                  ? spaceInfo.createdAt
                  : spaceInfo.createdAt &&
                    new Date(spaceInfo.createdAt).toLocaleDateString("ko-KR")}
              </SpaceInfo>
            </div>
            <div>
              <SpaceInfo style={{ marginRight: "0.75rem" }}>멤버</SpaceInfo>
              <SpaceInfo>{spaceInfo.memberNum}명</SpaceInfo>
            </div>
          </div>
        </InfoContainer>
      )}
      {currentStep === 2 && (
        <div>
          <TopBarContainer>
            <BackBtn src={back} onClick={handlePreviousButtonClick} />
          </TopBarContainer>

          <ChatroomAddImgBtn $backgroundImage={URL.createObjectURL(uploadedImage ?? defaultImage)}>
            <img src={ChatroomImg} alt="Chatroom Image" />
            <input type="file" accept="image/*" onChange={handleImageImport} />
          </ChatroomAddImgBtn>

          <div style={{ marginTop: "16px" }}>
            이름
            <div style={{ position: "relative" }}>
              <NameInput
                value={spacename}
                onChange={handleInputChange}
                placeholder="스페이스에서 사용할 이름"
              />
              <Count>
                {spacename.length}/{maxChars}
              </Count>
            </div>
          </div>

          <div style={{ marginTop: "16px" }}>
            상태 메세지
            <div style={{ position: "relative" }}>
              <NameInput
                value={spaceUserMsg}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= maxChars * 5) {
                    setSpaceUserMsg(value);
                  }
                }}
                placeholder="스페이스 상태 메세지"
              />
              <Count>
                {spaceUserMsg.length}/{maxChars * 5}
              </Count>
            </div>
          </div>
        </div>
      )}
      <SpaceJoinBottomBtn
        disabled={currentStep === 2 && spacename === "" ? true : false}
        onClick={handleNextButtonClick}
      >
        가입하기
      </SpaceJoinBottomBtn>
    </div>
  );
};

export default InviteSpace;
