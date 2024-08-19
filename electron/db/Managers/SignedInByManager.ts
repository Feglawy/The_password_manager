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
}

export default SignedInByManager;
