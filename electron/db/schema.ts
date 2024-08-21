import { Database } from "better-sqlite3";

export const initializeSchema = (db: Database) => {
	try {
		db.exec(`
CREATE TABLE websites (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT    NOT NULL
                        UNIQUE,
    url         TEXT,
    icon        TEXT,
    description TEXT
);


CREATE TABLE IF NOT EXISTS accounts (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    username    TEXT    NOT NULL,
    password    TEXT    NOT NULL,
    website_id  INTEGER NOT NULL,
    description TEXT,
    FOREIGN KEY (
        website_id
    )
    REFERENCES websites (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS signedInBy (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    website_id INTEGER NOT NULL,
    account_id INTEGER NOT NULL,
    FOREIGN KEY (
        website_id
    )
    REFERENCES websites (id) ON DELETE CASCADE,
    FOREIGN KEY (
        account_id
    )
    REFERENCES accounts (id) ON DELETE CASCADE
);


-- Create indexes to optimize query performance
CREATE INDEX IF NOT EXISTS idx_accounts_website_id ON accounts(website_id);
CREATE INDEX IF NOT EXISTS idx_signedInBy_website_id ON signedInBy(website_id);
CREATE INDEX IF NOT EXISTS idx_signedInBy_account_id ON signedInBy(account_id);
        `);

		console.log("Database schema initialized successfully.");
	} catch (error) {
		console.error("Error initializing database schema:", error);
	}
};
