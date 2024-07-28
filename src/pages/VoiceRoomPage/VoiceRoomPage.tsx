import TopBarText from "@/components/TopBarText";
import { LeftEnum } from "@/components/TopBarText";
import plus from "@/assets/VoiceRoom/icon_plus.svg";
import back from "@/assets/icon_back.svg";
import setting from "@/assets/VoiceRoom/icon_setting.svg";
import person from "@/assets/VoiceRoom/icon_members.svg";
import mic from "@/assets/VoiceRoom/icon_microphone.svg";
import emoji from "@/assets/VoiceRoom/icon_react_emoji.svg";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as s from "@/pages/VoiceRoomPage/VoiceRoomPage.styled";
import * as sty from "@/components/TopBarText.styled";

const VoiceRoomPage = ({ VoiceRoomName, setJoin }: { VoiceRoomName: string; setJoin: React.Dispatch<React.SetStateAction<boolean>> }) => {
	const navigate = useNavigate();
	return (
		<>
			<div>
				<sty.StyledTopBarDiv>
					<sty.StyledLeftDiv
						onClick={() => {
							setJoin(false);
						}}
					>
						<img src={back}></img>
					</sty.StyledLeftDiv>
					<sty.StyledCenterDiv>
						<sty.StyledCenterP>{VoiceRoomName}</sty.StyledCenterP>
					</sty.StyledCenterDiv>
					<sty.StyledRightDiv>
						<img src={setting} />
					</sty.StyledRightDiv>
				</sty.StyledTopBarDiv>
			</div>
			<s.ContentDiv>
				<div>
					<canvas></canvas>
				</div>
				<s.BottomDiv>
					<div>
						<img src={person}></img>
						<div style={{ marginTop: "0.5rem" }}>참가자</div>
					</div>
					<div>
						<img src={mic}></img>
						<div style={{ marginTop: "0.5rem" }}>참가자</div>
					</div>
					<div>
						<img src={emoji}></img>
						<div style={{ marginTop: "0.5rem" }}>참가자</div>
					</div>
				</s.BottomDiv>
			</s.ContentDiv>
		</>
	);
};

export default VoiceRoomPage;
