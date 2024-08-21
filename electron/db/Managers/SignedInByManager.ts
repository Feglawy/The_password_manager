import { Database } from "better-sqlite3";
import { SignedInBy } from "../types";

class SignedInByManager {
	private db: Database;
	constructor(db: Database) {
		this.db = db;
	}

	public addSignedInBy({ website_id, account_id }: SignedInBy): void {
		const insert = this.db.prepare(`INSERT INTO signedInBy (?, ?)`);
		insert.run(website_id, account_id);
	}

	public getSignedInBy(website_id: string): SignedInBy[] {
		const select = this.db.prepare(
			`SELECT * FROM signedInBy WHERE website_id = ?`
		);
		return select.all(website_id) as SignedInBy[];
	}

	public editSignedInBy({ id, website_id, account_id }: SignedInBy) {
		const stmt = this.db.prepare(
			`UPDATE signedInBy SET website_id = ? account_id = ? WHERE id = ?`
		);
		stmt.run(id, website_id, account_id);
	}

	public deleteSignedInBy(website_id: string) {
		const del = this.db.prepare(`DELETE FROM SignedInBy Where id = ?`);
		del.run(website_id);
	}
}

export default SignedInByManager;
