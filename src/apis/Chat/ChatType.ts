export interface ChatText {
  text: string;
}

export interface ChatImage {
  image: string; //Base64로 인코딩된 문자열 형태의 이미지 전송 (‘data:image/png;base64,….’ 형태)
}

export interface ChatFile {
  file: string; // Base64로 인코딩된 문자열 형태의 파일 전송
  fileName: string; // 파일명
  fileSize: string;
  dueDate: string;
}

export interface ChatPay {
  myPrice: string;
  totalPrice: string;
  creator: string;
}

export interface ChatPost {
  title: string;
  summary: string;
  creator: string;
}

export type ChatContent = ChatText | ChatImage | ChatFile | ChatPay | ChatPost;

export interface ChatSendRequestFrame {
  messageType: "TEXT" | "IMG" | "FILE" | "POST" | "PAY";
  content: ChatContent;
  spaceId?: number;
}

export interface ChatMessageFrame extends ChatSendRequestFrame {
  createAt: string;
  senderImg: string | null;
  senderName: string;
  senderId: number;
}
