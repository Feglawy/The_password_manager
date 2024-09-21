import ThemeToggler from "./ThemeToggler";
import "../styles/SideBar.css";
import { NavLink } from "react-router-dom";
import { Plus, House } from "react-bootstrap-icons";

const SideBar = () => {
	return (
		<div className="sidebar">
			<NavLink className="logo" to="/"></NavLink>
			<div className="links">
				<NavLink
					to="/"
					className={({ isActive }) => (isActive ? "active" : "")}
				>
					<House />
					Home
				</NavLink>
				<NavLink
					to="/add"
					className={({ isActive }) => (isActive ? "active" : "")}
				>
					<Plus style={{ width: "35px", height: "35px" }} />
					Add
				</NavLink>
			</div>
			<ThemeToggler />
		</div>
	);
};

export default SideBar;
