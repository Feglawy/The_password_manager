import { ReactNode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "../styles/App.css";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import Websites from "./Websites";
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
			<>{children}</>
		</>
	);
};

const router = createBrowserRouter([
	{
		path: "",
		element: (
			<Layout>
				<Websites />
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
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
