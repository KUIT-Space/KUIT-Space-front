import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import BottomNavBar from "@/components/BottomNavBar";
import LoginPage from "@/pages/LoginPage/LoginPage";
import SignUpPage from "@/pages/LoginPage/SignUpPage";
import HomePage from "@/pages/HomePage";
import VoiceRoomListPage from "@/pages/VoiceRoomPage/VoiceRoomListPage";
import ChatPage from "@/pages/ChatPage/ChatPage";
import ChattingPage from "@/pages/ChatPage/ChattingPage/ChattingPage";
import { theme } from "@/styles/Theme";
import GlobalStyle from "@/styles/GlobalStyles";

const LayoutContainer = styled.div`
	position: relative;
	min-width: 360px;
	max-width: 720px;
	width: 100%;
	margin: 0 auto;

	#content {
		min-height: calc(100vh - 7.5rem);
		padding: 0 0 3.75rem;
	}
`;

function Layout() {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<LayoutContainer>
				<div id="content">
					<Outlet />
				</div>
				<BottomNavBar />
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
				{ path: "/chat", element: <ChatPage /> },
				{ path: "/chat/:id", element: <ChattingPage /> },
			],
		},
	];
	const router = createBrowserRouter(routes);

	return <RouterProvider router={router} />;
}

export default App;
