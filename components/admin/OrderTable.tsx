import { getAllOrder } from "@/api-client/orders-api";
import { ShopifyOrder } from "@/models/order";
import { capitalizeWords } from "@/utils";
import { useEffect, useState } from "react";
import Loading from "../Loading";

const OrderTable = () => {
	const [orders, setOrders] = useState<ShopifyOrder[]>([]);
	const [selectedOrders, setSelectedOrders] = useState<ShopifyOrder[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const getData = async () => {
		try {
			setLoading(true);
			const res = await getAllOrder();
			console.log("res", res);
			setOrders(res.data);
			setLoading(false);
		} catch (error) {
			console.log("error", error);
		}
	};
	useEffect(() => {
		getData();
	}, []);
	// const handleInventoryField = (data: ShopifyOrder) => {
	// 	if (data.variants.length === 0) {
	// 		return "Inventory not tracked";
	// 	} else {
	// 		let count = 0;
	// 		data.variants.forEach((variant) => {
	// 			if (variant.inventory_management === null) {
	// 				return "Inventory not tracked";
	// 			} else {
	// 				count += variant.inventory_quantity
	// 					? variant.inventory_quantity
	// 					: 0;
	// 			}
	// 		});
	// 		if (data.variants.length === 1) {
	// 			return `${count} in stock`;
	// 		} else {
	// 			return `${count} in stock for ${data.variants.length} variants`;
	// 		}
	// 	}
	// };
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
							Order
						</th>
						<th scope="col" className="px-6 py-3">
							Date
						</th>
						<th scope="col" className="px-6 py-3">
							Customer
						</th>
						<th scope="col" className="px-6 py-3">
							Total
						</th>
						<th scope="col" className="px-6 py-3">
							Payment Status
						</th>
						<th scope="col" className="px-6 py-3">
							Fulfill Status
						</th>
						<th scope="col" className="px-6 py-3">
							Items
						</th>
						<th scope="col" className="px-6 py-3">
							Delivery Method
						</th>
					</tr>
				</thead>
				<tbody>
					{loading ? (
						<tr>
							<td className=""></td>
							<td className=""></td>
							<td className=""></td>
							<td className=""></td>
							<td className=""></td>
							<td className="mx-[auto] h-[80px]">
								<Loading />
							</td>
							<td className=""></td>
							<td className=""></td>
							<td className=""></td>
						</tr>
					) : (
						<>
							{orders.map((order) => (
								<tr
									key={order.id}
									className="bg-white text-black border-b dark:bg-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-400"
								>
									<td className="w-4 p-4">
										<div className="flex items-center">
											<input
												id="checkbox-table-search-1"
												type="checkbox"
												checked={selectedOrders.includes(
													order
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
										{order.name}
									</th>
									<td className="px-6 py-4">
										{order.processed_at}
										{/* <img
									className="h-[40px] w-[40px]"
									src={
										order.images.length > 0
											? order.images[0].src
											: "/assets/images/Logo Final 1.png"
									}
								/> */}
									</td>
									<td className="px-6 py-4 whitespace-nowrap  text-gray-900 font-bold">{`${order?.customer?.first_name} ${order?.customer?.last_name}`}</td>
									<td className="px-6 py-4">
										{order.total_price + order.currency}
										{/* <div
									className={`w-min px-[10px] py-[2px] rounded-full ${
										order.status === "archived"
											? "bg-[#ebebeb]"
											: order.status === "active"
											? "bg-[#c7fbe1]"
											: "bg-[#e0f0ff]"
									}`}
								>
									{capitalizeWords(order.status)}
								</div> */}
									</td>
									<td className="px-6 py-4">
										{order.financial_status}
									</td>
									<td className="px-6 py-4">
										{order.fulfillment_status === null
											? "unfulfilled"
											: order.fulfillment_status}
									</td>
									<td className="px-6 py-4">{`${order.line_items.length} item`}</td>
									<td className="px-6 py-4">
										{order.shipping_lines?.[0]?.title}
									</td>
								</tr>
							))}
						</>
					)}
				</tbody>
			</table>
		</div>
	);
};

export default OrderTable;
