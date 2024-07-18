import TopBarText from "@/components/TopBarText";
import { LeftEnum } from "@/components/TopBarText";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as s from "@/pages/VoiceRoomPage/CreateVoiceRoomPage.styled";
import styled from "styled-components";
import { relative } from "path";
const ContentDiv = styled.div`
	margin: 1rem 1.5rem 0rem 1.5rem;
	display: flex;
	flex-direction: column;
`;
const TitleDiv = styled.div`
	color: var(--Foundation-Gray-gray200, #efeff0);
	margin: 0rem 0rem 0.5rem 0rem;

	/* text/Regular 16pt */
	font-family: Freesentation;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: 140%; /* 22.4px */
	letter-spacing: 0.64px;
`;
const CreateBtn = styled.button`
	margin: auto 1.5rem 0rem 1.5rem;

	border: none;
	border-radius: 12px;
	background: var(--Foundation-Gray-gray600, #45454b);
`;
const InputName = styled.input`
	border-radius: 12px;
	border: none;
	padding: 1rem;
	background: var(--Foundation-Gray-gray800, #222226);
	color: var(--Foundation-Gray-white, #fff);

	/* text/Regular 16pt */
	font-family: Freesentation;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: 140%; /* 22.4px */
	letter-spacing: 0.64px;

	&:focus {
		outline: none;
		box-shadow: 0px 0px 4px var(--Foundation-Main-color-Normal, #48ffbd);
	}
`;

const CreateVoiceRoomPage = () => {
	const [step, setStep] = useState(1);
	const [spaceName, setSpaceName] = useState("");

	const navigate = useNavigate();

	function handleSpaceName(e: any) {
		const value = e.target.value;
		setSpaceName(value);
		console.log({ spaceName });
	}
	return (
		<div style={{ display: "flex", flexDirection: "column" }}>
			<TopBarText left={LeftEnum.Back} center="새 보이스룸" right=""></TopBarText>
			<ContentDiv>
				<TitleDiv>이름</TitleDiv>
				<InputName id="inputName" type="text" placeholder="보이스룸 이름" onChange={handleSpaceName} />
			</ContentDiv>
			<CreateBtn>생성하기</CreateBtn>
		</div>
	);
};

export default CreateVoiceRoomPage;
