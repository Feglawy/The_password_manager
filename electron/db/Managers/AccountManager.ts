import { Database } from "better-sqlite3";
import { Account } from "../types";

class AccountManager {
	private db: Database;
	constructor(db: Database) {
		this.db = db;
	}

	public addAccount({
		username,
		password,
		website_id,
		description,
	}: Account): void {
		const insert = this.db.prepare(`INSERT INTO accounts (?, ?, ?, ?)`);
		insert.run(username, password, website_id, description);
	}

	public getAccounts(website_id: number): Account[] {
		const select = this.db.prepare(
			`SELECT * FROM accounts WHERE website_id = ?`
		);
		return select.all(website_id) as Account[];
	}
}

export default AccountManager;
