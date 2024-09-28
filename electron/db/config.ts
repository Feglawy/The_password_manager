import { app } from "electron";
import dotenv from "dotenv";
import { join } from "path";

dotenv.config();

export const secretKey = process.env.SECRET_KEY;

export const userDataPath = app.getPath("userData");
export const dbName = "database.db";

export const dbPath = join(userDataPath, dbName);
