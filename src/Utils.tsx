export const copyToClipboard = async (
	...textToCopy: string[]
): Promise<void> => {
	await navigator.clipboard.writeText(textToCopy.join(":"));
};
