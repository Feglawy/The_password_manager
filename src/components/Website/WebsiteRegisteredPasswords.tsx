import WebsiteData from "./WebsiteData";
import { Website as IWebsite, Account as IAccount } from "../electron";
import "../../styles/WebsiteRegisteredPasswords.css";
import RegisteredPassword from "./RegisteredPassword";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNotification } from "../../context/NotificationContext";

const WebsiteRegisteredPasswords = () => {
	const { addNotification } = useNotification();
	const { websiteName } = useParams<{ websiteName: string }>();

	const [website, setWebsite] = useState<IWebsite | undefined>(undefined);
	const [accounts, setAccounts] = useState<IAccount[]>([]);

	useEffect(() => {
		if (websiteName) {
			window.websiteApi.getWebsiteByName(websiteName).then((result) => {
				if (result.success) {
					setWebsite(result.data);
				} else {
					addNotification("error", result.message);
				}
			});
		}
	}, [websiteName, addNotification]);

	useEffect(() => {
		if (website?.id) {
			window.accountApi.getAccounts(website.id).then((result) => {
				if (result.success) {
					setAccounts(result.data!);
				} else {
					addNotification("error", result.message);
				}
			});
		}
	}, [website?.id, addNotification]);

	if (!website) {
		return (
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignContent: "center",
				}}
			>
				Loading...
			</div>
		);
	}

	return (
		<div style={{ overflow: "auto" }}>
			<WebsiteData
				icon={website.icon}
				name={website.name}
				url={website.url}
				description={website.description}
			/>
			<div
				className="registered-passwords"
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexWrap: "wrap",
					gap: "10px",
				}}
			>
				{accounts.length === 0 ? (
					<h1>You don't have accounts for this website</h1>
				) : (
					accounts.map((account) => (
						<RegisteredPassword
							key={account.id}
							id={account.id!}
							website_id={account.website_id}
							username={account.username}
							password={account.password}
						/>
					))
				)}
			</div>
		</div>
	);
};

export default WebsiteRegisteredPasswords;
