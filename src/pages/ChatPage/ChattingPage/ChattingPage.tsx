import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import {
  ChatFile,
  ChatImage,
  ChatMessageFrame,
  ChatPay,
  ChatPost,
  Chatroom,
  ChatSendRequestFrame,
  ChatText,
  SocketConnect,
  SocketDisconnect,
  SpaceSearchUserProfile,
} from "@/apis";
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
} from "@/pages/ChatPage/ChattingPage/ChattingPage.styled";
import { decodedJWT } from "@/utils/decodedJWT";
import { getUserDefaultImageURL } from "@/utils/getUserDefaultImageURL";

const ChattingPage = () => {
  const param = useParams();
  const {
    state: { chatroomInfo },
  }: { state: { chatroomInfo: Chatroom } } = useLocation();
  const spaceId = Number(localStorage.getItem("spaceId")) || 3;

  const stompClient = useRef<any>(null);

  const [messages, setMessages] = useState<ChatMessageFrame[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const [isManager, setIsManager] = useState<boolean>(false);
  const [onMenu, setOnMenu] = useState<boolean>(false);

  const [uploadedImage, setUploadedImage] = useState<string>();

  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const chattingTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  // subscribe 시 받아온 채팅 로그 설정
  const handleChatMessage = (message: any) => {
    if (message.body) {
      const msg = JSON.parse(message.body);
      if (msg.chatMessageLog) {
        //console.log(msg.chatMessageLog);
        setMessages((prevMessages) => [...prevMessages, ...msg.chatMessageLog]);
      } else {
        setMessages((prevMessages) => [...prevMessages, msg]);
      }
    }
  };

  /** 소켓 초기 연결 및 기존 메세지 받아오기
   *
   */
  useEffect(() => {
    SpaceSearchUserProfile(spaceId).then((res) => {
      if (res) setIsManager(res.result.userAuth === "manager");
    });

    SocketConnect(stompClient, param.id || "", handleChatMessage);
    return () => SocketDisconnect(stompClient);
  }, [param.id, spaceId]);

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

  //메세지 전송
  const sendMessageS = (messageType: ChatSendRequestFrame["messageType"]) => {
    if (stompClient.current) {
      const body = {
        spaceId: spaceId, // 임의로 설정한 스페이스 아이디
        messageType: messageType, // 메시지 타입
        content: {}, // 내용 초기화
      };

      if (messageType === "TEXT") {
        body.content = { text: inputValue };
      } else if (messageType === "IMG") {
        body.content = { image: uploadedImage }; // 인코딩된 base64 이미지 url
        // console.log(imgData.image);
      }
      // else if (messageType === "FILE" && fileData) {
      //   body.content = fileData; // 인코딩된 base64 파일 url
      // }
      // console.log(body.content);
      //console.log(stompClient.current);
      stompClient.current.send(`/app/chat/${param.id}`, {}, JSON.stringify(body));
      setInputValue("");
      //setFileData(null);
    }
  };

  const renderMessageContent = (msg: ChatMessageFrame) => {
    // console.log(msg.senderName, username);
    // console.log("개별msg: ", msg);
    switch (msg.messageType) {
      case "TEXT":
        msg.content = msg.content as ChatText;
        console.log(msg.content.text);
        return msg.content.text;
      case "IMG":
        msg.content = msg.content as ChatImage;
        return <img src={msg.content.image} alt="img" />;
      case "FILE":
        msg.content = msg.content as ChatFile;
        return (
          <a href={msg.content.file} download={msg.content.fileName}>
            {msg.content.fileName}
          </a>
        );
      case "PAY":
        msg.content = msg.content as ChatPay;
        return (
          <>
            <p>정산금액: {msg.content.myPrice}</p>
            <p>총 금액: {msg.content.totalPrice}</p>
            <p>생성자: {msg.content.creator}</p>
          </>
        );
      case "POST":
        msg.content = msg.content as ChatPost;
        return (
          <>
            <p>제목: {msg.content.title}</p>
            <p>요약: {msg.content.summary}</p>
            <p>생성자: {msg.content.creator}</p>
          </>
        );
      default:
        return <></>;
    }
  };

  const handleImageImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    const reader = new FileReader();

    reader.readAsDataURL(image as Blob);
    reader.onload = () => {
      setUploadedImage(reader.result as string);
    };
    // image && setUploadedImage(image);
  };

  return (
    <ChattingContainer>
      <TopBarText
        left={LeftEnum.Back}
        center={`${chatroomInfo.name}`}
        right={
          <Link
            to={`/chat/${param.id}/setting`}
            state={{ chatroomInfo: chatroomInfo, isManager: isManager }}
          >
            <img src={SettingIcon} alt="setting" />
          </Link>
        }
      />

      <ChattingBody>
        {messages.map((msg, index) =>
          msg.senderId === decodedJWT()?.userId ? (
            <StyledMessage key={index} className="message" $isUser={true}>
              <div className="message-content-container">
                <span className="message-time">
                  {new Date(msg.createdAt).toLocaleTimeString().slice(0, -3)}
                </span>
                <div className="message-content">{renderMessageContent(msg)}</div>
              </div>
            </StyledMessage>
          ) : (
            <StyledMessage key={index} className="message" $isUser={false}>
              <div className="message-header">
                <img
                  src={msg.senderImg ?? getUserDefaultImageURL(msg.senderId)}
                  alt={`${msg.senderName}'s profile`}
                  className="profile-img"
                />
                <span className="user-name">{msg.senderName}</span>
              </div>
              <div className="message-content-container">
                <div className="message-content">{renderMessageContent(msg)}</div>
                <span className="message-time">
                  {new Date(msg.createdAt).toLocaleTimeString().slice(0, -3)}
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
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                if (inputValue === "") {
                  e.preventDefault();
                  return;
                }
                sendMessageS("TEXT");
              }
            }}
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
              <input type="file" accept="image/*" onChange={handleImageImport} />
              <p>사진 첨부</p>
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
