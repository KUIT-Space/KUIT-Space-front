import TopBarText from "@/components/TopBarText";
import { LeftEnum } from "@/components/TopBarText";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as s from "@/pages/VoiceRoomPage/CreateVoiceRoomPage.styled";

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
			<s.ContentDiv>
				<s.TitleDiv>이름</s.TitleDiv>
				<s.InputName id="inputName" type="text" placeholder="보이스룸 이름" onChange={handleSpaceName} />
			</s.ContentDiv>
			<s.CreateBtn>생성하기</s.CreateBtn>
		</div>
	);
};

export default CreateVoiceRoomPage;
