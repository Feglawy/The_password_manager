import Button from "./controls/Button";
import ModalPopUp from "./ModalPopUp";
import "../styles/ConfirmationPopup.css";

interface ConfirmationPopupProps {
	message: string;
	note?: string;
	isOpen: boolean;
	onConfirm: () => void;
	onCancel: () => void;
}
const ConfirmationPopup = ({
	message,
	note,
	onConfirm,
	onCancel,
	isOpen,
}: ConfirmationPopupProps) => {
	if (!isOpen) return null;

	return (
		<ModalPopUp isOpen={isOpen} onClose={onCancel}>
			<div className="confirmation">
				<div id="message">{message}</div>
				<div id="note">{note}</div>
				<div className="confirmation-actions">
					<Button
						style={{ backgroundColor: "green" }}
						children="Confirm"
						onClick={onConfirm}
					/>
					<Button
						style={{ backgroundColor: "red" }}
						children="Cancel"
						onClick={onCancel}
					/>
				</div>
			</div>
		</ModalPopUp>
	);
};

export default ConfirmationPopup;
