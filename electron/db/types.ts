export interface Website {
	id?: number;
	name: string;
	url?: string;
	icon?: string;
	description?: string;
}

export interface Account {
	id?: number;
	guid: string;
	username: string;
	password: string;
	description?: string;
	website_id: number;
}

export interface SignedInBy {
	id?: number;
	website_id: number;
	account_id: number;
	description?: string;
}
