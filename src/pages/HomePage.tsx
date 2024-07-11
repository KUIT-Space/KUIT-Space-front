import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
	const navigate = useNavigate();
	return (
		//test Link
		<div>
			<h1>Home page link 모음 입니다</h1>
			<Link to="/voiceroom">voiceroom link</Link>
		</div>
	);
};

export default HomePage;
