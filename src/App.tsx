import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import BottomNavBar from "@/components/BottomNavBar";
import LoginPage from "@/pages/LoginPage/LoginPage";
import HomePage from "@/pages/HomePage";
import VoiceRoomListPage from "@/pages/VoiceRoomPage/VoiceRoomListPage";
import ChatPage from "@/pages/ChatPage/ChatPage";
import styled, { ThemeProvider } from "styled-components";
import theme from "@/styles/Theme";

const LayoutContainer = styled.div`
	display: flex;
	justify-content: center;
`;

function Layout() {
	return (
		<ThemeProvider theme={theme}>
			<LayoutContainer>
				<div>
					<Outlet />
					<BottomNavBar />
				</div>
			</LayoutContainer>
		</ThemeProvider>
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
