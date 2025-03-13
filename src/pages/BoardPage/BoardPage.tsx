import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { BoardPost, getAllPosts } from "@/apis/Board/BoardReadApi";
import arrowDown from "@/assets/Board/chevron_down.svg";
import floating from "@/assets/Board/floating.svg";
import search from "@/assets/Board/search.svg";
import TopBarText, { LeftEnum } from "@/components/TopBarText";
import BoardBottomModal from "@/pages/BoardPage/BoardBottomModal";
import {
  BoardFloatingBtn,
  BoardHeader,
  BoardPostItemEmpty,
} from "@/pages/BoardPage/BoardPage.styled";
import BoardPostItem from "@/pages/BoardPage/BoardPostItem";

export type boardSelectedOptionType = {
  id: string;
  value: string;
};

export const boardSelectedOption = [
  { id: "all", value: "전체" },
  { id: "notice", value: "공지 게시글" },
  { id: "general", value: "일반 게시글" },
];

const BoardPage = () => {
  const [postsData, setPostsData] = useState<BoardPost[]>([]);

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<number>(0);

  useEffect(() => {
    const spaceId = localStorage.getItem("spaceId");
    if (spaceId !== null) {
      getAllPosts(Number.parseInt(spaceId), boardSelectedOption[selectedOption].id)
        .then((res) => {
          if (res === null) {
            setPostsData([]);
          } else {
            setPostsData(res.result);
          }
        })
        .catch((err) => {
          console.error(err);
          setPostsData([]);
        });
    }
  }, [selectedOption]);

  return (
    <div>
      <TopBarText
        left={LeftEnum.Logo}
        center="게시판"
        right={<img src={search} alt="search" />}
      ></TopBarText>
      <BoardHeader>
        <span>게시글 {postsData.length}개</span>
        <div className="board-filter-section" onClick={() => setIsModalOpen((prev) => !prev)}>
          {boardSelectedOption[selectedOption].value}
          <img src={arrowDown} alt="arrowDown" />
        </div>
      </BoardHeader>
      {postsData.length !== 0 ? (
        postsData.map((d, i) => {
          return (
            <div key={i + d.title}>
              <BoardPostItem
                postId={d.postId}
                profileName={d.userName}
                profileImg={d.userProfileImg}
                elapsedTime={d.time}
                title={d.title}
                content={d.content}
                thumbnail={d.postImage}
                isLike={d.like}
                likeCount={d.likeCount}
                commentCount={d.commentCount}
              />
            </div>
          );
        })
      ) : (
        <BoardPostItemEmpty>
          아직 게시된 글이 없어요.
          <br />첫 게시글을 작성해보세요!
        </BoardPostItemEmpty>
      )}
      <BoardFloatingBtn src={floating} onClick={() => navigate("/board/register")} />
      <BoardBottomModal
        selectedOption={selectedOption}
        onSelect={setSelectedOption}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default BoardPage;
