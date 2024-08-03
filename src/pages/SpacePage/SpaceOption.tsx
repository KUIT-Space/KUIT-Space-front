import TopBarText, { LeftEnum } from "@/components/TopBarText";
import { To, useNavigate } from "react-router-dom";
import right_arrow from "@/assets/Space/icon_right_arrow.svg";
import styled from "styled-components";

const Account = styled.div`
	display: flex;
	height: 56px;
	align-items: center;
	justify-content: space-between;
`;

const Profile = styled.div`
	display: flex;
	height: 56px;
	align-items: center;
	justify-content: space-between;
`;

const Alarm = styled.div`
	display: flex;
	height: 56px;
	align-items: center;
	justify-content: space-between;
`;

const Logout = styled.div`
	display: flex;
	height: 56px;
	align-items: center;
`;

const Withdraw = styled.div`
	display: flex;
	height: 56px;
	align-items: center;
	color: ${({ theme }) => theme.colors.char_red};
`;

const SpaceOption = () => {
	const navigate = useNavigate();

	const handleNavigate = (path: To) => {
		navigate(path);
	};

	return (
		<div style={{ width: "320px", margin: "auto" }}>
			<TopBarText left={LeftEnum.Back} center="전체 설정" right="" />
			<Account onClick={() => handleNavigate("/space/spaceoption/accountmanage")}>
				계정 정보
				<img style={{ display: "absolute", right: "0" }} src={right_arrow} alt="right_arrow" />
			</Account>
			<Profile onClick={() => handleNavigate("/space/spaceoption/profilemanage")}>
				프로필 관리
				<img style={{ display: "absolute", right: "0" }} src={right_arrow} alt="right_arrow" />
			</Profile>
			<Alarm onClick={() => handleNavigate("/space/spaceoption/alarmmanage")}>
				알림 관리
				<img style={{ display: "absolute", right: "0" }} src={right_arrow} alt="right_arrow" />
			</Alarm>
			<Logout onClick={() => handleNavigate("/login")}>로그아웃</Logout>
			<Withdraw onClick={() => handleNavigate("/login")}>탈퇴하기</Withdraw>
		</div>
	);
};

export default SpaceOption;
