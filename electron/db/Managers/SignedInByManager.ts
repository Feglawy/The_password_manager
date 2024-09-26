/* eslint-disable no-mixed-spaces-and-tabs */
import { Database, RunResult } from "better-sqlite3";
import { SignedInBy } from "../types";
import { DatabaseError, decryptPassword, OperationResult } from "../utils";
import DBConnection from "../DBConnection";
import { dbPath } from "../config";

class SignedInByManager {
	private db: Database;
	constructor() {
		this.db = DBConnection.getInstance(dbPath);
	}

	public addSignedInBy(instance: SignedInBy): OperationResult {
		try {
			this.validateInstance(instance);
			const insert = this.db.prepare(
				`INSERT INTO signedInBy (website_id, account_id, description) VALUES (?, ?, ?)`
			);
			insert.run(
				instance.website_id,
				instance.account_id,
				instance.description
			);
			return { success: true, message: "Added an instance of signed in by" };
		} catch (error) {
			return this.handleError(error, "Failed to add account");
		}
	}

	public getAllSignedInBy(website_id: number): OperationResult<SignedInBy[]> {
		try {
			const select = this.db.prepare(
				`SELECT * FROM signedInBy WHERE website_id = ?`
			);
			const instance = select.all(website_id) as SignedInBy[] | undefined;
			return instance
				? {
						success: true,
						message: "Account retrieved successfully",
						data: instance,
				  }
				: { success: false, message: "Account not found" };
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "An unknown error occurred";
			return {
				success: false,
				message: `Failed to retrieve instance of SignedInBy: ${errorMessage}`,
			};
		}
	}

	public getSignedInBy(id: number): OperationResult<SignedInBy> {
		try {
			const select = this.db.prepare(`SELECT * FROM signedInBy WHERE id = ?`);
			const instance = select.get(id) as SignedInBy | undefined;
			return instance
				? {
						success: true,
						message: "Account retrieved successfully",
						data: instance,
				  }
				: { success: false, message: "Account not found" };
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "An unknown error occurred";
			return {
				success: false,
				message: `Failed to retrieve instance of SignedInBy: ${errorMessage}`,
			};
		}
	}

	public getWebsiteLoggedInBy(SignedInId: number): OperationResult<Website> {
		try {
			const query = this.db.prepare(`
				SELECT websites.*
				FROM websites
				JOIN accounts ON websites.id = accounts.website_id
				JOIN signedInBy ON accounts.id = signedInBy.account_id
				WHERE signedInBy.id = ?
				`);
			const website = query.get(SignedInId) as Website | undefined;
			return website
				? {
						success: true,
						message: "Website retrieved successfully",
						data: website,
				  }
				: { success: false, message: "Couldn't get the website logged in by" };
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "An unknown error occured";
			return {
				success: false,
				message: `Failed to retrieve instance of Website: ${errorMessage}`,
			};
		}
	}

	public getAccountLoggedInWith(SignedInId: number): OperationResult<Account> {
		try {
			const query = this.db.prepare(`
				SELECT accounts.*
				FROM accounts
				JOIN signedInBy ON accounts.id = signedInBy.account_id
				WHERE signedInBy.id = ?
				`);
			const account = query.get(SignedInId) as Account | undefined;
			return account
				? {
						success: true,
						message: "Account retrieved successfully",
						data: { ...account, password: decryptPassword(account.password) },
				  }
				: { success: false, message: "Couldn't get the account logged in by" };
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "An unknown error occured";
			return {
				success: false,
				message: `Failed to retrieve instance of Website: ${errorMessage}`,
			};
		}
	}

	public editSignedInBy(instance: SignedInBy) {
		try {
			const stmt = this.db.prepare(
				`UPDATE signedInBy SET website_id = ? account_id = ? description = ? WHERE id = ?`
			);
			stmt.run(
				instance.id,
				instance.website_id,
				instance.account_id,
				instance.description
			);
		} catch (error) {
			return this.handleError(error, "Failed to edit signedInBy instance");
		}
	}

	public deleteSignedInBy(website_id: number) {
		try {
			const del = this.db.prepare(`DELETE FROM SignedInBy Where id = ?`);
			const result: RunResult = del.run(website_id);
			return result.changes > 0
				? {
						success: true,
						message: "Instance of signedInBy deleted successfully",
				  }
				: { success: false, message: "No Instance of signedInBy was deleted" };
		} catch (error) {
			return this.handleError(error, "Failed to delete instance");
		}
	}

	private validateInstance(instance: SignedInBy, requireId: boolean = false) {
		if (requireId && (!instance.id || typeof instance.id !== "number")) {
			throw new DatabaseError("Invalid SignedInBy ID");
		}
		if (!instance.account_id || !instance.website_id) {
			throw new DatabaseError("Missing required SignedInBy fields");
		}
	}

	private handleError(error: unknown, defaultMessage: string) {
		if (error instanceof DatabaseError) {
			return { success: false, message: error.message };
		}
		return {
			success: false,
			message: `${defaultMessage}: ${(error as Error).message}`,
		};
	}
}

export default SignedInByManager;
