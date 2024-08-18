import TopBarText, { LeftEnum } from "@/components/TopBarText";
import { ChangeEvent, useState } from "react";
import { BottomBtn } from "@/components/BottomBtn";
import { Input } from "@/components/Input";
import styled from "styled-components";
import camera from "@/assets/Space/icon_camera.svg";
import { To, useNavigate } from "react-router-dom";

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 60px;
  margin-bottom: 54px;
`;

const ChooseImgBtn = styled.div`
  display: flex;
  width: 160px;
  height: 160px;
  justify-content: center;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.BG500};
  align-items: center;
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
  width: 320px;
  bottom: 0;
  margin: 0;
`;

const AddSpacePage = () => {
  const [spacename, setSpacename] = useState("");
  const [newSpacename, setNewSpacename] = useState(spacename);
  const navigate = useNavigate();
  const maxChars = 10;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= maxChars) {
      setSpacename(value);
    }
  };

  const handleNavigate = (path: To) => {
		navigate(path);
	};

  
  const handleSaveSpacename = () => {
    setSpacename(newSpacename);
    handleNavigate("/");
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
      <div style={{ position: "relative", height: "3.25rem" }}>
        <NameInput 
          value={spacename}
          onChange={handleInputChange}
          placeholder="스페이스 공간"  
        />
        <Count>{spacename.length}/{maxChars}</Count>
      </div>
      <SpaceCreateBottomBtn 
        onClick={handleSaveSpacename}
        disabled={spacename === "" ? true : false}>
          생성하기
      </SpaceCreateBottomBtn>
    </div>
  );
};

export default AddSpacePage;
