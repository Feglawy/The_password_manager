import "../../styles/Website.css";
import { Link } from "react-router-dom";
import defaultWebsiteIcon from "/world-wide-web.svg";

interface WebsiteProps {
	id: number;
	websiteName: string;
	websiteLogoSrc?: string | null;
}

const Website = ({ id, websiteName, websiteLogoSrc }: WebsiteProps) => {
	const handleImageError = (
		e: React.SyntheticEvent<HTMLImageElement, Event>
	) => {
		e.currentTarget.src = defaultWebsiteIcon;
	};

	return (
		<>
			<Link className="website" to={`/${id}`}>
				<div className="website-logo">
					<img
						src={websiteLogoSrc || defaultWebsiteIcon}
						alt={websiteName}
						onError={handleImageError}
					/>
				</div>
				<div className="website-name">{websiteName}</div>
			</Link>
		</>
	);
};

export default Website;
