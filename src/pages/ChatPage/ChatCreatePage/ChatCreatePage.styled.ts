import styled from "styled-components";

import SearchIcon from "@/assets/ChatPage/icon_search.svg";
import { BottomBtn } from "@/components/BottomBtn";
import { Input } from "@/components/Input";

export const ChatroomAddImgBtn = styled.label<{ $backgroundImage: string | null | undefined }>`
  display: flex;
  width: 8.5rem;
  height: 8.5rem;
  padding: 2.25rem;
  margin: 2.5rem auto;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  cursor: pointer;

  border-radius: 0.75rem;
  background: ${(props) =>
    props.$backgroundImage
      ? `url(${props.$backgroundImage}) no-repeat center`
      : "var(--Foundation-Gray-gray500, #767681)"};
  background-size: cover;
`;

export const ChatCreateContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 0 1.25rem 6rem 1.25rem;

  .input--container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .invite {
    margin-right: 0.5rem;
  }

  .member--number {
    color: ${({ theme }) => theme.colors.normal};
  }
`;

export const InviteInput = styled(Input)`
  background-position: 1rem;
  background-image: url(${SearchIcon});
  background-repeat: no-repeat;
  padding-left: 2.5rem;
`;

export const ChatroomName = styled.div<{ $nameLength: number }>`
  position: relative;

  span {
    position: absolute;
    bottom: 0.9375rem;
    right: 1rem;

    color: var(--Foundation-Gray-gray500, #767681);
    text-align: right;

    /* text/Regular 16pt */
    font-family: Freesentation;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 1.4rem */
    letter-spacing: 0.04rem;
  }

  input {
    caret-color: ${(props) =>
      props.$nameLength >= 15 ? props.theme.colors.char_red : props.theme.colors.normal};
    &:focus {
      border-color: ${(props) =>
        props.$nameLength >= 15 ? props.theme.colors.char_red : props.theme.colors.normal};
    }
  }
`;

export const Member = styled.label`
  display: flex;
  user-select: none;
  padding: 0.5rem 0rem;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  section {
    display: flex;
    align-items: center;
  }

  .name {
    padding-left: 1rem;
    color: var(--Foundation-Gray-white, #fff);

    /* text/Regular 16pt */
    font-family: Freesentation;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 1.4rem */
    letter-spacing: 0.04rem;
  }

  .admin {
    padding-left: 0.5rem;
    color: var(--Foundation-Main-color-Normal, var(--normal, #48ffbd));
    text-align: center;

    /* text/Regular 14pt */
    font-family: Freesentation;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 1.225rem */
    letter-spacing: 0.035rem;
  }

  img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 6.25rem;
  }
`;

export const ChatCreateBottomBtn = styled(BottomBtn)`
  margin: 0;
`;
