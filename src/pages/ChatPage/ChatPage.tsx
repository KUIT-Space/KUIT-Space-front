import TopBarText, { LeftEnum } from "@/components/TopBarText";
import { useState } from "react";
import { ChatListContainer } from "./ChatPage.styled";

const ChatPage = () => {
	const [isAdmin, setIsAdmin] = useState<boolean>(false);

	//admin 확인 부분
	// setIsAdmin(false);

	return (
		<>
			<TopBarText left={LeftEnum.Logo} center="채팅방" right=""></TopBarText>
			<ChatListContainer>ddd</ChatListContainer>

			{isAdmin && <>aa</>}
		</>
	);
};

export default ChatPage;
