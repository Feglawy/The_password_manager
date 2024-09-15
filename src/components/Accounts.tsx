import Website from "./Website/Website";
import "../styles/Accounts.css";
import { Website as IWebsite } from "./electron";
import { useEffect, useState } from "react";

const Accounts = () => {
	const [websites, setWebsites] = useState<IWebsite[]>([]);

	useEffect(() => {
		window.websiteApi.getAllWebsites().then((result) => {
			if (result.success) {
				setWebsites(result.data || []);
			}
		});
	}, []);

	return (
		<div className="main-content">
			{websites.map((website) => (
				<Website
					key={website.id}
					websiteName={website.name}
					websiteLogoSrc={website.icon}
				/>
			))}
		</div>
	);
};

export default Accounts;
