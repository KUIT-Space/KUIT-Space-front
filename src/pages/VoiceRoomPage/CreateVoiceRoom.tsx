import TopBarText from "@/components/TopBarText";
import { LeftEnum } from "@/components/TopBarText";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as s from "@/pages/VoiceRoomPage/CreateVoiceRoomPage.styled";
import styled from "styled-components";

const VRName = styled.p``;
const CreateVoiceRoomPage = () => {
	const navigate = useNavigate();
	return (
		<div>
			<TopBarText left={LeftEnum.Back} center="새 보이스룸" right="이것은 우측" />
		</div>
	);
};

export default CreateVoiceRoomPage;
