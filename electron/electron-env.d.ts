/// <reference types="vite-plugin-electron/electron-env" />

declare namespace NodeJS {
	interface ProcessEnv {
		/**
		 * The built directory structure
		 *
		 * ```tree
		 * ├─┬─┬ dist
		 * │ │ └── index.html
		 * │ │
		 * │ ├─┬ dist-electron
		 * │ │ ├── main.js
		 * │ │ └── preload.js
		 * │
		 * ```
		 */
		APP_ROOT: string;
		/** /dist/ or /public/ */
		VITE_PUBLIC: string;
	}
}

interface Website {
	id?: number;
	name: string;
	url?: string;
	icon?: string | null;
	description?: string;
}

interface Account {
	id?: number;
	username: string;
	password: string;
	description?: string;
	website_id: number;
}

interface SignedInBy {
	id?: number;
	website_id: number;
	account_id: number;
	description?: string;
}

interface OperationResult<T = null> {
	success: boolean;
	message: string;
	data?: T;
}

interface WebsiteApi {
	addWebsite: (website: Website) => Promise<OperationResult>;
	editWebsite: (website: Website) => Promise<OperationResult>;
	getAllWebsites: () => Promise<OperationResult<Website[]>>;
	getWebsite: (id: number) => Promise<OperationResult<Website>>;
	getWebsiteByName: (name: string) => Promise<OperationResult<Website>>;
	searchWebsite: (name: string) => Promise<OperationResult<Website[]>>;
	deleteWebsite: (id: number) => Promise<OperationResult>;
}

interface AccountApi {
	addAccount: (account: Account) => Promise<OperationResult>;
	editAccount: (account: Account) => Promise<OperationResult>;
	getAllAccounts: () => Promise<OperationResult<Account[]>>;
	getAccount: (id: number) => Promise<OperationResult<Account>>;
	deleteWebsite: (id: number) => Promise<OperationResult>;
}

interface SignedInByApi {
	addSignedInBy: (instance: SignedInBy) => Promise<OperationResult>;
	editSignedInBy: (instance: SignedInBy) => Promise<OperationResult>;
	getAllWebsitesSignedInBy: (
		website_id: number
	) => Promise<OperationResult<SignedInBy[]>>;
	getSignedInBy: (id: number) => Promise<OperationResult<SignedInBy>>;
	deleteSignedInBy: (id: number) => Promise<OperationResult>;
}

interface API {
	openImageFileDialog: () => Promise<string | null>;
	saveFile: (filePath: string) => Promise<string | null>;
}

// Used in Renderer process, expose in `preload.ts`
interface Window {
	ipcRenderer: import("electron").IpcRenderer;
	websiteApi: WebsiteApi;
	accountApi: AccountApi;
	signedInByApi: SignedInByApi;
	api: API;
}
