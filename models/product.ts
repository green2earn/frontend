export interface ProductToGreenLauncher {
	id: string;
	title: string;
	price: string;
}
export type ProductSearchParameters = {
	status: "active" | "archived" | "draft";
};
export interface ShopifyProduct {
	id: number;
	title: string;
	body_html: string;
	vendor: string;
	product_type: string;
	created_at: string;
	handle: string;
	updated_at: string;
	published_at: string;
	template_suffix: string | null;
	published_scope: string;
	tags: string;
	admin_graphql_api_id: string;
	variants: ShopifyProductVariant[];
	options: ShopifyProductOption[];
	images: ShopifyProductImage[];
	image: ShopifyProductImage;
	status: string;
}

export interface ShopifyProductVariant {
	id: number;
	product_id: number;
	title: string;
	price: string;
	sku: string;
	position: number;
	inventory_policy: string;
	compare_at_price: string | null;
	fulfillment_service: string;
	inventory_management: string;
	option1: string | null;
	option2: string | null;
	option3: string | null;
	created_at: string;
	updated_at: string;
	taxable: boolean;
	barcode: string | null;
	grams: number;
	image_id: number | null;
	weight: number;
	weight_unit: string;
	inventory_item_id: number;
	inventory_quantity: number;
}

export interface ShopifyProductOption {
	name: string;
	position: number;
	values: string[];
}

export interface ShopifyProductImage {
	id: number;
	product_id: number;
	position: number;
	created_at: string;
	updated_at: string;
	alt: string | null;
	width: number;
	height: number;
	src: string;
}

export interface ProductTypeRequest {
	title: string;
	body_html: string;
	vendor: string;
	product_type: string;
	price: string;
	inventory_quantity: number;
	selectedLogo: string;
}

export interface ProductTypeResponse {
	statusCode: number;
	message: string;
	data: ShopifyProduct;
}
