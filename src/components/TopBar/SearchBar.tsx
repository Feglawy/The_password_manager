import { useEffect, useState } from "react";
import "../../styles/SearchBar.css";
import { Website } from "../electron";
import { useNavigate } from "react-router-dom";
import defaultWebsiteIcon from "/world-wide-web.svg";

const SearchBar = () => {
	const navigate = useNavigate();

	const [searchTerm, setSearchTerm] = useState("");
	const [suggestions, setSuggestions] = useState<Website[]>([]);
	const [activeSuggestionIndex, setActiveSuggestionIndex] =
		useState<number>(-1); // For tracking which suggestion is highlighted

	const [websites, setWebsites] = useState<Website[]>([]);

	const fetchWebsites = async () => {
		const req = await window.websiteApi.getAllWebsites();
		if (req.success) {
			setWebsites(req.data!);
		}
	};

	useEffect(() => {
		fetchWebsites();
	}, []);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearchTerm(value);
		setActiveSuggestionIndex(-1); // Reset index when user types

		// Filter suggestions based on input
		if (value) {
			setSuggestions(
				websites.filter((website) =>
					website.name.toLowerCase().includes(value.toLowerCase())
				)
			);
		} else {
			setSuggestions([]);
		}
	};

	// const handle

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (suggestions.length > 0) {
			if (e.key === "ArrowDown") {
				// Move selection down
				setActiveSuggestionIndex((prevIndex) =>
					prevIndex === suggestions.length - 1 ? 0 : prevIndex + 1
				);
			} else if (e.key === "ArrowUp") {
				// Move selection up
				setActiveSuggestionIndex((prevIndex) =>
					prevIndex === 0 ? suggestions.length - 1 : prevIndex - 1
				);
			} else if (e.key === "Enter") {
				// Select the current suggestion
				if (activeSuggestionIndex >= 0) {
					navigate(`/${suggestions[activeSuggestionIndex].id}`);
					setSuggestions([]); // Close suggestions list
				}
			}
		}
	};

	const handleSuggestionClick = (suggestion: Website) => {
		setSearchTerm(suggestion.name);
		navigate(`/${suggestion.id}`);
		setSuggestions([]); // Close suggestions on click
	};

	const onBlur = () => {
		setSearchTerm("");
		setSuggestions([]);
	};
	return (
		<div className="search-wrapper">
			<div className="input-group">
				<input
					className="search"
					type="text"
					// placeholder="Searching for something?"
					value={searchTerm}
					onChange={handleInputChange}
					onKeyDown={handleKeyDown} // Handle key events
					onBlur={onBlur}
				/>
				<span className="bar"></span>
				{suggestions.length > 0 && (
					<ul className="suggestions">
						{suggestions.map((suggestion, index) => (
							<li
								key={index}
								className={index === activeSuggestionIndex ? "active" : ""}
								onMouseDown={() => handleSuggestionClick(suggestion)} // Mouse click handler
							>
								<img
									style={{
										width: 20,
										height: 20,
										marginRight: 10,
										borderRadius: "8px",
									}}
									src={suggestion.icon || defaultWebsiteIcon}
									alt={suggestion.name}
								/>
								{suggestion.name.toUpperCase()}
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

export default SearchBar;
