import { app } from "electron";
import dotenv from "dotenv";
import { join } from "path";

const isDevelopment =
	process.env.NODE_ENV === "development" || process.defaultApp;

if (isDevelopment) dotenv.config();

export const secretKey = isDevelopment
	? process.env.SECRET_KEY
	: "Your_secret_key"; // set secret key for production

export const userDataPath = app.getPath("userData");
export const dbName = "database.db";

export const dbPath = isDevelopment
	? join(__dirname, "..", dbName)
	: join(userDataPath, dbName);
