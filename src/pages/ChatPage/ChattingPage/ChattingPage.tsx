import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import {
  ChatFile,
  ChatImage,
  ChatMessageFrame,
  ChatPay,
  ChatPost,
  Chatroom,
  ChatroomLeave,
  ChatSendRequestFrame,
  ChatText,
  SocketConnect,
  SocketDisconnect,
  SpaceSearchUserProfile,
} from "@/apis";
import MenuBtnImg from "@/assets/ChatPage/btn_menu.svg";
import SendBtnImg from "@/assets/ChatPage/btn_send.svg";
import XIcon from "@/assets/ChatPage/icon_x.svg";
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
  FileChatView,
  FilePreview,
  ImgPreview,
  StyledMessage,
} from "@/pages/ChatPage/ChattingPage/ChattingPage.styled";
import { SPACE_ID } from "@/utils/constants";
import { decodedJWT } from "@/utils/decodedJWT";
import { getUserDefaultImageURL } from "@/utils/getUserDefaultImageURL";
import { isoStringToDateString } from "@/utils/isoStringToDateString";
import { splitDownloadURL } from "@/utils/splitDownloadURL";

const MAX_FILE_SIZE_MB = 2; // 최대 파일 크기 (메가바이트 단위)
const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024; // 바이트

const ChattingPage = () => {
  const param = useParams();
  const {
    state: { chatroomInfo },
  }: { state: { chatroomInfo: Chatroom } } = useLocation();
  const spaceId = Number(localStorage.getItem("spaceId")) || SPACE_ID;

  const stompClient = useRef<any>(null);

  const [messages, setMessages] = useState<ChatMessageFrame[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const [isManager, setIsManager] = useState<boolean>(false);
  const [onMenu, setOnMenu] = useState<boolean>(false);

  const [uploadedImage, setUploadedImage] = useState<string | null>();
  const [inputKey, setInputKey] = useState<number>(0);

  const [fileData, setFileData] = useState<ChatFile | null>(null);

  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const chattingTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  // subscribe 시 받아온 채팅 로그 설정
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChatMessage = (message: any) => {
    if (message.body) {
      const msg = JSON.parse(message.body);
      if (msg.chatMessageLog) {
        console.log(msg.chatMessageLog);
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
    return () => {
      SocketDisconnect(stompClient);
      ChatroomLeave(chatroomInfo.id).then((res) => console.log(res)); //사용자 채팅방 떠남 알려주기 (unsubscribe..?)
    };
  }, [param.id, spaceId, chatroomInfo.id]);

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
        setInputValue("");
      } else if (messageType === "IMG" && uploadedImage) {
        body.content = { image: uploadedImage }; // 인코딩된 base64 이미지 url
        //console.log(uploadedImage);
        setUploadedImage(null);
        setInputKey((prevKey) => prevKey + 1); // input 리셋
      } else if (messageType === "FILE" && fileData) {
        body.content = fileData; // 인코딩된 base64 파일 url
        setFileData(null);
        setInputKey((prevKey) => prevKey + 1); // input 리셋
      }
      // console.log(body.content);
      // console.log(stompClient.current);
      stompClient.current.send(`/app/chat/${param.id}`, {}, JSON.stringify(body));
    }
  };

  // const handleFileDownload = (url: string, fileName: string) => {
  //   fetch(url)
  //     .then((response) => response.blob())
  //     .then((blob) => {
  //       const blobUrl = window.URL.createObjectURL(blob);
  //       const link = document.createElement("a");
  //       link.href = blobUrl;
  //       link.download = fileName;
  //       document.body.appendChild(link);
  //       link.click();
  //       document.body.removeChild(link);
  //       window.URL.revokeObjectURL(blobUrl);
  //     })
  //     .catch((error) => console.error("Download failed:", error));
  // };

  const renderMessageContent = (msg: ChatMessageFrame) => {
    // console.log(msg.senderName, username);
    // console.log("개별msg: ", msg);
    switch (msg.messageType) {
      case "TEXT":
        msg.content = msg.content as ChatText;
        return msg.content.text;
      case "IMG":
        //console.log("image: ", msg.content);
        msg.content = msg.content as ChatImage;
        return <img className="msg-img" src={msg.content.image} alt="img" />;
      case "FILE":
        msg.content = msg.content as ChatFile;
        return (
          <a
            href={`/image${splitDownloadURL(msg.content.file)}`}
            download={msg.content.fileName}
            target="_blank"
            type="application/octet-stream"
            rel="noreferrer"
          >
            <FileChatView $isUser={true}>
              <img className="filelogo" src={FileBtnImg} alt="uploaded" />
              <div>
                <p>{msg.content.fileName}</p>
                <p>유효기간 : ~ {isoStringToDateString(msg.content.dueDate)}</p>
              </div>
            </FileChatView>
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
    // console.log(e.target.files);
    const image = e.target.files?.[0];

    if (image) {
      // 파일 크기 검사
      if (image.size > MAX_FILE_SIZE) {
        alert(`파일 크기가 ${MAX_FILE_SIZE_MB}MB를 초과합니다.`);
        return;
      }
      if (!image.type.includes("image")) {
        alert("이미지 파일만 업로드 가능합니다.");
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(image as Blob);
    }
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.files);
    const file = e.target.files?.[0];

    if (file) {
      // 파일 크기 검사
      if (file.size > MAX_FILE_SIZE) {
        alert(`파일 크기가 ${MAX_FILE_SIZE_MB}MB를 초과합니다.`);
        return;
      }
      console.log("file", file?.type);

      const reader = new FileReader();

      reader.onload = () => {
        setFileData({
          file: reader.result as string,
          fileName: file.name,
          fileSize: file.size.toString(),
          dueDate: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString(), //유효기간: 3일
        });
      };

      reader.readAsDataURL(file);
    }
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

      {uploadedImage && (
        <ImgPreview>
          <img src={uploadedImage} alt="uploaded" />
          <button
            onClick={() => {
              setUploadedImage(null);
              setInputKey((prevKey) => prevKey + 1); // key를 변경하여 input을 리셋
            }}
          >
            <img alt="XIcon" src={XIcon} />
          </button>
        </ImgPreview>
      )}
      {fileData && (
        <FilePreview $isUser={true}>
          <img src={FileBtnImg} alt="uploaded" />
          <div>
            <p>{fileData.fileName}</p>
            <p>유효기간 : ~ {isoStringToDateString(fileData.dueDate)}</p>
          </div>

          <button
            onClick={() => {
              setFileData(null);
              setInputKey((prevKey) => prevKey + 1); // key를 변경하여 input을 리셋
            }}
          >
            <img alt="XIcon" src={XIcon} />
          </button>
        </FilePreview>
      )}

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
                e.preventDefault();
                if (inputValue === "") {
                  return;
                }
                sendMessageS("TEXT");
              }
            }}
          />
          <button
            onClick={() => {
              inputValue !== "" && sendMessageS("TEXT");
              uploadedImage && sendMessageS("IMG");
              fileData && sendMessageS("FILE");
            }}
          >
            <img className="send" alt="Send button" src={SendBtnImg} />
          </button>
        </div>
        {onMenu && (
          <div className="menu-on">
            <button>
              <img src={PayBtnImg} alt="Pay button" />
              <p>정산하기</p>
            </button>
            <label>
              <img src={PictureBtnImg} alt="Picture button" />
              <input
                key={inputKey}
                type="file"
                accept="image/*"
                onChange={handleImageImport}
                style={{ display: "none" }}
              />
              <p>사진 첨부</p>
            </label>
            <label>
              <img src={FileBtnImg} alt="File button" />
              <input
                key={inputKey}
                type="file"
                onChange={handleFileImport}
                style={{ display: "none" }}
              />
              <p>파일 첨부</p>
            </label>
          </div>
        )}
      </ChattingFooter>
    </ChattingContainer>
  );
};

export default ChattingPage;
