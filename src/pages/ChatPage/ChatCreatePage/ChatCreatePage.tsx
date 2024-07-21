import TopBarText, { LeftEnum } from "@/components/TopBarText";

const ChatCreatePage = () => {
	return (
		<>
			<TopBarText left={LeftEnum.Back} center="새 채팅방" right="" />
		</>
	);
};

export default ChatCreatePage;
