import { useEffect, useState } from "react";
import { useNotification } from "../../context/NotificationContext";
import ConfirmationPopup from "../ConfirmationPopup";
import Input from "../controls/Input";
import PasswordContainer from "../controls/PreviewPasswordContainer";
import DropDownMenu from "../DropDownMenu";
import { SignedInBy } from "../electron";
import { Account as IAccount, Website as IWebsite } from "../electron";
import { Link } from "react-router-dom";
import { copyToClipboard } from "../../Utils";

import defaultWebsiteIcon from "/world-wide-web.svg";


interface RegisteredSignedInByProps {
	instance: SignedInBy;
}
const RegisteredSignedInBy = ({ instance }: RegisteredSignedInByProps) => {
	const { addNotification } = useNotification();

	const [accountState, setAccountState] = useState<IAccount>();
	const [websiteState, setWebsiteState] = useState<IWebsite>();

	const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

	useEffect(() => {
		const fetchAccountData = async () => {
			const reqAccount = await window.signedInByApi.getAccountLoggedInWith(
				instance.id!
			);
			if (reqAccount.success) {
				setAccountState(reqAccount.data);
			} else {
				addNotification("error", reqAccount.message);
			}
		};

		const fetchWebsiteData = async () => {
			const reqWebsite = await window.signedInByApi.getWebsiteLoggedInBy(
				instance.id!
			);
			if (reqWebsite.success) {
				setWebsiteState(reqWebsite.data);
			} else {
				addNotification("error", reqWebsite.message);
			}
		};
		fetchAccountData();
		fetchWebsiteData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [instance]);

	// _________________________________

	const handleDelete = () => {
		window.signedInByApi.deleteSignedInBy(instance.id!).then((result) => {
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
	// _________________________________

	const handleCopy = () => {
		try {
			copyToClipboard(accountState?.username + ":" + accountState?.password);
			addNotification("success", "Account data copied successfully");
		} catch (error) {
			console.error("Could not copy text:", error);
			addNotification("error", "Could not copy account data");
		}
	};

	const RegisteredPasswordControls = [
		{ label: "Copy data", onClick: handleCopy },
		{ label: "Delete Record", onClick: OpenDeleteConfirmation },
	];

	return (
		<div className="password-card">
			<div style={{ height: "56px", marginBottom: "20px" }}>
				<Link className="service" to={`/${websiteState?.id}`}>
					<img
						src={websiteState?.icon || defaultWebsiteIcon}
						alt={websiteState?.name}
						style={{ width: "56px", height: "56px" }}
					/>
				</Link>
			</div>

			<div style={{ position: "absolute", top: "3%", right: "5%" }}>
				<DropDownMenu items={RegisteredPasswordControls} />
			</div>
			<Input
				label="Username"
				disabled
				value={accountState?.username}
				className="w-90"
			/>
			<PasswordContainer value={accountState?.password} className="w-90" />
			<Input
				textarea={true}
				className="w-95"
				value={accountState?.description || ""}
				disabled
			/>

			<ConfirmationPopup
				message={`Are you sure you want to delete this instance with account ${accountState?.username}`}
				note="This will not delete the account it self"
				onCancel={CloseDeleteConfirmation}
				onConfirm={handleDelete}
				isOpen={isConfirmationOpen}
			/>
		</div>
	);
};

export default RegisteredSignedInBy;
