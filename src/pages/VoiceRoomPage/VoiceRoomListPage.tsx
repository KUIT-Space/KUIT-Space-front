import TopBarText from "@/components/TopBarText";
import { LeftEnum } from "@/components/TopBarText";
import yellow from "@/assets/VoiceRoom/yellow_gradient.svg";
import purple from "@/assets/VoiceRoom/purple_gradient.svg";
import plus from "@/assets/VoiceRoom/icon_plus.svg";
import styled from "styled-components";
import { useState } from "react";

const ActiveP = styled.p`
	font-family: "Freesentation SB";
	font-size: 18px;
`;
const VRTitleP = styled.p`
	font-family: "Freesentation SB";
	font-size: 20px;
	color: black;
	position: absolute;
	margin-left: 16px;
`;
const BGdiv = styled.div`
	display: flex;
	justify-content: left;
	background-image: url(${yellow});
	background-repeat: no-repeat;
	background-size: cover;
	width: 640px;
	height: 248px;
`;
const BGdiv2 = styled.div`
	display: flex;
	justify-content: left;
	background-image: url(${purple});
	background-repeat: no-repeat;
	background-size: cover;
	width: 640px;
	height: 248px;
`;
const RoundDiv = styled.div`
	background-color: #222226;
	border-radius: 20px;
	padding: 5px 10px 5px 10px;
	font-size: 14px;
	font-family: "Freesentation M";
`;

const StyledButton = styled.button`
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

function voiceRoomList() {
	const [arr, setArr] = useState([]);
	const checkHandler = () => {
		//fetch list
	};
}

function memberList() {}

const VoiceRoomListPage = () => {
	return (
		<div style={{ width: "640px", margin: "auto" }}>
			<TopBarText left={LeftEnum.Logo} center="보이스룸" right="" />
			<ActiveP> 활동 중인 보이스룸 </ActiveP>
			<BGdiv>
				<div>
					<VRTitleP> {"보이스룸 1"} </VRTitleP>
					<div style={{ display: "flex", alignItems: "center", width: "640px", height: "124px", marginLeft: "16px" }}>
						<RoundDiv>대화 중인 스페이서 6명</RoundDiv>
					</div>
				</div>
			</BGdiv>
			<BGdiv2 style={{ marginTop: "12px" }}>
				<div>
					<VRTitleP> {"보이스룸 1"} </VRTitleP>
					<div style={{ display: "flex", alignItems: "center", width: "640px", height: "124px", marginLeft: "16px" }}>
						<RoundDiv>대화 중인 스페이서 6명</RoundDiv>
					</div>
				</div>
			</BGdiv2>
			<ActiveP> 아무도 없어요! </ActiveP>
			<RoundDiv style={{ color: "#767681", paddingTop: "20px", paddingBottom: "20px", marginBottom: "10px" }}>보이스룸 3</RoundDiv>
			<RoundDiv style={{ color: "#767681", paddingTop: "20px", paddingBottom: "20px", marginBottom: "10px" }}>보이스룸 4</RoundDiv>
			<div>
				<StyledButton>
					<div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
						<img src={plus} style={{ marginRight: "8px" }} />
						새로 만들기
					</div>
				</StyledButton>
			</div>
		</div>
	);
};

export default VoiceRoomListPage;
