import { useState } from "react";
import { useNavigate } from "react-router-dom";

import arrowDown from "@/assets/Board/chevron_down.svg";
import floating from "@/assets/Board/floating.svg";
import search from "@/assets/Board/search.svg";
import TopBarText, { LeftEnum } from "@/components/TopBarText";

import BoardBottomModal from "./BoardBottomModal";
import { BoardFloatingBtn, BoardHeader, BoardPostItemEmpty } from "./BoardPage.styled";
import BoardPostItem from "./BoardPostItem";

const BoardPage = () => {
  const dummy = [
    {
      id: 0,
      profileName: "고양이발닦개",
      profileImg: "",
      elapsedTime: "10분 전",
      title: "학생! 기말시험이 있어",
      content: "학생! 혹시 과제도 같이.. (네? 과제도요?)\n그럼 제가 교수님 맘에...",
      thumbnail: "img",
      isLike: true,
      likeCount: 5,
      commentCount: 2,
    },
    {
      id: 1,
      profileName: "고양이발닦개",
      profileImg: "",
      elapsedTime: "10분 전",
      title: "학생! 기말시험이 있어",
      content: "학생! 혹시 과제도 같이.. (네? 과제도요?)\n그럼 제가 교수님 맘에...",
      thumbnail: "img",
      isLike: true,
      likeCount: 5,
      commentCount: 2,
    },
    {
      id: 2,
      profileName: "고양이발닦개",
      profileImg: "",
      elapsedTime: "10분 전",
      title: "학생! 기말시험이 있어",
      content: "학생! 혹시 과제도 같이.. (네? 과제도요?)\n그럼 제가 교수님 맘에...",
      thumbnail: "img",
      isLike: true,
      likeCount: 5,
      commentCount: 2,
    },
  ];
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("전체");

  return (
    <>
      <TopBarText left={LeftEnum.Logo} center="게시판" right={<img src={search} />}></TopBarText>
      <BoardHeader>
        <span>게시글 {dummy.length}개</span>
        <div className="board-filter-section" onClick={() => setIsModalOpen((prev) => !prev)}>
          {selectedOption}
          <img src={arrowDown} />
        </div>
      </BoardHeader>
      {dummy ? (
        dummy.map((d, i) => {
          return (
            <div key={i + d.title} onClick={() => navigate(`/board/${d.id}`)}>
              <BoardPostItem
                profileName={d.profileName}
                profileImg={d.profileImg}
                elapsedTime={d.elapsedTime}
                title={d.title}
                content={d.content}
                thumbnail={d.thumbnail}
                isLike={d.isLike}
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
      <BoardFloatingBtn src={floating} />
      <BoardBottomModal
        selectedOption={selectedOption}
        onSelect={setSelectedOption}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default BoardPage;
