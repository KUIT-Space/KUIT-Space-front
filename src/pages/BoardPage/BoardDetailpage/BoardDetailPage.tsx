import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import comment from "@/assets/Board/comment.svg";
import heartLiked from "@/assets/Board/heart_liked.svg";
import heartUnliked from "@/assets/Board/heart_unliked.svg";
import share from "@/assets/Board/share.svg";
import TopBarText, { LeftEnum } from "@/components/TopBarText";

import BoardDetailComment from "./BoardDetailComment";

const BoardPostDetailContainer = styled.div`
  width: 100%;
  padding: 1.5rem 1.25rem;
  display: flex;
  flex-direction: column;
  border-bottom: 8px solid #222226;

  .board-post-detail-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;

    .board-post-detail-header-img {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      background-color: #c5c5c5;
    }

    .board-post-detail-header-text {
      display: flex;
      flex-direction: column;

      :first-child {
        color: var(--Foundation-Gray-gray200, #efeff0);
        /* regular/14pt */
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 140%; /* 19.6px */
        letter-spacing: 0.035rem;
      }

      :nth-child(2) {
        color: var(--Foundation-Gray-gray500, #767681);
        /* regular/12pt */
        font-size: 0.75rem;
        font-weight: 400;
        line-height: 140%; /* 16.8px */
        letter-spacing: 0.015rem;
      }
    }
  }
`;

const BoardPostDetailContent = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;

  .board-post-detail-content-text {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    :first-child {
      color: var(--Foundation-Gray-white, #fff);
      /* bold/18pt */
      font-size: 1.125rem;
      font-weight: 700;
      line-height: 140%; /* 22.4px */
      letter-spacing: 0.02rem;
    }

    :nth-child(2) {
      white-space: pre-wrap;

      color: var(--Foundation-Gray-gray300, #d4d4d9);
      /* regular/16pt */
      font-size: 1rem;
      font-weight: 400;
      line-height: 140%; /* 19.6px */
      letter-spacing: 0.035rem;
    }
  }

  .board-post-detail-content-img {
    width: 100%;
    height: 20rem;
    border-radius: 0.75rem;
    border: 1px solid #fff; /* 영역 확인 위한 임시 border */
  }
`;

const BoardPostDetailFooter = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.25rem;
  color: var(--Foundation-Gray-gray500, #767681);
  /* regular/12pt */
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 140%; /* 16.8px */
  letter-spacing: 0.015rem;

  .board-post-detail-footer-item {
    display: flex;
    align-items: center;
    gap: -0.125rem;
    color: var(--Foundation-Gray-gray500, #767681);

    :first-child {
      padding: 0.5rem;
    }
  }

  :last-child {
    cursor: pointer;
  }
`;

const BoardPostItemLikeBtn = styled.div`
  cursor: pointer;
  display: flex;
  gap: -0.125rem;
  align-items: center;
  margin-right: 0.5rem;
  color: var(--Foundation-Gray-gray500, #767681);

  &.liked {
    color: #ff6600; /* 좋아요된 상태의 색상 */
  }
`;

const BoardDetailPage = () => {
  const dummy = {
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
    comment: [
      {
        profileName: "seohyun",
        profileImg: "",
        elapsedTime: "10분 전",
        content: "댓글내용내용",
        isLike: true,
        likeCount: 5,
        commentCount: 2,
      },
      {
        profileName: "seohyun",
        profileImg: "",
        elapsedTime: "10분 전",
        content: "댓글내용내용",
        isLike: true,
        likeCount: 5,
        commentCount: 2,
      },
      {
        profileName: "seohyun",
        profileImg: "",
        elapsedTime: "10분 전",
        content: "댓글내용내용",
        isLike: true,
        likeCount: 5,
        commentCount: 2,
      },
    ],
  };
  const { id } = useParams();

  const [isLikeNew, setIsLikeNew] = useState<boolean>(dummy.isLike);

  return (
    <>
      <TopBarText left={LeftEnum.Logo} center="게시판" right={""}></TopBarText>
      <BoardPostDetailContainer>
        <header className="board-post-detail-header">
          {dummy.profileImg ? (
            <img
              src={dummy.profileImg}
              alt="프로필 이미지"
              className="board-post-detail-header-img"
            />
          ) : (
            <div className="board-post-detail-header-img" />
          )}
          <div className="board-post-detail-header-text">
            <span>{dummy.profileName}</span>
            <span>{dummy.elapsedTime}</span>
          </div>
        </header>
        <BoardPostDetailContent>
          <div className="board-post-detail-content-text">
            <span>{dummy.title}</span>
            <div>{dummy.content}</div>
          </div>
          <div className="board-post-detail-content-img">
            {dummy.thumbnail && <img src={dummy.thumbnail} />}
          </div>
        </BoardPostDetailContent>
        <BoardPostDetailFooter>
          <BoardPostItemLikeBtn
            className={isLikeNew ? "liked" : ""}
            onClick={() => setIsLikeNew((prev) => !prev)}
          >
            <img src={isLikeNew ? heartLiked : heartUnliked} alt="좋아요" />
            {dummy.likeCount}
          </BoardPostItemLikeBtn>
          <div className="board-post-detail-footer-item">
            <img src={comment} alt="댓글" />
            {dummy.commentCount}
          </div>
          <img src={share} alt="공유하기" />
        </BoardPostDetailFooter>
      </BoardPostDetailContainer>
      <div>
        {dummy.comment.map((d, i) => {
          return (
            <div key={i + d.content}>
              <BoardDetailComment
                profileName={d.profileName}
                profileImg={d.profileImg}
                elapsedTime={d.elapsedTime}
                content={d.content}
                isLike={d.isLike}
                likeCount={d.likeCount}
                commentCount={d.commentCount}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default BoardDetailPage;
