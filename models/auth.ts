export interface LoginWithPwPayload {
	email: string;
	password: string;
}

export interface LoginResponse {
	statusCode: number;
	message: string;
	data: UserDecoded;
}

export interface SignupPayload {
	username: string;
	email: string;
	role: string;
	password: string;
}
export interface SigupResponse {
	username: string;
	email: string;
	role: string;
}
export interface UserDecoded {
	username: string;
	user_id: number;
	iat?: number;
	exp?: number;
}

export interface AuthState {
	isLoggedin: boolean;
	first_name: string;
	last_name: string;
	user_id: number | null;
	email: string;
	avatar: string;
	role: string;
}
