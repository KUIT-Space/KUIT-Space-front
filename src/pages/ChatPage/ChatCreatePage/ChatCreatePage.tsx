import TopBarText, { LeftEnum } from "@/components/TopBarText";
import ChatroomImg from "@/assets/ChatPage/btn_chatroom_img.svg";
import styled from "styled-components";

const ChatroomAddImgBtn = styled.button`
	display: flex;
	width: 8.5rem;
	height: 8.5rem;
	padding: 2.25rem;
	justify-content: center;
	align-items: center;
	flex-shrink: 0;

	border-radius: 0.75rem;
	background: var(--Foundation-Gray-gray500, #767681);
`;

const ChatCreatePage = () => {
	return (
		<>
			<TopBarText left={LeftEnum.Back} center="새 채팅방" right="" />
			<ChatroomAddImgBtn>
				<img src={ChatroomImg} />
			</ChatroomAddImgBtn>
		</>
	);
};

export default ChatCreatePage;
