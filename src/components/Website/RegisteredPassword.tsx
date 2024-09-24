import Input from "../controls/Input";
import PasswordContainer from "../controls/PreviewPasswordContainer";
import "../../styles/RegisteredPassword.css";
import DropDownMenu from "../DropDownMenu";
import { copyToClipboard } from "../../Utils";
import { useNotification } from "../../context/NotificationContext";
import { useState } from "react";
import ConfirmationPopup from "../ConfirmationPopup";
import ModalPopUp from "../ModalPopUp";
import AccountForm from "../Forms/AccountForm";

interface Account {
	id?: number;
	website_id: number;
	username: string;
	password: string;
	description?: string;
}

interface RegisteredPasswordProps {
	account: Account;
}

const RegisteredPassword = ({ account }: RegisteredPasswordProps) => {
	const { addNotification } = useNotification();

	const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
	const [isEditFormOpen, setIsEditFormOpen] = useState(false);
	const [accountState, setAccountState] = useState<Account>({
		...account,
	});

	const handleCopy = () => {
		try {
			copyToClipboard(accountState.username + ":" + accountState.password);
			addNotification("success", "Account data copied successfully");
		} catch (error) {
			console.error("Could not copy text:", error);
			addNotification("error", "Could not copy account data");
		}
	};
	// ____________________________________________________________

	const OpenEditForm = () => {
		setIsEditFormOpen(true);
	};

	const CloseEditForm = () => {
		setIsEditFormOpen(false);
	};

	// ____________________________________________________________
	const handleDelete = () => {
		window.accountApi.deleteAccount(accountState.id!).then((result) => {
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
		{ label: "Edit", onClick: OpenEditForm },
		{ label: "Delete", onClick: OpenDeleteConfirmation },
	];

	return (
		<div className="password-card">
			<div style={{ position: "absolute", top: "3%", right: "5%" }}>
				<DropDownMenu items={RegisteredPasswordControls} />
			</div>
			<Input
				label="Username"
				disabled
				value={accountState.username}
				className="w-90"
			/>
			<PasswordContainer value={accountState.password} className="w-90" />

			<Input
				textarea={true}
				className="w-95"
				value={accountState.description}
				disabled
			/>

			<ConfirmationPopup
				message={`Are you sure you want to delete ${accountState.username}`}
				onCancel={CloseDeleteConfirmation}
				onConfirm={handleDelete}
				isOpen={isConfirmationOpen}
			/>

			<ModalPopUp isOpen={isEditFormOpen} onClose={CloseEditForm}>
				<AccountForm
					isEditing
					initialData={accountState}
					onSubmit={(updatedAccount) => {
						setAccountState(updatedAccount!);
						CloseEditForm();
					}}
				/>
			</ModalPopUp>
		</div>
	);
};

export default RegisteredPassword;
