import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ChatFile, ChatImage, ChatPay, Chatroom, chatroomSearchAllApi, ChatText } from "@/apis";
import TopBarText, { LeftEnum } from "@/components/TopBarText";
import { formattedDateTime_convertUTC9 } from "@/utils/formattedDateTime";

import { AddChatBtn } from "./ChatAddBtn.styled";
import { ChatContainer, ChatListContainer } from "./ChatPage.styled";

const ChatPage = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [chatroomList, setChatroomList] = useState<Chatroom[]>([]);

  useEffect(() => {
    //admin 확인 부분
    setIsAdmin(true);

    // fetch로 data 받아오는 부분
    // 임시로 LOCALSTORAGE에 spaceId 3으로 저장
    localStorage.setItem("spaceId", "3");
    //
    const spaceId = localStorage.getItem("spaceId");
    if (spaceId !== null) {
      chatroomSearchAllApi(Number.parseInt(spaceId))
        .then((res) => {
          if (res === null) {
            window.confirm(
              "채팅방 정보를 불러오는데 실패했습니다. 로그인 화면으로 이동하겠습니까?",
            );
            navigate("/login");
          } else {
            setChatroomList(res.result.chatRoomList);
          }
        })
        .catch((err) => {
          console.error(err);
          setChatroomList([]);
        });
    }
  }, [navigate]);

  const renderLastMsg = (chat: Chatroom) => {
    if ("text" in chat.lastMsg) {
      return (chat.lastMsg as ChatText).text;
    } else if ("image" in chat.lastMsg) {
      return <img src={(chat.lastMsg as ChatImage).image} alt="chat-img" />;
    } else if ("fileName" in chat.lastMsg) {
      return "[파일] " + (chat.lastMsg as ChatFile).fileName;
    } else if ("myPrice" in chat.lastMsg) {
      return `[결제] ${(chat.lastMsg as ChatPay).creator}님의 ${(chat.lastMsg as ChatPay).totalPrice}원 정산 요청!`;
    }
  };

  return (
    <>
      <TopBarText left={LeftEnum.Logo} center="채팅방" right=""></TopBarText>
      <ChatListContainer>
        {chatroomList.map((chat) => {
          return (
            <ChatContainer
              key={chat.id}
              onClick={() => {
                navigate(`/chat/${chat.id}`, { state: { title: chat.name } });
              }}
            >
              <img className="chat-btn-img" alt="chat-btn-img" src={chat.imgUrl} />
              <div className="chat--container">
                <div className="chat-btn--title-time--container">
                  <div className="chat-btn-title">{chat.name}</div>
                  <div className="chat-btn-time">
                    {formattedDateTime_convertUTC9(chat.lastTime)}
                  </div>
                </div>
                <div className="chat-btn--detail-chatNum--container">
                  <div className="chat-btn-detail">{renderLastMsg(chat)}</div>
                  {chat.unreadMsgCount > 0 && (
                    <div className="chat-btn-chatNum">{chat.unreadMsgCount}</div>
                  )}
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
