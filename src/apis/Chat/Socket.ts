import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export const SocketConnect = (
  stompClient: any,
  chatRoomId: string,
  handleChatMessage: (message: any) => void,
) => {
  const socket = new SockJS("https://project-space.xyz/ws");
  stompClient.current = Stomp.over(socket);

  const token = localStorage.getItem("Authorization");
  if (!token || !stompClient.current.onConnect) {
    //로그인 오류 처리
    alert("로그인이 필요합니다.");
    return;
  }

  stompClient.current.connect(
    { Authorization: token },
    () => {
      stompClient.current.subscribe(`/topic/chat/${chatRoomId}`, handleChatMessage);
    },
    // {
    //   heartbeat: {
    //     outgoing: 20000, // 클라이언트가 서버로 보내는 heartbeat 간격 (20초)
    //     incoming: 20000, // 서버가 클라이언트로부터 기대하는 heartbeat 간격 (20초)
    //   },
    //   reconnect_delay: 5000, // 재연결 시도 간격 (5초)
    // }
  );
};

// 웹소켓 연결 해제
export const SocketDisconnect = (stompClient: any) => {
  if (stompClient.current) {
    stompClient.current.disconnect();
  }
};
