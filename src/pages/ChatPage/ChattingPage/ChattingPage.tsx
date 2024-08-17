import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import { ChatMessageFrame, ChatSendRequestFrame, SocketConnect, SocketDisconnect } from "@/apis";
import MenuBtnImg from "@/assets/ChatPage/btn_menu.svg";
import SendBtnImg from "@/assets/ChatPage/btn_send.svg";
import FileBtnImg from "@/assets/ChatPage/menu_btn_file.svg";
import PayBtnImg from "@/assets/ChatPage/menu_btn_pay.svg";
import PictureBtnImg from "@/assets/ChatPage/menu_btn_picture.svg";
import SettingIcon from "@/assets/icon_setting.svg";
import TopBarText, { LeftEnum } from "@/components/TopBarText";

import {
  ChattingBody,
  ChattingContainer,
  ChattingFooter,
  ChattingTextarea,
  StyledMessage,
} from "./ChattingPage.styled";

const ChattingPage = () => {
  const param = useParams();
  const { state } = useLocation();

  const stompClient = useRef<any>(null);

  // const [ws, setWs] = useState<WebSocket | null>(null);

  const [messages, setMessages] = useState<ChatMessageFrame[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  // const [username, setUsername] = useState<string>("");
  const [onMenu, setOnMenu] = useState<boolean>(false);

  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const chattingTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  // subscribe 시 받아온 채팅 로그 설정
  const handleChatMessage = (message: any) => {
    if (message.body) {
      const msg = JSON.parse(message.body);
      if (msg.chatMessageLog) {
        // setLogData(msg.chatMessageLog);
        console.log(msg.chatMessageLog);
        setMessages((prevMessages) => [...prevMessages, msg.chatMessageLog]);
      }
    }
  };

  /** 소켓 초기 연결 및 기존 메세지 받아오기
   *
   */
  useEffect(() => {
    // //temp test username
    // const sessionUsername = sessionStorage.getItem("username");
    // if (sessionUsername) {
    //   setUsername(sessionUsername);
    // } else {
    //   const newUsername = `익명(${Math.floor(Math.random() * 10)})`;
    //   sessionStorage.setItem("username", newUsername);
    //   setUsername(newUsername);
    // }

    //
    SocketConnect(stompClient, param.id || "", handleChatMessage);

    return () => SocketDisconnect(stompClient);
  }, [param.id]);

  //
  //
  //
  useEffect(() => {
    //항상 새로운 메세지 위치로 view 스크롤 위함
    messageEndRef.current?.scrollIntoView();
  }, [messages]);

  useEffect(() => {
    //textarea에 입력된 줄 만큼 footer 키우기 위함
    if (chattingTextareaRef?.current) {
      chattingTextareaRef.current.style.height = "auto";
      chattingTextareaRef.current.style.height =
        (chattingTextareaRef.current.scrollHeight / 16).toString() + "rem";
    }
  }, [inputValue]);

  // const sendMessage = () => {
  //   if (inputValue && ws) {
  //     const newMessage: Message = {
  //       id: messages.length + 1,
  //       user: username,
  //       profileImg: "https://placehold.co/40x40",
  //       time: new Date().toISOString(),
  //       message: inputValue,
  //     };
  //     ws.send(JSON.stringify(newMessage));
  //     setInputValue("");
  //   }
  // };

  //메세지 전송
  const sendMessageS = (messageType: ChatSendRequestFrame["messageType"]) => {
    if (stompClient.current) {
      const spaceId = Number.parseInt(localStorage.getItem("spaceId") ?? "");
      const body = {
        spaceId: isNaN(spaceId) ? 3 : spaceId, // 임의로 설정한 스페이스 아이디
        messageType: messageType, // 메시지 타입
        content: {}, // 내용 초기화
      };

      if (messageType === "TEXT") {
        body.content = { text: inputValue };
      }
      //  else if (messageType === "IMG") {
      //   body.content.image = imgData.image; // 인코딩된 base64 이미지 url
      //   // console.log(imgData.image);
      // } else if (messageType === "FILE" && fileData) {
      //   body.content = fileData; // 인코딩된 base64 파일 url
      // }
      // console.log(body.content);
      //console.log(stompClient.current);
      stompClient.current.send(`/app/chat/${param.id}`, {}, JSON.stringify(body));
      setInputValue("");
      //setFileData(null);
    }
  };

  return (
    <ChattingContainer>
      <TopBarText
        left={LeftEnum.Back}
        center={`${state?.title}`}
        right={
          <Link to={`/chat/${param.id}/setting`}>
            <img src={SettingIcon} alt="setting" />
          </Link>
        }
      />

      <ChattingBody>
        {messages.map((msg, index) =>
          msg.senderName === username ? (
            <StyledMessage key={index} className="message" $isUser={true}>
              <div className="message-content-container">
                <span className="message-time">
                  {new Date(msg.time).toLocaleTimeString().slice(0, -3)}
                </span>
                <div className="message-content">{msg.message}</div>
              </div>
            </StyledMessage>
          ) : (
            <StyledMessage key={index} className="message" $isUser={false}>
              <div className="message-header">
                <img src={msg.profileImg} alt={`${msg.user}'s profile`} className="profile-img" />
                <span className="user-name">{msg.user}</span>
              </div>
              <div className="message-content-container">
                <div className="message-content">{msg.message}</div>
                <span className="message-time">
                  {new Date(msg.time).toLocaleTimeString().slice(0, -3)}
                </span>
              </div>
            </StyledMessage>
          ),
        )}
        <div ref={messageEndRef}></div>
      </ChattingBody>

      <ChattingFooter $onMenu={onMenu}>
        <div className="chatting-input">
          <button onClick={() => setOnMenu(!onMenu)}>
            <img className="menu" alt="Menu button" src={MenuBtnImg} />
          </button>
          <ChattingTextarea
            rows={1}
            ref={chattingTextareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button onClick={() => sendMessageS("TEXT")}>
            <img className="send" alt="Send button" src={SendBtnImg} />
          </button>
        </div>
        {onMenu && (
          <div className="menu-on">
            <button>
              <img src={PayBtnImg} alt="Pay button" />
              <p>정산하기</p>
            </button>
            <button>
              <img src={PictureBtnImg} alt="Picture button" />
              <p>사진/동영상 첨부</p>
            </button>
            <button>
              <img src={FileBtnImg} alt="File button" />
              <p>파일 첨부</p>
            </button>
          </div>
        )}
      </ChattingFooter>
    </ChattingContainer>
  );
};

export default ChattingPage;
