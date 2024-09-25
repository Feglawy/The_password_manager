import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useNotification } from "../../context/NotificationContext";
import DropDownMenu from "../DropDownMenu";
import ExternalLink from "../ExternalLink";
import { Website as IWebsite } from "../electron";
import ModalPopUp from "../ModalPopUp";
import WebsiteForm from "../Forms/WebsiteForm";
import ConfirmationPopup from "../ConfirmationPopup";

interface WebsiteDataProps {
	data: IWebsite;
}

const WebsiteData = (props: WebsiteDataProps) => {
	const { addNotification } = useNotification();
	const navigate = useNavigate();

	const [websiteState, setWebsiteState] = useState<IWebsite>({ ...props.data });
	const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
	const [isEditFormOpen, setIsEditFormOpen] = useState(false);

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
		{ label: "Edit", onClick: OpenEditForm },
		{ label: "Delete", onClick: OpenDeleteConfirmation },
	];

	return (
		<div
			style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
		>
			<div style={{ position: "absolute", top: "10%", right: "25%" }}>
				<DropDownMenu items={RegisteredPasswordControls} />
			</div>

			<ExternalLink href={websiteState.url || ""}>
				{websiteState.icon ? (
					<img
						src={websiteState.icon}
						style={{ width: "256px", borderRadius: "38%/40%" }}
					/>
				) : (
					<img src="/world-wide-web.svg" alt={websiteState.name} />
				)}
			</ExternalLink>
			<h1
				style={{
					letterSpacing: "2px",
					textAlign: "center",
					textTransform: "capitalize",
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
		</div>
	);
};

export default WebsiteData;
