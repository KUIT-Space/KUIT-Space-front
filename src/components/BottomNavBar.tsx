import styled from "styled-components";
import board from "@/assets/icon_board.svg";
import chat from "@/assets/icon_chat.svg";
import home from "@/assets/icon_home.svg";
import pay from "@/assets/icon_pay.svg";
import voice from "@/assets/icon_voice.svg";
import { Link } from "react-router-dom";

const MenuContainer = styled.div`
	height: 3.75rem;
	display: flex;
	justify-content: space-evenly;
	background-color: ${({ theme }) => theme.colors.BG800};
	position: sticky;
	bottom: 0;
	user-select: none;
`;

const Menu = styled(Link)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 3rem;
	font-size: 0.875rem;
`;

const BottomNavBar = () => {
	return (
		<MenuContainer>
			<Menu to="/voiceroom">
				<img src={voice} />
				보이스룸
			</Menu>
			<Menu to="/chat">
				<img src={chat} />
				채팅
			</Menu>
			<Menu to="/">
				<img src={home} />홈
			</Menu>
			<Menu to="/voiceroom">
				<img src={pay} />
				정산
			</Menu>
			<Menu to="/voiceroom">
				<img src={board} />
				게시판
			</Menu>
		</MenuContainer>
	);
};

export default BottomNavBar;
