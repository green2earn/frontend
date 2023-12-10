import {
	LoginResponse,
	LoginWithPwPayload,
	SignupPayload,
	SigupResponse,
} from "@/models/auth";
import axiosClient from "./axios-client";

export const authApi = {
	login(payload: LoginWithPwPayload) {
		return axiosClient.post<LoginResponse>("/users/login", payload);
	},
	signup(payload: SignupPayload) {
		return axiosClient.post<SigupResponse>("/users", payload);
	},
	logout() {
		return axiosClient.post("/users/logout", {});
	},
};
