import TopBarText from "@/components/TopBarText";
import { LeftEnum } from "@/components/TopBarText";
import plus from "@/assets/VoiceRoom/icon_plus.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as s from "@/pages/VoiceRoomPage/VoiceRoomListPage.styled";

function memberList() {}

function voiceRoomList() {
	const [arr, setArr] = useState([]);
	const checkHandler = () => {
		//fetch list
	};
}

const VoiceRoomListPage = () => {
	const navigate = useNavigate();
	return (
		<div style={{}}>
			<TopBarText left={LeftEnum.Logo} center="보이스룸" right="" />
			<s.ActiveP> 활동 중인 보이스룸 </s.ActiveP>
			<s.BGdiv>
				<div>
					<s.VRTitleDiv> {"보이스룸 1"} </s.VRTitleDiv>
					<div style={{ display: "flex", alignItems: "center", width: "640px", height: "124px", marginLeft: "16px" }}>
						<s.RoundDiv>대화 중인 스페이서 6명</s.RoundDiv>
					</div>
				</div>
			</s.BGdiv>
			<s.BGdiv2 style={{ marginTop: "12px" }}>
				<div>
					<s.VRTitleDiv> {"보이스룸 1"} </s.VRTitleDiv>
					<div style={{ display: "flex", alignItems: "center", width: "640px", height: "124px", marginLeft: "16px" }}>
						<s.RoundDiv>대화 중인 스페이서 6명</s.RoundDiv>
					</div>
				</div>
			</s.BGdiv2>
			<s.ActiveP> 아무도 없어요! </s.ActiveP>
			<s.RoundDiv2>보이스룸 3</s.RoundDiv2>
			<s.RoundDiv2>보이스룸 4</s.RoundDiv2>
			<div>
				<s.StyledButton>
					<div
						style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
						onClick={() => {
							navigate("/createvoiceroom");
						}}
					>
						<img src={plus} style={{ marginRight: "8px" }} />
						새로 만들기
					</div>
				</s.StyledButton>
			</div>
		</div>
	);
};

export default VoiceRoomListPage;
