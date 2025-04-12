import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import { useCreatePost } from "@/apis/Board";
import camera from "@/assets/Board/camera.svg";
import gallery from "@/assets/Board/gallery.svg";
import link from "@/assets/Board/link.svg";
import CheckBox from "@/components/CheckBox";
import TopBarText, { LeftEnum } from "@/components/TopBarText";
import { NOTICE_ID, SPACE_ID } from "@/utils/constants";

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

const BoardRegisterContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 1.25rem;

  .board-register-selected-image-container {
    display: flex;
    gap: 0.5rem;
    overflow-x: scroll;
  }
  .board-register-selected-image {
    width: 50%;
    height: 9.625rem;
  }
`;

const BoardRegisterManagerTitle = styled.label`
  width: 100%;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  padding: 0.5rem 0;
  margin-top: 1rem;
  border-bottom: 1px solid #222226;

  color: var(--Foundation-Gray-gray600, #45454b);
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;

  .board-register-manager-active {
    color: var(--Foundation-Main-color-Normal, #48ffbd);
  }
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

  color: var(--Foundation-Gray-white, #fff);
  font-family: Freesentation;
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
  max-width: 720px;
  bottom: 0;
  width: 100%;
  display: flex;
  padding: 0.25rem 1.25rem;
  gap: 0.5rem;
  background: var(--Foundation-Gray-gray800, #222226);
`;

const BoardRegisterPage = () => {
  const [title, setTitleValue] = useState<string>("");
  const [content, setContentValue] = useState<string>("");
  const [isNotice, setIsNotice] = useState<boolean>(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const navigate = useNavigate();
  const { id: boardId } = useParams();

  const spaceId = localStorage.getItem("spaceId");
  const { mutate: createPost } = useCreatePost(
    Number(spaceId) || SPACE_ID,
    isNotice ? NOTICE_ID : Number(boardId),
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const inputImgRef = useRef<HTMLInputElement>(null);

  const handleResizeHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  };

  const handleImageImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    image && setSelectedImages((prev) => [...prev, image]);
    console.log(selectedImages);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 100) {
      setTitleValue(e.target.value);
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 2000) {
      setContentValue(e.target.value);
    }
  };

  const handleRegister = () => {
    if (title && content && spaceId != null) {
      createPost(
        {
          title,
          content,
          isAnonymous: false,
          attachments: selectedImages || [],
        },
        {
          onSuccess: (res) => {
            console.log("생성 완료: ", res);
            navigate("/board");
          },
          onError: () => {
            alert("게시글 작성에 실패했습니다.");
          },
        },
      );
    }
  };

  return (
    <>
      <TopBarText
        left={LeftEnum.Back}
        center="게시글 작성"
        right={
          <BoardRegisterBtn
            className={title && content ? "board-register-btn-active" : ""}
            disabled={!title || !content}
            onClick={handleRegister}
          >
            등록
          </BoardRegisterBtn>
        }
      ></TopBarText>
      <BoardRegisterContainer>
        <BoardRegisterManagerTitle
          onClick={() => {
            setIsNotice((prev) => !prev);
            console.log(isNotice);
          }}
        >
          <CheckBox checked={isNotice} />
          <span className={isNotice ? "board-register-manager-active" : ""}>공지로 등록하기</span>
        </BoardRegisterManagerTitle>
        <BoardRegisterTitle
          ref={inputRef}
          placeholder="제목을 입력해주세요."
          onChange={handleTitleChange}
          value={title}
        />
        <BoardRegisterContent
          ref={textareaRef}
          placeholder="내용을 입력해주세요."
          onInput={handleResizeHeight}
          onChange={handleContentChange}
          value={content}
        />
        <div className="board-register-selected-image-container">
          {selectedImages.map((image, i) => {
            return (
              <img
                className="board-register-selected-image"
                key={i + image.name}
                src={URL.createObjectURL(image)}
                alt="board register selected image"
              />
            );
          })}
        </div>
      </BoardRegisterContainer>
      <BoardRegisterFooter>
        <input
          ref={inputImgRef}
          type="file"
          accept="image/*"
          onChange={handleImageImport}
          style={{ display: "none" }}
        />
        <img src={camera} alt="camera" />
        <img src={gallery} onClick={() => inputImgRef.current?.click()} />
        <img src={link} alt="link" />
      </BoardRegisterFooter>
    </>
  );
};

export default BoardRegisterPage;
