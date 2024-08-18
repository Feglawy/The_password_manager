import { ReactNode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/App.css";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar/TopBar";
import Accounts from "./components/Accounts";
import Add from "./components/AddNewWebsite/Add";
import Error from "./components/Error";
import WebsiteRegisteredPasswords from "./components/Website/WebsiteRegisteredPasswords";

interface LayoutProps {
	children: ReactNode;
}

// Layout component to include SideBar and TopBar
const Layout = ({ children }: LayoutProps) => {
	return (
		<>
			<TopBar />
			<SideBar />
			{children}
		</>
	);
};

const router = createBrowserRouter([
	{
		path: "",
		element: (
			<Layout>
				<Accounts />
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
	},
	{
		path: "/:website",
		element: (
			<Layout>
				<WebsiteRegisteredPasswords />
			</Layout>
		),
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
