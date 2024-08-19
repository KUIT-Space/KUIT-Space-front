import TopBarText, { LeftEnum } from "@/components/TopBarText";
import { ChangeEvent, useState } from "react";
import { BottomBtn } from "@/components/BottomBtn";
import { Input } from "@/components/Input";
import styled from "styled-components";
import camera from "@/assets/Space/icon_camera.svg";
import { To, useNavigate } from "react-router-dom";
import { createSpaceApi } from "@/apis";

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 60px;
  margin-bottom: 54px;
`;

const ChooseImgBtn = styled.label<{ $backgroundImage: string | null }>`
  display: flex;
  flex-direction: column;
  width: 160px;
  height: 160px;
  justify-content: center;
  border-radius: 12px;
  background: ${(props) =>
    props.$backgroundImage
      ? `url(${props.$backgroundImage}) no-repeat center`
      : "var(--Foundation-Gray-gray500, #767681)"};

  background-size: cover;
  align-items: center;
  cursor: pointer;

  input {
    display: none;
  }
`;

const Count = styled.span`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: ${({ theme }) => theme.colors.BG500};
`;

const NameInput = styled(Input)`
  padding-right: 3rem; /* Count를 위한 여유 공간 */
`;

const SpaceCreateBottomBtn = styled(BottomBtn)`
  display: fixed;
  width: 100%;
  bottom: 1;
  margin: 0;
`;

const AddSpacePage = () => {
  const [spacename, setSpacename] = useState("");

  const [spaceImg, setSpaceImg] = useState<File | null>(null);
  const navigate = useNavigate();
  const maxChars = 10;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= maxChars) {
      setSpacename(value);
    }
  };

  const handleCreateSpace = () => {
    createSpaceApi(spacename, spaceImg).then((data) => {
      if (data?.result.spaceId !== undefined) {
        localStorage.setItem("spaceId", data?.result.spaceId.toString());
        navigate(`/space/${data?.result.spaceId}`);
      }
    });
  };

  const handleImageImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    image && setSpaceImg(image);
  };

  return (
    <div>
      <TopBarText left={LeftEnum.Back} center="새 스페이스" right="" />
      <div style={{ margin: "0rem 1.25rem 0rem 1.25rem" }}>
        <ImgContainer>
          <ChooseImgBtn $backgroundImage={spaceImg !== null ? URL.createObjectURL(spaceImg) : null}>
            <img src={camera} />
            <input type="file" accept="image/*" onChange={handleImageImport} />
          </ChooseImgBtn>
        </ImgContainer>
        <div style={{ position: "relative", height: "3.25rem" }}>
          <NameInput value={spacename} onChange={handleInputChange} placeholder="스페이스 공간" />
          <Count>
            {spacename.length}/{maxChars}
          </Count>
        </div>
        <SpaceCreateBottomBtn
          onClick={handleCreateSpace}
          disabled={spacename === "" ? true : false}
        >
          생성하기
        </SpaceCreateBottomBtn>
      </div>
    </div>
  );
};

export default AddSpacePage;
