import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { deleteLikeOnPostApi, postLikeOnPostApi } from "@/apis/Board/BoardPostLikeApi";
import comment from "@/assets/Board/comment.svg";
import heartLiked from "@/assets/Board/heart_liked.svg";
import heartUnliked from "@/assets/Board/heart_unliked.svg";
import share from "@/assets/Board/share.svg";

const BoardPostItemContainer = styled.div`
  width: 100%;
  padding: 1.5rem 1.25rem;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #222226;

  .board-post-item-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;

    :first-child {
      width: 1.25rem;
      height: 1.25rem;
      border-radius: 50%;
      background-color: #c5c5c5;
    }

    :nth-child(2) {
      color: var(--Foundation-Gray-gray200, #efeff0);
      /* regular/14pt */
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 140%; /* 19.6px */
      letter-spacing: 0.035rem;
    }

    :nth-child(3) {
      color: var(--Foundation-Gray-gray600, #767681);
      /* regular/12pt */
      font-size: 0.75rem;
      font-weight: 400;
      line-height: 140%; /* 16.8px */
      letter-spacing: 0.015rem;
    }
  }
`;

const BoardPostItemContent = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;

  .board-post-item-content-text {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;

    :first-child {
      color: var(--Foundation-Gray-white, #fff);
      /* bold/16pt */
      font-size: 1rem;
      font-weight: 700;
      line-height: 140%; /* 22.4px */
      letter-spacing: 0.02rem;
    }

    :nth-child(2) {
      white-space: pre-wrap;

      color: var(--Foundation-Gray-gray300, #d4d4d9);
      /* regular/14pt */
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 140%; /* 19.6px */
      letter-spacing: 0.035rem;
    }
  }

  .board-post-item-content-img-container {
    display: flex;
    overflow-x: scroll;
    gap: 0.5rem;

    .board-post-item-content-img {
      width: 100%;
      height: 16rem;
      border-radius: 0.75rem;
      border: 1px solid #fff; /* 영역 확인 위한 임시 border */
    }
  }
`;

const BoardPostItemFooter = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--Foundation-Gray-gray500, #767681);
  /* regular/12pt */
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 140%; /* 16.8px */
  letter-spacing: 0.015rem;

  :first-child {
    display: flex;
    align-items: center;

    .board-post-item-footer-item {
      display: flex;
      align-items: center;
      gap: -0.125rem;
      color: var(--Foundation-Gray-gray500, #767681);

      :first-child {
        padding: 0.5rem;
      }
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

export type BoardPostItemProps = {
  postId: number;
  profileName: string;
  profileImg: string;
  elapsedTime: string;
  title: string;
  content: string;
  thumbnail: string[];
  isLike: boolean;
  likeCount: number;
  commentCount: number;
};
const BoardPostItem = ({
  postId,
  profileName,
  profileImg,
  elapsedTime,
  title,
  content,
  thumbnail,
  isLike,
  likeCount,
  commentCount,
}: BoardPostItemProps) => {
  const navigate = useNavigate();

  const [isLikeNew, setIsLikeNew] = useState<boolean>(isLike);
  const [likeCountNew, setLikeCountNew] = useState<number>(likeCount);

  const spaceId = localStorage.getItem("spaceId");

  const handleLike = () => {
    if (spaceId !== null) {
      if (isLike === true) {
        // 좋아요 해제
        deleteLikeOnPostApi(Number.parseInt(spaceId), postId)
          .then((res) => {
            if (res !== null) {
              setIsLikeNew(false);
              setLikeCountNew((prev) => prev - 1);
            }
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        postLikeOnPostApi(Number.parseInt(spaceId), postId)
          .then((res) => {
            if (res !== null) {
              setIsLikeNew(true);
              setLikeCountNew((prev) => prev + 1);
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
  };

  return (
    <BoardPostItemContainer>
      <header className="board-post-item-header" onClick={() => navigate(`/board/${postId}`)}>
        {profileImg ? <img src={profileImg} alt="프로필 이미지" /> : <div />}
        <span>{profileName}</span>
        <span>{elapsedTime}</span>
      </header>
      <BoardPostItemContent onClick={() => navigate(`/board/${postId}`)}>
        <div className="board-post-item-content-text">
          <span>{title}</span>
          <div>{content}</div>
        </div>
        <div className="board-post-item-content-img-container">
          {thumbnail &&
            thumbnail.map((img, i) => (
              <img key={img + i} src={img} className="board-post-item-content-img" />
            ))}
        </div>
      </BoardPostItemContent>
      <BoardPostItemFooter>
        <div>
          <BoardPostItemLikeBtn
            className={isLikeNew ? "liked" : ""}
            onClick={() => setIsLikeNew((prev) => !prev)}
          >
            <img src={isLikeNew ? heartLiked : heartUnliked} alt="좋아요" onClick={handleLike} />
            {likeCountNew}
          </BoardPostItemLikeBtn>
          <div className="board-post-item-footer-item" onClick={() => navigate(`/board/${postId}`)}>
            <img src={comment} alt="댓글" />
            {commentCount}
          </div>
        </div>
        <img src={share} alt="공유하기" />
      </BoardPostItemFooter>
    </BoardPostItemContainer>
  );
};

export default BoardPostItem;
