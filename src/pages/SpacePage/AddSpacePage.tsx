import TopBarText, { LeftEnum } from "@/components/TopBarText";
import { ChangeEvent, useState } from "react";
import { BottomBtn } from "@/components/BottomBtn";
import styled from "styled-components";
import camera from "@/assets/Space/icon_camera.svg";
import { Input } from "@/components/Input";

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 60px;
  margin-bottom: 54px;
`;

const ChooseImgBtn = styled.div`
  width: 160px;
  height: 160px;
  justify-content: center;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.BG500};
  display: flex;
  align-items: center;
`;

const NameInput = styled.div`
  height: 52px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.BG800};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
`;

const InputText = styled.span`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.BG500};
`;

const SpaceCreateBottomBtn = styled(BottomBtn)`
  display: fixed;
  width: 320px;
  bottom: 0;
  margin: 0;
`;

const AddSpacePage = () => {
  const [spacename, setSpacename] = useState("");
  const [newSpacename, setNewSpacename] = useState(spacename);
  const maxChars = 10;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= maxChars) {
      setSpacename(value);
    }
  };
  
  const handleSaveSpacename = () => {
    setSpacename(newSpacename);
  };

  return (
    <div style={{ width: "320px", margin: "auto" }}>
      <TopBarText left={LeftEnum.Back} center="새 스페이스" right="" />
      <ImgContainer>
        <ChooseImgBtn>
          <img src={camera} />
          <img key="backgroundImg" />
        </ChooseImgBtn>
      </ImgContainer>
      <NameInput>
        <Input 
          value={spacename}
          onChange={handleInputChange}
          placeholder=""  
        />
        <InputText>{spacename.length}/{maxChars}</InputText>
      </NameInput>
      <SpaceCreateBottomBtn onClick={handleSaveSpacename}>생성하기</SpaceCreateBottomBtn>
    </div>
  );
};

export default AddSpacePage;
