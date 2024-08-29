import { AES, enc } from "crypto-ts";

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
