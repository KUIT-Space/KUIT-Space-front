import { useParams } from "react-router-dom";

const ChattingPage = () => {
	const param = useParams();
	return <div>ChattingPage {param.id}</div>;
};

export default ChattingPage;
