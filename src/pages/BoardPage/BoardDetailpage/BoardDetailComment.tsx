import React, { useState } from "react";
import styled from "styled-components";

import comment from "@/assets/Board/comment.svg";
import heartLiked from "@/assets/Board/heart_liked.svg";
import heartUnliked from "@/assets/Board/heart_unliked.svg";

const BoardDetailCommentContainer = styled.div`
  border-top: 2px solid #222226;
  width: 100%;
  padding: 1rem 1.25rem 0.5rem 1.25rem;
  display: flex;
  flex-direction: row;
  gap: 0.5rem;

  .board-post-detail-comment-img {
    width: 1.75rem;
    height: 1.75rem;
    border-radius: 50%;
    background-color: #c5c5c5;
  }
`;

const BoardDetailCommentContent = styled.div`
  margin-top: 0.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;

  .board-post-detail-comment-profile {
    display: flex;
    align-items: end;
    gap: 0.5rem;

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

  .board-post-detail-comment-content {
    color: var(--Foundation-Gray-gray200, #efeff0);
    /* regular/16pt */
    font-size: 1rem;
    font-weight: 400;
    line-height: 140%; /* 19.6px */
    letter-spacing: 0.035rem;
  }

  .board-post-detail-comment-footer {
    display: flex;
    gap: 0.75rem;
    color: var(--Foundation-Gray-gray500, #767681);
    /* regular/12pt */
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 140%; /* 16.8px */
    letter-spacing: 0.015rem;

    .board-post-detail-comment-footer-item {
      display: flex;
      align-items: center;
      color: var(--Foundation-Gray-gray500, #767681);

      :first-child {
        padding: 0.125rem;
      }
    }
  }
`;

const BoardPostCommentLikeBtn = styled.div`
  display: flex;

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

export type BoardDetailCommentProps = {
  profileName: string;
  profileImg: string;
  elapsedTime: string;
  content: string;
  isLike: boolean;
  likeCount: number;
  commentCount: number;
};

const BoardDetailComment = ({
  profileName,
  profileImg,
  elapsedTime,
  content,
  isLike,
  likeCount,
  commentCount,
}: BoardDetailCommentProps) => {
  const [isLikeNew, setIsLikeNew] = useState<boolean>(isLike);

  return (
    <BoardDetailCommentContainer>
      {profileImg ? (
        <img src={profileImg} alt="프로필 이미지" className="board-post-detail-comment-img" />
      ) : (
        <div className="board-post-detail-comment-img" />
      )}
      <BoardDetailCommentContent>
        <div className="board-post-detail-comment-profile">
          <span>{profileName}</span>
          <span>{elapsedTime}</span>
        </div>
        <div className="board-post-detail-comment-content">{content}</div>
        <div className="board-post-detail-comment-footer">
          <BoardPostCommentLikeBtn
            className={isLikeNew ? "liked" : ""}
            onClick={() => setIsLikeNew((prev) => !prev)}
          >
            <img src={isLikeNew ? heartLiked : heartUnliked} alt="좋아요" />
            좋아요 {likeCount}
          </BoardPostCommentLikeBtn>
          <div className="board-post-detail-comment-footer-item">
            <img src={comment} alt="댓글" />
            대댓글 {commentCount}
          </div>
        </div>
      </BoardDetailCommentContent>
    </BoardDetailCommentContainer>
  );
};

export default BoardDetailComment;
