import "../../styles/Website.css";
import { Link } from "react-router-dom";
import defaultWebsiteIcon from "/world-wide-web.svg";

interface WebsiteProps {
	id: number;
	websiteName: string;
	websiteLogoSrc?: string | null;
}

const Website = ({ id, websiteName, websiteLogoSrc }: WebsiteProps) => {
	return (
		<>
			<Link className="website" to={`/${id}`}>
				<div className="website-logo">
					<img src={websiteLogoSrc || defaultWebsiteIcon} alt={websiteName} />
				</div>
				<div className="website-name">{websiteName}</div>
			</Link>
		</>
	);
};

export default Website;
