import TopBarText, { LeftEnum } from "@/components/TopBarText";
import { useState } from "react";
import { BottomBtn } from "@/components/BottomBtn";
import styled from "styled-components";
import camera from "@/assets/Space/icon_camera.svg";

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

const NameContainer = styled.div`
	height: 52px;
	border-radius: 12px;
	background-color: ${({ theme }) => theme.colors.BG800};
	display: flex;
	justify-content: center;
`;

const SpaceCreateBottomBtn = styled(BottomBtn)`
	display: fixed;
	width: 320px;
	bottom: 0;
	margin: 0;
`;

const AddSpacePage = () => {
	const [spacename, setSpacename] = useState("스페이스 이름");
	const [newSpacename, setNewSpacename] = useState(spacename);

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
			<NameContainer>
				<span>{spacename}</span>
				<span>{length}/10</span>
			</NameContainer>
			<SpaceCreateBottomBtn onClick={handleSaveSpacename}>생성하기</SpaceCreateBottomBtn>
		</div>
	);
};

export default AddSpacePage;
