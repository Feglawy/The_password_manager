import { useState, useRef, useEffect } from "react";
import "../../styles/ImportExprotDropDown.css";

const ImportExportDropDown = () => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleImport = () => {
		console.log("Import clicked");
		// Add your import logic here
	};

	const handleExport = () => {
		console.log("Export clicked");
		// Add your export logic here
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div ref={dropdownRef} className="dropdown">
			<button className="dropdown-button" onClick={toggleDropdown}>
				Import/Export
			</button>
			<div className={`dropdown-menu ${isOpen ? "" : "hidden"}`}>
				<button className="dropdown-menu-button" onClick={handleImport}>
					Import
				</button>
				<button className="dropdown-menu-button" onClick={handleExport}>
					Export
				</button>
			</div>
		</div>
	);
};

export default ImportExportDropDown;
