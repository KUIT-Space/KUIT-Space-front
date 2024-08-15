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

export const ChattingFooter = styled.div`
  display: flex;
  width: 100%;
  max-height: 30%;

  padding: 0.5rem;
  justify-content: center;
  align-items: flex-end;
  gap: 0.5rem;
  flex-shrink: 0;

  border-top: 1px solid var(--Foundation-Gray-gray800, #222226);
  background: var(--Foundation-Gray-gray800, #222226);

  .send {
    width: 2.25rem;
    height: 2.25rem;
    flex-shrink: 0;
  }

  .menu {
    display: flex;
    width: 2.25rem;
    height: 2.25rem;
    padding: 0.32144rem;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
  }

  button {
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 0.5rem;
  }

  button:active {
    background-color: ${({ theme }) => theme.colors.BG700};
  }
`;

export const ChattingTextarea = styled.textarea`
  background-color: ${({ theme }) => theme.colors.BG700};
  height: auto;
  max-height: 100%;

  width: calc(100% - 5rem);
  border-radius: 1rem;
  padding: calc((2.25rem - 1.25rem) / 2) 1rem;
  /* scrollbar-width: none; */
  /* resize: none; */

  font-family: Freesentation;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.25rem;

  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  caret-color: ${({ theme }) => theme.colors.normal};
  &:focus {
    border-color: ${({ theme }) => theme.colors.normal};
    outline: none;
  }
`;
