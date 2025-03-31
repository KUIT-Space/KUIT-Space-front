import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { BoardInfo, useBoardListQuery } from "@/apis/Board";
import offPin from "@/assets/Board/pin1.svg";
import onPin from "@/assets/Board/pin2.svg";
import search from "@/assets/Board/search.svg";
import TopBarText, { LeftEnum } from "@/components/TopBarText";

const BoardListContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.25rem 1.25rem 3.75rem;
  cursor: pointer;
`;

const BoardElement = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.25rem;
`;

const BoardName = styled.div`
  margin-left: 1.5625rem;
  font-size: 1.2rem;
`;

const Divider = styled.div`
  height: 0.0625rem;
  background-color: ${({ theme }) => theme.colors.BG600};
  margin-bottom: 1.25rem;
`;

const BoardList = () => {
  const navigate = useNavigate();
  // const Toggle = ({ id, title }: { id: number; title: string }) => {
  //   setBoardList(
  //     boardList.map((item) =>
  //       item.boardId === id && item.boardName === title
  //         ? {
  //             ...item,
  //             isPinned: !item.isSubscribed,
  //           }
  //         : item,
  //     ),
  //   );
  // };

  // const [boardList, setBoardList] = useState<BoardInfo[]>([]);

  // TODO : spaceId 동적 처리
  const spaceId = 1;
  const { data: boardData } = useBoardListQuery(spaceId);
  const prevId = useRef(boardData.result?.readBoardList[0].boardId || 1);

  return (
    <div>
      <TopBarText
        left={LeftEnum.None}
        center="게시판"
        right={<img src={search} alt="search" />}
      ></TopBarText>
      <BoardListContainer>
        {boardData.result?.readBoardList.map((board) => (
          <>
            {prevId.current < board.boardId && <Divider />}
            {prevId.current !== board.boardId && (prevId.current = board.boardId) && null}
            <BoardElement>
              <img
                src={board.isSubscribed ? onPin : offPin}
                alt="pin"
                // onClick={() => Toggle({ id: board.boardId, title: board.boardName })}
              />
              <BoardName onClick={() => navigate("/board")}>
                {board.boardName}
                {board.tagName && ` - ${board.tagName}`}
              </BoardName>
            </BoardElement>
          </>
        ))}
      </BoardListContainer>
    </div>
  );
};

export default BoardList;
