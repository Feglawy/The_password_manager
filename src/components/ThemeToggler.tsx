import "../styles/theme_toggle.css";
import { useEffect, useState } from "react";

const ThemeToggler = () => {
	const [isDarkTheme, setIsDarkTheme] = useState<boolean>(
		() => localStorage.getItem("theme") === "dark"
	);

	const handleThemeToggle = () => {
		setIsDarkTheme((prevTheme) => {
			const newTheme = !prevTheme;
			localStorage.setItem("theme", newTheme ? "dark" : "light");
			return newTheme;
		});
	};

	useEffect(() => {
		document.body.setAttribute("data-theme", isDarkTheme ? "dark" : "light");
	}, [isDarkTheme]);

	return (
		<div className="toggleWrapper">
			<input
				type="checkbox"
				id="theme-toggle"
				checked={isDarkTheme}
				onChange={handleThemeToggle}
			/>
			<label htmlFor="theme-toggle" className="toggle">
				<span className="toggle__handler">
					<span className="crater crater--1"></span>
					<span className="crater crater--2"></span>
					<span className="crater crater--3"></span>
				</span>
				<span className="star star--1"></span>
				<span className="star star--2"></span>
				<span className="star star--3"></span>
				<span className="star star--4"></span>
				<span className="star star--5"></span>
				<span className="star star--6"></span>
			</label>
		</div>
	);
};

export default ThemeToggler;
