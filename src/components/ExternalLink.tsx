interface ExternalLinkProps
	extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	href: string;
}

const ExternalLink = ({ href, children, ...props }: ExternalLinkProps) => {
	return (
		<a href={href} {...props} target="_blank">
			{children}
		</a>
	);
};

export default ExternalLink;
