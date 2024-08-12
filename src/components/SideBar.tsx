import ThemeToggler from "./ThemeToggler";
import "../styles/SideBar.css";
import { useLocation } from "react-router-dom";

const SideBar = () => {
	const location = useLocation();
	const isActive = (path: string) => location.pathname === path;

	return (
		<div className="sidebar">
			<a className="logo" href="/"></a>
			<div className="links">
				<a href="/" className={isActive("/") ? "active" : ""}>
					Accounts
				</a>
				<a href="/add" className={isActive("/add") ? "active" : ""}>
					Add
				</a>
			</div>
			<ThemeToggler />
		</div>
	);
};

export default SideBar;
