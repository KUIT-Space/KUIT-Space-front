import TopBarText, { LeftEnum } from "@/components/TopBarText";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatListContainer, ChatContainer } from "./ChatPage.styled";
import { AddChatBtn } from "./ChatAddBtn.styled";

const ChatPage = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    //admin 확인 부분
    setIsAdmin(true);
  }, []);

  const tempJson = {
    chatList: [
      {
        id: 1,
        image: "https://placehold.co/40x40",
        title: "작죽디수다방",
        time: "오늘 오후 4:15",
        detail: "채팅 내용은 이렇습니다.",
        chat_num: "999",
      },
      {
        id: 2,
        image: "https://placehold.co/40x40",
        title: "작죽디수다방",
        time: "오늘 오후 4:15",
        detail: "채팅 내용은 이렇습니다.",
        chat_num: "999",
      },
      {
        id: 3,
        image: "https://placehold.co/40x40",
        title: "작죽디수다방",
        time: "오늘 오후 4:15",
        detail: "채팅 내용은 이렇습니다.",
        chat_num: "999",
      },
      {
        id: 4,
        image: "https://placehold.co/40x40",
        title: "작죽디수다방",
        time: "오늘 오후 4:15",
        detail: "채팅 내용은 이렇습니다.",
        chat_num: "999",
      },
      {
        id: 5,
        image: "https://placehold.co/40x40",
        title: "작죽디수다방",
        time: "오늘 오후 4:15",
        detail: "채팅 내용은 이렇습니다.",
        chat_num: "999",
      },
      {
        id: 6,
        image: "https://placehold.co/40x40",
        title: "작죽디수다방",
        time: "오늘 오후 4:15",
        detail: "채팅 내용은 이렇습니다.",
        chat_num: "999",
      },
      {
        id: 7,
        image: "https://placehold.co/40x40",
        title: "작죽디수다방",
        time: "오늘 오후 4:15",
        detail: "채팅 내용은 이렇습니다.",
        chat_num: "999",
      },
      {
        id: 8,
        image: "https://placehold.co/40x40",
        title: "작죽디수다방",
        time: "오늘 오후 4:15",
        detail: "채팅 내용은 이렇습니다.",
        chat_num: "999",
      },
      {
        id: 9,
        image: "https://placehold.co/40x40",
        title: "작죽디수다방",
        time: "오늘 오후 4:15",
        detail: "채팅 내용은 이렇습니다.",
        chat_num: "999",
      },
    ],
  };

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
