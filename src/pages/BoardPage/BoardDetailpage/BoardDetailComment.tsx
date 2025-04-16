import React, { useState } from "react";
import styled from "styled-components";

import { useDeleteComment, useToggleLike, useUpdateComment } from "@/apis/Board";
import deleteIcon from "@/assets/Board/delete_comment.svg";
import editIcon from "@/assets/Board/edit_comment.svg";
import heartLiked from "@/assets/Board/heart_liked.svg";
import heartUnliked from "@/assets/Board/heart_unliked.svg";
import Modal from "@/components/Modal";
import { SPACE_ID } from "@/utils/constants";

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
  width: 100%;
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

const BoardPostCommentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const IconContainer = styled.div`
  padding: 0.25rem 0.5rem;
  border-radius: 0.125rem;
  background: var(--Foundation-Gray-gray800, #222226);
  display: flex;
  gap: 0.625rem;
  color: #45454b;
`;

const ConfirmButton = styled.div`
  border-radius: 8px;
  background: var(--Foundation-Main-color-Normal, #48ffbd);
  color: var(--Foundation-Gray-gray900_background, #171719);

  /* text/Bold 16pt */
  font-family: Freesentation;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 22.4px */
  letter-spacing: 0.32px;

  padding: 0 12px;
  cursor: pointer;
  user-select: none;
`;
const InputContent = styled.textarea`
  border-radius: 0.75rem;
  background: var(--Foundation-Gray-gray800, #171719);
  flex-grow: 1;
  border: none;
  padding: 0.25rem;

  color: var(--Foundation-Gray-gray400, #acacb5);

  /* text/Regular 14pt */
  font-family: Freesentation;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 19.6px */
  letter-spacing: 0.56px;
  &:focus {
    outline: none;
  }
`;
export type BoardDetailCommentProps = {
  boardId: number;
  postId: number;
  commentId: number;
  creatorName: string;
  creatorProfileImageUrl: string;
  createdAt: string;
  content: string;
  isLiked: boolean;
  likeCount: number;
  isPostOwner: boolean;
  isActiveComment: boolean;
};

const BoardDetailComment = ({
  boardId,
  postId,
  commentId,
  creatorName,
  creatorProfileImageUrl,
  createdAt,
  content,
  isLiked,
  likeCount,
  isPostOwner,
  isActiveComment,
}: BoardDetailCommentProps) => {
  const [isLikeNew, setIsLikeNew] = useState<boolean>(isLiked);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [textValue, setTextValue] = useState<string>(content);
  const [isModal, setIsModal] = useState<boolean>(false);
  const toggleLikeMutation = useToggleLike(SPACE_ID, boardId, commentId);
  const updateCommentMutation = useUpdateComment(SPACE_ID, boardId, postId);
  const deleteCommentMutation = useDeleteComment(SPACE_ID, boardId, postId);
  const onCommentLike = () => {
    setIsLikeNew((prev) => !prev);
    toggleLikeMutation.mutate({
      changeTo: !isLiked,
    });
  };
  const onCommentEdit = () => {
    setIsEdit(true);
  };
  const onCommentEditComplete = () => {
    setIsEdit(false);

    //TODO : 수정 API 호출
    updateCommentMutation.mutate({
      commentId: commentId,
      content: textValue,
    });
  };
  const onCommentDelete = () => {
    setIsModal(true);
  };

  return (
    <BoardDetailCommentContainer>
      <Modal
        isOpen={isModal}
        title={"행사를 삭제하시겠습니까?"}
        content={[]}
        leftButtonText="취소"
        rightButtonText="삭제"
        leftButtonColor="#454548"
        rightButtonColor="#FF5656"
        rightButtonTextColor="#fff"
        onClose={() => {
          setIsModal(false);
        }}
        onConfirm={() => {
          deleteCommentMutation.mutate(commentId);
          setIsModal(false);
        }}
      />
      {creatorProfileImageUrl ? (
        <img
          src={creatorProfileImageUrl}
          alt="프로필 이미지"
          className="board-post-detail-comment-img"
        />
      ) : (
        <div className="board-post-detail-comment-img" />
      )}
      <BoardDetailCommentContent>
        <BoardPostCommentContainer>
          <div className="board-post-detail-comment-profile">
            <span>{creatorName}</span>
            <span>{createdAt}</span>
          </div>
          <div className="board-post-detail-comment-edit-delete">
            {isEdit ? (
              <ConfirmButton onClick={onCommentEditComplete}>완료</ConfirmButton>
            ) : (
              <>
                {isPostOwner && isActiveComment && (
                  <IconContainer>
                    <img src={editIcon} style={{ cursor: "pointer" }} onClick={onCommentEdit} />
                    |
                    <img src={deleteIcon} style={{ cursor: "pointer" }} onClick={onCommentDelete} />
                  </IconContainer>
                )}
              </>
            )}
          </div>
        </BoardPostCommentContainer>
        {isEdit ? (
          <>
            <InputContent
              value={textValue}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTextValue(e.target.value)}
            />
          </>
        ) : (
          <>
            <div className="board-post-detail-comment-content">{content}</div>
            <div className="board-post-detail-comment-footer">
              <BoardPostCommentLikeBtn className={isLikeNew ? "liked" : ""} onClick={onCommentLike}>
                <img src={isLikeNew ? heartLiked : heartUnliked} alt="좋아요" />
                좋아요 {likeCount}
              </BoardPostCommentLikeBtn>
              {/* 대댓글은 복잡성으로 인해 미지원 */}
              {/* <div className="board-post-detail-comment-footer-item">
            <img src={comment} alt="댓글" />
            대댓글 {commentCount}
          </div> */}
            </div>
          </>
        )}
      </BoardDetailCommentContent>
    </BoardDetailCommentContainer>
  );
};

export default BoardDetailComment;
