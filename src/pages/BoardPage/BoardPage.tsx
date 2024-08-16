import { useState } from "react";

import arrowDown from "@/assets/Board/chevron_down.svg";
import TopBarText, { LeftEnum } from "@/components/TopBarText";

import BoardBottomModal from "./BoardBottomModal";
import { BoardHeader } from "./BoardPage.styled";
import BoardPostItem from "./BoardPostItem";

const BoardPage = () => {
  const dummy = [
    {
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

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("전체");

  return (
    <>
      <TopBarText left={LeftEnum.Logo} center="게시판" right=""></TopBarText>
      <BoardHeader>
        <span>게시글 24개</span>
        <div className="board-filter-section" onClick={() => setIsModalOpen((prev) => !prev)}>
          {selectedOption}
          <img src={arrowDown} />
        </div>
      </BoardHeader>
      {dummy.map((d, i) => {
        return (
          <div key={i + d.title}>
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
      })}
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
