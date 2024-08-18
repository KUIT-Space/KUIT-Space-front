import TopBarText, { LeftEnum } from "@/components/TopBarText";
import { To, useNavigate } from "react-router-dom";
import setting from "@/assets/icon_setting.svg";
import add from "@/assets/icon_add.svg";
import edit from "@/assets/Space/icon_space_edit.svg";
import styled from "styled-components";
import { useState } from "react";

const TopBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  width: 320px;
  border-radius: 12px;
  margin: auto;
  margin-bottom: 26px;
  z-index: 2;
`;

const GridItem = styled.div`
  display: flex;
  width: 100px;
  height: 100px;
  background-color: ${({ theme }) => theme.colors.BG800};
  border-radius: 12px;	
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const SettingBtn = styled.img`
  margin-left: auto;
  cursor: pointer;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
`;

const Subtitle = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.BG500};
`;

const SpaceNumber = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.char_lime};
`;

const EditBtn = styled.img<{ active: boolean }>`
  display: flex;
  width: 36px;
  height: 36px;
  align-items: center,
  cursor: pointer;
  color: red;
  filter: ${({ active }) => (active ? "invert(64%) sepia(95%) saturate(358%) hue-rotate(68deg) brightness(91%) contrast(89%)" : "none")};
  z-index: 2;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.7;
  z-index: 1;
`;

const SpacePage = () => {
  const navigate = useNavigate();
  const [editActive, setEditActive] = useState(false);

  const handleNavigate = (path: To) => {
  	navigate(path);
  };

  const toggleEdit = () => {
    setEditActive(!editActive);
  };

  const response = {
		userName: "하진",
		lastUserSpaceId: 8,
		spaceInfoList: [
			{
				spaceId: 1,
				spaceName: "작업 안하면 죽는 방",
				profileImgUrl: "https://placehold.co/100x100",
			},
			{
				spaceId: 2,
				spaceName: "작업 안하면 죽는 방",
				profileImgUrl: "https://placehold.co/100x100",
			},
			{
				spaceId: 3,
				spaceName: "작업 안하면 죽는 방",
				profileImgUrl: "https://placehold.co/100x100",
			},
			{
				spaceId: 4,
				spaceName: "작업 안하면 죽는 방",
				profileImgUrl: "https://placehold.co/100x100",
			},
			{
				spaceId: 5,
				spaceName: "작업 안하면 죽는 방",
				profileImgUrl: "https://placehold.co/100x100",
			},
			{
				spaceId: 6,
				spaceName: "작업 안하면 죽는 방",
				profileImgUrl: "https://placehold.co/100x100",
			},
			{
				spaceId: 7,
				spaceName: "작업 안하면 죽는 방",
				profileImgUrl: "https://placehold.co/100x100",
			},
			{
				spaceId: 8,
				spaceName: "작업 안하면 죽는 방",
				profileImgUrl: "https://placehold.co/100x100",
			},
			/*
			{
				spaceId: 9,
				spaceName: "작업 안하면 죽는 방",
				profileImgUrl: "https://placehold.co/100x100",
			},
			{
				spaceId: 10,
				spaceName: "작업 안하면 죽는 방",
				profileImgUrl: "https://placehold.co/100x100",
			},
			{
				spaceId: 11,
				spaceName: "작업 안하면 죽는 방",
				profileImgUrl: "https://placehold.co/100x100",
			},
			{
				spaceId: 12,
				spaceName: "작업 안하면 죽는 방",
				profileImgUrl: "https://placehold.co/100x100",
			},
			{
				spaceId: 13,
				spaceName: "작업 안하면 죽는 방",
				profileImgUrl: "https://placehold.co/100x100",
			},
			*/
		],
  }


  const images = response.spaceInfoList;

  return (
  	<>
	  {editActive && <Overlay />}
      <div style={{ width: "320px", margin: "auto", paddingBottom: "10px", position: "relative"}}>
		<TopBarContainer>
	      <TopBarText left={LeftEnum.Logo} center="" right="" />
		  <SettingBtn src={setting} alt="setting" onClick={() => handleNavigate("/space/spaceoption")} />
		</TopBarContainer>
		  <div style={{ height: "202px", display: "flex", flexDirection: "column" }}>
		    <div style={{ height: "39px", marginTop: "77px", display: "flex", alignItems: "center" }}>
		      <Title>{response.userName}의 스페이스</Title>
		    </div>
			<div style={{ height: "36px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
			  <div>
				<SpaceNumber>{response.lastUserSpaceId}</SpaceNumber>
				<Subtitle>개의 스페이스</Subtitle>
			  </div>
			  <EditBtn src={edit} alt="edit" active={editActive} onClick={toggleEdit} />
			</div>
		  </div>
	  </div>
		<GridContainer>
		  {images.map((info, index) => (
		    <GridItem key={index}>
			  <img src={info.profileImgUrl} alt={`Space ${info.spaceId}`} onClick={() => handleNavigate("/")} />
			</GridItem>
		  ))}
		  {!editActive ? (
		    <GridItem onClick={() => handleNavigate("/space/addspace")}>
			  <img src={add} />
		    </GridItem>)
			: (
			<GridItem /> 
		  )}
		  {images.length < 9 && Array.from({ length: 8 - images.length }).map((_, index) => <GridItem key={`empty-${index}`} />)}
		</GridContainer>
	</>
  );
};

export default SpacePage;
