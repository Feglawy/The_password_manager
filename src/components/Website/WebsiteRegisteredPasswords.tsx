import WebsiteData from "./WebsiteData";
import { Website as IWebsite } from "../electron";
import "../../styles/WebsiteRegisteredPasswords.css";
import RegisteredPassword from "./RegisteredPassword";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const WebsiteRegisteredPasswords = () => {
	const { websiteName } = useParams<{ websiteName: string }>();
	const [website, setWebsite] = useState<IWebsite | undefined>(undefined);

	useEffect(() => {
		if (websiteName) {
			window.websiteApi.getWebsiteByName(websiteName).then((result) => {
				if (result.success) {
					setWebsite(result.data);
				}
			});
		}
	}, [websiteName]);

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
				{/* <RegisteredPassword serviceImgSrc="/world-wide-web.svg" /> */}
				<RegisteredPassword />
				<RegisteredPassword />
				<RegisteredPassword />
				<RegisteredPassword />
			</div>
		</div>
	);
};

export default WebsiteRegisteredPasswords;
