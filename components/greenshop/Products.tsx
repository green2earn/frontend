import ProductItem from "./ProductItem";
import { useEffect, useState } from "react";
import { ShopifyProduct } from "@/models/product";
import { getAllProduct } from "@/api-client/products-api";

const Products = () => {
	const [products, setProducts] = useState<ShopifyProduct[]>([]);

	const getListProducts = async () => {
		const res = await getAllProduct({ status: "active" });
		if (res.status === 200) {
			setProducts(res.data);
		}
	};

	useEffect(() => {
		getListProducts();
	}, []);
	return (
		<div className="w-full lg:px-[124px] py-4 lg:grid lg:grid-cols-4 lg:gap-[32px] lg:grid-rows-4 ">
			{products.length > 0 &&
				products.map((i, index) => (
					<ProductItem key={i.id} item={i} index={i.id} />
				))}
		</div>
	);
};

export default Products;
