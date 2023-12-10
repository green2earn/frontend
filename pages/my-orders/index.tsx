import Options from "@/components/admin/Options";
import OrderTable from "@/components/admin/OrderTable";
import Footer from "@/components/home/Footer";
import { MainLayout } from "@/components/layout/MainLayout";
import React, { useState } from "react";

function MyOrders() {
	return (
		<div className="border-t-[1px] px-7 py-4 ">
			<div className="flex items-center justify-between">
				<h2 className="text-[20px] font-[600]">My Orders</h2>
				{/* <div
					// onClick={() => dispatch(toggleCreateOrderPage())}
					className="cursor-pointer border-[1px] px-6 py-2 bg-orange-600 text-white rounded-md"
				>
					Add Order
				</div> */}
			</div>
			<div className="h-[35px] w-1/3 relative">
				<input
					type="text"
					className="placeholder-gray-500 rounded-md w-full border pl-2 h-full placeholder-opacity-50 text-[13px]"
					placeholder="Search by key"
				/>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-6 h-6 text-[#c1c1c1] absolute cursor-pointer right-[10px] top-[50%] translate-y-[-50%]"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
					/>
				</svg>
			</div>
			<Options />
			<OrderTable />
			<div className="h-[10vh]"></div>
			<Footer />
		</div>
	);
}

export default MyOrders;
MyOrders.Layout = MainLayout;
