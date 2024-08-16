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
	background-color: ${({ theme }) => theme.colors.BG800};
	display: flex;
	justify-content: center;
	align-items: center;
`;

const SettingBtn = styled.img`
	display: absolute;
	right: 0;
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
`

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
			<div style={{ width: "320px", margin: "auto", marginBottom: "10px" }}>
				<div>
					<TopBarText left={LeftEnum.Logo} center="" right="" />
					<SettingBtn src={setting} alt="setting" onClick={() => handleNavigate("/space/spaceoption")} />
				</div>
				<div style={{ height: "202px", display: "flex", flexDirection: "column" }}>
					<div style={{ height: "39px", marginTop: "77px", display: "flex", alignItems: "center" }}>
						<Title>{tempJson.spaceList[0].userName}의 스페이스</Title>
					</div>
					<div style={{ height: "36px", display: "flex", alignItems: "center" }}>
						<SpaceNumber>{tempJson.spaceList[0].lastUserSpaceId}</SpaceNumber>
						<Subtitle>개의 스페이스</Subtitle>
					</div>
				</div>
			</div>
			<GridContainer>
				{images.map((info, index) => (
					<GridItem key={index}>
						<img src={info.image} alt={`Space ${info.id}`} onClick={() => handleNavigate("/")} />
					</GridItem>
				))}
				<GridItem onClick={() => handleNavigate("/space/addspace")}>
					<img src={add} />
				</GridItem>
				{images.length < 9 && Array.from({ length: 8 - images.length }).map((_, index) => <GridItem key={`empty-${index}`} />)}
			</GridContainer>
		</>
	);
};

export default SpacePage;
