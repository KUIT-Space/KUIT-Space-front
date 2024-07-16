import styled from "styled-components";

import yellow from "@/assets/VoiceRoom/yellow_gradient.svg";
import purple from "@/assets/VoiceRoom/purple_gradient.svg";

export const ActiveP = styled.p`
	font-family: "Freesentation SB";
	font-size: 18px;
`;
export const VRTitleP = styled.p`
	font-family: "Freesentation SB";
	font-size: 20px;
	color: black;
	position: absolute;
	margin-left: 16px;
`;
export const BGdiv = styled.div`
	display: flex;
	justify-content: left;
	background-image: url(${yellow});
	background-repeat: no-repeat;
	background-size: cover;
	width: 640px;
	height: 248px;
`;
export const BGdiv2 = styled.div`
	display: flex;
	justify-content: left;
	background-image: url(${purple});
	background-repeat: no-repeat;
	background-size: cover;
	width: 640px;
	height: 248px;
`;
export const RoundDiv = styled.div`
	background-color: #222226;
	border-radius: 20px;
	padding: 5px 10px 5px 10px;
	font-size: 14px;
	font-family: "Freesentation M";
`;

export const StyledButton = styled.button`
	background-color: #171719;
	border-radius: 12px;
	border: 1px solid #767681;
	padding: 20px 0px 20px 0px;
	margin-top: 10px;
	margin-bottom: 20px;
	color: #d4d4d9;

	width: 640px;
	font-size: 24px;
	font-family: "Freesentation M";
`;
