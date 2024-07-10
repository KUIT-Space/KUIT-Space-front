import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Header from "./components/Header";
import BottomNavBar from "./components/BottomNavBar";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage";
import VoiceRoomListPage from "./pages/VoiceRoomPage/VoiceRoomListPage";
import GlobalStyles from "./styles/GlobalStyles"

function Layout() {
	return (
		<>
			<GlobalStyles />
			<Outlet />
			<BottomNavBar />
		</>
	);
}

function App() {
	const routes = [
		{
			element: (
				<Layout />
			),
			children: [
				{ path: "/", element: <HomePage /> },
				{ path: "/login", element: <LoginPage /> },
				{ path: "/voiceroom", element: <VoiceRoomListPage /> },
			],
		},
	];
	const router = createBrowserRouter(routes);

	return <RouterProvider router={router} />;
}

export default App;