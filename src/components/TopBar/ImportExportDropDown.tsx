import { useState, useRef, useEffect } from "react";
import "../../styles/ImportExprotDropDown.css";
import { useNotification } from "../../context/NotificationContext";
const ImportExportDropDown = () => {
	const { addNotification } = useNotification();
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleImport = async () => {
		const csvFilePath = await window.api.openCsvDialog();
		if (csvFilePath) {
			const req = await window.api.importFromCsv(csvFilePath);
			if (req.success) {
				addNotification("success", `${req.message} - Please refresh`);
			} else {
				addNotification("error", req.message);
			}
		}
		toggleDropdown();
	};

	const handleExport = async () => {
		const dirPath = await window.api.openDirDialog();
		if (dirPath) {
			const req = await window.api.exportAsCsv(dirPath);
			if (req.success) {
				addNotification("success", req.message);
			} else {
				addNotification("error", req.message);
			}
		}
		toggleDropdown();
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
