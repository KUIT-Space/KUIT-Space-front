import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import { Chatroom } from "@/apis";
import { ChatroomUpdateNameApi } from "@/apis/Chat/ChatroomUpdateNameApi";
import { Input } from "@/components/Input";
import TopBarText, { LeftEnum } from "@/components/TopBarText";

import {
  ChatCreateContainer,
  ChatroomAddImgBtn,
  ChatroomName,
} from "../ChatCreatePage/ChatCreatePage.styled";

const StyledMenu = styled.div`
  display: flex;
  height: 3.5rem;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 1.5rem;
  cursor: pointer;
  user-select: none;
`;

const StyledTitleMenu = styled(StyledMenu)`
  height: 100%;
  flex-direction: column;
`;

const TextButton = styled.button<{ $nameLength: number }>`
  font-size: 1rem;
  color: ${({ theme, $nameLength }) =>
    $nameLength > 0 ? theme.colors.normal : theme.colors.BG500};
  cursor: ${({ $nameLength }) => ($nameLength > 0 ? "pointer" : "default")};
`;

const ChatSettingNamePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    state: { chatroomInfo },
  }: { state: { chatroomInfo: Chatroom } } = useLocation();

  const [name, setName] = useState<string>(chatroomInfo.name);

  const handleSaveChatName = () => {
    // 채팅방 이름 수정 API 호출
    const spaceId = Number(localStorage.getItem("spaceId"));
    ChatroomUpdateNameApi(spaceId, chatroomInfo.id, name).then((res) => {
      if (res) {
        if (res.status === "OK") {
          navigate(`/chat`);

          //TODO: 채팅방name(title) 정보를 받으려면 "전체 채팅방 조회" API 호출 뿐이어서, navigate /chat으로 함. 추후 수정 필요
          //navigate(`/chat/${id}/setting`, { state: { chatroomInfo }, replace: true });
          //navigate(-1);
        }
      }
    });
  };

  return (
    <>
      <TopBarText
        left={LeftEnum.Back}
        center={`${chatroomInfo.name} 채팅방 편집`}
        right={
          <TextButton $nameLength={name.length} onClick={handleSaveChatName}>
            저장
          </TextButton>
        }
      />

      <StyledTitleMenu style={{ cursor: "default" }}>
        <ChatroomAddImgBtn $backgroundImage={chatroomInfo.imgUrl} />

        <ChatCreateContainer>
          <div className="input--container">
            <p>채팅방 이름</p>
            <ChatroomName $nameLength={name.length}>
              <Input
                placeholder="채팅방 이름"
                maxLength={15}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <span>{name.length} / 15</span>
            </ChatroomName>
          </div>
        </ChatCreateContainer>
      </StyledTitleMenu>
    </>
  );
};

export default ChatSettingNamePage;
