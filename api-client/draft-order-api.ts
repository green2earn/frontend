import axiosClient from "./axios-client";
import { OrderTypeRequest } from "@/models/order";

export function getAllOrder() {
	return axiosClient.get("/orders");
}

export function createDraftOrder(data: OrderTypeRequest) {
	return axiosClient.post<OrderTypeRequest, any>("/draft-order", data);
}

export function completeDraftOrder(data: { amount: string }, id: number) {
	return axiosClient.put<{ amount: string }, any>(`/draft-orders/${id}`, data);
}
