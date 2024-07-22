import TopBarText, { LeftEnum } from "@/components/TopBarText";
import { To, useNavigate } from "react-router-dom";
import setting from "@/assets/icon_setting.svg";
import add from "@/assets/icon_add.svg";
import styled from "styled-components";

const GridContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 10px;
	width: 320px;
	margin: auto;
`;

const GridItem = styled.div`
	width: 100px;
	height: 100px;
	background-color:;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const SpacePage = () => {
	const navigate = useNavigate();

	const handleNavigate = (path: To) => {
		navigate(path);
	};

	const tempJson = {
		spaceList: [
			{
				userName: "하진",
				lastUserSpaceId: 8,
				spaceInfoList: [
					{
						id: 1,
						image: "https://placehold.co/100x100",
					},
					{
						id: 2,
						image: "https://placehold.co/100x100",
					},
					{
						id: 3,
						image: "https://placehold.co/100x100",
					},
					{
						id: 4,
						image: "https://placehold.co/100x100",
					},
					{
						id: 5,
						image: "https://placehold.co/100x100",
					},
					{
						id: 6,
						image: "https://placehold.co/100x100",
					},
					{
						id: 7,
						image: "https://placehold.co/100x100",
					},
					{
						id: 8,
						image: "https://placehold.co/100x100",
					},
				],
			},
		],
	};

	const images = tempJson.spaceList[0].spaceInfoList;

	return (
		<>
			<div style={{ width: "320px", margin: "auto" }}>
				<TopBarText left={LeftEnum.Logo} center="" right={setting} />
				<div style={{ width: "320px", height: "202px", margin: "auto" }}>
					<h1>{tempJson.spaceList[0].userName}의 스페이스</h1>
					<h3>{tempJson.spaceList[0].lastUserSpaceId}개의 스페이스</h3>
				</div>
			</div>
			<GridContainer>
				{images.map((info, index) => (
					<GridItem key={index}>
						<img src={info.image} alt={`Space ${info.id}`} onClick={() => handleNavigate("/")} />
					</GridItem>
				))}
				<GridItem key="additional">
					<img src={add} onClick={() => handleNavigate("/")} />
				</GridItem>
				{images.length < 9 && Array.from({ length: 9 - images.length }).map((_, index) => <GridItem key={`empty-${index}`} onClick={() => handleNavigate("/")} />)}
			</GridContainer>
		</>
	);
};

export default SpacePage;
