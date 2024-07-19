import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import BottomNavBar from "@/components/BottomNavBar";
import LoginPage from "@/pages/LoginPage/LoginPage";
import SignUpPage from "@/pages/LoginPage/SignUpPage";
import HomePage from "@/pages/HomePage";
import VoiceRoomListPage from "@/pages/VoiceRoomPage/VoiceRoomListPage";
import ChatPage from "@/pages/ChatPage/ChatPage";
import styled, { ThemeProvider } from "styled-components";
import theme from "@/styles/Theme";
import ChattingPage from "./pages/ChatPage/ChattingPage/ChattingPage";
import CreateVoiceRoomPage from "./pages/VoiceRoomPage/CreateVoiceRoom";
import JoinVoiceRoomPage from "./pages/VoiceRoomPage/JoinVoiceRoomPage";

const LayoutContainer = styled.div`
	display: flex;
	justify-content: center;
`;

function Layout() {
	return (
		<ThemeProvider theme={theme}>
			<LayoutContainer>
				<div style={{ position: "relative" }}>
					<Outlet />
					<BottomNavBar />
				</div>
			</LayoutContainer>
		</ThemeProvider>
	);
}

function App() {
	const routes = [
		{ path: "/login", element: <LoginPage /> },
		{ path: "/signUp", element: <SignUpPage /> },
		{
			element: <Layout />,
			children: [
				{ path: "/", element: <HomePage /> },
				{ path: "/voiceroom", element: <VoiceRoomListPage /> },
				{ path: "/createvoiceroom", element: <CreateVoiceRoomPage /> },
				{ path: "/joinvoiceroom", element: <JoinVoiceRoomPage /> },
				{ path: "/chat", element: <ChatPage /> },
				{ path: "/chat/:id", element: <ChattingPage /> },
			],
		},
	];
	const router = createBrowserRouter(routes);

	return <RouterProvider router={router} />;
}

export default App;
