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
`;

export const StyledMessage = styled.div<{ $isUser: boolean }>`
  margin-bottom: 1rem;

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
    color: var(--Foundation-Gray-white, #fff);
    /* text/Regular 14pt */
    font-family: Freesentation;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 1.225rem */
    letter-spacing: 0.035rem;
  }

  .message-time {
    ${({ $isUser }) => !$isUser && "flex: 1 0 0;"}

    color: var(--Foundation-Gray-gray500, #767681);
    /* text/Regular 10pt */
    font-family: Freesentation;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 0.875rem */
    letter-spacing: 0.0125rem;
  }

  .message-content-container {
    display: flex;
    align-items: flex-end;
    ${({ $isUser }) => $isUser && "justify-content: flex-end;"}
  }

  .message-content {
    max-width: 70%;
    ${({ $isUser }) => ($isUser ? "margin: 0 1rem 0 0.5rem;" : "margin: 0 0.5rem 0 3rem;")}

    display: inline-flex;
    padding: 0.5rem 0.75rem;
    align-items: center;
    border-radius: 0.75rem;

    ${({ $isUser }) => ($isUser ? "background: var(--GRAY-300, #d4d4d9);" : "background: #222226;")}

    ${({ $isUser }) => ($isUser ? "color: #000;" : "color: var(--Foundation-Gray-white, #fff);")}
    
    /* body_14(20)_regular */
    font-family: Freesentation;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5rem;
    letter-spacing: 0.025rem;
  }
`;
