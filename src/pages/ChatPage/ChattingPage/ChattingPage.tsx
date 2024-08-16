import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

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

interface Message {
  id: number;
  user: string;
  profileImg: string;
  time: string;
  message: string;
  is정산?: boolean;
}

const ChattingPage = () => {
  const param = useParams();
  const { state } = useLocation();

  const [ws, setWs] = useState<WebSocket | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const [username, setUsername] = useState<string>("");
  const [onMenu, setOnMenu] = useState<boolean>(false);

  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const chattingTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    //temp test username
    const sessionUsername = sessionStorage.getItem("username");
    if (sessionUsername) {
      setUsername(sessionUsername);
    } else {
      const newUsername = `익명(${Math.floor(Math.random() * 10)})`;
      sessionStorage.setItem("username", newUsername);
      setUsername(newUsername);
    }

    //connect to websocket
    const websocket = new WebSocket("ws://localhost:8080");

    websocket.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    websocket.onmessage = (event) => {
      const newMessages: Message[] = JSON.parse(event.data);
      setMessages(newMessages);
    };

    websocket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    setWs(websocket);

    return () => {
      websocket.close();
    };
  }, []);

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

  const sendMessage = () => {
    if (inputValue && ws) {
      const newMessage: Message = {
        id: messages.length + 1,
        user: username,
        profileImg: "https://placehold.co/40x40",
        time: new Date().toISOString(),
        message: inputValue,
      };
      ws.send(JSON.stringify(newMessage));
      setInputValue("");
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
          msg.user === username ? (
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
          <button onClick={sendMessage}>
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
