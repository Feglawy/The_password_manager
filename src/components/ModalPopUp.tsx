import { useRef, useEffect } from "react";
import "../styles/ModalPopup.css";
interface ModalPopUpProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

const ModalPopUp = ({ isOpen, onClose, children }: ModalPopUpProps) => {
	const modalRef = useRef<HTMLDivElement>(null);
	// Close the modal when clicking outside of it
	const handleClickOutside = (e: MouseEvent) => {
		if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
			onClose();
		}
	};
	// Add event listener to handle clicks outside
	useEffect(() => {
		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen]);

	if (!isOpen) return null;

	return (
		<div className="modal-overlay open">
			<div className="modal-content slide-in" ref={modalRef}>
				{children}
			</div>
		</div>
	);
};

export default ModalPopUp;
