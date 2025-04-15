import { useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";

import { BoardInfo, useBoardListQuery, useSubscribeBoard, useUnsubscribeBoard } from "@/apis/Board";
import offPin from "@/assets/Board/pin1.svg";
import onPin from "@/assets/Board/pin2.svg";
import search from "@/assets/Board/search.svg";
import TopBarText, { LeftEnum } from "@/components/TopBarText";
import { SPACE_ID } from "@/utils/constants";

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
  // const [searchParams, setSearchParams] = useSearchParams();
  const { mode } = useParams(); //question || board
  // const mode = searchParams.get("question"); // true || false
  const { data: boardData } = useBoardListQuery(SPACE_ID);
  const subscribeMutation = useSubscribeBoard(SPACE_ID);
  const unsubscribeMutation = useUnsubscribeBoard(SPACE_ID);

  const prevId = useRef(boardData.result?.readBoardList[0].boardId || 1);
  const boardList =
    mode === "question"
      ? boardData.result?.readBoardList.filter((value) => value.boardName.indexOf("질문") !== -1)
      : boardData.result?.readBoardList.filter((value) => value.boardName.indexOf("질문") === -1);

  const handlePinClick = (board: BoardInfo, e: React.MouseEvent) => {
    e.stopPropagation();

    if (board.isSubscribed) {
      unsubscribeMutation.mutate({ boardId: board.boardId, tagId: board.tagId });
    } else {
      subscribeMutation.mutate({ boardId: board.boardId, tagId: board.tagId });
    }
  };

  return (
    <div>
      <TopBarText
        left={LeftEnum.None}
        center="게시판"
        right={<img src={search} alt="search" />}
      ></TopBarText>
      <BoardListContainer>
        {boardList!.map((board) => (
          <>
            {mode === "false" && prevId.current < board.boardId && <Divider />}
            {prevId.current !== board.boardId && (prevId.current = board.boardId) && null}
            <BoardElement>
              <img
                src={board.isSubscribed ? onPin : offPin}
                alt="pin"
                onClick={(e) => handlePinClick(board, e)}
              />
              <BoardName
                onClick={() => {
                  navigate(`/board/${board.boardId}${board.tagId ? `?tagId=${board.tagId}` : ""}`);
                }}
              >
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
