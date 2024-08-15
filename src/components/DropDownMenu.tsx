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
	return (
		<div ref={dropdownRef} className="dropdown">
			<div onClick={toggleDropDown}>
				<ThreeDots style={{ width: "32px", height: "32px" }} />
			</div>
			{isOpen && (
				<ul className="dropdown-menu" style={{ top: "10px", zIndex: "1000" }}>
					{items.map((item, index) => (
						<li
							key={index}
							onClick={item.onClick}
							style={{ listStyle: "none", cursor: "pointer", padding: "15px" }}
						>
							{item.label}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default DropDownMenu;
