import TopBarText, { LeftEnum } from "@/components/TopBarText";
import ChatroomImg from "@/assets/ChatPage/btn_chatroom_img.svg";
import { ChatCreateContainer, ChatroomAddImgBtn, ChatroomName } from "./ChatCreatePage.styled";
import { Input } from "@/components/Input";
import { useState } from "react";

const ChatCreatePage = () => {
	const [nameLength, setNameLength] = useState<number>(0);

	return (
		<>
			<TopBarText left={LeftEnum.Back} center="새 채팅방" right="" />
			<ChatroomAddImgBtn>
				<img src={ChatroomImg} />
			</ChatroomAddImgBtn>
			<ChatCreateContainer>
				<div className="input--container">
					<p>채팅방 이름</p>
					<ChatroomName nameLength={nameLength}>
						<Input
							placeholder="채팅방 이름"
							maxLength={15}
							onChange={(e) => {
								setNameLength(e.target.value.length);
							}}
						/>
						<span>{nameLength} / 15</span>
					</ChatroomName>
				</div>
				<div className="input--container">
					<p>멤버 초대 0</p>
					<Input placeholder="이름으로 검색해 보세요" />
				</div>
				<p>멤버 목록</p>
			</ChatCreateContainer>
		</>
	);
};

export default ChatCreatePage;
