import { getAllProduct } from "@/api-client/products-api";
import { ShopifyProduct, ShopifyProductVariant } from "@/models/product";
import { capitalizeWords } from "@/utils";
import { useEffect, useState } from "react";

const ProductTable = () => {
	const [items, setItems] = useState<ShopifyProduct[]>([]);
	const [selectedItems, setSelectedItems] = useState<ShopifyProduct[]>([]);
	const getData = async () => {
		try {
			const res = await getAllProduct();
			console.log("res", res);
			setItems(res.data);
		} catch (error) {
			console.log("error", error);
		}
	};
	useEffect(() => {
		getData();
	}, []);
	const handleInventoryField = (data: ShopifyProduct) => {
		if (data.variants.length === 0) {
			return "Inventory not tracked";
		} else {
			let count = 0;
			data.variants.forEach((variant) => {
				if (variant.inventory_management === null) {
					return "Inventory not tracked";
				} else {
					count += variant.inventory_quantity
						? variant.inventory_quantity
						: 0;
				}
			});
			if (data.variants.length === 1) {
				return `${count} in stock`;
			} else {
				return `${count} in stock for ${data.variants.length} variants`;
			}
		}
	};
	return (
		<div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
			<div className="w-1/2 h-[30px] mb-2 flex-center">
				<div className="flex items-center ">
					<input
						id="checkbox-table-search-1"
						type="checkbox"
						name="selectAll"
						className="w-4 mr-1 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
					/>
					<label
						htmlFor="checkbox-table-search-1"
						className="sr-only"
					>
						checkbox
					</label>
				</div>
				<span>All</span>
				<button
					onClick={getData}
					className=" h-[30px] bg-green-500 leading-[30px] px-4 rounded-[20px] text-white ml-4 cursor-pointer"
				>
					Refresh
				</button>
			</div>
			<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
					<tr>
						<th scope="col" className="p-4">
							#
						</th>
						<th scope="col" className="px-6 py-3">
							ID
						</th>
						<th scope="col" className="px-6 py-3">
							Image
						</th>
						<th scope="col" className="px-6 py-3">
							Product
						</th>
						<th scope="col" className="px-6 py-3">
							Status
						</th>
						<th scope="col" className="px-6 py-3">
							Inventory
						</th>
						<th scope="col" className="px-6 py-3">
							Type
						</th>
						<th scope="col" className="px-6 py-3">
							Vender
						</th>
					</tr>
				</thead>
				<tbody>
					{items.length > 0 &&
						items.map((product) => (
							<tr
								key={product.id}
								className="bg-white text-black border-b dark:bg-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-400"
							>
								<td className="w-4 p-4">
									<div className="flex items-center">
										<input
											id="checkbox-table-search-1"
											type="checkbox"
											checked={selectedItems.includes(
												product
											)}
											// value={i}
											className="w-4 h-4 bg-gray-100 border-gray-300 rounded "
										/>
										<label
											htmlFor="checkbox-table-search-1"
											className="sr-only"
										>
											checkbox
										</label>
									</div>
								</td>
								<th
									scope="row"
									className="px-6 py-4 font-normal"
								>
									{product.id}
								</th>
								<td className="px-6 py-4">
									<img
										className="h-[40px] w-[40px]"
										src={
											product.images.length > 0
												? product.images[0].src
												: "/assets/images/Logo Final 1.png"
										}
									/>
								</td>
								<td className="px-6 py-4 whitespace-nowrap  text-gray-900 font-bold">
									{product.title}
								</td>
								<td className="px-6 py-4">
									<div
										className={`w-min px-[10px] py-[2px] rounded-full ${
											product.status === "archived"
												? "bg-[#ebebeb]"
												: product.status === "active"
												? "bg-[#c7fbe1]"
												: "bg-[#e0f0ff]"
										}`}
									>
										{capitalizeWords(product.status)}
									</div>
								</td>
								<td className="px-6 py-4">
									{handleInventoryField(product)}
								</td>
								<td className="px-6 py-4">
									{product.product_type}
								</td>
								<td className="px-6 py-4">{product.vendor}</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
};

export default ProductTable;
