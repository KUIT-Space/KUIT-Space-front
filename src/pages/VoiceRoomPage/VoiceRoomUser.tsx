import * as s from "@/pages/VoiceRoomPage/VoiceRoomUser.styled";
import micON from "@/assets/VoiceRoom/icon_microphone_ON.svg";
import micOFF from "@/assets/VoiceRoom/icon_microphone_OFF.svg";

type vrUser = {
	id: number;
	name: string;
	profile: string;
	isMicON: boolean;
};

const VoiceRoomUser = ({ props }: { props: vrUser }) => {
	return (
		<s.VRuserA>
			<s.VRuserListDiv>
				<s.VRuserImg src={props.profile}></s.VRuserImg>
				<div>{props.name}</div>
				<s.MicImg src={props.isMicON ? micON : micOFF}></s.MicImg>
			</s.VRuserListDiv>
		</s.VRuserA>
	);
};

export default VoiceRoomUser;
