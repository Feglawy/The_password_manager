import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useNotification } from "../../context/NotificationContext";
import DropDownMenu from "../DropDownMenu";
import ExternalLink from "../ExternalLink";
import { Website as IWebsite } from "../electron";
import ModalPopUp from "../ModalPopUp";
import WebsiteForm from "../Forms/WebsiteForm";
import ConfirmationPopup from "../ConfirmationPopup";
import AccountForm from "../Forms/AccountForm";
import SignedInByForm from "../Forms/SignedInByForm";

import defaultWebsiteIcon from "/world-wide-web.svg";

interface WebsiteDataProps {
	data: IWebsite;
}

const WebsiteData = (props: WebsiteDataProps) => {
	const { addNotification } = useNotification();
	const navigate = useNavigate();

	const [websiteState, setWebsiteState] = useState<IWebsite>({ ...props.data });
	const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
	const [isEditFormOpen, setIsEditFormOpen] = useState(false);
	const [isAddAccountFormOpen, setIsAddAccountFormOpen] = useState(false);
	const [isAddSIBFormOpen, setIsAddSIBFormOpen] = useState(false);

	useEffect(() => {
		setWebsiteState({ ...props.data });
	}, [props]);

	// ____________________________________________________________
	const OpenAddAccountForm = () => {
		setIsAddAccountFormOpen(true);
	};

	const CloseAddAccountForm = () => {
		setIsAddAccountFormOpen(false);
	};

	// ____________________________________________________________
	const OpenAddSIBForm = () => {
		setIsAddSIBFormOpen(true);
	};

	const CloseAddSIBForm = () => {
		setIsAddSIBFormOpen(false);
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
		window.websiteApi.deleteWebsite(websiteState.id!).then((result) => {
			if (result.success) {
				addNotification("success", result.message);
				navigate("/");
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
		{ label: "Add account", onClick: OpenAddAccountForm },
		{ label: "signed in by", onClick: OpenAddSIBForm },
		{ label: "Edit", onClick: OpenEditForm },
		{ label: "Delete", onClick: OpenDeleteConfirmation },
	];

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				position: "relative",
			}}
		>
			<div style={{ position: "relative" }}>
				<ExternalLink href={websiteState.url || ""}>
					<img
						src={websiteState.icon || defaultWebsiteIcon}
						style={{ width: "256px", borderRadius: "38%/40%" }}
					/>
				</ExternalLink>
				<div style={{ position: "absolute", top: "0", left: "256px" }}>
					<DropDownMenu items={RegisteredPasswordControls} />
				</div>
			</div>
			<h1
				style={{
					letterSpacing: "2px",
					textAlign: "center",
				}}
			>
				{websiteState.name}
			</h1>
			<p
				style={{
					textAlign: "center",
					margin: "0 10%",
					fontSize: "larger",
					textWrap: "wrap",
				}}
			>
				{websiteState.description}
			</p>

			<ConfirmationPopup
				message={`Are you sure you want to delete ${websiteState.name}`}
				note="Note that any account that that is connected to this website will be deleted also"
				onCancel={CloseDeleteConfirmation}
				onConfirm={handleDelete}
				isOpen={isConfirmationOpen}
			/>

			<ModalPopUp isOpen={isEditFormOpen} onClose={CloseEditForm}>
				<WebsiteForm
					isEditing
					initialData={websiteState}
					onSubmit={(updatedWebsite) => {
						setWebsiteState(updatedWebsite!);
						CloseEditForm();
					}}
				/>
			</ModalPopUp>

			<ModalPopUp isOpen={isAddAccountFormOpen} onClose={CloseAddAccountForm}>
				<AccountForm
					initialData={{
						website_id: websiteState.id!,
						username: "",
						password: "",
					}}
					onSubmit={CloseAddAccountForm}
				/>
			</ModalPopUp>

			<ModalPopUp isOpen={isAddSIBFormOpen} onClose={CloseAddSIBForm}>
				<SignedInByForm
					initialData={{
						website_id: websiteState.id!,
						account_id: -1, // temp
					}}
					onSubmit={CloseAddSIBForm}
				/>
			</ModalPopUp>
		</div>
	);
};

export default WebsiteData;
