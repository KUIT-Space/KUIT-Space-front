import TopBarText, { LeftEnum } from "@/components/TopBarText";
import * as s from "@/pages/VoiceRoomPage/EditVoiceRoomPage.styled";
import menu from "@/assets/VoiceRoom/icon_menu_icon.svg";
import clear from "@/assets/VoiceRoom/icon_delete_X.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditVoiceRoomPage = () => {
	const [text, setText] = useState([]);
	const navigator = useNavigate();
	const rightClickHandler = () => {
		navigator("/voiceroom");
	};
	const textChangeHandler = () => {};
	const onClearHandler = () => {
		console.log("CLEAR!");
	};
	return (
		<div style={{ width: "100%" }}>
			<TopBarText left={LeftEnum.None} center="보이스룸" right="완료" rightHandler={rightClickHandler} />
			<s.TitleDiv>보이스룸 목록</s.TitleDiv>
			<s.ContentDiv>
				<s.InnerContentDiv>
					<s.IconImg src={menu}></s.IconImg>
					<s.NameDiv>
						<s.NameInput></s.NameInput>
						<s.ClearImg src={clear} onClick={onClearHandler}></s.ClearImg>
					</s.NameDiv>
				</s.InnerContentDiv>
			</s.ContentDiv>
		</div>
	);
};

export default EditVoiceRoomPage;
