import { useState } from "react";
import { useParams } from "react-router-dom";

import { useCreateComment, usePostDetailQuery, useToggleLike } from "@/apis/Board";
import AnonymousIcon from "@/assets/Board/anonymous.svg";
import CheckedAnonymousIcon from "@/assets/Board/check_anonymous.svg";
import comment from "@/assets/Board/comment.svg";
import heartLiked from "@/assets/Board/heart_liked.svg";
import heartUnliked from "@/assets/Board/heart_unliked.svg";
import share from "@/assets/Board/share.svg";
import send from "@/assets/ChatPage/btn_send.svg";
import TopBarText, { LeftEnum } from "@/components/TopBarText";
import BoardDetailComment from "@/pages/BoardPage/BoardDetailpage/BoardDetailComment";
import { SPACE_ID } from "@/utils/constants";

import * as S from "./BoardDetailPage.styled";

// 실제 게시물 내용을 표시하는 컴포넌트
interface PostDetailContentProps {
  spaceId: number;
  boardId: number;
  postId: number;
}

const PostDetailContent = ({ spaceId, boardId, postId }: PostDetailContentProps) => {
  const { data: postDetail } = usePostDetailQuery(spaceId, boardId, postId);
  const toggleLikeMutation = useToggleLike(spaceId, boardId, postId);
  const createCommentMutation = useCreateComment(spaceId, boardId, postId);
  const [commentValue, setCommentValue] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleLike = () => {
    toggleLikeMutation.mutate({
      changeTo: !postDetail.result?.isLiked,
    });
  };

  const handleRegisterComment = () => {
    if (commentValue.trim()) {
      createCommentMutation.mutate(
        {
          content: commentValue,
          isAnonymous: isAnonymous,
        },
        {
          onSuccess: () => {
            setCommentValue("");
          },
          onError: () => {
            // TODO : 모달로 바꾸기
            window.alert("해당 글은 익명으로 작성 불가능합니다");
          },
        },
      );
    }
  };

  return (
    <>
      <S.BoardPostDetailContainer>
        <header className="board-post-detail-header">
          {postDetail.result?.creatorProfileImageUrl ? (
            <img
              src={postDetail.result?.creatorProfileImageUrl}
              alt="프로필 이미지"
              className="board-post-detail-header-img"
            />
          ) : (
            <div className="board-post-detail-header-img" />
          )}
          <div className="board-post-detail-header-text">
            <span>{postDetail.result?.creatorName}</span>
            <span>{postDetail.result?.createdAt ?? ""}</span>
          </div>
        </header>
        <S.BoardPostDetailContent>
          <div className="board-post-detail-content-text">
            <span>{postDetail.result?.title}</span>
            <div>{postDetail.result?.content}</div>
          </div>
          <div className="board-post-detail-content-img-container">
            {postDetail.result?.attachmentUrls &&
              postDetail.result.attachmentUrls.map((url, i) => (
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
            className={postDetail.result?.isLiked ? "liked" : ""}
            onClick={handleLike}
          >
            <img src={postDetail.result?.isLiked ? heartLiked : heartUnliked} alt="좋아요" />
            {postDetail.result?.likeCount}
          </S.BoardPostDetailLikeBtn>
          <div className="board-post-detail-footer-item">
            <img src={comment} alt="댓글" />
            {postDetail.result?.responseOfCommentDetails.length}
          </div>
          <img src={share} alt="공유하기" />
        </S.BoardPostDetailFooter>
      </S.BoardPostDetailContainer>
      <S.BoardPostDetailCommentContainer>
        {postDetail.result && postDetail.result.responseOfCommentDetails.length > 0 ? (
          postDetail.result.responseOfCommentDetails.map((comment, i) => (
            <div key={i + comment.content}>
              <BoardDetailComment
                boardId={boardId}
                commentId={comment.commentId}
                profileName={comment.creatorName}
                profileImg={comment.creatorProfileImageUrl}
                elapsedTime={comment.createdAt}
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
        <img
          id="anonymous-icon"
          src={isAnonymous ? `${CheckedAnonymousIcon}` : `${AnonymousIcon}`}
          alt="익명 여부 아이콘"
          onClick={() => setIsAnonymous(!isAnonymous)}
          style={{ cursor: "pointer", marginRight: "8px" }}
        />
        <S.BoardDetailInput
          placeholder="댓글을 입력하세요."
          value={commentValue}
          onChange={(e) => setCommentValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleRegisterComment();
            }
          }}
        />
        <img
          id="send-icon"
          src={send}
          onClick={handleRegisterComment}
          alt="send"
          style={{ cursor: "pointer" }}
        />
      </S.BoardDetailInputContainer>
    </>
  );
};

const BoardDetailPage = () => {
  const { id: boardId, postId } = useParams();

  return (
    <>
      <TopBarText left={LeftEnum.Back} center="게시판" right={""} />
      <PostDetailContent spaceId={SPACE_ID} boardId={Number(boardId)} postId={Number(postId)} />
    </>
  );
};

export default BoardDetailPage;
