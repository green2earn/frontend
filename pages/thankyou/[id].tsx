import Footer from "@/components/home/Footer";
import { MainLayout } from "@/components/layout/MainLayout";
import { useAppSelector } from "@/stores/store";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import WalletPopup from "@/components/WalletPopup";
import { ShopifyProduct } from "@/models/product";
import {PopupPurchase} from "@/components/greenshop/PopupPurchase";
import { NextPageContext } from "next";
import { capitalizeWords } from "@/utils";
import { useRouter } from "next/router";

export const getServerSideProps = async (context: NextPageContext) => {
	try {
		const { query } = context;
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}api/v1/orders/${query.id}`
		);
		const data = await res.json();
		if (!data.line_items[0].product_id) {
			throw new Error();
		}
		const res1 = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}api/v1/products/${data.line_items[0].product_id}`
		);
		const data1 = await res1.json();
		return { props: { order: data, product: data1 } || {} };
	} catch (error) {
		console.log("error", error);
		return { props: {} };
	}
};
const Thankyou = ({
	order,
	product,
}: {
	order: any;
	product: ShopifyProduct;
}) => {
	const router = useRouter();
	return (
		<div className="w-screen flex flex-row h-min">
			<div className="w-[60%] border-r-[1px] border-gray-300 max-h-[92vh] flex flex-col pl-[10vw] pr-[5vw]">
				<div className="flex flex-row items-center mt-[15px]">
					<img
						src="/assets/images/icon_verify_tick.svg"
						alt=""
						className="w-[60px] h-[60px] mr-[20px]"
					/>
					<div className="flex flex-col">
						<div className="opacity-50">
							{`Confirmation #${order?.confirmation_number}`}
						</div>
						<div className="font-semibold text-[30px]">
							{`Thank you, ${capitalizeWords(
								order?.customer?.first_name || ""
							)}!`}
						</div>
					</div>
				</div>
				<div className="border-[1px] border-gray-300 padding-[5px] mt-[15px] h-min flex flex-col p-[10px]">
					<div className="font-semibold text-[20px]">
						Your order is confirmed
					</div>
					<div className="">
						You’ll receive a confirmation email with your order
						number shortly.
					</div>
				</div>
				<div className="border-r-[1px] border-l-[1px] border-b-[1px] border-gray-300 padding-[5px] h-min p-[10px] flex flex-row">
					<input type="checkbox" name="" id="" />
					<div className="ml-[5px]">
						Email me with news and offers
					</div>
				</div>
				<div className="border-[1px] border-gray-300 padding-[5px] mt-[15px] h-min flex flex-col p-[10px]">
					<div className="text-[20px] font-semibold my-[10px]">
						Order details
					</div>
					<div className="flex flex-row">
						<div className="w-[50%] flex flex-col">
							<div className="text-[16px] font-semibold my-[5px]">
								Contact information
							</div>
							<div className="">{order?.contact_email}</div>
							<div className="text-[16px] font-semibold my-[5px]">
								Shipping address
							</div>
							<div className="">
								{order?.shipping_address?.name}
							</div>
							<div className="">
								{order?.shipping_address?.address1}
							</div>
							<div className="">{`${order?.shipping_address?.city} ${order?.shipping_address?.zip}`}</div>
							<div className="">
								{order?.shipping_address?.country}
							</div>
							<div className="text-[16px] font-semibold my-[5px]">
								Shipping method
							</div>
							<div className="">Standard</div>
						</div>
						<div className="w-[50%]  flex flex-col">
							<div className="text-[16px] font-semibold my-[5px]">
								Payment method
							</div>
							<div className="flex flex-row">
								<img
									src="/assets/images/bogus.webp"
									alt=""
									className="w-[30px] h-[30px] mr-[10px]"
								/>
								<div className="">Bogus •••• 1</div>
								<div className="mx-[5px]">-</div>
								<div className="font-semibold">{`$${order?.total_price}`}</div>
							</div>
							<div className="text-[16px] font-semibold my-[5px]">
								Billing address
							</div>
							<div className="">
								{order?.shipping_address?.name}
							</div>
							<div className="">
								{order?.shipping_address?.address1}
							</div>
							<div className="">{`${order?.shipping_address?.city} ${order?.shipping_address?.zip}`}</div>
							<div className="">
								{order?.shipping_address?.country}
							</div>
						</div>
					</div>
				</div>
				<div className="w-full sticky bottom-0 bg-whitez-[1000] py-[10px] flex flex-row-reverse px-[15px] mt-[3vh]">
					<button
						onClick={() => router.push("/green-shop")}
						className="hover:bg-[#09A507] hover:text-white rounded-[16px] border-[1px] h-[35px] text-[16px] py-[3px] px-[15px] text-[#09A507] border-[#09A507]  mx-[5px]"
					>
						Continues Shopping
					</button>

					<button
						onClick={() => router.push("/users/profile")}
						className="hover:bg-[#09A507] hover:text-white rounded-[16px] border-[1px] h-[35px] text-[16px] py-[3px] px-[15px] text-[#09A507] border-[#09A507]  mx-[5px]"
					>
						Go my profile
					</button>
				</div>
			</div>
			<div className="w-[40%] h-[92vh] bg-[#f5f5f5] flex flex-col pr-[5vw] pl-[3vw] justify-center">
				<div className="flex flex-row mt-[15px] items-center justify-between">
					<img
						src={
							product.image.src || "/assets/images/greenshop.png"
						}
						alt=""
						className="w-[64px] h-[64px] border-[1px] border-gray-300 p-[5px] rounded-[5px]"
					/>
					<div className="text-[14px]">{product?.title}</div>
					<div className="">{`$${order?.line_items[0]?.price}`}</div>
				</div>
				<div className="flex flex-row justify-between my-[10px]">
					<div className="">Subtotal</div>
					<div className="font-semibold">{`$${order?.subtotal_price}`}</div>
				</div>
				<div className="flex flex-row justify-between my-[10px]">
					<div className="">Shipping</div>
					<div className="font-semibold">Free</div>
				</div>
				<div className="flex flex-row justify-between my-[10px]">
					<div className="">Estimated taxes</div>
					<div className="font-semibold">{`$${order?.total_tax}`}</div>
				</div>
				<div className="flex flex-row justify-between items-center my-[10px]">
					<div className="font-semibold text-[20px]">Total</div>
					<div className="flex flex-row">
						<div className="opacity-50 text-[20px] mx-[10px]">
							USD
						</div>
						<div className="font-semibold text-[20px]">{`$${order?.total_price}`}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Thankyou;
Thankyou.Layout = MainLayout;
