import { useRef, useEffect } from "react";

interface ModalPopUpProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

const ModalPopUp = ({ isOpen, onClose, children }: ModalPopUpProps) => {
	const modalRef = useRef<HTMLDivElement>(null);
	const handleClickOutside = (e: MouseEvent) => {
		if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
			onClose();
		}
	};
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
		<div className="modal-overlay">
			<div className="modal-content" ref={modalRef}>
				{children}
			</div>
		</div>
	);
};

export default ModalPopUp;
