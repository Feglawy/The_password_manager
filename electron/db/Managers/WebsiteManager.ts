import { Database, RunResult } from "better-sqlite3";
import { Website } from "../types";
import { DatabaseError, OperationResult } from "../utils";

class WebsiteManager {
	private db: Database;

	constructor(db: Database) {
		this.db = db;
	}

	public addWebsite(website: Website): OperationResult {
		try {
			this.validateWebsite(website);
			const insert = this.db.prepare(
				`INSERT INTO websites (name, url, icon, description) VALUES (?, ?, ?, ?)`
			);
			insert.run(
				website.name,
				website.url,
				website.iconSrc,
				website.description
			);
			return { success: true, message: "website added successfully" };
		} catch (error) {
			let message: string;
			if (
				error instanceof Error &&
				error.message.includes("UNIQUE constraint failed")
			) {
				message = `Website with name "${website.name}" already exists.`;
			} else {
				message = `Error adding website:, ${error}`;
			}
			return this.handleError(error, `Faild to add a website. \n ${message}`);
		}
	}

	public editWebsite(website: Website): OperationResult {
		try {
			this.validateWebsite(website, true);
			const update = this.db.prepare(
				`UPDATE websites set name = ?, url = ?, icon = ?, description = ? WHERE id = ?`
			);
			const result: RunResult = update.run(
				website.name,
				website.url,
				website.iconSrc,
				website.description,
				website.id
			);
			return result.changes > 0
				? { success: true, message: "website updated successfully" }
				: { success: false, message: "No website was updated" };
		} catch (error) {
			return this.handleError(error, "Failed to update website");
		}
	}

	public getAllWebsites(): OperationResult<Website[]> {
		try {
			const select = this.db.prepare("SELECT * FROM websites");
			const websites = select.all() as Website[];
			return {
				success: true,
				message: "Websites rerieved successfully",
				data: websites,
			};
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "An unknown error occurred";
			return {
				success: false,
				message: `Failed to retrieve websites: ${errorMessage}`,
			};
		}
	}

	public searchWebsite(WebsiteName: string): OperationResult<Website[]> {
		try {
			const search = this.db.prepare(
				`SELECT * FROM websites WHERE name LIKE "%?%"`
			);
			const result = search.all(WebsiteName) as Website[];
			return {
				success: true,
				message: "Websites retrieved successfully",
				data: result,
			};
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "An unknown error has occured";
			return {
				success: false,
				message: `Failed to retrieve websites: ${errorMessage}`,
			};
		}
	}

	public getWebsiteByName(websiteName: string): OperationResult<Website> {
		try {
			const select = this.db.prepare("SELECT * FROM websites WHERE name = ?");
			const website = select.get(websiteName) as Website;
			return {
				success: true,
				message: "website retrueved successfully",
				data: website,
			};
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "An unknown error occurred";
			return {
				success: false,
				message: `Failed to retrieve website: ${errorMessage}`,
			};
		}
	}

	public getWebsite(website_id: number): OperationResult<Website> {
		try {
			const select = this.db.prepare("SELECT * FROM websites WHERE name = ?");
			const website = select.get(website_id) as Website;
			return {
				success: true,
				message: "website retrueved successfully",
				data: website,
			};
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "An unknown error occurred";
			return {
				success: false,
				message: `Failed to retrieve website: ${errorMessage}`,
			};
		}
	}

	public deleteWebsite(website_id: number): OperationResult {
		try {
			const del = this.db.prepare(`DELETE FROM websites WHERE id = ?`);
			const result: RunResult = del.run(website_id);
			return result.changes > 0
				? { success: true, message: "website deleted successfully" }
				: { success: false, message: "No website was deleted" };
		} catch (error) {
			return this.handleError(error, "Failed to delete website");
		}
	}

	private validateWebsite(website: Website, requireId: boolean = false) {
		if (requireId && (!website.id || typeof website.id !== "number")) {
			throw new DatabaseError("Invalid website ID");
		}
		if (!website.name) {
			throw new DatabaseError("Missing required website fields");
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

export default WebsiteManager;
