import { Database, RunResult } from "better-sqlite3";
import { SignedInBy } from "../types";
import { DatabaseError, OperationResult } from "../utils";

class SignedInByManager {
	private db: Database;
	constructor(db: Database) {
		this.db = db;
	}

	public addSignedInBy(instance: SignedInBy): OperationResult {
		try {
			this.validateInstance(instance);
			const insert = this.db.prepare(`INSERT INTO signedInBy (?, ?)`);
			insert.run(instance.website_id, instance.account_id);
			return { success: true, message: "Added an instance of signed in by" };
		} catch (error) {
			return this.handleError(error, "Failed to add account");
		}
	}

	public getSignedInBy(website_id: number): OperationResult<SignedInBy> {
		try {
			const select = this.db.prepare(
				`SELECT * FROM signedInBy WHERE website_id = ?`
			);
			const instance = select.get(website_id) as SignedInBy | undefined;
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

	public editSignedInBy(instance: SignedInBy) {
		try {
			const stmt = this.db.prepare(
				`UPDATE signedInBy SET website_id = ? account_id = ? WHERE id = ?`
			);
			stmt.run(instance.id, instance.website_id, instance.account_id);
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
