import Button from "./controls/Button";
import ExternalLink from "./ExternalLink";
import ModalPopUp from "./ModalPopUp";

interface WorkingOnItProps {
	isOpen: boolean;
	onClose: () => void;
}

const WorkingOnIt = ({ isOpen, onClose }: WorkingOnItProps) => {
	const closeModal = () => {
		onClose();
	};

	if (!isOpen) return null;

	return (
		<ModalPopUp isOpen={isOpen} onClose={closeModal}>
			<div
				className="message-wraper"
				style={{ textAlign: "center", padding: "20px" }}
			>
				<h1 className="message">Sorry we are still working on it</h1>
				<h2>You can see our progress on github</h2>
				<ExternalLink
					href="https://github.com/Feglawy/The_password_manager"
					style={{ textDecoration: "none" }}
				>
					The password manager repo
				</ExternalLink>
			</div>
			<Button
				onClick={closeModal}
				style={{
					width: "100%",
					background: "red",
					borderRadius: "11px",
					color: "white",
					padding: "5px",
					border: "none",
					cursor: "pointer",
					fontSize: "large",
				}}
				children={"Close"}
			/>
		</ModalPopUp>
	);
};

export default WorkingOnIt;
