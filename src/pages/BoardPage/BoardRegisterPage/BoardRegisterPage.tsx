import React, { useRef, useState } from "react";
import styled from "styled-components";

import camera from "@/assets/Board/camera.svg";
import gallery from "@/assets/Board/gallery.svg";
import link from "@/assets/Board/link.svg";
import TopBarText, { LeftEnum } from "@/components/TopBarText";

const BoardRegisterBtn = styled.button`
  color: var(--Foundation-Gray-gray500, #767681);
  /* text/Regular 16pt */
  font-size: 1rem;
  font-weight: 400;
  line-height: 140%; /* 1.4rem */
  letter-spacing: 0.04rem;

  &.board-register-btn-active {
    color: var(--Foundation-Gray-white, #fff);
  }
`;

const BoardRegsiterContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 1.25rem;
`;

const BoardRegisterTitle = styled.input`
  margin-top: 1.5rem;
  width: 100%;
  padding-bottom: 0.75rem;
  border: none;
  border-bottom: 1px solid #222226;
  background: none;

  color: var(--Foundation-Gray-white, #fff);
  font-size: 1rem;
  font-weight: 600;
  line-height: 140%; /* 1.4rem */

  &::placeholder {
    color: var(--Foundation-Gray-gray400, #acacb5);
  }

  &:focus {
    outline: none;
  }
`;

const BoardRegisterContent = styled.textarea`
  margin-top: 1rem;
  width: 100%;
  height: auto;
  border: none;
  background: none;

  font-family: Freesentation;
  color: var(--Foundation-Gray-white, #fff);
  /* regular/14pt */
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 140%; /* 19.6px */
  letter-spacing: 0.035rem;

  &::placeholder {
    color: var(--Foundation-Gray-gray400, var(--GRAY-400, #acacb5));
  }

  &:focus-visible {
    outline: none;
  }
`;

const BoardRegisterFooter = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  padding: 0.25rem 1.25rem;
  gap: 0.5rem;
  background: var(--Foundation-Gray-gray800, #222226);
`;

const BoardRegisterPage = () => {
  const [titleValue, setTitleValue] = useState<string>("");
  const [contentValue, setContentValue] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleResizeHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  };

  const handleRegister = () => {
    if (titleValue && contentValue) {
      console.log("register success!!");
    }
    console.log("register fail..");
  };

  return (
    <>
      <TopBarText
        left={LeftEnum.Back}
        center="게시글 작성"
        right={
          <BoardRegisterBtn
            className={titleValue && contentValue ? "board-register-btn-active" : ""}
            onClick={handleRegister}
          >
            등록
          </BoardRegisterBtn>
        }
      ></TopBarText>
      <BoardRegsiterContainer>
        <BoardRegisterTitle
          ref={inputRef}
          placeholder="제목을 입력해주세요."
          onChange={(e) => setTitleValue(e.target.value)}
        ></BoardRegisterTitle>
        <BoardRegisterContent
          ref={textareaRef}
          placeholder="내용을 입력해주세요."
          onInput={handleResizeHeight}
          onChange={(e) => setContentValue(e.target.value)}
        ></BoardRegisterContent>
      </BoardRegsiterContainer>
      <BoardRegisterFooter>
        <img src={camera} />
        <img src={gallery} />
        <img src={link} />
      </BoardRegisterFooter>
    </>
  );
};

export default BoardRegisterPage;
