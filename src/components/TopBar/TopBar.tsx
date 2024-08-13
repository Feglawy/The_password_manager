import SearchBar from "./SearchBar";
import "../../styles/TopBar.css";
import ImportExportDropDown from "./ImportExportDropDown";

const TopBar = () => {
	return (
		<div className="top-bar">
			<SearchBar />
			<ImportExportDropDown />
		</div>
	);
};

export default TopBar;
