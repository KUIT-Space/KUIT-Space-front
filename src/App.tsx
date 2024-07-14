import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import BottomNavBar from "@/components/BottomNavBar";
import LoginPage from "@/pages/LoginPage/LoginPage";
import SignUpPage from "@/pages/LoginPage/SignUpPage";
import HomePage from "@/pages/HomePage";
import VoiceRoomListPage from "@/pages/VoiceRoomPage/VoiceRoomListPage";

function Layout() {
	return (
		<>
			<Outlet />
			<BottomNavBar />
		</>
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
			],
		},
	];
	const router = createBrowserRouter(routes);

	return <RouterProvider router={router} />;
}

export default App;
