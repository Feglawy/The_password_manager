import "../../styles/Website.css";
import { Link } from "react-router-dom";

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
					<img src={websiteLogoSrc || "world-wide-web.svg"} alt={websiteName} />
				</div>
				<div className="website-name">{websiteName}</div>
			</Link>
		</>
	);
};

export default Website;
