import TopBarText, { LeftEnum } from "@/components/TopBarText";
import { To, useNavigate } from "react-router-dom";
import styled from "styled-components";

const ProfileContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 2px;
`;

const ProfileInfo = styled.div`
	display: flex;
	align-items: center;
	background-color: ${({ theme }) => theme.colors.BG800};
	border-radius: 12px;
	margin-bottom: 12px;
`;

const ProfileImg = styled.img`
	width: 40px;
	height: 40px;
	border-radius: 99px;
	margin-top: 12px;
	margin-bottom: 12px;
	margin-left: 16px;
`;

const Manager = styled.span`
	font-size: 12px;
	color: ${({ theme }) => theme.colors.char_lime};
	margin-left: 8px;
`;

const ProfileManage = () => {
	const navigate = useNavigate();

	const handleNavigate = (path: To) => {
		navigate(path);
	};

	const tempJson = {
		profileList: [
			{
				spaceName: "프로젝트 스페이스",
				profileImg: "https://placehold.co/40x40",
				profileName: "김하진",
				IsManager: true,
			},
			{
				spaceName: "코딩하지 않으면 나갈 수 없는 방",
				profileImg: "https://placehold.co/40x40",
				profileName: "김성유",
				IsManager: false,
			},
			{
				spaceName: "이름없는 거위 오두막",
				profileImg: "https://placehold.co/40x40",
				profileName: "양서준",
				IsManager: true,
			},
			{
				spaceName: "새벽 3시의 매실장아찌",
				profileImg: "https://placehold.co/40x40",
				profileName: "정연우",
				IsManager: false,
			},
		]
	}

	const profiles = tempJson.profileList;

	return (
		<div style={{ width: "320px", margin: "auto" }}>
			<TopBarText left={LeftEnum.Back} center="프로필 관리" right="" />
			<div style={{ height: "16px" }}></div>
			{profiles.map((profile, index) => (
				<ProfileContainer key={index} onClick={() => handleNavigate("/space/spaceoption/accountmanage")}>
					<span style={{ marginTop: "12px", marginBottom: "8px" }}>{profile.spaceName}</span>
					<ProfileInfo>
						<ProfileImg src={profile.profileImg} alt="IMG" />
						<span style={{ marginLeft: "12px" }}>{profile.profileName}</span>
						{profile.IsManager && <Manager>관리자</Manager>}
					</ProfileInfo>
				</ProfileContainer>
			))}
		</div>
	);
};

export default ProfileManage;
