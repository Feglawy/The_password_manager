export const copyToClipboard = async (
	...textToCopy: string[]
): Promise<void> => {
	await navigator.clipboard.writeText(textToCopy.join(":"));
};

export const isValidUrl = (str:string) => {
	const urlPattern = new RegExp(
		"^(https?:\\/\\/)?" + // Protocol (optional)
			"((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.?)+[a-zA-Z]{2,}|" + // Domain name
			"((\\d{1,3}\\.){3}\\d{1,3}))" + // OR IPv4 address
			"(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*" + // Port and path
			"(\\?[;&a-zA-Z\\d%_.~+=-]*)?" + // Query string
			"(\\#[-a-zA-Z\\d_]*)?$",
		"i"
	); // Fragment locator (optional)

	return !!urlPattern.test(str);
};
