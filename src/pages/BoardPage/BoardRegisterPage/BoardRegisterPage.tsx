// import React, { useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styled from "styled-components";

import TopBarText, { LeftEnum } from "@/components/TopBarText";
import hashtagIcon from "@/assets/Board/hashtag.svg";
import fileIcon from "@/assets/Board/file_icon.svg";
import imageIcon from "@/assets/Board/image_icon.svg";
import styled from "styled-components";
import { useBoardListQuery } from "@/apis/Board";
import { SPACE_ID } from "@/utils/constants";
import { useParams } from "react-router-dom";
import { useState } from "react";

const Divider = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.BG800};
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const BoardRegisterContainer = styled.div`
  margin-left: 20px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;
const InputTitle = styled.input`
  border-radius: 0.75rem;
  background: var(--Foundation-Gray-gray800, #171719);
  border: none;
  padding: 1rem 0.25rem;

  /* text/Regular 16pt */
  font-family: Freesentation;
  font-size: 1.5rem;
  &:focus {
    outline: none;
  }
`;
const InputContent = styled.textarea`
  border-radius: 0.75rem;
  background: var(--Foundation-Gray-gray800, #171719);
  flex-grow: 1;
  border: none;
  padding: 1rem 0.25rem;

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

const BottomTagContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
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
  /* border-radius: 26px;
  
  background: var(--Foundation-Gray-gray850, #1b1b1d); */

  /* color: var(--Foundation-Main-color-Normal, #48ffbd);
  text-align: center; */

  /* text/Regular 12pt */
  font-family: Freesentation;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 16.8px */
  letter-spacing: 0.24px;
`;
const BottomAttachmentContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const BottomAttachmentImg = styled.img`
  cursor: pointer;
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
  const { id } = useParams();
  const { data } = useBoardListQuery(SPACE_ID);
  const tagList = data.result?.readBoardList
    .filter((value) => value.boardId == Number(id))
    .map((value) => value.tagName);

  const [selectedTag, setSelectedTag] = useState<Set<string>>(new Set());

  const onHashTagClick = (str: string) => {
    const temp = new Set<string>(selectedTag);
    if (selectedTag.has(str)) {
      temp.delete(str);
    } else {
      temp.add(str);
    }
    setSelectedTag(temp);
  };

  const onImageClick = () => {
    //TODO
  };
  const onFileClick = () => {
    //TODO
  };
  return (
    <>
      <TopBarText left={LeftEnum.Back} center={"글 쓰기"} right={"등록"} />
      <Container>
        <BoardRegisterContainer>
          <InputTitle placeholder="제목을 입력해주세요"></InputTitle>
          <Divider />
          <InputContent placeholder="내용을 입력해주세요"></InputContent>
        </BoardRegisterContainer>
        <BottomTagContainer>
          <img src={hashtagIcon}></img>
          {tagList?.map((value) => {
            return (
              <BottomTag
                value={value}
                isChecked={selectedTag.has(value)}
                onClick={onHashTagClick}
              />
            );
          })}
        </BottomTagContainer>
        <BottomAttachmentContainer>
          <BottomAttachmentImg onClick={onImageClick} src={imageIcon} />
          <BottomAttachmentImg onClick={onFileClick} src={fileIcon} />
        </BottomAttachmentContainer>
      </Container>
    </>
  );
};

export default BoardRegisterPage;
