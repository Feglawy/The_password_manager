import { AES, enc } from "crypto-ts";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require("bcrypt");

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

export const hashString = async (str: string): Promise<string> => {
	const saltRounds = 10;
	const hashedString = await bcrypt.hash(str, saltRounds);
	return hashedString;
};

export const compareHashes = async (
	stringToCompare: string,
	hash: string
): Promise<boolean> => {
	const match = await bcrypt.compare(stringToCompare, hash);
	return match;
};

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
