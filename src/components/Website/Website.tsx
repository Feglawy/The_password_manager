import "../../styles/Website.css";

interface WebsiteProps {
	websiteName: string;
	websiteLogoSrc?: string;
}

const Website = ({ websiteName, websiteLogoSrc }: WebsiteProps) => {
	return (
		<>
			<a className="website" href={`/${websiteName}`}>
				<div className="website-logo">
					{websiteLogoSrc ? (
						<img src={websiteLogoSrc} alt={websiteName} />
					) : (
						<img src="/world-wide-web.svg" alt={websiteName} />
					)}
				</div>
				<div className="website-name">{websiteName}</div>
			</a>
		</>
	);
};

export default Website;
