import { useEffect, useState } from "react";
import { Website as IWebsite } from "../electron";

import Input from "../controls/Input";
import PasswordContainer from "../controls/FormPasswordContainer";
import Button from "../controls/Button";
import "../../styles/utils.css";
import WebsiteSelect from "../controls/WebsiteSelect";
import { useNotification } from "../../context/NotificationContext";
import { Account as IAccount } from "../electron";

interface WebsiteOption {
	value: string;
	label: string;
	iconPath?: string;
}

interface AccountFormProps {
	initialData?: IAccount;
	isEditing?: boolean;
	onSubmit?: (updatedAccount?: IAccount) => void;
}

const AccountForm = ({
	initialData,
	isEditing,
	onSubmit,
}: AccountFormProps) => {
	const { addNotification } = useNotification();

	const [websites, setWebsites] = useState<IWebsite[]>([]);
	const [selectedWebsite, setSelectedWebsite] = useState<WebsiteOption | null>(
		null
	);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [description, setDescription] = useState("");

	const loadWebsites = async () => {
		const req = await window.websiteApi.getAllWebsites();
		if (req.success && req.data) {
			setWebsites(req.data);
		}
	};

	const resetForm = () => {
		setSelectedWebsite(null);
		setUsername("");
		setPassword("");
		setDescription("");
	};

	useEffect(() => {
		loadWebsites();
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!selectedWebsite) {
			addNotification("error", "Website is not selected");
			return;
		}
		const accountData = {
			id: initialData?.id,
			username: username,
			password: password,
			description: description,
			website_id: parseInt(selectedWebsite.value, 10),
		};

		const result = isEditing
			? await window.accountApi.editAccount(accountData)
			: await window.accountApi.addAccount(accountData);

		if (result.success) {
			addNotification("success", result.message);
			resetForm();
			if (onSubmit) {
				onSubmit(accountData);
			}
		} else {
			addNotification("error", result.message);
		}
	};

	useEffect(() => {
		if (initialData) {
			const website = websites.find((w) => w.id === initialData.website_id);
			const WebsiteOption: WebsiteOption | null = website
				? {
						label: website.name!,
						value: website.id?.toString() || "",
						iconPath: website.icon!,
						// eslint-disable-next-line no-mixed-spaces-and-tabs
				  }
				: null;
			setSelectedWebsite(WebsiteOption);
			setUsername(initialData.username || "");
			setPassword(initialData.password || "");
			setDescription(initialData.description || "");
		}
	}, [initialData, websites]);

	return (
		<>
			<form onSubmit={handleSubmit}>
				<h1 style={{ textAlign: "center" }}>
					{isEditing ? "Edit an Account" : "Add an Account"}
				</h1>
				<WebsiteSelect
					value={selectedWebsite}
					options={websites}
					onSelect={setSelectedWebsite}
				/>

				<Input
					type="text"
					label="Username"
					className="w-95"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
				/>

				<PasswordContainer
					className="w-95"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>

				<Input
					textarea={true}
					placeholder="Disctiption (optional)"
					className="w-95"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<Button className="submit-btn" children="Submit" type="submit" />
			</form>
		</>
	);
};

export default AccountForm;
