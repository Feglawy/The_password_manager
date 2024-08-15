import WebsiteLogo from "./WebsiteLogo";

import "../../styles/WebsiteRegisteredPasswords.css";
import RegisteredPassword from "./RegisteredPassword";

const WebsiteRegisteredPasswords = () => {
	return (
		<div style={{ overflow: "auto" }}>
			<WebsiteLogo
				imageSrc="/world-wide-web.svg"
				name="instagram"
				link="https://www.instagram.com/"
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
