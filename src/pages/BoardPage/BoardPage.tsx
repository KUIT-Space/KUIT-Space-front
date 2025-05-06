import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

import { ReadPostListResponse, useDeletePost, usePostsQuery } from "@/apis/Board";
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
import Modal from "@/components/Modal";
import { ApiResponse } from "@/apis/client";

export type boardSelectedOptionType = {
  id: string;
  value: string;
};

type BoardContentProps = {
  selectedOption: number;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
let _postId = 0;
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

  // Client-side filtering based on selected option
  let filteredPosts = allPosts;
  if (selectedOption === 1) {
    filteredPosts = allPosts.filter((post) => post.title.includes("[공지]"));
  } else if (selectedOption === 2) {
    filteredPosts = allPosts.filter((post) => !post.title.includes("[공지]"));
  }
  const deletePostMutation = useDeletePost(SPACE_ID, Number(boardId));
  const onPostDelete = (postId: number) => {
    console.log(postId);
    _postId = postId;
    setIsModalOpen(true);
  };

  return (
    <>
      <BoardHeader>
        <span>게시글 {filteredPosts.length}개</span>
        {/* <div className="board-filter-section" onClick={() => setIsModalOpen((prev) => !prev)}>
          {boardSelectedOption[selectedOption].value}
          <img src={arrowDown} alt="arrowDown" />
        </div> */}
      </BoardHeader>
      <Modal
        isOpen={isModalOpen}
        title={"게시물을 삭제하시겠습니까?"}
        content={[]}
        leftButtonText="취소"
        rightButtonText="삭제"
        leftButtonColor="#454548"
        rightButtonColor="#FF5656"
        rightButtonTextColor="#fff"
        onClose={() => {
          setIsModalOpen(false);
        }}
        onConfirm={() => {
          deletePostMutation.mutate(_postId);
          setIsModalOpen(false);
        }}
      />
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
              onPostDelete={(i: number) => onPostDelete(i)}
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
  const { id: boardId, mode } = useParams();
  console.log(mode);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(0);
  const onCreateClick = () => {
    mode === "question"
      ? navigate(`/board/${boardId}/register/question`)
      : navigate(`/board/${boardId}/register`);
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
      {/* <BoardBottomModal
        selectedOption={selectedOption}
        onSelect={setSelectedOption}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      /> */}
    </div>
  );
};
export default BoardPage;
