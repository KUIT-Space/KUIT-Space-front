import styled from "styled-components";

export const ChattingContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const ChattingBody = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.BG900};

  .message {
    margin-bottom: 1rem;
  }

  .message-header {
    display: flex;
    align-items: center;
  }

  .profile-img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 100%;
    margin-right: 0.5rem;
  }

  .user-name {
    font-weight: bold;
    margin-right: 0.5rem;
  }

  .message-time {
    color: #999;
  }

  .message-content {
    margin-top: 0.5rem;
  }
`;
