import TopBarText, { LeftEnum } from "@/components/TopBarText";
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

const ProfileManage = () => {
	return (
		<div style={{ width: "320px", margin: "auto" }}>
			<TopBarText left={LeftEnum.Back} center="프로필 관리" right="" />
			<div style={{ height: "16px" }}></div>
			<ProfileContainer>
				<span style={{ marginTop: "12px", marginBottom: "8px" }}>프로젝트 스페이스</span>
				<ProfileInfo>
					<ProfileImg src="https://placehold.co/40x40" alt="IMG" />
					<span style={{ marginLeft: "12px" }}>김하진</span>
					<span style={{ marginLeft: "8px" }}>관리자</span>
				</ProfileInfo>
			</ProfileContainer>
		</div>
	);
};

export default ProfileManage;
