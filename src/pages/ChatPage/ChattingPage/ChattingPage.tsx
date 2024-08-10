import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import SettingIcon from "@/assets/icon_setting.svg";
import TopBarText, { LeftEnum } from "@/components/TopBarText";

import "./Chatting.css";

interface Message {
  id: number;
  user: string;
  profileImg: string;
  time: string;
  message: string;
}

const ChattingPage = () => {
  const param = useParams();
  const { state } = useLocation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [username, setUsername] = useState<string>("");

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
    <div className="chat-container">
      <TopBarText
        left={LeftEnum.Back}
        center={`${state?.title}`}
        right={
          <Link to={`/chat/${param.id}/setting`}>
            <img src={SettingIcon} alt="setting" />
          </Link>
        }
      />
      <div className="chat-header">
        <h2>
          <div>ChattingPage {param.id}</div>
        </h2>
      </div>
      <div className="chat-body">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <div className="message-header">
              <img src={msg.profileImg} alt={`${msg.user}'s profile`} className="profile-img" />
              <span className="user-name">{msg.user}</span>
              <span className="message-time">{new Date(msg.time).toLocaleTimeString()}</span>
            </div>
            <div className="message-content">{msg.message}</div>
          </div>
        ))}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChattingPage;
