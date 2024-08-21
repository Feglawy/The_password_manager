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

	public EditAccount({
		id,
		username,
		password,
		website_id,
		description,
	}: Account) {
		const update = this.db.prepare(
			`UPDATE accounts SET username = ?, password = ?, website_id = ?, description = ? WHERE id = ?`
		);
		update.run(username, password, website_id, description, id);
	}

	public getAccounts(website_id: number): Account[] {
		const select = this.db.prepare(
			`SELECT * FROM accounts WHERE website_id = ?`
		);
		return select.all(website_id) as Account[];
	}

	public getAccount(account_id: number): Account | undefined {
		const select = this.db.prepare(`SELECT * FROM accounts WHERE id = ?`);
		return select.get(account_id) as Account | undefined;
	}

	public deleteAccount(account_id: number) {
		const del = this.db.prepare(`DELETE FROM accounts WHERE id = ?`);
		del.run(account_id);
	}
}

export default AccountManager;
