import BigRoundDiv from "@/components/BigRoundDiv";
import TopBarText, { LeftEnum } from "@/components/TopBarText";
import styled from "styled-components";

import redo from "@/assets/icon_redo.svg";

//임시로 적용하는 프로필 이미지
import reactLogo from "@/assets/react.svg";
import { BottomBtn } from "@/components/BottomBtn";

const ProfileDiv = styled.div`
	margin-top: 51px;
`;
const InnerDiv = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
`;
const ContentDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
	width: 100%;
	margin: 64px 77px 77px 0px;
`;

const TitleDiv = styled.div`
	text-align: center;
	margin: 0px 0px 6px 0px;
`;

const CreateBtn = styled.button`
	margin: auto 20px 0px 20px;
	padding: 14px;

	border: none;
	border-radius: 12px;

	text-align: center;
	font-family: Freesentation;
	font-size: 18px;
	font-style: normal;
	font-weight: 600;
	line-height: 140%; /* 25.2px */
	letter-spacing: 0.36px;
	background: ${(props) => (props.disabled ? "var(--Foundation-Gray-gray600, #45454B);" : "var(--Foundation-Main-color-Normal, #48FFBD)")};
	color: ${(props) => (props.disabled ? "var(--Foundation-Gray-gray400, var(--GRAY-400, #ACACB5));" : "var(--Foundation-Gray-gray900_background, #171719)")};
`;

const JoinVoiceRoomPage = () => {
	const title = "작업 안 하면 죽는 방";
	const user_num = 6;
	const userProfile = reactLogo;
	const userName = "박가온";
	return (
		<div>
			<TopBarText left={LeftEnum.Back} center="" right=""></TopBarText>
			<ContentDiv>
				<InnerDiv>
					<TitleDiv>{title}</TitleDiv>
					<BigRoundDiv content={`"대화중인 스페이서 ${user_num}명"`} />
				</InnerDiv>

				<ProfileDiv>
					<img src={userProfile}></img>
					<img src={redo}></img>
				</ProfileDiv>
				<div>{userName}</div>
				<BottomBtn disabled={false}>참여하기</BottomBtn>
			</ContentDiv>
		</div>
	);
};

export default JoinVoiceRoomPage;
