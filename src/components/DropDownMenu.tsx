import { useState, useEffect, useRef } from "react";
import { ThreeDots } from "react-bootstrap-icons";

interface DropDownProps {
	items: { label: string; onClick: () => void }[];
}

const DropDownMenu = ({ items }: DropDownProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const toggleDropDown = () => setIsOpen(!isOpen);

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

	const handleOperation = (item: { label: string; onClick: () => void }) => {
		item.onClick();
		setIsOpen(false);
	};

	return (
		<div ref={dropdownRef} className="dropdown">
			<div onClick={toggleDropDown}>
				<ThreeDots style={{ width: "32px", height: "32px" }} />
			</div>
			<div
				className={`dropdown-menu ${isOpen ? "" : "hidden"}`}
				style={{ top: "10px", zIndex: "1000" }}
			>
				{items.map((item, index) => (
					<button
						key={index}
						className="dropdown-menu-button"
						onClick={() => {
							handleOperation(item);
						}}
						style={{
							listStyle: "none",
							cursor: "pointer",

						}}
					>
						{item.label}
					</button>
				))}
			</div>
		</div>
	);
};

export default DropDownMenu;
