import { useEffect, useState } from "react";
import { Website as IWebsite } from "../electron";

import Input from "../controls/Input";
import PasswordContainer from "../controls/FormPasswordContainer";
import Button from "../controls/Button";
import "../../styles/utils.css";
import WebsiteSelect from "../controls/WebsiteSelect";
import { useNotification } from "../../context/NotificationContext";

const AccountForm = () => {
	const { addNotification } = useNotification();

	const [websites, setWebsites] = useState<IWebsite[]>([]);
	const [selectedWebsite, setSelectedWebsite] = useState<string | null>(null);
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

	const handleAddingAccount = () => {
		if (!selectedWebsite) {
			addNotification("error", "Website is not selected");
			return;
		}
		window.accountApi
			.addAccount({
				username: username,
				password: password,
				description: description,
				website_id: parseInt(selectedWebsite, 10),
			})
			.then((result) => {
				if (result.success) {
					addNotification("success", result.message);
					resetForm();
				} else {
					addNotification("error", result.message);
				}
			})
			.catch((error) => {
				addNotification("error", error);
				console.error(error);
			});
	};

	useEffect(() => {
		loadWebsites();
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		handleAddingAccount();
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<h1 style={{ textAlign: "center" }}>Add a Account</h1>
				<WebsiteSelect options={websites} onSelect={setSelectedWebsite} />

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
