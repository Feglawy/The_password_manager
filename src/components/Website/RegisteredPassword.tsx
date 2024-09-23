import Input from "../controls/Input";
import PasswordContainer from "../controls/PreviewPasswordContainer";
import "../../styles/RegisteredPassword.css";
import DropDownMenu from "../DropDownMenu";
import { copyToClipboard } from "../../Utils";
import { useNotification } from "../../context/NotificationContext";
import { useState } from "react";
import ConfirmationPopup from "../ConfirmationPopup";

interface Account {
	serviceImgSrc?: string;
	id: number;
	website_id: number;
	username?: string;
	password?: string;
}

const RegisteredPassword = ({
	serviceImgSrc,
	id,
	username,
	password,
}: Account) => {
	const { addNotification } = useNotification();

	const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

	const handleCopy = () => {
		try {
			copyToClipboard(username + ":" + password);
			addNotification("success", "Account data copied successfully");
		} catch (error) {
			console.error("Could not copy text:", error);
			addNotification("error", "Could not copy account data");
		}
	};
	// ____________________________________________________________

	const handleEdit = () => console.log("Edit clicked");
	
	// ____________________________________________________________
	const handleDelete = () => {
		window.accountApi.deleteAccount(id).then((result) => {
			if (result.success) {
				addNotification("success", result.message);
			} else {
				addNotification("error", result.message);
			}
			CloseDeleteConfirmation();
		});
	};

	const OpenDeleteConfirmation = () => {
		setIsConfirmationOpen(true);
	};

	const CloseDeleteConfirmation = () => {
		setIsConfirmationOpen(false);
	};
	// _____________________________________________________________

	const RegisteredPasswordControls = [
		{ label: "Copy", onClick: handleCopy },
		{ label: "Edit", onClick: handleEdit },
		{ label: "Delete", onClick: OpenDeleteConfirmation },
	];

	return (
		<div className="password-card">
			{serviceImgSrc && (
				<div style={{ height: "56px" }}>
					<div className="service">
						<img
							src={serviceImgSrc}
							style={{ width: "56px", height: "56px" }}
						/>
					</div>
				</div>
			)}
			<div style={{ position: "absolute", top: "3%", right: "5%" }}>
				<DropDownMenu items={RegisteredPasswordControls} />
			</div>
			<Input label="Username" disabled value={username} className="w-90" />
			<PasswordContainer value={password} className="w-90" />

			<ConfirmationPopup
				message={`Are you sure you want to delete ${username}`}
				onCancel={CloseDeleteConfirmation}
				onConfirm={handleDelete}
				isOpen={isConfirmationOpen}
			/>
		</div>
	);
};

export default RegisteredPassword;
