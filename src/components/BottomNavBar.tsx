import styled, { useTheme } from "styled-components";
import {
  BoardIcon,
  ChatIcon,
  HomeIcon,
  MenuIcon,
  PayIcon,
} from "@/assets/BottomNavBar/BottomNavBarIcon";
import { Link, matchPath, useLocation } from "react-router-dom";

const MenuContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 720px;
  height: 3.75rem;
  justify-content: space-evenly;
  background-color: ${({ theme }) => theme.colors.BG800};
  position: fixed;
  bottom: 0;
  user-select: none;
`;

const Menu = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  font-size: 0.875rem;
`;

const BottomNavBar = () => {
  const { pathname } = useLocation();
  const theme = useTheme();

  const getFillColor = (path: string) =>
    matchPath(`${path}/*`, pathname) !== null ? theme.colors.normal : theme.colors.BG400;

  return (
    <MenuContainer>
      <Menu to="/boardlist">
        <BoardIcon fill={getFillColor("/boardlist")} />
        게시판
      </Menu>
      <Menu to="/chat">
        <ChatIcon fill={getFillColor("/chat")} />
        질문
      </Menu>
      <Menu to="/">
        <HomeIcon fill={getFillColor("/")} />홈
      </Menu>
      <Menu to="/pay">
        <PayIcon fill={getFillColor("/pay")} />
        정산
      </Menu>
      <Menu to="/menu">
        <MenuIcon fill={getFillColor("/menu")} />
        메뉴
      </Menu>
    </MenuContainer>
  );
};

export default BottomNavBar;
