import ThemeToggler from "./ThemeToggler";
import "../styles/SideBar.css";
import { NavLink } from "react-router-dom";
import { PersonCircle, Plus } from "react-bootstrap-icons";

const SideBar = () => {
	return (
		<div className="sidebar">
			<a className="logo" href="/"></a>
			<div className="links">
				<NavLink
					to="/"
					className={({ isActive }) => (isActive ? "active" : "")}
				>
					<PersonCircle />
					Accounts
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
