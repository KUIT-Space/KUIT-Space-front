import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import offPin from "@/assets/Board/pin1.svg";
import onPin from "@/assets/Board/pin2.svg";
import search from "@/assets/Board/search.svg";
import TopBarText, { LeftEnum } from "@/components/TopBarText";

const MenuListContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const MenuElement = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const MenuName = styled.div`
  margin-left: 25px;
  font-size: 1.2rem;
`;

const Divider = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.BG600};
  margin-bottom: 20px;
`;

const MenuList = () => {
  const navigate = useNavigate();
  const Toggle = ({ id, title }: { id: number; title: string }) => {
    setMenuList(
      menuList.map((item) =>
        item.id === id && item.title === title
          ? {
              ...item,
              isPinned: !item.isPinned,
            }
          : item,
      ),
    );
  };

  const [menuList, setMenuList] = useState([
    {
      id: 1,
      title: "보이스룸",
      isPinned: false,
      path: "/voiceroom",
    },
    {
      id: 1,
      title: "채팅",
      isPinned: false,
      path: "/chat",
    },
  ]);

  const prevId = useRef(menuList[0].id);

  return (
    <div>
      <TopBarText
        left={LeftEnum.None}
        center="메뉴"
        right={<img src={search} alt="search" />}
      ></TopBarText>
      <MenuListContainer>
        {menuList.map((menu) => (
          <>
            {prevId.current < menu.id && <Divider />}
            {prevId.current !== menu.id && (prevId.current = menu.id) && null}
            <MenuElement>
              <img
                src={menu.isPinned ? onPin : offPin}
                alt="pin"
                onClick={() => Toggle({ id: menu.id, title: menu.title })}
              />
              <MenuName onClick={() => navigate(menu.path)}>{menu.title}</MenuName>
            </MenuElement>
          </>
        ))}
      </MenuListContainer>
    </div>
  );
};

export default MenuList;
