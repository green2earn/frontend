import axiosClient from "./axios-client";
import { OrderTransactionTypeRequest } from "@/models/order-transaction";

export function createTransaction(data: OrderTransactionTypeRequest) {
	return axiosClient.post<OrderTransactionTypeRequest, any>(
		"/transaction",
		data
	);
}
