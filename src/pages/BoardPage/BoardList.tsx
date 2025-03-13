import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import offPin from "@/assets/Board/pin1.svg";
import onPin from "@/assets/Board/pin2.svg";
import search from "@/assets/Board/search.svg";
import TopBarText, { LeftEnum } from "@/components/TopBarText";

const BoardListContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const BoardElement = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const BoardName = styled.div`
  margin-left: 25px;
  font-size: 1.2rem;
`;

const Divider = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.BG600};
  margin-bottom: 20px;
`;

const BoardList = () => {
  const navigate = useNavigate();
  const Toggle = ({ id, title }: { id: number; title: string }) => {
    setBoardList(
      boardList.map((item) =>
        item.id === id && item.title === title
          ? {
              ...item,
              isPinned: !item.isPinned,
            }
          : item,
      ),
    );
  };

  const [boardList, setBoardList] = useState([
    {
      id: 1,
      title: "공지사항",
      isPinned: false,
    },
    {
      id: 1,
      title: "팀원모집 | 홍보",
      isPinned: false,
    },
    {
      id: 1,
      title: "채용공고",
      isPinned: false,
    },
    {
      id: 1,
      title: "소모임",
      isPinned: false,
    },
    {
      id: 2,
      title: "전체 TIP",
      isPinned: false,
    },
    {
      id: 2,
      title: "Android TIP",
      isPinned: false,
    },
    {
      id: 2,
      title: "iOS TIP",
      isPinned: false,
    },
    {
      id: 2,
      title: "Web TIP",
      isPinned: false,
    },
    {
      id: 2,
      title: "Server TIP",
      isPinned: false,
    },
    {
      id: 2,
      title: "PM TIP",
      isPinned: false,
    },
    {
      id: 2,
      title: "Design TIP",
      isPinned: false,
    },
    {
      id: 3,
      title: "기타",
      isPinned: false,
    },
  ]);

  const prevId = useRef(boardList[0].id);

  return (
    <div>
      <TopBarText
        left={LeftEnum.None}
        center="게시판"
        right={<img src={search} alt="search" />}
      ></TopBarText>
      <BoardListContainer>
        {boardList.map((board) => (
          <>
            {prevId.current < board.id && <Divider />}
            {prevId.current !== board.id && (prevId.current = board.id) && null}
            <BoardElement>
              <img
                src={board.isPinned ? onPin : offPin}
                alt="pin"
                onClick={() => Toggle({ id: board.id, title: board.title })}
              />
              <BoardName onClick={() => navigate("/board")}>{board.title}</BoardName>
            </BoardElement>
          </>
        ))}
      </BoardListContainer>
    </div>
  );
};

export default BoardList;
