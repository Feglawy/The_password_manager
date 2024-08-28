// a custom error for database-related issues
export class DatabaseError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "DatabaseError";
	}
}

// return type for operations
export interface OperationResult<T = null> {
	success: boolean;
	message: string;
	data?: T;
}
