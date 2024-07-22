import styled from "styled-components";

import yellow from "@/assets/VoiceRoom/yellow_gradient.svg";
import purple from "@/assets/VoiceRoom/purple_gradient.svg";

export const ActiveP = styled.p`
	font-family: "Freesentation SB";
	font-size: 1.125rem;
`;
export const VRTitleDiv = styled.div`
	font-family: "Freesentation SB";
	font-size: 1.25rem;
	color: black;
	position: absolute;
	margin: 1rem;
`;
export const BGdiv = styled.div`
	display: flex;
	justify-content: left;
	background-image: url(${yellow});
	background-repeat: no-repeat;
	background-size: cover;
	width: 100%;
	height: 248px;
`;
export const BGdiv2 = styled.div`
	display: flex;
	justify-content: left;
	background-image: url(${purple});
	background-repeat: no-repeat;
	background-size: cover;
	width: 100%;
	height: 248px;
`;
export const RoundDiv = styled.div`
	background-color: #222226;
	border-radius: 1.25rem;
	padding: 0.25rem;
	font-size: 0.875rem;
	font-family: "Freesentation M";
	color: "#767681";
	margin: 0.625rem 0rem 0.625rem 0rem;
`;

export const RoundDiv2 = styled.div`
	background-color: #222226;
	border-radius: 1.25rem;
	padding: 0.875rem 1rem 0.875rem 1rem;
	font-size: 0.875rem;
	font-family: "Freesentation M";
	color: "#767681";
	margin: 0.625rem 0rem 0.625rem 0rem;
`;

export const StyledButton = styled.button`
	background-color: #171719;
	border-radius: 12px;
	border: 1px solid #767681;
	padding: 1rem 0px 1rem 0px;
	margin: 0.875rem 0rem 1.25rem 0rem;
	color: #d4d4d9;

	width: 100%;
	font-size: 1.5rem;
	font-family: "Freesentation M";
`;

export const StyledDiv = styled.div`
	width: "100%";
	margin: "auto";
`;