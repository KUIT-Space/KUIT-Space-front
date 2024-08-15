import TopBarText from "@/components/TopBarText";
import { LeftEnum } from "@/components/TopBarText";
import plus from "@/assets/VoiceRoom/icon_plus.svg";
import back from "@/assets/icon_back.svg";
import setting from "@/assets/VoiceRoom/icon_setting.svg";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as s from "@/pages/VoiceRoomPage/VoiceRoomListPage.styled";
import * as sty from "@/components/TopBarText.styled";

const VoiceRoomPage = ({ VoiceRoomName, setJoin }: { VoiceRoomName: string; setJoin: React.Dispatch<React.SetStateAction<boolean>> }) => {
	const navigate = useNavigate();
	return (
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
	);
};

export default VoiceRoomPage;
