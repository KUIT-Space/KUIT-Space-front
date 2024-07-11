import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import BottomNavBar from "@/components/BottomNavBar";
import LoginPage from "@/pages/LoginPage/LoginPage";
import HomePage from "@/pages/HomePage";
import VoiceRoomListPage from "@/pages/VoiceRoomPage/VoiceRoomListPage";
import ChatPage from "@/pages/ChatPage/ChatPage";
import styled from "styled-components";

const LayoutContainer = styled.div`
	display: flex;
	justify-content: center;
`;

function Layout() {
	return (
		<LayoutContainer>
			<div>
				<Outlet />
				<BottomNavBar />
			</div>
		</LayoutContainer>
	);
}

function App() {
	const routes = [
		{
			element: <Layout />,
			children: [
				{ path: "/", element: <HomePage /> },
				{ path: "/login", element: <LoginPage /> },
				{ path: "/voiceroom", element: <VoiceRoomListPage /> },
				{ path: "/chat", element: <ChatPage /> },
			],
		},
	];
	const router = createBrowserRouter(routes);

	return <RouterProvider router={router} />;
}

export default App;
