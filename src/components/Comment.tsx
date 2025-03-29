import React from "react";
import styled from "styled-components";
import logoSpace from "./assets/profile_image.svg";
import like from "./assets/like.svg";
import commentIcon from "./assets/comment_icon.svg";

interface CommentProps {
  nickname: string;
  timeAgo: string;
  comment: string;
  likes: number;
}

const Wrapper = styled.div`
  background-color: #171719;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CommentContainer = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 1rem 1.25rem 0.5rem 1.25rem;
  color: var(--Foundation-Gray-gray200, #efeff0);
  font-family: Freesentation;
  width: 100%;
  background-color: #171719;
`;

const ProfileImage = styled.div`
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  margin-right: 0.5rem;
`;

const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
  color: var(--Foundation-Gray-gray200, #efeff0);
  font-family: Freesentation;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: 0.04rem;
`;

const Username = styled.div`
  color: var(--Foundation-Gray-gray200, #efeff0);
  font-family: Freesentation;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: 0.035rem;
`;

const TimeAgo = styled.span`
  color: var(--Foundation-Gray-gray500, #767681);
  font-family: Freesentation;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: 0.015rem;
  margin-left: 0.5rem;
`;

const CommentText = styled.div`
  color: var(--Foundation-Gray-gray200, #efeff0);
  align-self: stretch;
  font-family: Freesentation;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: 0.04rem;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  align-self: stretch;
`;

const Like = styled.div`
  color: var(--Foundation-Main-color-Sub-color-red, #FF5656);
font-family: Freesentation;
font-size: 0.75rem;
font-style: normal;
font-weight: 400;
line-height: 140%;
letter-spacing: 0.015rem;
  cursor: pointer;
  display: flex
  align-items: center
`;

const Reply = styled.div`
  color: var(--Foundation-Gray-gray500, #767681);
  font-family: Freesentation;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: 0.015rem;
  cursor: pointer;
`;

const Comment: React.FC<CommentProps> = ({ nickname, timeAgo, comment, likes }) => {
  return (
    <Wrapper>
      <CommentContainer>
        <ProfileImage>
          <img src={logoSpace} style={{ width: "100%" }} alt="Logo" />
        </ProfileImage>
        <div>
          <CommentContent>
            <div>
              <Username>
                {nickname}
                <TimeAgo>{timeAgo}</TimeAgo>
              </Username>
            </div>
            <CommentText>{comment}</CommentText>
            <Actions>
              <Like>
                <img
                  src={like}
                  alt="like"
                  style={{
                    width: "1.5rem",
                    height: "1.5rem",
                    verticalAlign: "middle",
                    objectFit: "contain",
                  }}
                />{" "}
                좋아요 {likes}
              </Like>
              <Reply>
                <img
                  src={commentIcon}
                  alt="comment"
                  style={{
                    width: "0.7rem",
                    height: "0.7rem",
                    padding: "0.4rem 0.4rem 0.4rem 0.4rem",
                    verticalAlign: "middle",
                    objectFit: "contain",
                  }}
                />
                대댓글
              </Reply>
            </Actions>
          </CommentContent>
        </div>
      </CommentContainer>
    </Wrapper>
  );
};

export default Comment;
