import { Database as sqlLiteDatabase } from "better-sqlite3";
import { initializeSchema } from "./schema";


import Database = require("better-sqlite3");

class DBConnection {
	private static instance: sqlLiteDatabase;

	private constructor() {}

	public static getInstance(databaseFilePath: string): sqlLiteDatabase {
		if (!DBConnection.instance) {
			DBConnection.instance = new Database(databaseFilePath);
			DBConnection.instance.pragma("journal_mode = WAL");
			initializeSchema(DBConnection.instance);
		}
		return DBConnection.instance;
	}
}

export default DBConnection;
