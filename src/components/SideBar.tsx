import ThemeToggler from "./ThemeToggler";
import "../styles/SideBar.css";
import { NavLink } from "react-router-dom";

const SideBar = () => {
	return (
		<div className="sidebar">
			<a className="logo" href="/"></a>
			<div className="links">
				<NavLink
					to="/"
					className={({ isActive }) => (isActive ? "active" : "")}
				>
					Accounts
				</NavLink>
				<NavLink
					to="/add"
					className={({ isActive }) => (isActive ? "active" : "")}
				>
					Add
				</NavLink>
			</div>
			<ThemeToggler />
		</div>
	);
};

export default SideBar;
