// BoardDetailPage.styles.ts
import styled from "styled-components";

export const BoardPostDetailContainer = styled.div`
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

export const BoardPostDetailCommentContainer = styled.div`
  padding-bottom: 4rem;
`;

export const BoardPostDetailContent = styled.section`
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

export const BoardPostDetailFooter = styled.section`
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

export const BoardPostDetailLikeBtn = styled.div`
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

export const BoardPostCommentEmpty = styled.div`
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

export const BoardDetailInputContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0.5rem 1rem;
  gap: 0.5rem;
  max-width: 720px;

  #anonymous-icon {
    position: absolute;
    left: 1.5rem;
    top: 1rem;
  }

  #send-icon {
    cursor: pointer;
    position: absolute;
    right: 1.5rem;
    top: 1rem;
    width: 2rem;
    height: 2rem;
    margin-left: auto;
  }
`;

export const BoardDetailInput = styled.input`
  width: 100%;
  height: 3rem;
  padding: 0.5rem 1rem;
  padding-left: 4rem;
  border: none;
  border-radius: 0.625rem;
  background: var(--Foundation-Gray-gray800, #222226);

  color: var(--Foundation-Gray-gray500, #767681);
  /* text/Regular 14pt */
  font-family: Freesentation;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 19.6px */
  letter-spacing: 0.56px;
  color: var(--WHITE, #fff);

  &:focus {
    outline: none;
  }

  caret-color: ${(props) => props.theme.colors.normal};
`;
