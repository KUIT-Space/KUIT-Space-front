import styled, { useTheme } from "styled-components";
import { BoardIcon, ChatIcon, HomeIcon, PayIcon, VoiceIcon } from "@/assets/BottomNavBar/BottomNavBarIcon";
import { Link, matchPath, useLocation } from "react-router-dom";

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
	const { pathname } = useLocation();
	const theme = useTheme();

	const getFillColor = (path: string) => (matchPath(`${path}/*`, pathname) !== null ? theme.colors.normal : theme.colors.BG400);

	return (
		<MenuContainer>
			<Menu to="/voiceroom">
				<VoiceIcon fill={getFillColor("/voiceroom")} />
				보이스룸
			</Menu>
			<Menu to="/chat">
				<ChatIcon fill={getFillColor("/chat")} />
				채팅
			</Menu>
			<Menu to="/">
				<HomeIcon fill={getFillColor("/")} />홈
			</Menu>
			<Menu to="/pay">
				<PayIcon fill={getFillColor("/pay")} />
				정산
			</Menu>
			<Menu to="/board">
				<BoardIcon fill={getFillColor("/board")} />
				게시판
			</Menu>
		</MenuContainer>
	);
};

export default BottomNavBar;
