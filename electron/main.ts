import { app, BrowserWindow, ipcMain, shell } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { dirname, join } from "path";
import WebsiteManager from "./db/Managers/WebsiteManager";
import AccountManager from "./db/Managers/AccountManager";
import SignedInByManager from "./db/Managers/SignedInByManager";
import DBConnection from "./db/DBConnection";
import { Account, SignedInBy, Website } from "./db/types";
import { openImageFileDialog, saveImage } from "./utils";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, "..");

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
	? path.join(process.env.APP_ROOT, "public")
	: RENDERER_DIST;

let win: BrowserWindow | null;

function createWindow() {
	win = new BrowserWindow({
		width: 1280,
		height: 720,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
			nodeIntegration: false,
			contextIsolation: true,
		},
	});

	// win.setMenu(null);

	win.webContents.setWindowOpenHandler(({ url }) => {
		// open url in a browser and prevent default
		shell.openExternal(url);
		return { action: "deny" };
	});

	// Test active push message to Renderer-process.
	win.webContents.on("did-finish-load", () => {
		win?.webContents.send("main-process-message", new Date().toLocaleString());
	});

	if (VITE_DEV_SERVER_URL) {
		win.loadURL(VITE_DEV_SERVER_URL);
	} else {
		// win.loadFile('dist/index.html')
		win.loadFile(path.join(RENDERER_DIST, "index.html"));
	}
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
		win = null;
	}
});

app.on("activate", () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

app.whenReady().then(createWindow);
// ____________________________________________________________________

const dbName = "database.sqlite";
const dbPath = join(__dirname, "..", dbName);
const db = DBConnection.getInstance(dbPath);

const websiteManager = new WebsiteManager(db);
const accountManager = new AccountManager(db);
const signedInByManager = new SignedInByManager(db);

// IPC HANDLERS

// Website
ipcMain.handle("website:add", async (_event, website: Website) => {
	return websiteManager.addWebsite(website);
});

ipcMain.handle("website:edit", async (_event, website: Website) => {
	return websiteManager.editWebsite(website);
});

ipcMain.handle("website:getAll", async () => {
	return websiteManager.getAllWebsites();
});

ipcMain.handle("website:get:id", async (_event, id: number) => {
	return websiteManager.getWebsite(id);
});

ipcMain.handle("website:get:name", async (_event, name: string) => {
	return websiteManager.getWebsiteByName(name);
});

ipcMain.handle("website:search", async (_event, name: string) => {
	return websiteManager.searchWebsite(name);
});

ipcMain.handle("website:delete", async (_event, id: number) => {
	return websiteManager.deleteWebsite(id);
});

// ____________________________________________________________________
// account
ipcMain.handle("account:add", async (_event, account: Account) => {
	return accountManager.addAccount(account);
});

ipcMain.handle("account:edit", async (_event, account: Account) => {
	return accountManager.editAccount(account);
});

ipcMain.handle("account:getAll", async (_event, website_id: number) => {
	return accountManager.getAccounts(website_id);
});

ipcMain.handle("account:get:id", async (_event, id: number) => {
	return accountManager.getAccount(id);
});

ipcMain.handle("account:delete", async (_event, id: number) => {
	return accountManager.deleteAccount(id);
});

// ____________________________________________________________________
// signedInBy
ipcMain.handle("signedInBy:add", async (_event, instance: SignedInBy) => {
	return signedInByManager.addSignedInBy(instance);
});

ipcMain.handle("signedInBy:edit", async (_event, instance: SignedInBy) => {
	return signedInByManager.editSignedInBy(instance);
});

ipcMain.handle("signedInBy:getAll", async (_event, website_id: number) => {
	return signedInByManager.getAllSignedInBy(website_id);
});

ipcMain.handle("signedInBy:get", async (_event, id: number) => {
	return signedInByManager.getSignedInBy(id);
});

ipcMain.handle("signedInBy:delete", async (_event, id: number) => {
	return signedInByManager.deleteSignedInBy(id);
});

//______________________________________________________________________

// eslint-disable-next-line @typescript-eslint/no-unused-vars
ipcMain.handle("open-image-dialog", async (_event) => {
	return await openImageFileDialog();
});

ipcMain.handle(
	"save-file",
	async (_event, filePath: string, destinationFolder: string) => {
		return saveImage(filePath, destinationFolder);
	}
);
