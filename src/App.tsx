import { createBrowserRouter, matchPath, Outlet, RouterProvider, useLocation } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "@/styles/Theme";
import GlobalStyle from "@/styles/GlobalStyles";
import BottomNavBar from "@/components/BottomNavBar";
import LoginPage from "@/pages/LoginPage/LoginPage";
import SignUpPage from "@/pages/LoginPage/SignUpPage";
import HomePage from "@/pages/HomePage";
import VoiceRoomListPage from "@/pages/VoiceRoomPage/VoiceRoomListPage";
import ChatPage from "@/pages/ChatPage/ChatPage";
import ChattingPage from "@/pages/ChatPage/ChattingPage/ChattingPage";
import ChatCreatePage from "@/pages/ChatPage/ChatCreatePage/ChatCreatePage";
import PayPage from "@/pages/PayPage/PayPage";
import BoardPage from "@/pages/BoardPage/BoardPage";
import CreateVoiceRoomPage from "./pages/VoiceRoomPage/CreateVoiceRoom";
import JoinVoiceRoomPage from "./pages/VoiceRoomPage/JoinVoiceRoomPage";
import VoiceRoomPage from "./pages/VoiceRoomPage/VoiceRoomPage";
import EditVoiceRoomPage from "./pages/VoiceRoomPage/EditVoiceRoomPage";

// will we need constant path in later..?
// const PATH = {
// 	HOME: "/",
// 	LOGIN: "/login",
// 	SIGNUP: "/signUp",
// 	VOICEROOM: "/voiceroom",
// 	CHAT: "/chat",
// 	CHAT_ID: "/chat/:id",
// 	CHAT_CREATE: "/chat/create",
// 	PAY: "/pay",
// 	BOARD: "/board",
// };

const LayoutContainer = styled.div`
	position: relative;
	min-width: 360px;
	max-width: 720px;
	width: 100%;
	margin: 0 auto;

	#content {
		min-height: calc(100vh - 3.75rem);
	}
`;

interface RouteChildren {
	path: string;
	element: JSX.Element;
	hasBottomBar?: boolean;
}

function Layout({ routes_children }: { routes_children: RouteChildren[] }) {
	const { pathname } = useLocation();

	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<LayoutContainer>
				<div id="content">
					<Outlet />
				</div>
				{routes_children.find((child) => matchPath(child.path, pathname))?.hasBottomBar && <BottomNavBar />}
			</LayoutContainer>
		</ThemeProvider>
	);
}

function App() {
	const routes_children = [
		{ path: "/", element: <HomePage />, hasBottomBar: true },
		{ path: "/voiceroom", element: <VoiceRoomListPage />, hasBottomBar: true },
		{ path: "/chat", element: <ChatPage />, hasBottomBar: true },
		{ path: "/chat/:id", element: <ChattingPage /> },
		{ path: "/chat/create", element: <ChatCreatePage /> },
		{ path: "/pay", element: <PayPage />, hasBottomBar: true },
		{ path: "/board", element: <BoardPage />, hasBottomBar: true },
		{ path: "/createvoiceroom", element: <CreateVoiceRoomPage />, hasBottomBar: false },
		{ path: "/joinvoiceroom", element: <JoinVoiceRoomPage />, hasBottombar: false },
		{ path: "/editvoiceroom", element: <EditVoiceRoomPage />, hasBottombar: false },
		{ path: "/login", element: <LoginPage />, hasBottombar: false },
		{ path: "/signup", element: <SignUpPage />, hasBottombar: false },
	];

	const routes = [
		{
			element: <Layout routes_children={routes_children} />,
			children: routes_children,
		},
	];
	const router = createBrowserRouter(routes);

	return <RouterProvider router={router} />;
}

export default App;
