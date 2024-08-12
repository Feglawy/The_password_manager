import "../styles/SearchBar.css";
const SearchBar = () => {
	return (
		<div className="search-wrapper">
			<div className="input-group">
				<input
					className="search"
					type="text"
					placeholder="Searching for something?"
				/>
				<span className="bar"></span>
			</div>
		</div>
	);
};

export default SearchBar;
