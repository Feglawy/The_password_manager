/* eslint-disable no-mixed-spaces-and-tabs */
import { Database, RunResult } from "better-sqlite3";
import { Account } from "../types";
import { DatabaseError, OperationResult } from "../utils";
import { decryptPassword, encryptPassword } from "../utils";
import DBConnection from "../DBConnection";
import { dbPath } from "../config";

import { v4 as uuidV4 } from "uuid";

class AccountManager {
	private db: Database;

	constructor() {
		this.db = DBConnection.getInstance(dbPath);
	}

	public addAccount(account: Account): OperationResult {
		try {
			this.validateAccount(account);
			const encryptedPassword = encryptPassword(account.password);
			const insert = this.db.prepare(
				`INSERT INTO accounts (guid, username, password, website_id, description) VALUES (?, ?, ?, ?, ?)`
			);
			const guid = `{${uuidV4()}}`;
			insert.run(
				guid,
				account.username,
				encryptedPassword,
				account.website_id,
				account.description
			);
			return { success: true, message: "Account added successfully" };
		} catch (error) {
			return this.handleError(error, "Failed to add account");
		}
	}

	public editAccount(account: Account): OperationResult {
		try {
			this.validateAccount(account, true);
			const encryptedPassword = encryptPassword(account.password);
			const update = this.db.prepare(
				`UPDATE accounts SET username = ?, password = ?, website_id = ?, description = ? WHERE id = ?`
			);
			const result: RunResult = update.run(
				account.username,
				encryptedPassword,
				account.website_id,
				account.description,
				account.id
			);
			return result.changes > 0
				? { success: true, message: "Account updated successfully" }
				: { success: false, message: "No account was updated" };
		} catch (error) {
			return this.handleError(error, "Failed to update account");
		}
	}

	public getAccounts(website_id: number): OperationResult<Account[]> {
		try {
			const select = this.db.prepare(
				`SELECT * FROM accounts WHERE website_id = ?`
			);
			const accounts = select.all(website_id) as Account[];
			const decryptedAccounts = accounts.map((account) => {
				const decryptedPassword = decryptPassword(account.password);
				return {
					...account,
					password: decryptedPassword,
				};
			});

			return {
				success: true,
				message: "Accounts retrieved successfully",
				data: decryptedAccounts,
			};
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "An unknown error occurred";
			return {
				success: false,
				message: `Failed to retrieve accounts: ${errorMessage}`,
			};
		}
	}

	public getAccount(account_id: number): OperationResult<Account> {
		try {
			const select = this.db.prepare(`SELECT * FROM accounts WHERE id = ?`);
			const account = select.get(account_id) as Account | undefined;
			return account
				? {
						success: true,
						message: "Account retrieved successfully",
						data: { ...account, password: decryptPassword(account.password) },
				  }
				: { success: false, message: "Account not found" };
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "An unknown error occurred";
			return {
				success: false,
				message: `Failed to retrieve accounts: ${errorMessage}`,
			};
		}
	}

	public getWebsiteLoggedInTo(account_id: number): OperationResult<Website> {
		try {
			const query = this.db.prepare(`
				SELECT websites.*
				FROM websites
				JOIN accounts ON websites.id = accounts.website_id
				WHERE accounts.id = ?
				`);
			const website = query.get(account_id) as Website | undefined;
			return website
				? {
						success: true,
						message: "Website retrieved successfully",
						data: website,
				  }
				: { success: false, message: "Website not found" };
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "An unknown error occurred";
			return {
				success: false,
				message: `Failed to retrieve website: ${errorMessage}`,
			};
		}
	}

	public deleteAccount(account_id: number): OperationResult {
		try {
			const del = this.db.prepare(`DELETE FROM accounts WHERE id = ?`);
			const result: RunResult = del.run(account_id);
			return result.changes > 0
				? { success: true, message: "Account deleted successfully" }
				: { success: false, message: "No account was deleted" };
		} catch (error) {
			return this.handleError(error, "Failed to delete account");
		}
	}

	private validateAccount(account: Account, requireId: boolean = false) {
		if (requireId && (!account.id || typeof account.id !== "number")) {
			throw new DatabaseError("Invalid account ID");
		}
		if (!account.username || !account.password || !account.website_id) {
			throw new DatabaseError("Missing required account fields");
		}
	}

	private handleError(error: unknown, defaultMessage: string): OperationResult {
		if (error instanceof DatabaseError) {
			return { success: false, message: error.message };
		}
		return {
			success: false,
			message: `${defaultMessage}: ${(error as Error).message}`,
		};
	}
}

export default AccountManager;
