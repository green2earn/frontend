import axiosClient from "./axios-client";
import {
	ProductTypeRequest,
	ProductTypeResponse,
	ProductSearchParameters,
} from "@/models/product";

export function getAllProduct(data?: ProductSearchParameters) {
	if (data) {
		return axiosClient.get("/products", { params: data });
	} else {
		return axiosClient.get("/products");
	}
}

export function getProductById(id: string) {
	return axiosClient.get(`/products/${id}`);
}

export function createProduct(data: ProductTypeRequest) {
	return axiosClient.post<ProductTypeRequest, any>("/products", data);
}
