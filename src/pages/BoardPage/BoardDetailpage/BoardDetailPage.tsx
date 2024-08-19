import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { BoardPostDetail, getPostDetailApi } from "@/apis/Board/BoardPostDetailApi";
import comment from "@/assets/Board/comment.svg";
import heartLiked from "@/assets/Board/heart_liked.svg";
import heartUnliked from "@/assets/Board/heart_unliked.svg";
import share from "@/assets/Board/share.svg";
import TopBarText, { LeftEnum } from "@/components/TopBarText";
import BoardDetailComment from "@/pages/BoardPage/BoardDetailpage/BoardDetailComment";

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

  .board-post-detail-content-img-container {
    display: flex;
    overflow-x: scroll;
    gap: 0.5rem;

    .board-post-detail-content-img {
      width: 100%;
      height: 20rem;
      border-radius: 0.75rem;
      border: 1px solid #fff; /* 영역 확인 위한 임시 border */
    }
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

const BoardPostDetailLikeBtn = styled.div`
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

const BoardPostCommentEmpty = styled.div`
  margin: 6.5rem 0;
  display: flex;
  justify-content: center;
  color: var(--Foundation-Gray-gray600, #45454b);
  /* text/Regular 16pt */
  font-size: 1rem;
  font-weight: 400;
  line-height: 140%; /* 1.4rem */
  letter-spacing: 0.04rem;
`;

const BoardDetailPage = () => {
  const { id } = useParams();
  const [postsData, setPostsData] = useState<BoardPostDetail>();

  const [isLikeNew, setIsLikeNew] = useState<boolean>(postsData !== undefined && postsData.like);

  useEffect(() => {
    // 임시로 LOCALSTORAGE에 spaceId 3으로 저장
    localStorage.setItem("spaceId", "3");
    //
    const spaceId = localStorage.getItem("spaceId");
    if (spaceId !== null) {
      getPostDetailApi(Number.parseInt(spaceId), Number.parseInt(id || "0"))
        .then((res) => {
          if (res === null) {
            setPostsData(undefined);
          } else {
            setPostsData(res.result);
          }
        })
        .catch((err) => {
          console.error(err);
          setPostsData(undefined);
        });
    }
  }, []);

  return (
    <>
      <TopBarText left={LeftEnum.Back} center="게시판" right={""}></TopBarText>
      <BoardPostDetailContainer>
        <header className="board-post-detail-header">
          {postsData?.userProfileImg ? (
            <img
              src={postsData.userProfileImg}
              alt="프로필 이미지"
              className="board-post-detail-header-img"
            />
          ) : (
            <div className="board-post-detail-header-img" />
          )}
          <div className="board-post-detail-header-text">
            <span>{postsData?.userName}</span>
            <span>{postsData?.time}</span>
          </div>
        </header>
        <BoardPostDetailContent>
          <div className="board-post-detail-content-text">
            <span>{postsData?.title}</span>
            <div>{postsData?.content}</div>
          </div>
          <div className="board-post-detail-content-img-container">
            {postsData?.postImage &&
              postsData.postImage.map((img: string, i: number) => {
                return (
                  <img
                    key={i + postsData?.title + "img"}
                    src={img}
                    className="board-post-detail-content-img"
                  />
                );
              })}
          </div>
        </BoardPostDetailContent>
        <BoardPostDetailFooter>
          <BoardPostDetailLikeBtn
            className={isLikeNew ? "liked" : ""}
            onClick={() => setIsLikeNew((prev) => !prev)}
          >
            <img src={isLikeNew ? heartLiked : heartUnliked} alt="좋아요" />
            {postsData?.likeCount}
          </BoardPostDetailLikeBtn>
          <div className="board-post-detail-footer-item">
            <img src={comment} alt="댓글" />
            {postsData?.commentCount}
          </div>
          <img src={share} alt="공유하기" />
        </BoardPostDetailFooter>
      </BoardPostDetailContainer>
      <div>
        {postsData?.postComments ? (
          postsData?.postComments.map((d: string, i: number) => {
            return (
              <div key={i + d}>
                {/* TODO: 댓글 API 타입 확정 시 fix */}
                {/* <BoardDetailComment
                  profileName={d.profileName}
                  profileImg={d.profileImg}
                  elapsedTime={d.elapsedTime}
                  content={d.content}
                  isLike={d.isLike}
                  likeCount={d.likeCount}
                  commentCount={d.commentCount}
                /> */}
              </div>
            );
          })
        ) : (
          <BoardPostCommentEmpty>
            아직 댓글이 없어요.
            <br />첫 댓글을 남겨보세요.
          </BoardPostCommentEmpty>
        )}
      </div>
    </>
  );
};

export default BoardDetailPage;
