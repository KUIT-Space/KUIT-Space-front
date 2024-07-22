import * as s from "@/pages/VoiceRoomPage/VoiceRoomUser.styled";

type vrUser = {
	id: number;
	name: string;
	profile: string;
};

const VoiceRoomUser = ({ props }: { props: vrUser }) => {
	return (
		<s.VRuserA>
			<s.VRuserListDiv>
				<s.VRuserImg src={props.profile}></s.VRuserImg>
				<div>{props.name}</div>
			</s.VRuserListDiv>
		</s.VRuserA>
	);
};

export default VoiceRoomUser;
