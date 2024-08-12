import ThemeToggler from "./ThemeToggler";
import "../styles/SideBar.css";

const SideBar = () => {
	return (
		<div className="sidebar">
			<a className="logo" href="/"></a>
			<div className="links">
				<a href="/" className="active">
					Accounts
				</a>
				<a href="/add">Add</a>
			</div>
			<ThemeToggler />
		</div>
	);
};

export default SideBar;
