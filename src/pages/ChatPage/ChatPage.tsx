import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TopBarText, { LeftEnum } from "@/components/TopBarText";

import { tempJson } from "./_testChatList";
import { AddChatBtn } from "./ChatAddBtn.styled";
import { ChatContainer, ChatListContainer } from "./ChatPage.styled";

const ChatPage = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    //admin 확인 부분
    setIsAdmin(true);

    //fetch로 data 받아오는 부분
  }, []);

  return (
    <>
      <TopBarText left={LeftEnum.Logo} center="채팅방" right=""></TopBarText>
      <ChatListContainer>
        {tempJson.chatList.map((chat) => {
          return (
            <ChatContainer
              key={chat.id}
              onClick={() => {
                navigate(`/chat/${chat.id}`);
              }}
            >
              <img className="chat-btn-img" alt="chat-btn-img" src={chat.image} />
              <div className="chat--container">
                <div className="chat-btn--title-time--container">
                  <div className="chat-btn-title">{chat.title}</div>
                  <div className="chat-btn-time">{chat.time}</div>
                </div>
                <div className="chat-btn--detail-chatNum--container">
                  <div className="chat-btn-detail">{chat.detail}</div>
                  <div className="chat-btn-chatNum">{chat.chat_num}</div>
                </div>
              </div>
            </ChatContainer>
          );
        })}
      </ChatListContainer>

      {isAdmin && (
        <AddChatBtn
          onClick={() => {
            navigate(`/chat/create`);
          }}
        />
      )}
    </>
  );
};

export default ChatPage;
