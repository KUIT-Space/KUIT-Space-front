import TopBarText from "@/components/TopBarText";
import { LeftEnum } from "@/components/TopBarText";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as s from "@/pages/VoiceRoomPage/CreateVoiceRoomPage.styled";
import styled from "styled-components";
import BigRoundDiv from "@/components/BigRoundDiv";
import { relative } from "path";

const CreateVoiceRoomPage = () => {
	const [step, setStep] = useState(1);
	const [name, setName] = useState("");

	const navigate = useNavigate();
	return (
		<div style={{ display: "flex" }}>
			<TopBarText left={LeftEnum.Back} center="새 보이스룸" right=""></TopBarText>
		</div>
	);
};

export default CreateVoiceRoomPage;
