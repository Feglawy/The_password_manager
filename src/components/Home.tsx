import Website from "./Website/Website";
import "../styles/home.css";
import { Website as IWebsite } from "./electron";
import { useEffect, useState } from "react";
import { useNotification } from "../context/NotificationContext";

const Home = () => {
	const { addNotification } = useNotification();
	const [websites, setWebsites] = useState<IWebsite[]>([]);

	useEffect(() => {
		window.websiteApi.getAllWebsites().then((result) => {
			if (result.success) {
				setWebsites(result.data || []);
			} else {
				addNotification("error", "Couldn't load websites");
			}
		});
	}, []);

	return (
		<div className="main-content">
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					flexWrap: "wrap",
					alignItems: "center",
					alignContent: "center",
				}}
			>
				{websites.length === 0 ? (
					<h1>No websites available</h1>
				) : (
					websites.map((website) => (
						<Website
							key={website.id}
							id={website.id!}
							websiteName={website.name}
							websiteLogoSrc={website.icon}
						/>
					))
				)}
			</div>
		</div>
	);
};

export default Home;
