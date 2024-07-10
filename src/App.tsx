import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Header from "./components/Header";
import BottomNavBar from "./components/BottomNavBar";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage";

function Layout() {
  return (
      <>
        <Header />
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
			],
		},
	];
	const router = createBrowserRouter(routes);

	return <RouterProvider router={router} />;
}

export default App;
