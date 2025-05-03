import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import { useBoardListQuery, useCreatePost } from "@/apis/Board";
import hashtagIcon from "@/assets/Board/hashtag.svg";
import TopBarText, { LeftEnum } from "@/components/TopBarText";
import { NOTICE_ID, SPACE_ID } from "@/utils/constants";
import fileIcon from "@/assets/Board/file_icon.svg";
import imageIcon from "@/assets/Board/image_icon.svg";
import CheckBox from "@/components/CheckBox";
const BottomTagContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  background: var(--Foundation-Gray-gray900_background, #222226);
`;

interface BottomTagProps {
  isSelected: boolean;
}
const BottomTagDiv = styled.div<BottomTagProps>`
  cursor: pointer;
  padding: 4px 12px;
  border-radius: 26px;
  text-align: center;

  /* text/Regular 12pt */
  font-family: Freesentation;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 16.8px */
  letter-spacing: 0.24px;

  border: ${({ isSelected }) =>
    isSelected ? "1px solid var(--Foundation-Main-color-Normal, #48ffbd)" : "none"};
  background: ${({ isSelected }) =>
    isSelected ? "none" : "var(--Foundation-Gray-gray850, #1b1b1d)"};
  color: ${({ isSelected }) =>
    isSelected
      ? "var(--Foundation-Main-color-Normal, #48ffbd)"
      : "var(--Foundation-Gray-gray500, #767681)"};

  /* text/Regular 12pt */
  font-family: Freesentation;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 16.8px */
  letter-spacing: 0.24px;
`;
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
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0 1.25rem;

  .board-register-selected-image-container {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 4rem;
  }
  .board-register-selected-image {
    width: 25%;
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
  flex-grow: 1;

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
  display: flex;
  flex-direction: row;
  position: fixed;
  max-width: 720px;
  bottom: 0;
  width: 100%;
  display: flex;
  padding: 0.25rem 1.25rem;
  gap: 0.5rem;
  background: var(--Foundation-Gray-gray800, #222226);
  img {
    cursor: pointer;
  }
`;

const BottomTag = ({
  value,
  isChecked,
  onClick,
}: {
  value: string;
  isChecked: boolean;
  onClick: (selected: string) => void;
}) => {
  return (
    <BottomTagDiv
      onClick={() => {
        onClick(value);
      }}
      isSelected={isChecked}
    >
      {value}
    </BottomTagDiv>
  );
};
const BoardRegisterPage = () => {
  const { id, mode } = useParams();
  console.log(mode);
  const { data } = useBoardListQuery(SPACE_ID);

  const tagList = data.result?.readBoardList
    .filter((value) => value.boardId == Number(id) && value.tagName != null && value.tagId != null)
    .map((value) => ({ tagName: value.tagName, tagId: value.tagId }));

  const [title, setTitleValue] = useState<string>("");
  const [content, setContentValue] = useState<string>("");
  // const [isNotice, setIsNotice] = useState<boolean>(false);
  const [isAnon, setIsAnon] = useState<boolean>(false); //익명인지 체크

  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedTag, setSelectedTag] = useState<Set<number>>(new Set());

  const navigate = useNavigate();
  const { id: boardId } = useParams();

  const spaceId = SPACE_ID;
  const { mutate: createPost } = useCreatePost(Number(spaceId) || SPACE_ID, Number(boardId));

  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const inputImgRef = useRef<HTMLInputElement>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  if (mode === "edit") {
  }
  const onHashTagClick = (i: string) => {
    const temp = new Set<number>(selectedTag);
    const index = tagList!.find((tag) => tag.tagName === i);
    const tagId = index?.tagId!;

    if (selectedTag.has(tagId)) {
      temp.delete(tagId);
    } else {
      temp.add(tagId);
    }
    setSelectedTag(temp);
  };

  const handleResizeHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  };

  const handleImageImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    image && setSelectedImages((prev) => [...prev, image]);
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    file && setSelectedFiles((prev) => [...prev, file]);
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
    if ((title && content && spaceId != null && selectedTag.size > 0) || tagList?.length! <= 0) {
      createPost(
        {
          title,
          content,
          isAnonymous: isAnon,
          attachments: [...selectedImages, ...selectedFiles] || null,
          tagIds: Array.from(selectedTag),
        },
        {
          onSuccess: (res) => {
            console.log("생성 완료: ", res);
            navigate("/board");
          },
          onError: (err) => {
            console.log(err);
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
            className={
              (title && content && selectedTag.size > 0) || tagList?.length! <= 0
                ? "board-register-btn-active"
                : ""
            }
            onClick={handleRegister}
          >
            등록
          </BoardRegisterBtn>
        }
      ></TopBarText>
      <BoardRegisterContainer>
        {mode === "question" && (
          <BoardRegisterManagerTitle
            onClick={() => {
              setIsAnon((prev) => !prev);
            }}
          >
            <CheckBox checked={isAnon} />
            <span className={isAnon ? "board-register-manager-active" : ""}>익명으로 질문하기</span>
          </BoardRegisterManagerTitle>
        )}
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
        <div style={{ width: "100%" }}>
          {(tagList === undefined || tagList?.length > 0) && (
            <BottomTagContainer>
              <img src={hashtagIcon}></img>
              {tagList?.map((value) => {
                return (
                  <BottomTag
                    key={value.tagId}
                    value={value.tagName}
                    isChecked={selectedTag.has(value.tagId)}
                    onClick={onHashTagClick}
                  />
                );
              })}
            </BottomTagContainer>
          )}
          <div>
            <input
              ref={inputImgRef}
              type="file"
              accept="image/*"
              onChange={handleImageImport}
              style={{ display: "none" }}
            />
            <input
              ref={inputFileRef}
              type="file"
              onChange={handleFileImport}
              style={{ display: "none" }}
            />
            {/* <img src={camera} alt="camera" /> */}
            <img src={imageIcon} onClick={() => inputImgRef.current?.click()} />
            <img src={fileIcon} onClick={() => inputFileRef.current?.click()} />
          </div>
        </div>
      </BoardRegisterFooter>
    </>
  );
};

export default BoardRegisterPage;
