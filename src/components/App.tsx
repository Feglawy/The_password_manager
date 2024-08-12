import "../styles/App.css";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Websites from "./Websites";
import Add from "./Add";

const router = createBrowserRouter([
	{
		path: "",
		element: <Websites />,
	},
	{
		path: "/add",
		element: <Add />,
	},
]);

function App() {
	return (
		<>
			<TopBar />
			<SideBar />
			<RouterProvider router={router} />
		</>
	);
}

export default App;
