import { ReactNode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "../styles/App.css";
import SideBar from "./SideBar";
import TopBar from "./TopBar/TopBar";
import Accounts from "./Accounts";
import Add from "./AddNewWebsite/Add";
import Error from "./Error";

interface LayoutProps {
	children: ReactNode;
}

// Layout component to include SideBar and TopBar
const Layout = ({ children }: LayoutProps) => {
	return (
		<>
			<TopBar />
			<SideBar />
			<div className="main-content">{children}</div>
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
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
