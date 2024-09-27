import { ReactNode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/App.css";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar/TopBar";
import Home from "./components/Home";
import Add from "./components/AddNew/Add";
import Error from "./components/Error";
import WebsiteRegisteredPasswords from "./components/Website/WebsiteRegisteredPasswords";
import { NotificationProvider } from "./context/NotificationContext";

interface LayoutProps {
	children: ReactNode;
}

// Layout component to include SideBar and TopBar
const Layout = ({ children }: LayoutProps) => {
	return (
		<>
			<SideBar />
			<NotificationProvider>
				<TopBar />
				{children}
			</NotificationProvider>
		</>
	);
};

const router = createBrowserRouter([
	{
		path: "",
		element: (
			<Layout>
				<Home />
			</Layout>
		),
		errorElement: (
			<Layout>
				<Error />
			</Layout>
		),
	},
	{
		path: "/add",
		element: (
			<Layout>
				<Add />
			</Layout>
		),
		errorElement: (
			<Layout>
				<Error />
			</Layout>
		),
	},
	{
		path: "/:website_id",
		element: (
			<Layout>
				<WebsiteRegisteredPasswords />
			</Layout>
		),
		errorElement: (
			<Layout>
				<Error />
			</Layout>
		),
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
