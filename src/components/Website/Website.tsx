import "../../styles/Website.css";
import { Link } from "react-router-dom";

interface WebsiteProps {
	websiteName: string;
	websiteLogoSrc?: string | null;
}

const Website = ({ websiteName, websiteLogoSrc }: WebsiteProps) => {
	return (
		<>
			<Link className="website" to={`/${websiteName}`}>
				<div className="website-logo">
					{websiteLogoSrc ? (
						<img src={websiteLogoSrc} alt={websiteName} />
					) : (
						<img src="/world-wide-web.svg" alt={websiteName} />
					)}
				</div>
				<div className="website-name">{websiteName.toUpperCase()}</div>
			</Link>
		</>
	);
};

export default Website;
