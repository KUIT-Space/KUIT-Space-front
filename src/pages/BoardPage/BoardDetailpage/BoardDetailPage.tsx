import { useEffect, useState } from "react";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useNavigate, useParams } from "react-router-dom";

import { PostDetail, useCreateComment, usePostDetailQuery, useToggleLike } from "@/apis/Board";
import comment from "@/assets/Board/comment.svg";
import heartLiked from "@/assets/Board/heart_liked.svg";
import heartUnliked from "@/assets/Board/heart_unliked.svg";
import share from "@/assets/Board/share.svg";
import send from "@/assets/ChatPage/btn_send.svg";
import TopBarText, { LeftEnum } from "@/components/TopBarText";
import BoardDetailComment from "@/pages/BoardPage/BoardDetailpage/BoardDetailComment";

import * as S from "./BoardDetailPage.styles";

// 실제 게시물 내용을 표시하는 컴포넌트
const PostDetailContent = ({ spaceId, boardId, postId }) => {
  const navigate = useNavigate();
  const { data: postDetail } = usePostDetailQuery(spaceId, boardId, postId);
  const toggleLikeMutation = useToggleLike(spaceId, boardId, postId);
  const createCommentMutation = useCreateComment(spaceId, boardId, postId);
  const [commentValue, setCommentValue] = useState("");

  const handleLike = () => {
    toggleLikeMutation.mutate({
      changeTo: !postDetail.data.isLiked,
    });
  };

  const handleRegisterComment = () => {
    if (commentValue.trim()) {
      createCommentMutation.mutate(
        {
          content: commentValue,
        },
        {
          onSuccess: () => {
            setCommentValue("");
          },
        },
      );
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <>
      <S.BoardPostDetailContainer>
        <header className="board-post-detail-header">
          {postDetail.data.creatorProfileImageUrl ? (
            <img
              src={postDetail.data.creatorProfileImageUrl}
              alt="프로필 이미지"
              className="board-post-detail-header-img"
            />
          ) : (
            <div className="board-post-detail-header-img" />
          )}
          <div className="board-post-detail-header-text">
            <span>{postDetail.data.creatorName}</span>
            <span>{formatDate(postDetail.data.createdAt)}</span>
          </div>
        </header>
        <S.BoardPostDetailContent>
          <div className="board-post-detail-content-text">
            <span>{postDetail.data.title}</span>
            <div>{postDetail.data.content}</div>
          </div>
          <div className="board-post-detail-content-img-container">
            {postDetail.data.attachmentUrls &&
              postDetail.data.attachmentUrls.map((url, i) => (
                <img
                  key={i + "img"}
                  src={url}
                  className="board-post-detail-content-img"
                  alt="게시물 첨부 이미지"
                />
              ))}
          </div>
        </S.BoardPostDetailContent>
        <S.BoardPostDetailFooter>
          <S.BoardPostDetailLikeBtn
            className={postDetail.data.isLiked ? "liked" : ""}
            onClick={handleLike}
          >
            <img src={postDetail.data.isLiked ? heartLiked : heartUnliked} alt="좋아요" />
            {postDetail.data.likeCount}
          </S.BoardPostDetailLikeBtn>
          <div className="board-post-detail-footer-item">
            <img src={comment} alt="댓글" />
            {postDetail.data.responseOfCommentDetails.length}
          </div>
          <img src={share} alt="공유하기" />
        </S.BoardPostDetailFooter>
      </S.BoardPostDetailContainer>
      <S.BoardPostDetailCommentContainer>
        {postDetail.data.responseOfCommentDetails.length > 0 ? (
          postDetail.data.responseOfCommentDetails.map((comment, i) => (
            <div key={i + comment.content}>
              <BoardDetailComment
                profileName={comment.creatorName}
                profileImg={comment.creatorProfileImageUrl}
                elapsedTime={formatDate(comment.createdAt)}
                content={comment.content}
                isLike={comment.isLiked}
                likeCount={comment.likeCount}
                commentCount={0}
              />
            </div>
          ))
        ) : (
          <S.BoardPostCommentEmpty>
            아직 댓글이 없어요.
            <br />첫 댓글을 남겨보세요.
          </S.BoardPostCommentEmpty>
        )}
      </S.BoardPostDetailCommentContainer>
      <S.BoardDetailInputContainer>
        <S.BoardDetailInput
          placeholder="댓글을 입력하세요."
          value={commentValue}
          onChange={(e) => setCommentValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleRegisterComment();
            }
          }}
        />
        <img src={send} onClick={handleRegisterComment} alt="send" style={{ cursor: "pointer" }} />
      </S.BoardDetailInputContainer>
    </>
  );
};

const BoardDetailPage = () => {
  const { id: boardId } = useParams(); // 라우트에서 boardId를 가져옴
  const navigate = useNavigate();

  // spaceId를 1로 고정
  const spaceId = 1;
  // postId도 필요하므로 쿼리 파라미터나 다른 방법으로 전달받아야 함
  // 이 예제에서는 임시로 URL에서 postId를 추출한다고 가정
  const searchParams = new URLSearchParams(window.location.search);
  const postId = Number(searchParams.get("postId") || "1");

  return (
    <>
      <TopBarText
        left={LeftEnum.Back}
        center="게시판"
        right={""}
        // onBackClick={() => {
        //   navigate(-1);
        // }}
      />
      <PostDetailContent spaceId={spaceId} boardId={Number(boardId)} postId={postId} />
    </>
  );
};

export default BoardDetailPage;
