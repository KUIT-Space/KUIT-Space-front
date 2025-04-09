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

// import { CreateBoardPostApi } from "@/apis/Board/BoardPostApi";
// import camera from "@/assets/Board/camera.svg";
// import gallery from "@/assets/Board/gallery.svg";
// import link from "@/assets/Board/link.svg";
// import CheckBox from "@/components/CheckBox";
// import TopBarText, { LeftEnum } from "@/components/TopBarText";
// import { SPACE_ID } from "@/utils/constants";

// const BoardRegisterBtn = styled.button`
//   color: var(--Foundation-Gray-gray500, #767681);
//   /* text/Regular 16pt */
//   font-size: 1rem;
//   font-weight: 400;
//   line-height: 140%; /* 1.4rem */
//   letter-spacing: 0.04rem;

//   &.board-register-btn-active {
//     color: var(--Foundation-Gray-white, #fff);
//   }
// `;

// const BoardRegisterContainer = styled.div`
//   width: 100%;
//   height: 100%;
//   padding: 0 1.25rem;

//   .board-register-selected-image-container {
//     display: flex;
//     gap: 0.5rem;
//     overflow-x: scroll;
//   }
//   .board-register-selected-image {
//     width: 50%;
//     height: 9.625rem;
//   }
// `;

// const BoardRegisterManagerTitle = styled.label`
//   width: 100%;
//   display: flex;
//   gap: 0.5rem;
//   align-items: center;
//   padding: 0.5rem 0;
//   margin-top: 1rem;
//   border-bottom: 1px solid #222226;

//   color: var(--Foundation-Gray-gray600, #45454b);
//   font-size: 0.875rem;
//   font-style: normal;
//   font-weight: 500;
//   line-height: 140%;

//   .board-register-manager-active {
//     color: var(--Foundation-Main-color-Normal, #48ffbd);
//   }
// `;

// const BoardRegisterTitle = styled.input`
//   margin-top: 1.5rem;
//   width: 100%;
//   padding-bottom: 0.75rem;
//   border: none;
//   border-bottom: 1px solid #222226;
//   background: none;

//   color: var(--Foundation-Gray-white, #fff);
//   font-size: 1rem;
//   font-weight: 600;
//   line-height: 140%; /* 1.4rem */

//   &::placeholder {
//     color: var(--Foundation-Gray-gray400, #acacb5);
//   }

//   &:focus {
//     outline: none;
//   }
// `;

// const BoardRegisterContent = styled.textarea`
//   margin-top: 1rem;
//   width: 100%;
//   height: auto;
//   border: none;
//   background: none;

//   color: var(--Foundation-Gray-white, #fff);
//   font-family: Freesentation;
//   /* regular/14pt */
//   font-size: 0.875rem;
//   font-weight: 400;
//   line-height: 140%; /* 19.6px */
//   letter-spacing: 0.035rem;

//   &::placeholder {
//     color: var(--Foundation-Gray-gray400, var(--GRAY-400, #acacb5));
//   }

//   &:focus-visible {
//     outline: none;
//   }
// `;

// const BoardRegisterFooter = styled.div`
//   position: fixed;
//   max-width: 720px;
//   bottom: 0;
//   width: 100%;
//   display: flex;
//   padding: 0.25rem 1.25rem;
//   gap: 0.5rem;
//   background: var(--Foundation-Gray-gray800, #222226);
// `;

// const BoardRegisterPage = () => {
//   const [titleValue, setTitleValue] = useState<string>("");
//   const [contentValue, setContentValue] = useState<string>("");
//   const [isNotice, setIsNotice] = useState<boolean>(false);
//   const [selectedImages, setSelectedImages] = useState<File[]>([]);

//   const navigate = useNavigate();

//   const spaceId = localStorage.getItem("spaceId");

//   const inputRef = useRef<HTMLInputElement>(null);
//   const textareaRef = useRef<HTMLTextAreaElement>(null);

//   const inputImgRef = useRef<HTMLInputElement>(null);

//   const handleResizeHeight = () => {
//     if (textareaRef.current) {
//       textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
//     }
//   };

//   const handleImageImport = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const image = e.target.files?.[0];
//     image && setSelectedImages((prev) => [...prev, image]);
//     console.log(selectedImages);
//   };

//   const handleRegister = () => {
//     if (titleValue && contentValue && spaceId != null) {
//       //채팅방 생성 API 호출
//       CreateBoardPostApi(
//         Number.parseInt(spaceId) || SPACE_ID,
//         titleValue,
//         contentValue,
//         isNotice ? "notice" : "general",
//         selectedImages || [],
//       ).then((res) => {
//         if (res) {
//           console.log("생성 완료: ", res);
//           navigate("/board");
//         }
//       });
//     }
//     console.log("register fail..");
//   };

//   return (
//     <>
//       <TopBarText
//         left={LeftEnum.Back}
//         center="게시글 작성"
//         right={
//           <BoardRegisterBtn
//             className={titleValue && contentValue ? "board-register-btn-active" : ""}
//             onClick={handleRegister}
//           >
//             등록
//           </BoardRegisterBtn>
//         }
//       ></TopBarText>
//       <BoardRegisterContainer>
//         <BoardRegisterManagerTitle
//           onClick={() => {
//             setIsNotice((prev) => !prev);
//             console.log(isNotice);
//           }}
//         >
//           <CheckBox checked={isNotice} />
//           <span className={isNotice ? "board-register-manager-active" : ""}>공지로 등록하기</span>
//         </BoardRegisterManagerTitle>
//         <BoardRegisterTitle
//           ref={inputRef}
//           placeholder="제목을 입력해주세요."
//           onChange={(e) => setTitleValue(e.target.value)}
//         />
//         <BoardRegisterContent
//           ref={textareaRef}
//           placeholder="내용을 입력해주세요."
//           onInput={handleResizeHeight}
//           onChange={(e) => setContentValue(e.target.value)}
//         />
//         <div className="board-register-selected-image-container">
//           {selectedImages.map((image, i) => {
//             return (
//               <img
//                 className="board-register-selected-image"
//                 key={i + image.name}
//                 src={URL.createObjectURL(image)}
//                 alt="board register selected image"
//               />
//             );
//           })}
//         </div>
//       </BoardRegisterContainer>
//       <BoardRegisterFooter>
//         <input
//           ref={inputImgRef}
//           type="file"
//           accept="image/*"
//           onChange={handleImageImport}
//           style={{ display: "none" }}
//         />
//         <img src={camera} alt="camera" />
//         <img src={gallery} onClick={() => inputImgRef.current?.click()} />
//         <img src={link} alt="link" />
//       </BoardRegisterFooter>
//     </>
//   );
// };

// export default BoardRegisterPage;
