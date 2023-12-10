import { AuthState } from "@/models/auth";
import axiosClient from "./axios-client";
import { OrderTransactionTypeRequest } from "@/models/order-transaction";

export function getUserById(id: string) {
	return axiosClient.get(`/users/${id}`);
}
