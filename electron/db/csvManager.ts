// eslint-disable-next-line @typescript-eslint/no-var-requires
const { parse } = require("json2csv");

import fs from "fs";
import path from "path";
import csvParser from "csv-parser";

import DBConnection from "./DBConnection";
import { dbPath } from "./config";
import { Website } from "./types";
import {
	DatabaseError,
	decryptPassword,
	encryptPassword,
	extractWebsitename,
} from "./utils";

interface BrowserCSVFormat {
	url: string;
	username: string;
	password: string;
	httpRealm?: string;
	formActionOrigin?: string;
	guid: string;
	timeCreated?: string;
	timeLastUsed?: string;
	timePasswordChanged?: string;
}

export const importFromCsv = (filePath: string): OperationResult => {
	const db = DBConnection.getInstance(dbPath);
	const websitesMap = new Map();

	fs.createReadStream(filePath)
		.pipe(
			csvParser({
				separator: ",",
				quote: '"',
			})
		)
		.on("data", (row: BrowserCSVFormat) => {
			const data = row;
			data.password = encryptPassword(data.password);

			let websiteId = websitesMap.get(data.url);
			if (!websiteId) {
				const websiteName = extractWebsitename(data.url);
				const websiteData: Website = {
					name: websiteName,
					url: data.url,
				};
				try {
					const websiteQuery = db.prepare(`
						INSERT INTO websites (name, url) VALUES (?, ?) ON CONFLICT(name) DO NOTHING
					`);
					websiteQuery.run(websiteData.name, websiteData.url);

					// Get website_id
					websiteId = (
						db
							.prepare("SELECT id FROM websites WHERE url = ?")
							.get(data.url) as Website
					).id;
					websitesMap.set(data.url, websiteId);
				} catch (error) {
					return handleError(error, "An unknown error happend");
				}
			}
			try {
				const accountQuery = db.prepare(`
					INSERT INTO accounts (username, password, website_id, guid)
					VALUES (?, ?, ?, ?)
					ON CONFLICT (guid) DO UPDATE SET username = ?, password = ?
				`);
				accountQuery.run(
					data.username,
					data.password,
					websiteId,
					data.guid,
					data.username,
					data.password
				);
			} catch (error) {
				return handleError(error, "An unknown error occured");
			}
		})
		.on("end", () => {
			return handleSuccess("Accounts imported successfully");
		});
	return handleSuccess("Accounts imported successfully");
};

export const exportToCsv = (destPath: string): OperationResult => {
	const db = DBConnection.getInstance(dbPath);

	interface ExtractedData {
		url: string;
		username: string;
		password: string;
		guid: string;
	}
	try {
		const query = db.prepare(`
		SELECT websites.url, accounts.username, accounts.password, accounts.guid
		FROM accounts
		JOIN websites ON accounts.website_id = websites.id
		`);
		const rows = query.all() as ExtractedData[];

		const formattedRows: BrowserCSVFormat[] = rows.map((row) => ({
			url: row.url,
			username: row.username,
			password: decryptPassword(row.password),
			formActionOrigin: row.url,
			guid: row.guid,
			timeCreated: "",
			timeLastUsed: "",
			timePasswordChanged: "",
		}));

		// Define CSV fields
		const fields = [
			"url",
			"username",
			"password",
			"httpRealm",
			"formActionOrigin",
			"guid",
			"timeCreated",
			"timeLastUsed",
			"timePasswordChanged",
		];
		const csv = parse(formattedRows, { fields });

		const fileName = "accounts.csv";
		const filePath = path.join(destPath, fileName);

		fs.writeFileSync(filePath, csv);
		return handleSuccess("Accounts exported successfully");
	} catch (error) {
		return handleError(error, "An unknown error occured");
	}
};

const handleSuccess = (message: string): OperationResult => {
	return {
		success: true,
		message: message,
	};
};

const handleError = (
	error: unknown,
	defaultMessage: string
): OperationResult => {
	if (error instanceof DatabaseError) {
		return { success: false, message: error.message };
	}
	return {
		success: false,
		message: `${defaultMessage}: ${(error as Error).message}`,
	};
};
