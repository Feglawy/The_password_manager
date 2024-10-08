/* eslint-disable @typescript-eslint/no-var-requires */
const { ipcRenderer, contextBridge } = require("electron");

import { Account, SignedInBy, Website } from "./db/types";

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld("ipcRenderer", {
	on(...args: Parameters<typeof ipcRenderer.on>) {
		const [channel, listener] = args;
		return ipcRenderer.on(channel, (event, ...args) =>
			listener(event, ...args)
		);
	},
	off(...args: Parameters<typeof ipcRenderer.off>) {
		const [channel, ...omit] = args;
		return ipcRenderer.off(channel, ...omit);
	},
	send(...args: Parameters<typeof ipcRenderer.send>) {
		const [channel, ...omit] = args;
		return ipcRenderer.send(channel, ...omit);
	},
	invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
		const [channel, ...omit] = args;
		return ipcRenderer.invoke(channel, ...omit);
	},

	// You can expose other APTs you need here.
	// ...
});

contextBridge.exposeInMainWorld("websiteApi", {
	addWebsite: (website: Website) => ipcRenderer.invoke("website:add", website),
	editWebsite: (website: Website) =>
		ipcRenderer.invoke("website:edit", website),
	getAllWebsites: () => ipcRenderer.invoke("website:getAll"),
	getWebsite: (website_id: number) =>
		ipcRenderer.invoke("website:get:id", website_id),
	getWebsiteByName: (websiteName: string) =>
		ipcRenderer.invoke("website:get:name", websiteName),
	searchWebsite: (websiteName: string) =>
		ipcRenderer.invoke("website:search", websiteName),
	deleteWebsite: (website_id: number) =>
		ipcRenderer.invoke("website:delete", website_id),
});

contextBridge.exposeInMainWorld("accountApi", {
	addAccount: (account: Account) => ipcRenderer.invoke("account:add", account),
	editAccount: (account: Account) =>
		ipcRenderer.invoke("account:edit", account),
	getAccounts: (website_id: number) =>
		ipcRenderer.invoke("account:getAll", website_id),
	getAccount: (account_id: number) =>
		ipcRenderer.invoke("account:get:id", account_id),
	getWebsiteLoggedInTo: (id: number) =>
		ipcRenderer.invoke("account:getWebsiteLoggedInTo", id),
	deleteAccount: (account_id: number) =>
		ipcRenderer.invoke("account:delete", account_id),
});

contextBridge.exposeInMainWorld("signedInByApi", {
	addSignedInBy: (instance: SignedInBy) =>
		ipcRenderer.invoke("signedInBy:add", instance),
	editSignedInBy: (instance: SignedInBy) =>
		ipcRenderer.invoke("signedInBy:edit", instance),
	getAllSignedInBy: (website_id: number) =>
		ipcRenderer.invoke("signedInBy:getAll", website_id),
	getWebsiteLoggedInBy: (id: number) =>
		ipcRenderer.invoke("signedInBy:getWebsiteLoggedInBy", id),
	getAccountLoggedInWith: (id: number) =>
		ipcRenderer.invoke("signedInBy:getAccountLoggedInWith", id),
	getSignedInBy: (id: number) => ipcRenderer.invoke("signedInBy:get", id),
	deleteSignedInBy: (id: number) => ipcRenderer.invoke("signedInBy:delete", id),
});

contextBridge.exposeInMainWorld("api", {
	openImageFileDialog: () => ipcRenderer.invoke("openImageDialog"),
	saveFile: (filePath: string) => ipcRenderer.invoke("saveFile", filePath),
	importFromCsv: (filePath: string) =>
		ipcRenderer.invoke("importFromCSV", filePath),
	exportAsCsv: (dirPath: string) => ipcRenderer.invoke("exportAsCSV", dirPath),
	openDirDialog: () => ipcRenderer.invoke("openDirDialog"),
	openCsvDialog: () => ipcRenderer.invoke("openCsvDialog"),
});
