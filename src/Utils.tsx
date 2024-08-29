import { AES, enc } from "crypto-ts";
export const copyToClipboard = async (
	...textToCopy: string[]
): Promise<void> => {
	await navigator.clipboard.writeText(textToCopy.join(":"));
};

export const encryptPassword = (password: string): string => {
	const secretKey = process.env.SECRET_KEY;
	if (!secretKey) {
		throw new Error("SECRET_KEY is not set in the environment variables.");
	}
	return AES.encrypt(password, secretKey).toString();
};

export const decryptPassword = (encryptedPassword: string): string => {
	const secretKey = process.env.SECRET_KEY;
	if (!secretKey) {
		throw new Error("SECRET_KEY is not set in the environment variables.");
	}
	const bytes = AES.decrypt(encryptedPassword, secretKey);
	return bytes.toString(enc.Utf8);
};
