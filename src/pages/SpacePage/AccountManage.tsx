import TopBarText, { LeftEnum } from "@/components/TopBarText";
import styled from "styled-components";
import right_arrow from "@/assets/Space/icon_right_arrow.svg";
import { To, useNavigate } from "react-router-dom";

const Name = styled.div`
	display: flex;
	height: 56px;
	align-items: center;
	justify-content: space-between;
`;

const Id = styled.div`
	display: flex;
	height: 56px;
	align-items: center;
	justify-content: space-between;
`;

const Password = styled.div`
	display: flex;
	height: 56px;
	align-items: center;
	justify-content: space-between;
`;

const AccountManage = () => {
	const navigate = useNavigate();
	
	const handleNavigate = (path: To) => {
		navigate(path);
	};

	return (
		<div style={{ width: "320px", margin: "auto" }}>
			<TopBarText left={LeftEnum.Back} center="계정 정보" right="" />
			<Name onClick={() => handleNavigate("/")}>
				이름 변경
				<img style={{ display: "absolute", right: "0" }} src={right_arrow} alt="right_arrow" />
			</Name>
			<Id onClick={() => handleNavigate("/")}>
				아이디 변경
				<img style={{ display: "absolute", right: "0" }} src={right_arrow} alt="right_arrow" />
			</Id>
			<Password onClick={() => handleNavigate("/")}>
				비밀번호 변경
				<img style={{ display: "absolute", right: "0" }} src={right_arrow} alt="right_arrow" />
			</Password>
		</div>
	);
};

export default AccountManage;
