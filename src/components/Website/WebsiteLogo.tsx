import ExternalLink from "../ExternalLink";

interface WebsiteLogoProps {
	imageSrc: string;
	name: string;
	link: string;
}

const WebsiteLogo = ({ imageSrc, name, link }: WebsiteLogoProps) => {
	return (
		<div
			style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
		>
			<ExternalLink href={link}>
				<img
					src={imageSrc}
					style={{ width: "256px", borderRadius: "38%/40%" }}
				/>
			</ExternalLink>
			<h1 style={{ letterSpacing: "2px", textAlign: "center" }}>{name}</h1>
		</div>
	);
};

export default WebsiteLogo;
