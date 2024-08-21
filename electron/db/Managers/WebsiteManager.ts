import { Database } from "better-sqlite3";
import { Website } from "../types";

class WebsiteManager {
	private db: Database;

	constructor(db: Database) {
		this.db = db;
	}

	public addWebsite({ name, url, iconSrc, description }: Website): void {
		try {
			const insert = this.db.prepare(
				`INSERT INTO websites (name, url, icon, description) VALUES (?, ?, ?, ?)`
			);
			insert.run(name, url, iconSrc, description);
		} catch (error) {
			if (
				error instanceof Error &&
				error.message.includes("UNIQUE constraint failed")
			) {
				console.error(`Website with name "${name}" already exists.`);
			} else {
				console.error("Error adding website:", error);
			}
		}
	}

	public editWebsite({ id, name, url, iconSrc, description }: Website) {
		try {
			const insert = this.db.prepare(
				`UPDATE websites set name = ?, url = ?, icon = ?, description = ? WHERE id = ?`
			);
			insert.run(name, url, iconSrc, description, id);
		} catch (error) {
			if (
				error instanceof Error &&
				error.message.includes("UNIQUE constraint failed")
			) {
				console.error(`Website with name "${name}" already exists.`);
			} else {
				console.error("Error adding website:", error);
			}
		}
	}

	public getAllWebsites(): Website[] {
		const select = this.db.prepare("SELECT * FROM websites");
		return select.all() as Website[];
	}

	public searchWebsite(WebsiteName: string): Website[] | undefined {
		try {
			const search = this.db.prepare(
				`SELECT * FROM websites WHERE name LIKE "%?%"`
			);
			return search.all(WebsiteName) as Website[];
		} catch (error) {
			console.error("Error fetching website:", error);
			return undefined;
		}
	}

	public getWebsiteByName(websiteName: string): Website | undefined {
		try {
			const select = this.db.prepare("SELECT * FROM websites WHERE name = ?");
			return select.get(websiteName) as Website | undefined;
		} catch (error) {
			console.error("Error fetching website:", error);
			return undefined;
		}
	}

	public getWebsite(website_id: number): Website | undefined {
		try {
			const select = this.db.prepare("SELECT * FROM websites WHERE id = ?");
			return select.get(website_id) as Website | undefined;
		} catch (error) {
			console.error("Error fetching website:", error);
			return undefined;
		}
	}

	public deleteWebsite(website_id: number) {
		try {
			const del = this.db.prepare(`DELETE FROM websites WHERE id = ?`);
			del.run(website_id);
		} catch (error) {
			console.error("Error deleting website:", error);
		}
	}
}

export default WebsiteManager;
