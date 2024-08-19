export interface Website {
	id: number;
	name: string;
	url?: string;
	iconSrc?: string;
	description?: string;
}

export interface Account {
	id: number;
	username: string;
	password: string;
	description?: string;
	website_id: number;
}

export interface SignedInBy {
	id: number;
	website_id: number;
	account_id: number;
}
