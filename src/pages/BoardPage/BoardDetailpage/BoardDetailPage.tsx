import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import {
  BoardPostDetail,
  createPostCommentApi,
  getPostCommentApi,
  getPostDetailApi,
} from "@/apis/Board/BoardPostDetailApi";
import { deleteLikeOnPostApi, postLikeOnPostApi } from "@/apis/Board/BoardPostLikeApi";
import comment from "@/assets/Board/comment.svg";
import heartLiked from "@/assets/Board/heart_liked.svg";
import heartUnliked from "@/assets/Board/heart_unliked.svg";
import share from "@/assets/Board/share.svg";
import send from "@/assets/ChatPage/btn_send.svg";
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

const BoardPostDetailCommentContainer = styled.div`
  margin-bottom: 3rem;
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

const BoardDetailInputContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0.5rem 1rem;
  gap: 0.5rem;
  max-width: 720px;
`;

const BoardDetailInput = styled.input`
  width: 100%;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 1.25rem;
  background: var(--Foundation-Gray-gray800, #222226);

  color: var(--Foundation-Gray-gray500, #767681);
  /* text/Regular 14pt */
  font-family: Freesentation;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 19.6px */
  letter-spacing: 0.56px;

  &:focus {
    outline: none;
    color: var(--WHITE, #fff);
  }
`;

const BoardDetailPage = () => {
  const { id } = useParams();
  const [postsData, setPostsData] = useState<BoardPostDetail>();
  const [commentsData, setCommentsData] = useState<BoardPostDetail[]>([]);
  const [commentValue, setCommentValue] = useState<string>("");
  const [newCommentCount, setNewCommentCount] = useState<number>(0);

  const [isLikeNew, setIsLikeNew] = useState<boolean>(postsData !== undefined && postsData.like);
  const [likeCountNew, setLikeCountNew] = useState<number>(postsData ? postsData.likeCount : 0);

  const spaceId = localStorage.getItem("spaceId");

  useEffect(() => {
    if (spaceId !== null) {
      getPostDetailApi(Number.parseInt(spaceId), Number.parseInt(id || "0"))
        .then((res) => {
          if (res === null) {
            setPostsData(undefined);
          } else {
            setPostsData(res.result);
            setIsLikeNew(res.result.like);
            setLikeCountNew(res.result.likeCount);
          }
        })
        .catch((err) => {
          console.error(err);
          setPostsData(undefined);
        });
      getPostCommentApi(Number.parseInt(spaceId), Number.parseInt(id || "0"))
        .then((res) => {
          if (res !== null) {
            setCommentsData(res.result);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [newCommentCount]);

  const handleLike = () => {
    if (spaceId !== null && postsData !== undefined) {
      if (postsData.like === true) {
        // 좋아요 해제
        deleteLikeOnPostApi(Number.parseInt(spaceId), postsData.postId)
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
        postLikeOnPostApi(Number.parseInt(spaceId), postsData.postId)
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

  const handleRegisterComment = () => {
    if (spaceId !== null && postsData !== undefined) {
      createPostCommentApi(Number.parseInt(spaceId), postsData?.postId, commentValue)
        .then((res) => {
          if (res !== null) {
            console.log("등록된 commentID: ", res.result.commentId);
            setNewCommentCount((prev) => prev + 1);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

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
          <BoardPostDetailLikeBtn className={isLikeNew ? "liked" : ""} onClick={handleLike}>
            <img src={isLikeNew ? heartLiked : heartUnliked} alt="좋아요" />
            {likeCountNew}
          </BoardPostDetailLikeBtn>
          <div className="board-post-detail-footer-item">
            <img src={comment} alt="댓글" />
            {postsData?.commentCount}
          </div>
          <img src={share} alt="공유하기" />
        </BoardPostDetailFooter>
      </BoardPostDetailContainer>
      <BoardPostDetailCommentContainer>
        {commentsData.length !== 0 ? (
          commentsData.map((d: BoardPostDetail, i: number) => {
            return (
              <div key={i + d.title}>
                <BoardDetailComment
                  profileName={d.userName}
                  profileImg={d.userProfileImg}
                  elapsedTime={d.time}
                  content={d.content}
                  isLike={d.like}
                  likeCount={d.likeCount}
                  commentCount={d.commentCount}
                />
              </div>
            );
          })
        ) : (
          <BoardPostCommentEmpty>
            아직 댓글이 없어요.
            <br />첫 댓글을 남겨보세요.
          </BoardPostCommentEmpty>
        )}
      </BoardPostDetailCommentContainer>
      <BoardDetailInputContainer>
        <BoardDetailInput
          placeholder="댓글을 입력하세요."
          onChange={(e) => setCommentValue(e.target.value)}
        ></BoardDetailInput>
        <img src={send} onClick={handleRegisterComment} />
      </BoardDetailInputContainer>
    </>
  );
};

export default BoardDetailPage;
