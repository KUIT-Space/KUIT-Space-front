import BigRoundDiv from "@/components/BigRoundDiv";
import TopBarText, { LeftEnum } from "@/components/TopBarText";
import * as s from "@/pages/VoiceRoomPage/JoinVoiceRoom.styled";
import redo from "@/assets/icon_redo.svg";

//임시로 적용하는 프로필 이미지
import reactLogo from "@/assets/react.svg";
import { BottomBtn } from "@/components/BottomBtn";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import VoiceRoomPage from "./VoiceRoomPage";

const JoinVoiceRoomPage = () => {
	const title = "작업 안 하면 죽는 방";
	const user_num = 6;
	const userProfile = reactLogo;
	const userName = "박가온";

	const [isJoined, setJoin] = useState(false);
	const [vrCode, setvrCode] = useState("테스트 보이스룸");

	const navigate = useNavigate();
	return (
		<div>
			{isJoined ? (
				<>
					<VoiceRoomPage VoiceRoomName={vrCode} setJoin={setJoin}></VoiceRoomPage>
				</>
			) : (
				<>
					<TopBarText left={LeftEnum.Back} center="보이스룸 참여" right=""></TopBarText>
					<s.ContentDiv>
						<s.InnerDiv>
							<s.TitleDiv>{title}</s.TitleDiv>
							<BigRoundDiv content={`"대화중인 스페이서 ${user_num}명"`} />
						</s.InnerDiv>

						<s.ProfileDiv>
							<img src={userProfile}></img>
							<img src={redo}></img>
						</s.ProfileDiv>
						<div>{userName}</div>
						<BottomBtn
							disabled={false}
							onClick={() => {
								setJoin(true);
							}}
						>
							참여하기
						</BottomBtn>
					</s.ContentDiv>
				</>
			)}
		</div>
	);
};

export default JoinVoiceRoomPage;
