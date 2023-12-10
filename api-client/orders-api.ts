import axiosClient from "./axios-client";
import { OrderTypeRequest } from "@/models/order";

export function getAllOrder() {
	return axiosClient.get("/orders");
}

export function createOrder(data: OrderTypeRequest) {
	return axiosClient.post<OrderTypeRequest, any>("/orders", data);
}

export function updateOrder(data: { amount: string }, id: number) {
	return axiosClient.patch<{ amount: string }, any>(`/orders/${id}`, data);
}
