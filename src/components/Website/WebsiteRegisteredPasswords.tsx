/* eslint-disable no-mixed-spaces-and-tabs */
import WebsiteData from "./WebsiteData";
import {
	Website as IWebsite,
	Account as IAccount,
	SignedInBy as ISignedInBy,
} from "../electron";
import "../../styles/WebsiteRegisteredPasswords.css";
import RegisteredPassword from "./RegisteredPassword";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNotification } from "../../context/NotificationContext";
import RegisteredSignedInBy from "./RegisteredSignedInBy";

const WebsiteRegisteredPasswords = () => {
	const { addNotification } = useNotification();
	const { websiteName } = useParams<{ websiteName: string }>();

	const [website, setWebsite] = useState<IWebsite | undefined>(undefined);
	const [accounts, setAccounts] = useState<IAccount[]>([]);
	const [signedInByAcc, setSignedInByAcc] = useState<ISignedInBy[]>([]);

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
			window.signedInByApi.getAllSignedInBy(website.id).then((result) => {
				if (result.success) {
					setSignedInByAcc(result.data!);
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
		<div style={{ overflow: "scroll" }}>
			<WebsiteData data={website} />
			<hr
				style={{
					width: "50%",
					textAlign: "center",
					borderBottom: "none",
					borderLeft: "none",
					borderTop: "1px solid rgb(0 0 0)",
				}}
			/>
			<div
				// className="registered-passwords"
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexWrap: "wrap",
					gap: "10px",
				}}
			>
				{accounts.length === 0 && signedInByAcc.length === 0 ? (
					<h1>You don't have accounts for this website</h1>
				) : (
					accounts.map((account) => (
						<RegisteredPassword key={account.id} account={account} />
					))
				)}
			</div>
			{accounts.length !== 0 && (
				<hr
					style={{
						width: "50%",
						textAlign: "center",
						borderBottom: "none",
						borderLeft: "none",
						borderTop: "1px solid rgb(0 0 0)",
					}}
				/>
			)}
			{signedInByAcc.length !== 0 && (
				<h1 style={{ textAlign: "center" }}>Signed in by other services</h1>
			)}
			<div
				// className="signed-in-by-passwords"
				style={{
					display: "flex",
					flexWrap: "wrap",
					justifyContent: "center",
				}}
			>
				{signedInByAcc.map((instance) => (
					<RegisteredSignedInBy instance={instance} />
				))}
			</div>
		</div>
	);
};

export default WebsiteRegisteredPasswords;
