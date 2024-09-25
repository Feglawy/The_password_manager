import ExternalLink from "../ExternalLink";
import { Website as WebsiteDataProps } from "../electron";

const WebsiteData = (data: WebsiteDataProps) => {
	return (
		<div
			style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
		>
			<ExternalLink href={data.url || ""}>
				{data.icon ? (
					<img
						src={data.icon}
						style={{ width: "256px", borderRadius: "38%/40%" }}
					/>
				) : (
					<img src="/world-wide-web.svg" alt={data.name} />
				)}
			</ExternalLink>
			<h1
				style={{
					letterSpacing: "2px",
					textAlign: "center",
					textTransform: "capitalize",
				}}
			>
				{data.name}
			</h1>
			<p
				style={{
					textAlign: "center",
					margin: "0 10%",
					fontSize: "larger",
					textWrap: "wrap",
				}}
			>
				{data.description}
			</p>
		</div>
	);
};

export default WebsiteData;
