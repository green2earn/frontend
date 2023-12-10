export interface OrderTransactionTypeRequest {
	order_id: number;
	currency: string;
	amount: string;
	parent_id: number;
}
