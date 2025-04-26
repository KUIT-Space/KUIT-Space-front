import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

import { usePostsQuery } from "@/apis/Board";
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
import { SPACE_ID } from "@/utils/constants";
import { BottomFloatBtn } from "@/components/BottomFloatBtn";
import createPost from "@/assets/Board/create_post.svg";

export type boardSelectedOptionType = {
  id: string;
  value: string;
};

// TODO : tag 별로 다른 Option 띄워주고, 하나의 tag Board 안에서 다른 Board로 이동 가능하게
export const boardSelectedOption = [
  { id: "all", value: "전체" },
  { id: "notice", value: "공지 게시글" },
  { id: "general", value: "일반 게시글" },
];

type BoardContentProps = {
  selectedOption: number;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const BoardContent = ({ selectedOption, isModalOpen, setIsModalOpen }: BoardContentProps) => {
  const { id: boardId } = useParams();
  const [searchParams] = useSearchParams();
  const tagId = searchParams.get("tagId");

  const { data: posts } = usePostsQuery(
    SPACE_ID,
    Number(boardId),
    tagId ? Number(tagId) : undefined,
  );
  const allPosts = posts?.result?.readPostList || [];
  console.log(allPosts);

  // Client-side filtering based on selected option
  let filteredPosts = allPosts;
  if (selectedOption === 1) {
    filteredPosts = allPosts.filter((post) => post.title.includes("[공지]"));
  } else if (selectedOption === 2) {
    filteredPosts = allPosts.filter((post) => !post.title.includes("[공지]"));
  }

  return (
    <>
      <BoardHeader>
        <span>게시글 {filteredPosts.length}개</span>
        {/* <div className="board-filter-section" onClick={() => setIsModalOpen((prev) => !prev)}>
          {boardSelectedOption[selectedOption].value}
          <img src={arrowDown} alt="arrowDown" />
        </div> */}
      </BoardHeader>

      {filteredPosts.length !== 0 ? (
        filteredPosts.map((post, i) => (
          <div key={i + post.title}>
            <BoardPostItem
              postId={post.postId}
              profileName={post.creatorNickname}
              profileImg=""
              elapsedTime={post.createdAt}
              title={post.title}
              content={post.content}
              thumbnail={post.postImageUrl ? [post.postImageUrl] : []}
              isLike={false}
              likeCount={post.likeCount}
              commentCount={post.commentCount}
            />
          </div>
        ))
      ) : (
        <BoardPostItemEmpty>
          아직 게시된 글이 없어요.
          <br />첫 게시글을 작성해보세요!
        </BoardPostItemEmpty>
      )}
    </>
  );
};

const BoardPage = () => {
  const navigate = useNavigate();
  const { id: boardId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(0);
  const onCreateClick = () => {
    navigate(`/board/${boardId}/register`);
  };
  return (
    <div>
      <TopBarText left={LeftEnum.Back} center="게시판" right={<img src={search} alt="search" />} />

      <BoardContent
        selectedOption={selectedOption}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />

      {/* 글쓰기 버튼 변경 */}
      {/* <BoardFloatingBtn src={floating} onClick={() => navigate(`/board/${boardId}/register`)} /> */}
      <BottomFloatBtn onClick={onCreateClick}>
        <img src={createPost}></img>
        <div>글 쓰기</div>
      </BottomFloatBtn>
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
