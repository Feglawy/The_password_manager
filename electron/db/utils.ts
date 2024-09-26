import { AES, enc } from "crypto-ts";
import { secretKey } from "./config";
// a custom error for database-related issues
export class DatabaseError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "DatabaseError";
	}
}

// return type for operations
export interface OperationResult<T = null> {
	success: boolean;
	message: string;
	data?: T;
}

export const encryptPassword = (password: string): string => {
	if (!secretKey) {
		throw new Error("SECRET_KEY is not set in the environment variables.");
	}
	return AES.encrypt(password, secretKey).toString();
};

export const decryptPassword = (encryptedPassword: string): string => {
	if (!secretKey) {
		throw new Error("SECRET_KEY is not set in the environment variables.");
	}
	const bytes = AES.decrypt(encryptedPassword, secretKey);
	return bytes.toString(enc.Utf8);
};

export const extractWebsitename = (url: string): string => {
	const urlObj = new URL(url);
	const hostname = urlObj.hostname;
	return hostname;
};
